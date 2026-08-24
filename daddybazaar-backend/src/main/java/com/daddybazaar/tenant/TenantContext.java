package com.daddybazaar.tenant;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

/**
 * Holds the resolved tenant (business) context for the current HTTP request.
 * Stored in a ThreadLocal — cleared after every request by TenantInterceptor.
 */
public final class TenantContext {

    private static final ThreadLocal<BusinessContext> CONTEXT = new ThreadLocal<>();

    private TenantContext() {}

    public static void set(BusinessContext ctx) {
        CONTEXT.set(ctx);
    }

    public static BusinessContext get() {
        return CONTEXT.get();
    }

    public static UUID getBusinessId() {
        BusinessContext ctx = CONTEXT.get();
        return ctx != null ? ctx.getBusinessId() : null;
    }

    public static String getSlug() {
        BusinessContext ctx = CONTEXT.get();
        return ctx != null ? ctx.getSlug() : null;
    }

    public static boolean isResolved() {
        return CONTEXT.get() != null;
    }

    public static void clear() {
        CONTEXT.remove();
    }

    @Getter
    @Setter
    public static class BusinessContext {
        private UUID businessId;
        private String slug;
        private String businessName;
        private String status;

        public BusinessContext(UUID businessId, String slug, String businessName, String status) {
            this.businessId = businessId;
            this.slug = slug;
            this.businessName = businessName;
            this.status = status;
        }
    }
}
