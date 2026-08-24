package com.daddybazaar.business.repository;

import com.daddybazaar.business.entity.BusinessEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface BusinessRepository extends JpaRepository<BusinessEntity, UUID> {

    Optional<BusinessEntity> findBySlug(String slug);

    Optional<BusinessEntity> findByOwnerId(UUID ownerId);

    boolean existsBySlug(String slug);

    boolean existsBySlugAndIdNot(String slug, UUID id);

    @Query("""
        SELECT b FROM BusinessEntity b
        WHERE b.slug = :slug AND b.status = 'PUBLISHED'
    """)
    Optional<BusinessEntity> findPublishedBySlug(@Param("slug") String slug);

    // Admin queries
    Page<BusinessEntity> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query("""
        SELECT b FROM BusinessEntity b
        WHERE LOWER(b.name) LIKE LOWER(CONCAT('%', :query, '%'))
           OR LOWER(b.slug) LIKE LOWER(CONCAT('%', :query, '%'))
           OR LOWER(b.email) LIKE LOWER(CONCAT('%', :query, '%'))
        ORDER BY b.createdAt DESC
    """)
    Page<BusinessEntity> searchBusinesses(@Param("query") String query, Pageable pageable);

    long countByStatus(String status);

    @Query(value = "SELECT COUNT(*) FROM businesses WHERE DATE(created_at) = CURRENT_DATE", nativeQuery = true)
    long countRegisteredToday();
}
