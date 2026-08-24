package com.daddybazaar.config;

import com.daddybazaar.auth.entity.UserEntity;
import com.daddybazaar.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataSeederConfig {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initDefaultUsers() {
        return args -> {
            log.info("Checking for default internal admin roles...");

            List<DefaultUser> defaultUsers = List.of(
                    new DefaultUser("Super Admin", "superadmin@daddybazaar.com", "9000000001", "Admin@123", "SUPER_ADMIN"),
                    new DefaultUser("Product Manager", "productmanager@daddybazaar.com", "9000000002", "Admin@123", "PRODUCT_MANAGER"),
                    new DefaultUser("Area Manager", "areamanager@daddybazaar.com", "9000000003", "Admin@123", "AREA_MANAGER"),
                    new DefaultUser("Product", "product@daddybazaar.com", "9000000004", "Admin@123", "PRODUCT"),
                    new DefaultUser("Product Associate", "productassociate@daddybazaar.com", "9000000005", "Admin@123", "PRODUCT_ASSOCIATE"),
                    new DefaultUser("Product Associate 2", "productassociate2@daddybazaar.com", "9000000006", "Admin@123", "PRODUCT_ASSOCIATE")
            );

            for (DefaultUser defUser : defaultUsers) {
                if (!userRepository.existsByEmail(defUser.email())) {
                    UserEntity user = UserEntity.builder()
                            .ownerName(defUser.name())
                            .email(defUser.email())
                            .mobile(defUser.mobile())
                            .passwordHash(passwordEncoder.encode(defUser.password()))
                            .role(defUser.role())
                            .active(true)
                            .emailVerified(true)
                            .build();
                    userRepository.save(user);
                    log.info("Seeded default user: {} with role: {}", defUser.email(), defUser.role());
                } else {
                    log.debug("Default user {} already exists, skipping.", defUser.email());
                }
            }
            log.info("Data seeding complete.");
        };
    }

    private record DefaultUser(String name, String email, String mobile, String password, String role) {}
}
