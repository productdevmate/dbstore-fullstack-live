package com.daddybazaar.auth.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private long expiresIn;
    private UUID userId;
    private UUID businessId;
    private String ownerName;
    private String email;
    private String role;
    private String businessName;
    private String slug;
    private String websiteUrl;
}
