package com.daddybazaar.website.repository;

import com.daddybazaar.website.entity.TemplateEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TemplateRepository extends JpaRepository<TemplateEntity, UUID> {
    List<TemplateEntity> findByActiveOrderBySortOrderAsc(boolean active);
    Optional<TemplateEntity> findByCode(String code);
}
