package com.daddybazaar.auth.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Owner name is required")
    @Size(min = 2, max = 100, message = "Owner name must be between 2 and 100 characters")
    private String ownerName;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Please provide a valid 10-digit Indian mobile number")
    private String mobile;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 100, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank(message = "Business name is required")
    @Size(min = 2, max = 200, message = "Business name must be between 2 and 200 characters")
    private String businessName;

    @NotBlank(message = "Business category is required")
    private String businessCategory;

    // Optional fields
    private String whatsapp;
    private String address;
    private String city;
    private String state;
    private String country;
    private String pincode;
}
