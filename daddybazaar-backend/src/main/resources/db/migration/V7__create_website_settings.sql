-- V7: Create website_settings table
CREATE TABLE website_settings (
    id                  UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id         UUID         NOT NULL UNIQUE REFERENCES businesses(id) ON DELETE CASCADE,
    template_id         UUID         REFERENCES templates(id),
    primary_color       VARCHAR(20)  DEFAULT '#2563EB',
    secondary_color     VARCHAR(20)  DEFAULT '#1E40AF',
    font_family         VARCHAR(100) DEFAULT 'Inter',
    sections_config     TEXT,        -- JSON: ordered list of section codes + visibility
    seo_title           VARCHAR(255),
    seo_description     TEXT,
    custom_css          TEXT,
    favicon_url         TEXT,
    published_at        TIMESTAMPTZ,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_website_settings_business_id ON website_settings(business_id);
CREATE INDEX idx_website_settings_template_id ON website_settings(template_id);
