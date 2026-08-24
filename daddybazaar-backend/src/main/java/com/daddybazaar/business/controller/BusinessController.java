package com.daddybazaar.business.controller;

import com.daddybazaar.business.dto.BusinessDto;
import com.daddybazaar.business.dto.UpdateBusinessProfileRequest;
import com.daddybazaar.business.service.BusinessService;
import com.daddybazaar.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/business")
@RequiredArgsConstructor
@Tag(name = "Business Profile", description = "Vendor dashboard business profile management")
public class BusinessController {

    private final BusinessService businessService;

    @GetMapping
    @Operation(summary = "Get current business profile")
    public ResponseEntity<ApiResponse<BusinessDto>> getProfile() {
        BusinessDto profile = businessService.getCurrentBusiness();
        return ResponseEntity.ok(ApiResponse.ok("Business profile retrieved", profile));
    }

    @PutMapping("/profile")
    @Operation(summary = "Update current business profile")
    public ResponseEntity<ApiResponse<BusinessDto>> updateProfile(
            @Valid @RequestBody UpdateBusinessProfileRequest request) {
        BusinessDto profile = businessService.updateProfile(request);
        return ResponseEntity.ok(ApiResponse.ok("Business profile updated successfully", profile));
    }
}
