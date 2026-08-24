-- V14: Additional composite indexes for performance
CREATE INDEX idx_products_business_featured   ON products(business_id, is_featured, is_available);
CREATE INDEX idx_products_business_category   ON products(business_id, category_id, display_order);
CREATE INDEX idx_businesses_slug_status       ON businesses(slug, status);
CREATE INDEX idx_subscriptions_business_status ON subscriptions(business_id, status, end_date);
CREATE INDEX idx_analytics_daily              ON analytics_events(business_id, event_type, created_at);
