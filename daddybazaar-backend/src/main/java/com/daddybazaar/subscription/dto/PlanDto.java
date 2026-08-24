package com.daddybazaar.subscription.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class PlanDto {
    private UUID id;
    private String name;
    private String code;
    private String description;
    private BigDecimal priceMonthly;
    private BigDecimal priceYearly;
    private int maxProducts;
    private int maxImages;
    private boolean hasAnalytics;
    private boolean hasCustomDomain;
}
