package com.daddybazaar.tenant;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * Projection entity used exclusively for tenant resolution queries.
 * Maps to the businesses table but exposes only tenant-identification fields.
 */
@Getter
@NoArgsConstructor
@Entity
@Table(name = "businesses")
public class TenantBusinessProjection {

    @Id
    private UUID id;
    private String slug;
    private String name;
    private String status;
}
