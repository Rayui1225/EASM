-- Seed data for development environment
-- This file adds initial seed data for local development and testing

-- Insert demo organization
INSERT INTO organizations (id, name, created_at, updated_at)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Demo Organization', NOW(), NOW());

-- Insert admin user (password: admin123 - hashed properly in production)
INSERT INTO users (id, email, password_hash, name, organization_id, role, created_at, updated_at)
VALUES 
    ('22222222-2222-2222-2222-222222222222', 'admin@example.com', 
     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
     'Admin User', '11111111-1111-1111-1111-111111111111', 'admin', NOW(), NOW());

-- Insert sample assets for demo organization
INSERT INTO assets (id, organization_id, name, type, source, metadata, created_at, updated_at)
VALUES 
    ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 
     'example.com', 'domain', 'manual', 
     '{"notes": "Main corporate website"}', 
     NOW(), NOW()),
     
    ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 
     'api.example.com', 'subdomain', 'amass', 
     '{"discovered_at": "2023-01-15T10:30:00Z"}', 
     NOW(), NOW()),
     
    ('55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 
     '203.0.113.10', 'ip', 'manual', 
     '{"location": "AWS us-west-2"}', 
     NOW(), NOW());
