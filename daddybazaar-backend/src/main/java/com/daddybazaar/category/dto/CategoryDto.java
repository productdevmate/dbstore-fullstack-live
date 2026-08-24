package com.daddybazaar.category.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class CategoryDto {
    private UUID id;
    private String name;
    private String description;
    private String imageUrl;
    private int displayOrder;
    private boolean active;
    private Instant createdAt;
    private Instant updatedAt;
}
