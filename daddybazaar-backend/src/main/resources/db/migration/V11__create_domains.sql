-- V11: Create domains table (custom domain — future ready)
CREATE TABLE domains (
    id                  UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id         UUID         NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    domain              VARCHAR(255) NOT NULL,
    domain_type         VARCHAR(20)  NOT NULL DEFAULT 'SUBDOMAIN',  -- SUBDOMAIN | CUSTOM
    verification_status VARCHAR(30)  NOT NULL DEFAULT 'PENDING',    -- PENDING | VERIFIED | FAILED
    verification_token  VARCHAR(255),
    is_primary          BOOLEAN      NOT NULL DEFAULT FALSE,
    ssl_status          VARCHAR(30)  DEFAULT 'PENDING',
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_domains_domain      ON domains(domain);
CREATE INDEX        idx_domains_business_id ON domains(business_id);
