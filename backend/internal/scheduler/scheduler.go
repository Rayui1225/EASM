package scheduler

import (
	"time"

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
		Broker:          "redis://localhost:6379",
		ResultBackend:   "redis://localhost:6379",
		DefaultQueue:    "easm_tasks",
		ResultsExpireIn: 3600, // 1 hour
		Redis: &config.RedisConfig{
			MaxIdle:                3,
			IdleTimeout:            240 * time.Second,
			ReadTimeout:            15 * time.Second,
			WriteTimeout:           15 * time.Second,
			ConnectTimeout:         15 * time.Second,
			NormalTasksPollPeriod:  1000 * time.Millisecond,
			DelayedTasksPollPeriod: 5 * time.Second,
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
