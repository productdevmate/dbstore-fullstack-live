package com.daddybazaar.category.controller;

import com.daddybazaar.category.dto.CategoryDto;
import com.daddybazaar.category.dto.CreateCategoryRequest;
import com.daddybazaar.category.dto.UpdateCategoryRequest;
import com.daddybazaar.category.service.CategoryService;
import com.daddybazaar.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
@Tag(name = "Category Management", description = "Vendor dashboard category management")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    @Operation(summary = "List all categories for the current business")
    public ResponseEntity<ApiResponse<List<CategoryDto>>> listCategories() {
        return ResponseEntity.ok(ApiResponse.ok("Categories retrieved", categoryService.listCategories()));
    }

    @PostMapping
    @Operation(summary = "Create a new category")
    public ResponseEntity<ApiResponse<CategoryDto>> createCategory(@Valid @RequestBody CreateCategoryRequest request) {
        CategoryDto category = categoryService.createCategory(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Category created successfully", category));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing category")
    public ResponseEntity<ApiResponse<CategoryDto>> updateCategory(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateCategoryRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Category updated successfully", categoryService.updateCategory(id, request)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a category")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable UUID id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.ok("Category deleted successfully", null));
    }

    @PutMapping("/{id}/toggle")
    @Operation(summary = "Toggle active status of a category")
    public ResponseEntity<ApiResponse<CategoryDto>> toggleActive(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.ok("Category status toggled", categoryService.toggleActive(id)));
    }
}
