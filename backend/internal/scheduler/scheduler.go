package scheduler

import (
	"easm-backend/internal/shared"

	"github.com/RichardKnop/machinery/v2"
)

// Service represents the scheduler service
type Service struct {
	server *machinery.Server
}

// NewService creates a new scheduler service
func NewService() (*Service, error) {
	// Use shared configuration from shared package
	cnf := shared.GetMachineryConfig()
	// Create a new server instance with all required parameters
	// Passing nil for broker, backend, and lock will make Machinery create them based on the config
	server := machinery.NewServer(cnf, nil, nil, nil)

	// Register default tasks (you can add specific tasks later)
	if err := server.RegisterTasks(map[string]interface{}{}); err != nil {
		return nil, err
	}

	return &Service{
		server: server,
	}, nil
}

// RegisterTasks registers all task handlers with the machinery server
func (s *Service) RegisterTasks() {
	// Register tasks here
	// Example: s.server.RegisterTask("scan_target", modules.ScanTarget)
}

// GetServer returns the machinery server instance
func (s *Service) GetServer() *machinery.Server {
	return s.server
}
