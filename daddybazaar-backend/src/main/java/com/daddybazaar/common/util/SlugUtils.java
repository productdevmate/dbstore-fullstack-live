package com.daddybazaar.common.util;

import java.text.Normalizer;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Utility for generating URL-safe, human-readable slugs from business names.
 *
 * Rules:
 *  - Lowercase
 *  - Normalize Unicode accents/diacritics → ASCII
 *  - Remove apostrophes, quotes (Ravi's → ravis)
 *  - Remove all non-alphanumeric characters
 *  - Trim and de-duplicate
 */
public final class SlugUtils {

    private static final Pattern NON_ASCII       = Pattern.compile("[^\\p{ASCII}]");
    private static final Pattern NON_ALPHANUMERIC = Pattern.compile("[^a-z0-9]");
    private static final Pattern MULTI_HYPHEN    = Pattern.compile("-{2,}");

    private SlugUtils() {}

    /**
     * Generate a base slug from a business name.
     *
     * Example:
     *   "Cake Square"    → "cakesquare"
     *   "Ravi's Shop"    → "ravishop"
     *   "ABC Toys & More"→ "abctoysmore"
     */
    public static String generate(String businessName) {
        if (businessName == null || businessName.isBlank()) {
            throw new IllegalArgumentException("Business name must not be blank");
        }
        String normalized = Normalizer.normalize(businessName, Normalizer.Form.NFD);
        String ascii = NON_ASCII.matcher(normalized).replaceAll("");
        String lower = ascii.toLowerCase().trim();
        // Remove apostrophes, hyphens before stripping non-alphanumeric
        String noSpecial = lower.replace("'", "").replace("'", "").replace("-", "");
        String slug = NON_ALPHANUMERIC.matcher(noSpecial).replaceAll("");
        return slug;
    }

    /**
     * Generate alternate slug suggestions when the base slug is taken.
     *
     * Attempts:
     *  1. {base}{city}
     *  2. {base}shop
     *  3. {base}official
     *  4. {base}store
     *  5. {base}online
     *  6. {base}1, {base}2, ...
     */
    public static List<String> generateAlternatives(String baseSlug, String city) {
        String normalizedCity = city != null ? generate(city) : "";
        return List.of(
                baseSlug + normalizedCity,
                baseSlug + "shop",
                baseSlug + "official",
                baseSlug + "store",
                baseSlug + "online",
                baseSlug + "1",
                baseSlug + "2",
                baseSlug + "3"
        ).stream().distinct().filter(s -> !s.equals(baseSlug)).toList();
    }

    /**
     * Validate a slug provided by the vendor.
     *
     * Must be 3–100 characters, alphanumeric only, no hyphens.
     */
    public static boolean isValid(String slug) {
        return slug != null
                && slug.length() >= 3
                && slug.length() <= 100
                && slug.matches("^[a-z0-9]+$");
    }
}
