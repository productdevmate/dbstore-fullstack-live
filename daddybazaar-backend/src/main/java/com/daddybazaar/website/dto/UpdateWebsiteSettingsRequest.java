package com.daddybazaar.website.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;

@Data
public class UpdateWebsiteSettingsRequest {

    private UUID templateId;

    @Pattern(regexp = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", message = "Primary color must be a valid hex code")
    private String primaryColor;

    @Pattern(regexp = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", message = "Secondary color must be a valid hex code")
    private String secondaryColor;

    @Size(max = 100, message = "Font family must not exceed 100 characters")
    private String fontFamily;

    private String sectionsConfig;

    @Size(max = 255, message = "SEO Title must not exceed 255 characters")
    private String seoTitle;

    private String seoDescription;

    private String customCss;

    private String faviconUrl;
}
