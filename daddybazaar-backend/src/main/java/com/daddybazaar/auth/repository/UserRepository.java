package com.daddybazaar.auth.repository;

import com.daddybazaar.auth.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByMobile(String mobile);

    /**
     * Load user with businessId populated via a left join to businesses.
     * Needed by CustomUserDetailsService to build UserPrincipal.
     */
    @Query("""
        SELECT u FROM UserEntity u
        LEFT JOIN BusinessEntity b ON b.ownerId = u.id
        WHERE u.id = :id
    """)
    Optional<UserEntity> findByIdWithBusiness(@Param("id") UUID id);

    @Query("""
        SELECT u FROM UserEntity u
        LEFT JOIN BusinessEntity b ON b.ownerId = u.id
        WHERE u.email = :email
    """)
    Optional<UserEntity> findByEmailWithBusiness(@Param("email") String email);
}
