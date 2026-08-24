-- V6: Create website templates table
CREATE TABLE templates (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) NOT NULL,
    code            VARCHAR(50)  NOT NULL,  -- e.g. TEMPLATE_1
    description     TEXT,
    preview_image   TEXT,
    features        TEXT,        -- JSON array of supported section codes
    is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
    is_premium      BOOLEAN      NOT NULL DEFAULT FALSE,
    sort_order      INTEGER      NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_templates_code ON templates(code);
