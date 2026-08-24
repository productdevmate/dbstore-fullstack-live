package com.daddybazaar.subscription.controller;

import com.daddybazaar.common.response.ApiResponse;
import com.daddybazaar.subscription.dto.PlanDto;
import com.daddybazaar.subscription.service.PlanService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/plans")
@RequiredArgsConstructor
@Tag(name = "Plans", description = "Available subscription plans")
public class PlanController {

    private final PlanService planService;

    @GetMapping
    @Operation(summary = "List all active subscription plans")
    public ResponseEntity<ApiResponse<List<PlanDto>>> listPlans() {
        return ResponseEntity.ok(ApiResponse.ok("Plans retrieved", planService.listActivePlans()));
    }
}
