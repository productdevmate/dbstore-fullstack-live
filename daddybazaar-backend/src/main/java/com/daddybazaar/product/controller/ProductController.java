package com.daddybazaar.product.controller;

import com.daddybazaar.common.response.ApiResponse;
import com.daddybazaar.product.dto.CreateProductRequest;
import com.daddybazaar.product.dto.ProductDto;
import com.daddybazaar.product.dto.UpdateProductRequest;
import com.daddybazaar.product.service.ProductService;
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
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Tag(name = "Product Management", description = "Vendor dashboard product management")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    @Operation(summary = "List all products for the current business")
    public ResponseEntity<ApiResponse<List<ProductDto>>> listProducts() {
        return ResponseEntity.ok(ApiResponse.ok("Products retrieved", productService.listProducts()));
    }

    @PostMapping
    @Operation(summary = "Create a new product")
    public ResponseEntity<ApiResponse<ProductDto>> createProduct(@Valid @RequestBody CreateProductRequest request) {
        ProductDto product = productService.createProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Product created successfully", product));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing product")
    public ResponseEntity<ApiResponse<ProductDto>> updateProduct(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateProductRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Product updated successfully", productService.updateProduct(id, request)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a product")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable UUID id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.ok("Product deleted successfully", null));
    }

    @PutMapping("/{id}/toggle-featured")
    @Operation(summary = "Toggle featured status of a product")
    public ResponseEntity<ApiResponse<ProductDto>> toggleFeatured(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.ok("Product featured status toggled", productService.toggleFeatured(id)));
    }
    
    @PutMapping("/{id}/toggle-available")
    @Operation(summary = "Toggle available status of a product")
    public ResponseEntity<ApiResponse<ProductDto>> toggleAvailable(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.ok("Product availability toggled", productService.toggleAvailable(id)));
    }
}
