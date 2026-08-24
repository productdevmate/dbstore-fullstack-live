package com.daddybazaar.category.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateCategoryRequest {
    @NotBlank(message = "Category name is required")
    @Size(min = 2, max = 150, message = "Name must be between 2 and 150 characters")
    private String name;

    private String description;
    private String imageUrl;
    private Integer displayOrder;
    private Boolean active;
}
