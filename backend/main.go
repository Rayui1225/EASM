package main

import (
	"log"
	"os"

	"easm-backend/cmd"
	"easm-backend/pkg/config"
	"easm-backend/pkg/db"
)

func main() { // Load configuration
	_, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
		os.Exit(1)
	}

	// Initialize database connection
	if err := db.Initialize(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
		os.Exit(1)
	}
	defer db.Close()

	// Call the server start function from the cmd package
	if err := cmd.Execute(); err != nil {
		log.Fatalf("Failed to start server: %v", err)
		os.Exit(1)
	}
}
