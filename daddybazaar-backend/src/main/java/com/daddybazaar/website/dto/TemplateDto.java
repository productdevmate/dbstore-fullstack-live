package com.daddybazaar.website.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class TemplateDto {
    private UUID id;
    private String name;
    private String code;
    private String description;
    private String previewImage;
    private String features;
    private boolean premium;
}
