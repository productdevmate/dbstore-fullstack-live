package com.daddybazaar.tenant;

import com.daddybazaar.tenant.TenantContext.BusinessContext;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

/**
 * Lightweight repository used ONLY by the tenant resolution path.
 * Does NOT expose Business entity to avoid coupling.
 */
public interface TenantRepository extends Repository<TenantBusinessProjection, UUID> {

    @Query(value = """
            SELECT b
            FROM TenantBusinessProjection b
            WHERE b.slug = :slug
            """)
    Optional<TenantBusinessProjection> findContextBySlug(@Param("slug") String slug);
}
