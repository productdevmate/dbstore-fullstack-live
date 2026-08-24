package com.daddybazaar.business.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateBusinessProfileRequest {

    @NotBlank(message = "Business name is required")
    @Size(min = 2, max = 200, message = "Business name must be between 2 and 200 characters")
    private String name;

    @NotBlank(message = "Business category is required")
    private String businessCategory;

    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @Size(max = 300, message = "Tagline must not exceed 300 characters")
    private String tagline;

    private String phone;
    private String whatsapp;
    private String email;
    private String address;
    private String city;
    private String state;
    private String country;
    private String pincode;

    private String googleMapsUrl;
    private String instagramUrl;
    private String facebookUrl;
    private String youtubeUrl;
    private String xUrl;

    private String logoUrl;
    private String bannerUrl;
}
