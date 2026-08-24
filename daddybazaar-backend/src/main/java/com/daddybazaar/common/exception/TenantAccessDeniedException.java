package com.daddybazaar.common.exception;

public class TenantAccessDeniedException extends RuntimeException {
    public TenantAccessDeniedException(String message) {
        super(message);
    }

    public static TenantAccessDeniedException noTenantResolved() {
        return new TenantAccessDeniedException(
                "Could not resolve business from the request hostname."
        );
    }

    public static TenantAccessDeniedException businessSuspended() {
        return new TenantAccessDeniedException(
                "This business website is currently suspended."
        );
    }
}
