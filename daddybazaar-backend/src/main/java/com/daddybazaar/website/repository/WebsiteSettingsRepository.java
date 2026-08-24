package com.daddybazaar.website.repository;

import com.daddybazaar.website.entity.WebsiteSettingsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface WebsiteSettingsRepository extends JpaRepository<WebsiteSettingsEntity, UUID> {
    Optional<WebsiteSettingsEntity> findByBusinessId(UUID businessId);
}
