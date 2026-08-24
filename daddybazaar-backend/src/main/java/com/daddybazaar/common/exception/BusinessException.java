package com.daddybazaar.common.exception;

import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {
    private final String errorCode;

    public BusinessException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public static BusinessException slugUnavailable(String slug) {
        return new BusinessException(
                "The slug '" + slug + "' is already taken. Please choose a different one.",
                "SLUG_UNAVAILABLE"
        );
    }

    public static BusinessException websiteNotPublished() {
        return new BusinessException(
                "Website is not published yet.",
                "WEBSITE_NOT_PUBLISHED"
        );
    }

    public static BusinessException subscriptionExpired() {
        return new BusinessException(
                "Your subscription has expired. Please upgrade to continue.",
                "SUBSCRIPTION_EXPIRED"
        );
    }

    public static BusinessException emailAlreadyExists(String email) {
        return new BusinessException(
                "An account with email '" + email + "' already exists.",
                "EMAIL_ALREADY_EXISTS"
        );
    }

    public static BusinessException mobileAlreadyExists(String mobile) {
        return new BusinessException(
                "An account with mobile number '" + mobile + "' already exists.",
                "MOBILE_ALREADY_EXISTS"
        );
    }
}
