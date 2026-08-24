package com.daddybazaar.business.controller;

import com.daddybazaar.business.dto.DashboardStatsDto;
import com.daddybazaar.business.service.DashboardService;
import com.daddybazaar.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Vendor dashboard statistics and analytics")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    @Operation(summary = "Get dashboard statistics")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getStats() {
        return ResponseEntity.ok(ApiResponse.ok("Dashboard stats retrieved", dashboardService.getDashboardStats()));
    }
}
