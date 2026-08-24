-- V13: Seed default subscription plans
INSERT INTO plans (id, name, code, description, price_monthly, price_yearly, max_products, max_images, has_analytics, has_custom_domain, is_active, sort_order)
VALUES
(
    gen_random_uuid(),
    'Free Trial',
    'FREE',
    '14-day free trial. Up to 10 products, 3 templates, basic features.',
    0, 0, 10, 20, FALSE, FALSE, TRUE, 1
),
(
    gen_random_uuid(),
    'Starter',
    'STARTER',
    'Perfect for small businesses. Up to 50 products, analytics included.',
    299, 2990, 50, 100, TRUE, FALSE, TRUE, 2
),
(
    gen_random_uuid(),
    'Business',
    'BUSINESS',
    'For growing businesses. Up to 200 products, custom domain, priority support.',
    699, 6990, 200, 500, TRUE, TRUE, TRUE, 3
),
(
    gen_random_uuid(),
    'Pro',
    'PRO',
    'Unlimited everything. Advanced analytics, white-label, dedicated support.',
    1499, 14990, 9999, 9999, TRUE, TRUE, TRUE, 4
);
