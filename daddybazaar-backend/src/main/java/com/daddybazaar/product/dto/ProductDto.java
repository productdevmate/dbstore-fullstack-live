package com.daddybazaar.product.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class ProductDto {
    private UUID id;
    private UUID categoryId;
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private String imageUrl;
    private String sku;
    private String productType;
    private boolean featured;
    private boolean available;
    private int displayOrder;
    private Instant createdAt;
    private Instant updatedAt;
}
