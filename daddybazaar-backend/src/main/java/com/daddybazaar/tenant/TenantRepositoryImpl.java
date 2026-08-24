package com.daddybazaar.tenant;

import com.daddybazaar.business.entity.BusinessEntity;
import com.daddybazaar.tenant.TenantContext.BusinessContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import java.util.Optional;
import java.util.UUID;

/**
 * Lightweight JPA-based tenant lookup using a projection query.
 * Queries the businesses table directly for slug-based tenant resolution.
 */
@Repository
@RequiredArgsConstructor
public class TenantRepositoryImpl {

    private final EntityManager em;

    public Optional<BusinessContext> findContextBySlug(String slug) {
        try {
            Object[] row = (Object[]) em.createQuery(
                    "SELECT b.id, b.slug, b.name, b.status FROM BusinessEntity b WHERE b.slug = :slug")
                    .setParameter("slug", slug)
                    .getSingleResult();

            BusinessContext ctx = new BusinessContext(
                    (UUID) row[0],
                    (String) row[1],
                    (String) row[2],
                    (String) row[3]
            );
            return Optional.of(ctx);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }
}
