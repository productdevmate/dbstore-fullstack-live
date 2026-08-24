package com.daddybazaar.security;

import com.daddybazaar.auth.entity.UserEntity;
import com.daddybazaar.auth.repository.UserRepository;
import com.daddybazaar.business.entity.BusinessEntity;
import com.daddybazaar.business.repository.BusinessRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BusinessRepository businessRepository;

    /**
     * Called by JwtAuthenticationFilter with a userId (UUID string).
     * Called by AuthenticationManager with an email string.
     * We detect which format it is.
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String usernameOrId) throws UsernameNotFoundException {
        UserEntity user;

        // Try UUID first (JWT filter path), else treat as email (login path)
        try {
            UUID userId = UUID.fromString(usernameOrId);
            user = userRepository.findById(userId)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found: " + usernameOrId));
        } catch (IllegalArgumentException e) {
            // Not a UUID — treat as email
            user = userRepository.findByEmail(usernameOrId.toLowerCase().trim())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found: " + usernameOrId));
        }

        // Look up primary business
        BusinessEntity business = businessRepository.findByOwnerId(user.getId()).orElse(null);
        UUID businessId = business != null ? business.getId() : null;

        return new UserPrincipal(user.getId(), businessId, user.getEmail(),
                user.getPasswordHash(), user.getRole(), user.isActive());
    }
}
