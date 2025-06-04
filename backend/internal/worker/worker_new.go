package worker

import (
	"context"
	"fmt"
	"log"

	"easm-backend/internal/shared"

	"github.com/RichardKnop/machinery/v2"
)

// Worker represents a task worker that processes scheduled tasks
type Worker struct {
	server    *machinery.Server
	worker    *machinery.Worker
	ctx       context.Context
	cancel    context.CancelFunc
	isRunning bool
}

// NewWorker creates a new worker instance
func NewWorker() (*Worker, error) {
	// Use shared configuration
	cnf := shared.GetMachineryConfig()

	// Create a new server instance
	server := machinery.NewServer(cnf, nil, nil, nil)

	// Create context for graceful shutdown
	ctx, cancel := context.WithCancel(context.Background())

	// Create worker instance
	worker := server.NewWorker("easm_worker", 10) // 10 concurrent workers

	return &Worker{
		server:    server,
		worker:    worker,
		ctx:       ctx,
		cancel:    cancel,
		isRunning: false,
	}, nil
}

// RegisterTasks registers all available task handlers
func (w *Worker) RegisterTasks() error {
	// Register task handlers using constant task names
	tasks := map[string]interface{}{
		TaskNames.ScanTarget:        w.scanTargetTask,
		TaskNames.VulnerabilityScan: w.vulnerabilityScanTask,
		TaskNames.AssetDiscovery:    w.assetDiscoveryTask,
		TaskNames.DNSEnumeration:    w.dnsEnumerationTask,
		TaskNames.PortScan:          w.portScanTask,
		TaskNames.CleanupOldResults: w.cleanupOldResultsTask,
	}

	return w.server.RegisterTasks(tasks)
}

// Start begins processing tasks from the queue
func (w *Worker) Start() error {
	if w.isRunning {
		return fmt.Errorf("worker is already running")
	}

	log.Println("Starting EASM worker...")
	w.isRunning = true
	// Start the worker with context for graceful shutdown
	go func() {
		errChan := make(chan error, 1)
		w.worker.LaunchAsync(errChan)

		select {
		case err := <-errChan:
			if err != nil {
				log.Printf("Worker error: %v", err)
			}
		case <-w.ctx.Done():
			log.Println("Worker context cancelled")
			return
		}
	}()

	log.Println("EASM worker started successfully")
	return nil
}

// Stop gracefully shuts down the worker
func (w *Worker) Stop() error {
	if !w.isRunning {
		return fmt.Errorf("worker is not running")
	}

	log.Println("Stopping EASM worker...")
	w.cancel()
	w.worker.Quit()
	w.isRunning = false
	log.Println("EASM worker stopped")
	return nil
}

// IsRunning returns the current running status
func (w *Worker) IsRunning() bool {
	return w.isRunning
}

// GetServer returns the machinery server instance
func (w *Worker) GetServer() *machinery.Server {
	return w.server
}
