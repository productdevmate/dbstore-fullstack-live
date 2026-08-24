package com.daddybazaar.website.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class WebsiteSettingsDto {
    private UUID businessId;
    private UUID templateId;
    private String primaryColor;
    private String secondaryColor;
    private String fontFamily;
    private String sectionsConfig;
    private String seoTitle;
    private String seoDescription;
    private String customCss;
    private String faviconUrl;
    private Instant publishedAt;
    private Instant updatedAt;
}
