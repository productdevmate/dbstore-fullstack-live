package com.daddybazaar.subscription.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class SubscriptionDto {
    private UUID id;
    private UUID businessId;
    private UUID planId;
    private String planName;
    private String planCode;
    private String status;
    private String billingCycle;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate trialEndDate;
}
