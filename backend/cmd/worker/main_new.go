package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"easm-backend/internal/worker"
)

func main() {
	log.Println("Starting EASM Worker...")

	// Create new worker instance
	w, err := worker.NewWorker()
	if err != nil {
		log.Fatalf("Failed to create worker: %v", err)
	}

	// Register all task handlers
	if err := w.RegisterTasks(); err != nil {
		log.Fatalf("Failed to register tasks: %v", err)
	}

	// Start the worker
	if err := w.Start(); err != nil {
		log.Fatalf("Failed to start worker: %v", err)
	}

	// Wait for interrupt signal to gracefully shutdown
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	log.Println("Worker is running. Press Ctrl+C to stop...")
	<-sigChan

	// Gracefully stop the worker
	log.Println("Shutting down worker...")
	if err := w.Stop(); err != nil {
		log.Printf("Error stopping worker: %v", err)
	}

	log.Println("Worker stopped successfully")
}
