-- V9: Create subscriptions table
CREATE TABLE subscriptions (
    id                  UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id         UUID         NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    plan_id             UUID         NOT NULL REFERENCES plans(id),
    status              VARCHAR(30)  NOT NULL DEFAULT 'TRIAL',  -- TRIAL | ACTIVE | EXPIRED | SUSPENDED | CANCELLED
    billing_cycle       VARCHAR(20)  DEFAULT 'MONTHLY',          -- MONTHLY | YEARLY | TRIAL
    start_date          DATE         NOT NULL,
    end_date            DATE         NOT NULL,
    trial_end_date      DATE,
    payment_provider    VARCHAR(50),   -- razorpay | stripe | manual
    external_sub_id     VARCHAR(255),  -- provider subscription ID
    created_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_business_id ON subscriptions(business_id);
CREATE INDEX idx_subscriptions_status      ON subscriptions(status);
CREATE INDEX idx_subscriptions_end_date    ON subscriptions(end_date);
