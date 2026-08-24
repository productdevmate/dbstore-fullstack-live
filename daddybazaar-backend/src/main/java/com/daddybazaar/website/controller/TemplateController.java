package com.daddybazaar.website.controller;

import com.daddybazaar.common.response.ApiResponse;
import com.daddybazaar.website.dto.TemplateDto;
import com.daddybazaar.website.service.TemplateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/templates")
@RequiredArgsConstructor
@Tag(name = "Templates", description = "Retrieve available website templates")
public class TemplateController {

    private final TemplateService templateService;

    @GetMapping
    @Operation(summary = "List all active templates")
    public ResponseEntity<ApiResponse<List<TemplateDto>>> listTemplates() {
        return ResponseEntity.ok(ApiResponse.ok("Templates retrieved", templateService.listActiveTemplates()));
    }
}
