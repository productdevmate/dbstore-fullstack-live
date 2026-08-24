package com.daddybazaar.subscription.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "plans")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PlanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "price_monthly", nullable = false, precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal priceMonthly = BigDecimal.ZERO;

    @Column(name = "price_yearly", nullable = false, precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal priceYearly = BigDecimal.ZERO;

    @Column(name = "max_products")
    @Builder.Default
    private int maxProducts = 10;

    @Column(name = "max_images")
    @Builder.Default
    private int maxImages = 20;

    @Column(name = "has_analytics")
    @Builder.Default
    private boolean hasAnalytics = false;

    @Column(name = "has_custom_domain")
    @Builder.Default
    private boolean hasCustomDomain = false;

    @Column(name = "is_active")
    @Builder.Default
    private boolean active = true;

    @Column(name = "sort_order")
    @Builder.Default
    private int sortOrder = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();
}
