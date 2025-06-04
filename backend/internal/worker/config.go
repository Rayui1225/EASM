package worker

import (
	"github.com/RichardKnop/machinery/v2/config"
)

// GetMachineryConfig returns the shared configuration for both scheduler and worker
func GetMachineryConfig() *config.Config {
	return &config.Config{
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
		// Specify broker and backend types
		Broker:        "redis://localhost:6379/0",
		ResultBackend: "redis://localhost:6379/0",
	}
}

// TaskNames contains all available task names
var TaskNames = struct {
	ScanTarget        string
	VulnerabilityScan string
	AssetDiscovery    string
	DNSEnumeration    string
	PortScan          string
	CleanupOldResults string
}{
	ScanTarget:        "scan_target",
	VulnerabilityScan: "vulnerability_scan",
	AssetDiscovery:    "asset_discovery",
	DNSEnumeration:    "dns_enumeration",
	PortScan:          "port_scan",
	CleanupOldResults: "cleanup_old_results",
}
