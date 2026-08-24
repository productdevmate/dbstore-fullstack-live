package com.daddybazaar.subscription.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "subscriptions")
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SubscriptionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "business_id", nullable = false)
    private UUID businessId;

    @Column(name = "plan_id", nullable = false)
    private UUID planId;

    @Column(nullable = false, length = 30)
    @Builder.Default
    private String status = "TRIAL";  // TRIAL | ACTIVE | EXPIRED | SUSPENDED | CANCELLED

    @Column(name = "billing_cycle", length = 20)
    @Builder.Default
    private String billingCycle = "TRIAL";  // TRIAL | MONTHLY | YEARLY

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "trial_end_date")
    private LocalDate trialEndDate;

    @Column(name = "payment_provider", length = 50)
    private String paymentProvider;

    @Column(name = "external_sub_id", length = 255)
    private String externalSubId;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
