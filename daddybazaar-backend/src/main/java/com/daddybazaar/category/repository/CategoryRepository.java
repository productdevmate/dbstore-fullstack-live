package com.daddybazaar.category.repository;

import com.daddybazaar.category.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<CategoryEntity, UUID> {

    List<CategoryEntity> findByBusinessIdOrderByDisplayOrderAsc(UUID businessId);

    List<CategoryEntity> findByBusinessIdAndActiveOrderByDisplayOrderAsc(UUID businessId, boolean active);

    Optional<CategoryEntity> findByIdAndBusinessId(UUID id, UUID businessId);

    long countByBusinessId(UUID businessId);

    boolean existsByIdAndBusinessId(UUID id, UUID businessId);
}
