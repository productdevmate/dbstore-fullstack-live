package com.daddybazaar.subscription.controller;

import com.daddybazaar.common.response.ApiResponse;
import com.daddybazaar.subscription.dto.SubscriptionDto;
import com.daddybazaar.subscription.dto.UpgradeSubscriptionRequest;
import com.daddybazaar.subscription.service.SubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/subscription")
@RequiredArgsConstructor
@Tag(name = "Subscription", description = "Vendor subscription and billing management")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @GetMapping
    @Operation(summary = "Get current subscription details")
    public ResponseEntity<ApiResponse<SubscriptionDto>> getCurrentSubscription() {
        return ResponseEntity.ok(ApiResponse.ok("Subscription retrieved", subscriptionService.getCurrentSubscription()));
    }

    @PostMapping("/upgrade")
    @Operation(summary = "Upgrade subscription plan")
    public ResponseEntity<ApiResponse<SubscriptionDto>> upgradeSubscription(
            @Valid @RequestBody UpgradeSubscriptionRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Subscription upgraded", subscriptionService.upgradeSubscription(request)));
    }
}
