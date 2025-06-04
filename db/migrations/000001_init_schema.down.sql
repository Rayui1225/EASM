-- Revert initial schema for the EASM project
-- Migration: 000001_init_schema.down.sql

-- Drop all tables in reverse order of creation to handle dependencies
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS scan_jobs;
DROP TABLE IF EXISTS vulnerabilities;
DROP TABLE IF EXISTS assets;
DROP TABLE IF EXISTS organizations;

-- Drop the UUID extension
DROP EXTENSION IF EXISTS "uuid-ossp";
