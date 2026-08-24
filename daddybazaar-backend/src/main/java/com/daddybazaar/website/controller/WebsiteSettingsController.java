package com.daddybazaar.website.controller;

import com.daddybazaar.common.response.ApiResponse;
import com.daddybazaar.website.dto.UpdateWebsiteSettingsRequest;
import com.daddybazaar.website.dto.WebsiteSettingsDto;
import com.daddybazaar.website.service.WebsiteSettingsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/website/settings")
@RequiredArgsConstructor
@Tag(name = "Website Settings", description = "Vendor dashboard website builder settings")
public class WebsiteSettingsController {

    private final WebsiteSettingsService websiteSettingsService;
    private final com.daddybazaar.business.service.BusinessService businessService;

    @GetMapping
    @Operation(summary = "Get current website settings")
    public ResponseEntity<ApiResponse<WebsiteSettingsDto>> getSettings() {
        return ResponseEntity.ok(ApiResponse.ok("Settings retrieved", websiteSettingsService.getSettings()));
    }

    @PutMapping
    @Operation(summary = "Update website settings")
    public ResponseEntity<ApiResponse<WebsiteSettingsDto>> updateSettings(
            @Valid @RequestBody UpdateWebsiteSettingsRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Settings updated successfully", websiteSettingsService.updateSettings(request)));
    }

    @PostMapping("/publish")
    @Operation(summary = "Publish website")
    public ResponseEntity<ApiResponse<Void>> publishWebsite() {
        businessService.publishWebsite();
        return ResponseEntity.ok(ApiResponse.ok("Website published successfully", null));
    }

    @PostMapping("/unpublish")
    @Operation(summary = "Unpublish website")
    public ResponseEntity<ApiResponse<Void>> unpublishWebsite() {
        businessService.unpublishWebsite();
        return ResponseEntity.ok(ApiResponse.ok("Website unpublished successfully", null));
    }
}
