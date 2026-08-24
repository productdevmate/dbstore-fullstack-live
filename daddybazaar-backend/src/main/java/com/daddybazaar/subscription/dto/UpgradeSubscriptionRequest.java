package com.daddybazaar.subscription.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class UpgradeSubscriptionRequest {
    
    @NotNull(message = "Plan ID is required")
    private UUID planId;
}
