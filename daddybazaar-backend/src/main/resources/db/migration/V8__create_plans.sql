-- V8: Create subscription plans
CREATE TABLE plans (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) NOT NULL,
    code            VARCHAR(50)  NOT NULL,  -- FREE | STARTER | BUSINESS | PRO
    description     TEXT,
    price_monthly   NUMERIC(10,2) NOT NULL DEFAULT 0,
    price_yearly    NUMERIC(10,2) NOT NULL DEFAULT 0,
    max_products    INTEGER      NOT NULL DEFAULT 10,
    max_images      INTEGER      NOT NULL DEFAULT 20,
    has_analytics   BOOLEAN      NOT NULL DEFAULT FALSE,
    has_custom_domain BOOLEAN    NOT NULL DEFAULT FALSE,
    is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
    sort_order      INTEGER      NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_plans_code ON plans(code);
