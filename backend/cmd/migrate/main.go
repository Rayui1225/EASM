package main

import (
	"flag"
	"fmt"
	"log"
	"os"

	"easm-backend/pkg/config"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func main() {
	// Define command line flags
	up := flag.Bool("up", false, "Migrate the DB to the most recent version available")
	down := flag.Bool("down", false, "Roll back the version by 1")
	version := flag.Int("version", -1, "Migrate to a specific version")
	flag.Parse()

	if *up && *down {
		log.Fatal("Cannot specify both up and down")
	}

	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Create migrate instance
	migrationsPath := "file://./db/migrations"
	m, err := migrate.New(migrationsPath, cfg.GetDBConnectionString())
	if err != nil {
		log.Fatalf("Migration initialization failed: %v", err)
	}
	defer m.Close()

	if *up {
		if err := m.Up(); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Migration up failed: %v", err)
		}
		log.Println("Migration up successful")
	} else if *down {
		if err := m.Steps(-1); err != nil {
			log.Fatalf("Migration down failed: %v", err)
		}
		log.Println("Migration down successful")
	} else if *version >= 0 {
		currentVersion, dirty, _ := m.Version()
		if dirty {
			log.Fatalf("Database migration is in a dirty state. Please fix the problem manually")
		}

		if *version > int(currentVersion) {
			if err := m.Migrate(uint(*version)); err != nil && err != migrate.ErrNoChange {
				log.Fatalf("Migration to version %d failed: %v", *version, err)
			}
		} else if *version < int(currentVersion) {
			if err := m.Migrate(uint(*version)); err != nil && err != migrate.ErrNoChange {
				log.Fatalf("Downgrade to version %d failed: %v", *version, err)
			}
		}
		log.Printf("Migration to version %d successful", *version)
	} else {
		version, dirty, err := m.Version()
		if err != nil {
			if err == migrate.ErrNilVersion {
				log.Println("No migrations have been applied yet")
			} else {
				log.Fatalf("Failed to get migration version: %v", err)
			}
		} else {
			log.Printf("Current migration version: %d, dirty: %v", version, dirty)
		}
		fmt.Println("Use -up, -down, or -version=N to migrate")
		os.Exit(1)
	}
}
