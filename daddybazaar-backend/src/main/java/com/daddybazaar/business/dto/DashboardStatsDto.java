package com.daddybazaar.business.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardStatsDto {
    private long products;
    private long categories;
    private long pageViews;
    private long uniqueVisitors;
    private long inquiries;
}
