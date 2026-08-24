package com.daddybazaar.business.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class BusinessDto {
    private UUID id;
    private String name;
    private String slug;
    private String description;
    private String businessCategory;
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
    private String openingHours;
    private String logoUrl;
    private String bannerUrl;
    private String tagline;
    private String status;
}
