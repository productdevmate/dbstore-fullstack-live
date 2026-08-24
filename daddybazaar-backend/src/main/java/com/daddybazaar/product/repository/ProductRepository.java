package com.daddybazaar.product.repository;

import com.daddybazaar.product.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<ProductEntity, UUID> {

    // Always scope queries to business_id (tenant isolation)
    Optional<ProductEntity> findByIdAndBusinessId(UUID id, UUID businessId);

    Page<ProductEntity> findByBusinessIdOrderByDisplayOrderAsc(UUID businessId, Pageable pageable);
    
    List<ProductEntity> findByBusinessIdOrderByDisplayOrderAsc(UUID businessId);

    List<ProductEntity> findByBusinessIdAndFeaturedAndAvailableOrderByDisplayOrderAsc(
            UUID businessId, boolean featured, boolean available);

    List<ProductEntity> findByBusinessIdAndCategoryIdAndAvailableOrderByDisplayOrderAsc(
            UUID businessId, UUID categoryId, boolean available);

    List<ProductEntity> findByBusinessIdAndAvailableOrderByDisplayOrderAsc(
            UUID businessId, boolean available);

    long countByBusinessId(UUID businessId);

    boolean existsByIdAndBusinessId(UUID id, UUID businessId);
}
