package com.daddybazaar.auth.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "owner_name", nullable = false, length = 100)
    private String ownerName;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, unique = true, length = 20)
    private String mobile;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(nullable = false, length = 30)
    @Builder.Default
    private String role = "OWNER";

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private boolean active = true;

    @Column(name = "email_verified", nullable = false)
    @Builder.Default
    private boolean emailVerified = false;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    /**
     * Convenience method: returns this user's primary business_id.
     * Resolved via a join to businesses table in the service layer, not stored here
     * (to support future multi-business ownership).
     * This transient field is populated by UserRepository projection.
     */
    @Transient
    private UUID businessId;
}
