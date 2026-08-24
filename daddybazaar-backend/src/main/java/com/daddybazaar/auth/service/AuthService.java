package com.daddybazaar.auth.service;

import com.daddybazaar.auth.dto.AuthResponse;
import com.daddybazaar.auth.dto.LoginRequest;
import com.daddybazaar.auth.dto.RegisterRequest;
import com.daddybazaar.auth.dto.ChangePasswordRequest;
import com.daddybazaar.auth.entity.UserEntity;
import com.daddybazaar.auth.repository.UserRepository;
import com.daddybazaar.business.entity.BusinessEntity;
import com.daddybazaar.business.repository.BusinessRepository;
import com.daddybazaar.common.exception.BusinessException;
import com.daddybazaar.common.util.SlugUtils;
import com.daddybazaar.security.JwtTokenProvider;
import com.daddybazaar.security.UserPrincipal;
import com.daddybazaar.subscription.entity.PlanEntity;
import com.daddybazaar.subscription.entity.SubscriptionEntity;
import com.daddybazaar.subscription.repository.PlanRepository;
import com.daddybazaar.subscription.repository.SubscriptionRepository;
import com.daddybazaar.website.entity.WebsiteSettingsEntity;
import com.daddybazaar.website.repository.WebsiteSettingsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BusinessRepository businessRepository;
    private final PlanRepository planRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final WebsiteSettingsRepository websiteSettingsRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Value("${app.domain:daddybazaar.com}")
    private String appDomain;

    @Value("${jwt.expiration-ms:86400000}")
    private long jwtExpirationMs;

    @Value("${app.trial-days:14}")
    private int trialDays;

    /**
     * Full registration flow:
     *  1. Validate uniqueness
     *  2. Create User
     *  3. Generate slug + create Business
     *  4. Create default WebsiteSettings
     *  5. Create TRIAL Subscription
     *  6. Issue JWT
     */
    @Transactional
    public AuthResponse register(RegisterRequest req) {
        // 1. Uniqueness checks
        if (userRepository.existsByEmail(req.getEmail())) {
            throw BusinessException.emailAlreadyExists(req.getEmail());
        }
        if (userRepository.existsByMobile(req.getMobile())) {
            throw BusinessException.mobileAlreadyExists(req.getMobile());
        }

        // 2. Create user
        UserEntity user = UserEntity.builder()
                .ownerName(req.getOwnerName())
                .email(req.getEmail().toLowerCase().trim())
                .mobile(req.getMobile().trim())
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .role("OWNER")
                .build();
        user = userRepository.save(user);
        log.info("Created user: {}", user.getId());

        // 3. Generate slug + create business
        String baseSlug = SlugUtils.generate(req.getBusinessName());
        String slug = resolveUniqueSlug(baseSlug, req.getCity());

        BusinessEntity business = BusinessEntity.builder()
                .ownerId(user.getId())
                .name(req.getBusinessName().trim())
                .slug(slug)
                .businessCategory(req.getBusinessCategory())
                .whatsapp(req.getWhatsapp())
                .address(req.getAddress())
                .city(req.getCity())
                .state(req.getState())
                .country(req.getCountry() != null ? req.getCountry() : "India")
                .pincode(req.getPincode())
                .status("DRAFT")
                .build();
        business = businessRepository.save(business);
        log.info("Created business: {} (slug={})", business.getId(), slug);

        // 4. Default website settings
        WebsiteSettingsEntity settings = WebsiteSettingsEntity.builder()
                .businessId(business.getId())
                .build();
        websiteSettingsRepository.save(settings);

        // 5. Trial subscription
        PlanEntity freePlan = planRepository.findByCode("FREE")
                .orElseThrow(() -> new IllegalStateException("FREE plan not seeded"));

        LocalDate today = LocalDate.now();
        SubscriptionEntity subscription = SubscriptionEntity.builder()
                .businessId(business.getId())
                .planId(freePlan.getId())
                .status("TRIAL")
                .billingCycle("TRIAL")
                .startDate(today)
                .endDate(today.plusDays(trialDays))
                .trialEndDate(today.plusDays(trialDays))
                .build();
        subscriptionRepository.save(subscription);

        // 6. Issue JWT
        String accessToken  = jwtTokenProvider.generateAccessToken(user.getId(), user.getEmail(), user.getRole(), business.getId());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getId());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(jwtExpirationMs / 1000)
                .userId(user.getId())
                .businessId(business.getId())
                .ownerName(user.getOwnerName())
                .email(user.getEmail())
                .role(user.getRole())
                .businessName(business.getName())
                .slug(slug)
                .websiteUrl("https://" + slug + "." + appDomain)
                .build();
    }

    /**
     * Login: authenticate credentials, issue JWT pair.
     */
    public AuthResponse login(LoginRequest req) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail().toLowerCase().trim(), req.getPassword())
        );
        // Note: Spring Security calls CustomUserDetailsService.loadUserByUsername
        // BUT our loadUserByUsername loads by UUID. We need to load by email here.
        UserEntity user = userRepository.findByEmailWithBusiness(req.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new IllegalStateException("User not found after authentication"));

        BusinessEntity business = businessRepository.findByOwnerId(user.getId()).orElse(null);

        String accessToken  = jwtTokenProvider.generateAccessToken(
                user.getId(), user.getEmail(), user.getRole(),
                business != null ? business.getId() : null);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getId());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(jwtExpirationMs / 1000)
                .userId(user.getId())
                .businessId(business != null ? business.getId() : null)
                .ownerName(user.getOwnerName())
                .email(user.getEmail())
                .role(user.getRole())
                .businessName(business != null ? business.getName() : null)
                .slug(business != null ? business.getSlug() : null)
                .websiteUrl(business != null ? "https://" + business.getSlug() + "." + appDomain : null)
                .build();
    }

    /**
     * Change Password
     */
    @Transactional
    public void changePassword(UUID userId, ChangePasswordRequest request) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Incorrect current password");
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    // ===== Private helpers =====

    private String resolveUniqueSlug(String baseSlug, String city) {
        if (!businessRepository.existsBySlug(baseSlug)) {
            return baseSlug;
        }
        List<String> alternatives = SlugUtils.generateAlternatives(baseSlug, city);
        for (String alt : alternatives) {
            if (!businessRepository.existsBySlug(alt)) {
                return alt;
            }
        }
        // Fallback: append timestamp suffix
        return baseSlug + System.currentTimeMillis() % 10000;
    }
}
