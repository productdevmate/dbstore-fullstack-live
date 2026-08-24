-- V10: Create analytics_events table
CREATE TABLE analytics_events (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id     UUID         NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    event_type      VARCHAR(50)  NOT NULL,  -- PAGE_VIEW | PRODUCT_VIEW | PHONE_CLICK | WHATSAPP_CLICK | MAP_CLICK | SOCIAL_CLICK
    product_id      UUID,        -- optional, for PRODUCT_VIEW events
    referrer        TEXT,
    user_agent      TEXT,
    ip_hash         VARCHAR(64), -- hashed for privacy, not raw IP
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_analytics_business_id  ON analytics_events(business_id);
CREATE INDEX idx_analytics_event_type   ON analytics_events(business_id, event_type);
CREATE INDEX idx_analytics_created_at   ON analytics_events(business_id, created_at);
