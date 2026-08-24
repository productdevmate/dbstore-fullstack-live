package com.daddybazaar.website.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "templates")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TemplateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "preview_image", columnDefinition = "TEXT")
    private String previewImage;

    @Column(columnDefinition = "TEXT")
    private String features;   // JSON array of section codes

    @Column(name = "is_active")
    @Builder.Default
    private boolean active = true;

    @Column(name = "is_premium")
    @Builder.Default
    private boolean premium = false;

    @Column(name = "sort_order")
    @Builder.Default
    private int sortOrder = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();
}
