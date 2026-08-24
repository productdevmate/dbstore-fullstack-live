package com.daddybazaar.website.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "website_settings")
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class WebsiteSettingsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "business_id", nullable = false, unique = true)
    private UUID businessId;

    @Column(name = "template_id")
    private UUID templateId;

    @Column(name = "primary_color", length = 20)
    @Builder.Default
    private String primaryColor = "#2563EB";

    @Column(name = "secondary_color", length = 20)
    @Builder.Default
    private String secondaryColor = "#1E40AF";

    @Column(name = "font_family", length = 100)
    @Builder.Default
    private String fontFamily = "Inter";

    @Column(name = "sections_config", columnDefinition = "TEXT")
    private String sectionsConfig;  // JSON array

    @Column(name = "seo_title", length = 255)
    private String seoTitle;

    @Column(name = "seo_description", columnDefinition = "TEXT")
    private String seoDescription;

    @Column(name = "custom_css", columnDefinition = "TEXT")
    private String customCss;

    @Column(name = "favicon_url", columnDefinition = "TEXT")
    private String faviconUrl;

    @Column(name = "published_at")
    private Instant publishedAt;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
