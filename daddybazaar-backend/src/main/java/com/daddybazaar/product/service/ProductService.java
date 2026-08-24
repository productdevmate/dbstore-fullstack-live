package com.daddybazaar.product.service;

import com.daddybazaar.common.exception.ResourceNotFoundException;
import com.daddybazaar.product.dto.CreateProductRequest;
import com.daddybazaar.product.dto.ProductDto;
import com.daddybazaar.product.dto.UpdateProductRequest;
import com.daddybazaar.product.entity.ProductEntity;
import com.daddybazaar.product.repository.ProductRepository;
import com.daddybazaar.tenant.TenantContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<ProductDto> listProducts() {
        UUID businessId = TenantContext.getBusinessId();
        List<ProductEntity> entities = productRepository.findByBusinessIdOrderByDisplayOrderAsc(businessId);
        return entities.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Transactional
    public ProductDto createProduct(CreateProductRequest req) {
        UUID businessId = TenantContext.getBusinessId();

        ProductEntity entity = ProductEntity.builder()
                .businessId(businessId)
                .categoryId(req.getCategoryId())
                .name(req.getName())
                .description(req.getDescription())
                .price(req.getPrice())
                .discountPrice(req.getDiscountPrice())
                .imageUrl(req.getImageUrl())
                .sku(req.getSku())
                .productType(req.getProductType() != null ? req.getProductType() : "PRODUCT")
                .featured(req.getFeatured() != null ? req.getFeatured() : false)
                .available(req.getAvailable() != null ? req.getAvailable() : true)
                .displayOrder(req.getDisplayOrder() != null ? req.getDisplayOrder() : 0)
                .build();

        entity = productRepository.save(entity);
        return mapToDto(entity);
    }

    @Transactional
    public ProductDto updateProduct(UUID productId, UpdateProductRequest req) {
        ProductEntity entity = getProductForTenant(productId);

        entity.setCategoryId(req.getCategoryId());
        entity.setName(req.getName());
        entity.setDescription(req.getDescription());
        entity.setPrice(req.getPrice());
        entity.setDiscountPrice(req.getDiscountPrice());
        entity.setImageUrl(req.getImageUrl());
        entity.setSku(req.getSku());
        
        if (req.getProductType() != null) {
            entity.setProductType(req.getProductType());
        }
        if (req.getDisplayOrder() != null) {
            entity.setDisplayOrder(req.getDisplayOrder());
        }

        entity = productRepository.save(entity);
        return mapToDto(entity);
    }

    @Transactional
    public void deleteProduct(UUID productId) {
        ProductEntity entity = getProductForTenant(productId);
        productRepository.delete(entity);
    }

    @Transactional
    public ProductDto toggleFeatured(UUID productId) {
        ProductEntity entity = getProductForTenant(productId);
        entity.setFeatured(!entity.isFeatured());
        entity = productRepository.save(entity);
        return mapToDto(entity);
    }
    
    @Transactional
    public ProductDto toggleAvailable(UUID productId) {
        ProductEntity entity = getProductForTenant(productId);
        entity.setAvailable(!entity.isAvailable());
        entity = productRepository.save(entity);
        return mapToDto(entity);
    }

    private ProductEntity getProductForTenant(UUID productId) {
        UUID businessId = TenantContext.getBusinessId();
        return productRepository.findByIdAndBusinessId(productId, businessId)
                .orElseThrow(() -> ResourceNotFoundException.product(productId.toString()));
    }

    private ProductDto mapToDto(ProductEntity entity) {
        return ProductDto.builder()
                .id(entity.getId())
                .categoryId(entity.getCategoryId())
                .name(entity.getName())
                .description(entity.getDescription())
                .price(entity.getPrice())
                .discountPrice(entity.getDiscountPrice())
                .imageUrl(entity.getImageUrl())
                .sku(entity.getSku())
                .productType(entity.getProductType())
                .featured(entity.isFeatured())
                .available(entity.isAvailable())
                .displayOrder(entity.getDisplayOrder())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
