package com.daddybazaar.category.service;

import com.daddybazaar.category.dto.CategoryDto;
import com.daddybazaar.category.dto.CreateCategoryRequest;
import com.daddybazaar.category.dto.UpdateCategoryRequest;
import com.daddybazaar.category.entity.CategoryEntity;
import com.daddybazaar.category.repository.CategoryRepository;
import com.daddybazaar.common.exception.ResourceNotFoundException;
import com.daddybazaar.tenant.TenantContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<CategoryDto> listCategories() {
        UUID businessId = TenantContext.getBusinessId();
        List<CategoryEntity> entities = categoryRepository.findByBusinessIdOrderByDisplayOrderAsc(businessId);
        return entities.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Transactional
    public CategoryDto createCategory(CreateCategoryRequest req) {
        UUID businessId = TenantContext.getBusinessId();

        CategoryEntity entity = CategoryEntity.builder()
                .businessId(businessId)
                .name(req.getName())
                .description(req.getDescription())
                .imageUrl(req.getImageUrl())
                .displayOrder(req.getDisplayOrder() != null ? req.getDisplayOrder() : 0)
                .active(req.getActive() != null ? req.getActive() : true)
                .build();

        entity = categoryRepository.save(entity);
        return mapToDto(entity);
    }

    @Transactional
    public CategoryDto updateCategory(UUID categoryId, UpdateCategoryRequest req) {
        CategoryEntity entity = getCategoryForTenant(categoryId);

        entity.setName(req.getName());
        entity.setDescription(req.getDescription());
        entity.setImageUrl(req.getImageUrl());
        if (req.getDisplayOrder() != null) {
            entity.setDisplayOrder(req.getDisplayOrder());
        }

        entity = categoryRepository.save(entity);
        return mapToDto(entity);
    }

    @Transactional
    public void deleteCategory(UUID categoryId) {
        CategoryEntity entity = getCategoryForTenant(categoryId);
        categoryRepository.delete(entity);
    }

    @Transactional
    public CategoryDto toggleActive(UUID categoryId) {
        CategoryEntity entity = getCategoryForTenant(categoryId);
        entity.setActive(!entity.isActive());
        entity = categoryRepository.save(entity);
        return mapToDto(entity);
    }

    private CategoryEntity getCategoryForTenant(UUID categoryId) {
        UUID businessId = TenantContext.getBusinessId();
        return categoryRepository.findByIdAndBusinessId(categoryId, businessId)
                .orElseThrow(() -> ResourceNotFoundException.category(categoryId.toString()));
    }

    private CategoryDto mapToDto(CategoryEntity entity) {
        return CategoryDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .imageUrl(entity.getImageUrl())
                .displayOrder(entity.getDisplayOrder())
                .active(entity.isActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
