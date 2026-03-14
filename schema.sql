-- =====================================================
-- CLEAN OLD BROKEN CONSTRAINTS / POLICIES
-- =====================================================

ALTER TABLE IF EXISTS pdf_summaries
DROP CONSTRAINT IF EXISTS pdf_summaries_user_id_fkey;

DROP POLICY IF EXISTS "Allow full access users" ON users;
DROP POLICY IF EXISTS "Allow full access summaries" ON pdf_summaries;
DROP POLICY IF EXISTS "Allow full access payments" ON payments;

-- =====================================================
-- EXTENSION FOR UUID GENERATION
-- =====================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- USERS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    upload_count INTEGER DEFAULT 0,
    full_name VARCHAR(255),
    customer_id VARCHAR(255) UNIQUE,
    price_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'inactive',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users
ADD COLUMN IF NOT EXISTS upload_count INTEGER DEFAULT 0;

-- =====================================================
-- PDF SUMMARIES TABLE
-- user_id must be TEXT (Clerk user IDs)
-- =====================================================

CREATE TABLE IF NOT EXISTS pdf_summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id TEXT NOT NULL,

    title TEXT,
    file_name TEXT,
    original_file_url TEXT NOT NULL,
    summary_text TEXT NOT NULL,

    status VARCHAR(50) DEFAULT 'completed',

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE pdf_summaries
ALTER COLUMN user_id TYPE TEXT;

-- =====================================================
-- PAYMENTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    amount INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,

    stripe_payment_id VARCHAR(255) UNIQUE NOT NULL,
    price_id VARCHAR(255) NOT NULL,

    user_email VARCHAR(255) NOT NULL REFERENCES users(email),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS
-- =====================================================

DROP TRIGGER IF EXISTS update_users_updated_at ON users;

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


DROP TRIGGER IF EXISTS update_pdf_summaries_updated_at ON pdf_summaries;

CREATE TRIGGER update_pdf_summaries_updated_at
BEFORE UPDATE ON pdf_summaries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;

CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON payments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdf_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- DEVELOPMENT POLICIES (FULL ACCESS)
-- =====================================================

CREATE POLICY "Allow full access users"
ON users
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow full access summaries"
ON pdf_summaries
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow full access payments"
ON payments
FOR ALL
USING (true)
WITH CHECK (true);

-- =====================================================
-- OPTIONAL: ADD EXISTING USERS
-- =====================================================

INSERT INTO users (email, upload_count, status)
VALUES 
('atul_kumar.ug22@nsut.ac.in', 0, 'inactive'),
('bullgymx@gmail.com', 0, 'inactive')
ON CONFLICT (email) DO NOTHING;