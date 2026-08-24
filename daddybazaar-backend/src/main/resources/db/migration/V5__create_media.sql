-- V5: Create media table
CREATE TABLE media (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id     UUID         NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    media_type      VARCHAR(30)  NOT NULL,  -- LOGO | BANNER | PRODUCT | GALLERY
    original_name   VARCHAR(255),
    object_key      VARCHAR(500) NOT NULL,  -- storage path / object key
    public_url      TEXT,
    mime_type       VARCHAR(100),
    size_bytes      BIGINT,
    width           INTEGER,
    height          INTEGER,
    alt_text        VARCHAR(255),
    display_order   INTEGER      NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_media_business_id ON media(business_id);
CREATE INDEX idx_media_type        ON media(business_id, media_type);
