package com.daddybazaar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class DaddyBazaarApplication {

    public static void main(String[] args) {
        SpringApplication.run(DaddyBazaarApplication.class, args);
    }
}
