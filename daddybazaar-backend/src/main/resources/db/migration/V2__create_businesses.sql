-- V2: Create businesses table
CREATE TABLE businesses (
    id                  UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id            UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name                VARCHAR(200) NOT NULL,
    slug                VARCHAR(100) NOT NULL,
    description         TEXT,
    business_category   VARCHAR(100),
    phone               VARCHAR(20),
    whatsapp            VARCHAR(20),
    email               VARCHAR(255),
    address             TEXT,
    city                VARCHAR(100),
    state               VARCHAR(100),
    country             VARCHAR(100) DEFAULT 'India',
    pincode             VARCHAR(20),
    google_maps_url     TEXT,
    instagram_url       TEXT,
    facebook_url        TEXT,
    youtube_url         TEXT,
    x_url               TEXT,
    opening_hours       TEXT,        -- JSON string for structured hours
    logo_url            TEXT,
    banner_url          TEXT,
    tagline             VARCHAR(300),
    status              VARCHAR(30)  NOT NULL DEFAULT 'DRAFT',
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- slug must be globally unique (it IS the subdomain)
CREATE UNIQUE INDEX idx_businesses_slug     ON businesses(slug);
CREATE INDEX        idx_businesses_owner_id ON businesses(owner_id);
CREATE INDEX        idx_businesses_status   ON businesses(status);
