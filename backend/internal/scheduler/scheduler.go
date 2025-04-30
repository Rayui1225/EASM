package scheduler

import (
	"github.com/RichardKnop/machinery/v2"
	"github.com/RichardKnop/machinery/v2/config"
)

// Service represents the scheduler service
type Service struct {
	server *machinery.Server
}

// NewService creates a new scheduler service
func NewService() (*Service, error) {
	// Create server config
	cnf := &config.Config{
		DefaultQueue:    "easm_tasks",
		ResultsExpireIn: 3600, // 1 hour
		Redis: &config.RedisConfig{
			MaxIdle:                3,
			IdleTimeout:            240,
			ReadTimeout:            15,
			WriteTimeout:           15,
			ConnectTimeout:         15,
			NormalTasksPollPeriod:  1000,
			DelayedTasksPollPeriod: 5000,
		},
	}

	// Create server instance
	server, err := machinery.NewServer(cnf)
	if err != nil {
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
