-- V4: Create products table
CREATE TABLE products (
    id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id     UUID          NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    category_id     UUID          REFERENCES categories(id) ON DELETE SET NULL,
    name            VARCHAR(200)  NOT NULL,
    description     TEXT,
    price           NUMERIC(12,2),
    discount_price  NUMERIC(12,2),
    image_url       TEXT,
    sku             VARCHAR(100),
    product_type    VARCHAR(20)   NOT NULL DEFAULT 'PRODUCT',  -- PRODUCT | SERVICE
    is_featured     BOOLEAN       NOT NULL DEFAULT FALSE,
    is_available    BOOLEAN       NOT NULL DEFAULT TRUE,
    display_order   INTEGER       NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_business_id  ON products(business_id);
CREATE INDEX idx_products_category_id  ON products(category_id);
CREATE INDEX idx_products_featured     ON products(business_id, is_featured);
CREATE INDEX idx_products_available    ON products(business_id, is_available);
CREATE INDEX idx_products_order        ON products(business_id, display_order);
