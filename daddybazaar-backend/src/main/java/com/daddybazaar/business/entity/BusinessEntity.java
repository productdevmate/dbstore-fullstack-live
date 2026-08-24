package com.daddybazaar.business.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "businesses")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusinessEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "owner_id", nullable = false)
    private UUID ownerId;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "business_category", length = 100)
    private String businessCategory;

    @Column(length = 20)
    private String phone;

    @Column(length = 20)
    private String whatsapp;

    @Column(length = 255)
    private String email;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    @Column(length = 100)
    @Builder.Default
    private String country = "India";

    @Column(length = 20)
    private String pincode;

    @Column(name = "google_maps_url", columnDefinition = "TEXT")
    private String googleMapsUrl;

    @Column(name = "instagram_url", columnDefinition = "TEXT")
    private String instagramUrl;

    @Column(name = "facebook_url", columnDefinition = "TEXT")
    private String facebookUrl;

    @Column(name = "youtube_url", columnDefinition = "TEXT")
    private String youtubeUrl;

    @Column(name = "x_url", columnDefinition = "TEXT")
    private String xUrl;

    @Column(name = "opening_hours", columnDefinition = "TEXT")
    private String openingHours;   // stored as JSON string

    @Column(name = "logo_url", columnDefinition = "TEXT")
    private String logoUrl;

    @Column(name = "banner_url", columnDefinition = "TEXT")
    private String bannerUrl;

    @Column(length = 300)
    private String tagline;

    @Column(nullable = false, length = 30)
    @Builder.Default
    private String status = "DRAFT";   // DRAFT | PUBLISHED | SUSPENDED | ARCHIVED

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
