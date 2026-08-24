package com.daddybazaar.website.service;

import com.daddybazaar.common.exception.ResourceNotFoundException;
import com.daddybazaar.tenant.TenantContext;
import com.daddybazaar.website.dto.UpdateWebsiteSettingsRequest;
import com.daddybazaar.website.dto.WebsiteSettingsDto;
import com.daddybazaar.website.entity.WebsiteSettingsEntity;
import com.daddybazaar.website.repository.WebsiteSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WebsiteSettingsService {

    private final WebsiteSettingsRepository websiteSettingsRepository;

    @Transactional(readOnly = true)
    public WebsiteSettingsDto getSettings() {
        UUID businessId = TenantContext.getBusinessId();
        WebsiteSettingsEntity entity = websiteSettingsRepository.findByBusinessId(businessId)
                .orElseThrow(() -> ResourceNotFoundException.websiteSettings(businessId.toString()));
        return mapToDto(entity);
    }

    @Transactional
    public WebsiteSettingsDto updateSettings(UpdateWebsiteSettingsRequest req) {
        UUID businessId = TenantContext.getBusinessId();
        WebsiteSettingsEntity entity = websiteSettingsRepository.findByBusinessId(businessId)
                .orElseThrow(() -> ResourceNotFoundException.websiteSettings(businessId.toString()));

        if (req.getTemplateId() != null) entity.setTemplateId(req.getTemplateId());
        if (req.getPrimaryColor() != null) entity.setPrimaryColor(req.getPrimaryColor());
        if (req.getSecondaryColor() != null) entity.setSecondaryColor(req.getSecondaryColor());
        if (req.getFontFamily() != null) entity.setFontFamily(req.getFontFamily());
        if (req.getSectionsConfig() != null) entity.setSectionsConfig(req.getSectionsConfig());
        if (req.getSeoTitle() != null) entity.setSeoTitle(req.getSeoTitle());
        if (req.getSeoDescription() != null) entity.setSeoDescription(req.getSeoDescription());
        if (req.getCustomCss() != null) entity.setCustomCss(req.getCustomCss());
        if (req.getFaviconUrl() != null) entity.setFaviconUrl(req.getFaviconUrl());

        entity = websiteSettingsRepository.save(entity);
        return mapToDto(entity);
    }

    private WebsiteSettingsDto mapToDto(WebsiteSettingsEntity entity) {
        return WebsiteSettingsDto.builder()
                .businessId(entity.getBusinessId())
                .templateId(entity.getTemplateId())
                .primaryColor(entity.getPrimaryColor())
                .secondaryColor(entity.getSecondaryColor())
                .fontFamily(entity.getFontFamily())
                .sectionsConfig(entity.getSectionsConfig())
                .seoTitle(entity.getSeoTitle())
                .seoDescription(entity.getSeoDescription())
                .customCss(entity.getCustomCss())
                .faviconUrl(entity.getFaviconUrl())
                .publishedAt(entity.getPublishedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
