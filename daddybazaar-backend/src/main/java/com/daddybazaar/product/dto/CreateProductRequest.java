package com.daddybazaar.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class CreateProductRequest {
    private UUID categoryId;

    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 200, message = "Name must be between 2 and 200 characters")
    private String name;

    private String description;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private String imageUrl;
    private String sku;
    
    private String productType; // PRODUCT or SERVICE
    private Boolean featured;
    private Boolean available;
    private Integer displayOrder;
}
