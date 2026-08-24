package com.daddybazaar.auth.controller;

import com.daddybazaar.auth.dto.AuthResponse;
import com.daddybazaar.auth.dto.LoginRequest;
import com.daddybazaar.auth.dto.RegisterRequest;
import com.daddybazaar.auth.dto.ChangePasswordRequest;
import com.daddybazaar.auth.service.AuthService;
import com.daddybazaar.common.response.ApiResponse;
import com.daddybazaar.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Vendor registration and login")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register a new vendor account + business")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Registration successful. Welcome to DaddyBazaar!", response));
    }

    @PostMapping("/login")
    @Operation(summary = "Login and receive JWT tokens")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.ok("Login successful", response));
    }

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user info")
    public ResponseEntity<ApiResponse<UserPrincipal>> me(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(ApiResponse.ok("Current user retrieved", principal));
    }

    @PutMapping("/password")
    @Operation(summary = "Change current user's password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody ChangePasswordRequest request) {
        authService.changePassword(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.ok("Password changed successfully", null));
    }
}
