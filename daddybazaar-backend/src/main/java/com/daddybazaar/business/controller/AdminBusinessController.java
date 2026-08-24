package com.daddybazaar.business.controller;

import com.daddybazaar.business.dto.BusinessDto;
import com.daddybazaar.business.service.BusinessService;
import com.daddybazaar.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/businesses")
@RequiredArgsConstructor
@Tag(name = "Admin Business", description = "Admin dashboard business management")
public class AdminBusinessController {

    private final BusinessService businessService;

    @GetMapping
    @Operation(summary = "Get all registered businesses (Admin only)")
    public ResponseEntity<ApiResponse<Page<BusinessDto>>> getAllBusinesses(Pageable pageable) {
        Page<BusinessDto> businesses = businessService.getAllBusinesses(pageable);
        return ResponseEntity.ok(ApiResponse.ok("Businesses retrieved successfully", businesses));
    }
}
