package com.daddybazaar.product.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "products")
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "business_id", nullable = false)
    private UUID businessId;

    @Column(name = "category_id")
    private UUID categoryId;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "discount_price", precision = 12, scale = 2)
    private BigDecimal discountPrice;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    @Column(length = 100)
    private String sku;

    @Column(name = "product_type", length = 20)
    @Builder.Default
    private String productType = "PRODUCT";  // PRODUCT | SERVICE

    @Column(name = "is_featured")
    @Builder.Default
    private boolean featured = false;

    @Column(name = "is_available")
    @Builder.Default
    private boolean available = true;

    @Column(name = "display_order")
    @Builder.Default
    private int displayOrder = 0;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
