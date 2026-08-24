-- V1: Create users table
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_name      VARCHAR(100) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    mobile          VARCHAR(20)  NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    role            VARCHAR(30)  NOT NULL DEFAULT 'OWNER',
    is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
    email_verified  BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_users_email  ON users(email);
CREATE UNIQUE INDEX idx_users_mobile ON users(mobile);
CREATE INDEX        idx_users_role   ON users(role);
