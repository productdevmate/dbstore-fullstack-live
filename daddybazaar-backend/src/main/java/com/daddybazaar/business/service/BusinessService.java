package com.daddybazaar.business.service;

import com.daddybazaar.business.dto.BusinessDto;
import com.daddybazaar.business.dto.UpdateBusinessProfileRequest;
import com.daddybazaar.business.entity.BusinessEntity;
import com.daddybazaar.business.repository.BusinessRepository;
import com.daddybazaar.common.exception.ResourceNotFoundException;
import com.daddybazaar.tenant.TenantContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class BusinessService {

    private final BusinessRepository businessRepository;
    private final com.daddybazaar.website.repository.WebsiteSettingsRepository websiteSettingsRepository;

    private UUID getCurrentUserBusinessId() {
        Object principal = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof com.daddybazaar.security.UserPrincipal up) {
            return up.getBusinessId();
        }
        return TenantContext.getBusinessId();
    }

    @Transactional
    public void publishWebsite() {
        UUID businessId = getCurrentUserBusinessId();
        BusinessEntity business = businessRepository.findById(businessId)
                .orElseThrow(() -> ResourceNotFoundException.business(businessId.toString()));
        
        business.setStatus("PUBLISHED");
        businessRepository.save(business);

        websiteSettingsRepository.findByBusinessId(businessId).ifPresent(settings -> {
            settings.setPublishedAt(java.time.Instant.now());
            websiteSettingsRepository.save(settings);
        });
    }

    @Transactional
    public void unpublishWebsite() {
        UUID businessId = getCurrentUserBusinessId();
        BusinessEntity business = businessRepository.findById(businessId)
                .orElseThrow(() -> ResourceNotFoundException.business(businessId.toString()));
        
        business.setStatus("DRAFT");
        businessRepository.save(business);

        websiteSettingsRepository.findByBusinessId(businessId).ifPresent(settings -> {
            settings.setPublishedAt(null);
            websiteSettingsRepository.save(settings);
        });
    }

    @Transactional(readOnly = true)
    public BusinessDto getCurrentBusiness() {
        UUID businessId = getCurrentUserBusinessId();
        BusinessEntity business = businessRepository.findById(businessId)
                .orElseThrow(() -> ResourceNotFoundException.business(businessId.toString()));
        return mapToDto(business);
    }

    @Transactional
    public BusinessDto updateProfile(UpdateBusinessProfileRequest req) {
        UUID businessId = getCurrentUserBusinessId();
        BusinessEntity business = businessRepository.findById(businessId)
                .orElseThrow(() -> ResourceNotFoundException.business(businessId.toString()));

        business.setName(req.getName());
        business.setBusinessCategory(req.getBusinessCategory());
        business.setDescription(req.getDescription());
        business.setTagline(req.getTagline());
        business.setPhone(req.getPhone());
        business.setWhatsapp(req.getWhatsapp());
        business.setEmail(req.getEmail());
        business.setAddress(req.getAddress());
        business.setCity(req.getCity());
        business.setState(req.getState());
        business.setCountry(req.getCountry());
        business.setPincode(req.getPincode());
        business.setGoogleMapsUrl(req.getGoogleMapsUrl());
        business.setInstagramUrl(req.getInstagramUrl());
        business.setFacebookUrl(req.getFacebookUrl());
        business.setYoutubeUrl(req.getYoutubeUrl());
        business.setXUrl(req.getXUrl());
        business.setLogoUrl(req.getLogoUrl());
        business.setBannerUrl(req.getBannerUrl());

        business = businessRepository.save(business);
        return mapToDto(business);
    }

    @Transactional(readOnly = true)
    public Page<BusinessDto> getAllBusinesses(Pageable pageable) {
        return businessRepository.findAllByOrderByCreatedAtDesc(pageable)
                .map(this::mapToDto);
    }

    private BusinessDto mapToDto(BusinessEntity entity) {
        return BusinessDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .slug(entity.getSlug())
                .description(entity.getDescription())
                .businessCategory(entity.getBusinessCategory())
                .phone(entity.getPhone())
                .whatsapp(entity.getWhatsapp())
                .email(entity.getEmail())
                .address(entity.getAddress())
                .city(entity.getCity())
                .state(entity.getState())
                .country(entity.getCountry())
                .pincode(entity.getPincode())
                .googleMapsUrl(entity.getGoogleMapsUrl())
                .instagramUrl(entity.getInstagramUrl())
                .facebookUrl(entity.getFacebookUrl())
                .youtubeUrl(entity.getYoutubeUrl())
                .xUrl(entity.getXUrl())
                .openingHours(entity.getOpeningHours())
                .logoUrl(entity.getLogoUrl())
                .bannerUrl(entity.getBannerUrl())
                .tagline(entity.getTagline())
                .status(entity.getStatus())
                .build();
    }
}
