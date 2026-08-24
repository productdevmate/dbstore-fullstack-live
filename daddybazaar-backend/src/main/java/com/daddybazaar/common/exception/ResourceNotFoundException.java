package com.daddybazaar.common.exception;

import lombok.Getter;

@Getter
public class ResourceNotFoundException extends RuntimeException {
    private final String errorCode;

    public ResourceNotFoundException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public static ResourceNotFoundException business(String slug) {
        return new ResourceNotFoundException("Business not found: " + slug, "BUSINESS_NOT_FOUND");
    }

    public static ResourceNotFoundException product(String id) {
        return new ResourceNotFoundException("Product not found: " + id, "PRODUCT_NOT_FOUND");
    }

    public static ResourceNotFoundException category(String id) {
        return new ResourceNotFoundException("Category not found: " + id, "CATEGORY_NOT_FOUND");
    }

    public static ResourceNotFoundException user(String id) {
        return new ResourceNotFoundException("User not found: " + id, "USER_NOT_FOUND");
    }

    public static ResourceNotFoundException subscription(String businessId) {
        return new ResourceNotFoundException("Subscription not found for business: " + businessId, "SUBSCRIPTION_NOT_FOUND");
    }

    public static ResourceNotFoundException plan(String id) {
        return new ResourceNotFoundException("Plan not found: " + id, "PLAN_NOT_FOUND");
    }

    public static ResourceNotFoundException websiteSettings(String businessId) {
        return new ResourceNotFoundException("Website settings not found for business: " + businessId, "WEBSITE_SETTINGS_NOT_FOUND");
    }
}
