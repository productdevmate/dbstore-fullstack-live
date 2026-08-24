package com.daddybazaar.tenant;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.Set;

/**
 * Resolves the tenant (business) from a raw hostname string.
 *
 * Examples:
 *   "cakesquare.daddybazaar.com" → extracts "cakesquare" → queries DB
 *   "localhost:8080"             → returns empty (not a tenant request)
 *   "daddybazaar.com"            → returns empty (root domain)
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class TenantResolver {

    @Value("${app.domain:daddybazaar.com}")
    private String appDomain;

    private final TenantRepositoryImpl tenantRepository;

    // Subdomains reserved for platform use — never treated as vendor slugs
    private static final Set<String> RESERVED = Set.of("www", "api", "admin", "app", "mail", "ftp", "cdn");

    /**
     * Attempt to resolve tenant context from a Host header value.
     * Returns empty Optional for non-tenant requests.
     */
    public Optional<TenantContext.BusinessContext> resolve(String host) {
        if (host == null || host.isBlank()) {
            return Optional.empty();
        }

        // Strip port if present  (e.g. "cakesquare.daddybazaar.com:8080")
        String hostname = host.split(":")[0].toLowerCase().trim();

        // Must end with ".<appDomain>"
        String suffix = "." + appDomain;
        if (!hostname.endsWith(suffix)) {
            return Optional.empty();
        }

        String slug = hostname.substring(0, hostname.length() - suffix.length());

        if (slug.isBlank() || RESERVED.contains(slug)) {
            return Optional.empty();
        }

        log.debug("TenantResolver: resolved slug='{}' from host='{}'", slug, host);
        return tenantRepository.findContextBySlug(slug);
    }
}
