package com.daddybazaar.website.controller;

import com.daddybazaar.business.entity.BusinessEntity;
import com.daddybazaar.business.repository.BusinessRepository;
import com.daddybazaar.category.entity.CategoryEntity;
import com.daddybazaar.category.repository.CategoryRepository;
import com.daddybazaar.common.exception.ResourceNotFoundException;
import com.daddybazaar.common.exception.TenantAccessDeniedException;
import com.daddybazaar.common.response.ApiResponse;
import com.daddybazaar.product.entity.ProductEntity;
import com.daddybazaar.product.repository.ProductRepository;
import com.daddybazaar.tenant.TenantContext;
import com.daddybazaar.website.entity.TemplateEntity;
import com.daddybazaar.website.entity.WebsiteSettingsEntity;
import com.daddybazaar.website.repository.TemplateRepository;
import com.daddybazaar.website.repository.WebsiteSettingsRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Public website API — resolves tenant from TenantContext (set by TenantInterceptor).
 * No authentication required. Tenant determined ONLY from hostname.
 */
@RestController
@RequestMapping("/api/v1/public")
@RequiredArgsConstructor
@Tag(name = "Public Website", description = "Public-facing endpoints resolved from subdomain hostname")
public class PublicWebsiteController {

    private final BusinessRepository businessRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final WebsiteSettingsRepository websiteSettingsRepository;
    private final TemplateRepository templateRepository;

    /**
     * Returns the full website payload for the resolved tenant.
     * Used by the React public site renderer on initial load.
     */
    @GetMapping("/business")
    @Operation(summary = "Get full business data for the public website (tenant from hostname)")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPublicBusiness() {
        UUID businessId = resolvedBusinessId();

        BusinessEntity business = businessRepository.findById(businessId)
                .filter(b -> "PUBLISHED".equals(b.getStatus()))
                .orElseThrow(() -> ResourceNotFoundException.business(TenantContext.getSlug()));

        WebsiteSettingsEntity settings = websiteSettingsRepository
                .findByBusinessId(businessId).orElse(null);

        TemplateEntity template = settings != null && settings.getTemplateId() != null
                ? templateRepository.findById(settings.getTemplateId()).orElse(null)
                : null;

        List<CategoryEntity> categories = categoryRepository
                .findByBusinessIdAndActiveOrderByDisplayOrderAsc(businessId, true);

        List<ProductEntity> products = productRepository
                .findByBusinessIdAndAvailableOrderByDisplayOrderAsc(businessId, true);

        List<ProductEntity> featured = productRepository
                .findByBusinessIdAndFeaturedAndAvailableOrderByDisplayOrderAsc(businessId, true, true);

        Map<String, Object> payload = Map.of(
                "business",    business,
                "settings",    settings != null ? settings : Map.of(),
                "template",    template != null ? template : Map.of(),
                "categories",  categories,
                "products",    products,
                "featured",    featured
        );

        return ResponseEntity.ok(ApiResponse.ok("Business data retrieved", payload));
    }

    @GetMapping("/products")
    @Operation(summary = "Get products for the public website")
    public ResponseEntity<ApiResponse<List<ProductEntity>>> getPublicProducts() {
        UUID businessId = resolvedBusinessId();
        List<ProductEntity> products = productRepository
                .findByBusinessIdAndAvailableOrderByDisplayOrderAsc(businessId, true);
        return ResponseEntity.ok(ApiResponse.ok("Products retrieved", products));
    }

    @GetMapping("/categories")
    @Operation(summary = "Get categories for the public website")
    public ResponseEntity<ApiResponse<List<CategoryEntity>>> getPublicCategories() {
        UUID businessId = resolvedBusinessId();
        List<CategoryEntity> cats = categoryRepository
                .findByBusinessIdAndActiveOrderByDisplayOrderAsc(businessId, true);
        return ResponseEntity.ok(ApiResponse.ok("Categories retrieved", cats));
    }

    // ===== Private =====

    private UUID resolvedBusinessId() {
        if (!TenantContext.isResolved()) {
            throw TenantAccessDeniedException.noTenantResolved();
        }
        return TenantContext.getBusinessId();
    }
}
