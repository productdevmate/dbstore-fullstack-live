package com.daddybazaar.tenant;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Optional;

/**
 * Spring MVC HandlerInterceptor that resolves the tenant from the
 * Host header on every incoming request.
 *
 * If a valid tenant is found, it is stored in TenantContext (ThreadLocal)
 * for the duration of the request.
 *
 * TenantContext is ALWAYS cleared in afterCompletion to prevent
 * thread-pool leakage.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class TenantInterceptor implements HandlerInterceptor {

    private final TenantResolver tenantResolver;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) {
        String host = request.getHeader("Host");
        Optional<TenantContext.BusinessContext> ctx = tenantResolver.resolve(host);
        ctx.ifPresent(c -> {
            log.debug("Tenant resolved: slug={}, businessId={}", c.getSlug(), c.getBusinessId());
            TenantContext.set(c);
        });
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response,
                                Object handler,
                                Exception ex) {
        TenantContext.clear();
    }
}
