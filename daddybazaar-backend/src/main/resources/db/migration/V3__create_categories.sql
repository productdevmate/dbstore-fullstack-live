-- V3: Create categories table
CREATE TABLE categories (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id     UUID         NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name            VARCHAR(150) NOT NULL,
    description     TEXT,
    image_url       TEXT,
    display_order   INTEGER      NOT NULL DEFAULT 0,
    is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_categories_business_id ON categories(business_id);
CREATE INDEX idx_categories_active      ON categories(business_id, is_active);
