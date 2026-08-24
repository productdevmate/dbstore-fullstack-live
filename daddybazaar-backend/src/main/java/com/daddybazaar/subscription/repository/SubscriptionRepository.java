package com.daddybazaar.subscription.repository;

import com.daddybazaar.subscription.entity.SubscriptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SubscriptionRepository extends JpaRepository<SubscriptionEntity, UUID> {

    Optional<SubscriptionEntity> findTopByBusinessIdOrderByCreatedAtDesc(UUID businessId);

    Optional<SubscriptionEntity> findByBusinessIdAndStatus(UUID businessId, String status);

    @Query("""
        SELECT s FROM SubscriptionEntity s
        WHERE s.status IN ('TRIAL', 'ACTIVE')
          AND s.endDate < :today
    """)
    List<SubscriptionEntity> findExpiredSubscriptions(@Param("today") LocalDate today);

    long countByStatus(String status);
}
