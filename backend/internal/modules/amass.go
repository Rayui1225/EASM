package modules

import (
	"context"
	"encoding/json"
	"fmt"
	"os/exec"
)

// AmassConfig represents configuration for the Amass tool
type AmassConfig struct {
	Domain          string   `json:"domain"`
	Wordlist        string   `json:"wordlist,omitempty"`
	Recursive       bool     `json:"recursive,omitempty"`
	IPs             bool     `json:"ips,omitempty"`
	ASNs            []string `json:"asns,omitempty"`
	CIDRs           []string `json:"cidrs,omitempty"`
	Ports           []string `json:"ports,omitempty"`
	Timeout         int      `json:"timeout,omitempty"`
	IncludePassive  bool     `json:"includePassive,omitempty"`
	IncludeActive   bool     `json:"includeActive,omitempty"`
	MaxDNSQueries   int      `json:"maxDNSQueries,omitempty"`
	OutputDirectory string   `json:"outputDirectory,omitempty"`
}

// AmassResult represents a result from the Amass tool
type AmassResult struct {
	Name       string   `json:"name"`
	Domain     string   `json:"domain"`
	Addresses  []string `json:"addresses,omitempty"`
	Source     string   `json:"source"`
	Tag        string   `json:"tag"`
	Additional string   `json:"additional,omitempty"`
}

// RunAmass runs the Amass tool with the given configuration
func RunAmass(ctx context.Context, config AmassConfig) ([]AmassResult, error) {
	// Validate the configuration
	if config.Domain == "" {
		return nil, fmt.Errorf("domain is required")
	}

	// Build the command
	args := []string{"enum", "-d", config.Domain, "-json"}

	// Add optional arguments
	if config.Wordlist != "" {
		args = append(args, "-brute", "-w", config.Wordlist)
	}

	if config.Recursive {
		args = append(args, "-norecursive=false")
	} else {
		args = append(args, "-norecursive=true")
	}

	if config.IPs {
		args = append(args, "-ip")
	}

	if len(config.ASNs) > 0 {
		for _, asn := range config.ASNs {
			args = append(args, "-asn", asn)
		}
	}

	if len(config.CIDRs) > 0 {
		for _, cidr := range config.CIDRs {
			args = append(args, "-cidr", cidr)
		}
	}

	if len(config.Ports) > 0 {
		args = append(args, "-p", fmt.Sprintf("%v", config.Ports))
	}

	if config.Timeout > 0 {
		args = append(args, "-timeout", fmt.Sprintf("%d", config.Timeout))
	}

	if !config.IncludePassive {
		args = append(args, "-passive=false")
	}

	if !config.IncludeActive {
		args = append(args, "-active=false")
	}

	if config.MaxDNSQueries > 0 {
		args = append(args, "-max-dns-queries", fmt.Sprintf("%d", config.MaxDNSQueries))
	}

	if config.OutputDirectory != "" {
		args = append(args, "-dir", config.OutputDirectory)
	}

	// Execute the command
	cmd := exec.CommandContext(ctx, "amass", args...)
	output, err := cmd.Output()
	if err != nil {
		if exitErr, ok := err.(*exec.ExitError); ok {
			return nil, fmt.Errorf("amass failed: %s: %w", string(exitErr.Stderr), err)
		}
		return nil, fmt.Errorf("amass failed: %w", err)
	}

	// Parse the output
	var results []AmassResult
	lines := splitLines(output)
	for _, line := range lines {
		if len(line) == 0 {
			continue
		}

		var result AmassResult
		if err := json.Unmarshal(line, &result); err != nil {
			return nil, fmt.Errorf("failed to parse amass output: %w", err)
		}

		results = append(results, result)
	}

	return results, nil
}

// Helper function to split output into lines
func splitLines(data []byte) [][]byte {
	var lines [][]byte
	var line []byte

	for _, b := range data {
		if b == '\n' {
			lines = append(lines, line)
			line = []byte{}
		} else {
			line = append(line, b)
		}
	}

	if len(line) > 0 {
		lines = append(lines, line)
	}

	return lines
}
