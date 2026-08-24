-- V12: Seed default templates
INSERT INTO templates (id, name, code, description, preview_image, features, is_active, is_premium, sort_order)
VALUES
(
    gen_random_uuid(),
    'Classic',
    'TEMPLATE_1',
    'A clean, classic business website with hero section, product grid, and contact details.',
    '/assets/templates/template1-preview.png',
    '["HERO","ABOUT","CATEGORIES","PRODUCTS","GALLERY","CONTACT","FOOTER"]',
    TRUE,
    FALSE,
    1
),
(
    gen_random_uuid(),
    'Modern Dark',
    'TEMPLATE_2',
    'A bold dark-themed website ideal for trendy local businesses and salons.',
    '/assets/templates/template2-preview.png',
    '["HERO","FEATURED_PRODUCTS","PRODUCTS","ABOUT","GALLERY","OPENING_HOURS","CONTACT","FOOTER"]',
    TRUE,
    FALSE,
    2
),
(
    gen_random_uuid(),
    'Minimal Light',
    'TEMPLATE_3',
    'An elegant minimal white template, perfect for bakeries, boutiques, and service providers.',
    '/assets/templates/template3-preview.png',
    '["HERO","CATEGORIES","PRODUCTS","ABOUT","BUSINESS_INFO","SOCIAL_LINKS","CONTACT","FOOTER"]',
    TRUE,
    FALSE,
    3
);
