# EASM - Enterprise Attack Surface Management

A comprehensive solution for managing and monitoring an organization's external attack surface. This project combines multiple security tools into a unified platform to discover, monitor, and analyze an organization's external attack surface.

## Features

- **Asset Discovery**: Automatically discover domains, subdomains, and infrastructure using tools like Amass
- **Vulnerability Scanning**: Scan discovered assets for vulnerabilities using Nuclei
- **Network Scanning**: Perform port scans and service discovery with Nmap
- **Typosquatting Detection**: Find look-alike domains with DNSTwist
- **Scheduled Scans**: Set up recurring scans to continuously monitor your attack surface
- **Reporting**: Comprehensive reporting and dashboards

## Architecture

This project uses a modern tech stack:

- **Frontend**: Next.js for server-side rendering and optimized React applications
- **Backend**: Golang API with modular architecture
- **Database**: PostgreSQL for data storage
- **Task Queue**: Redis + Machinery for asynchronous task processing
- **Containerization**: Docker for consistent development and deployment

## Project Structure

```
├── frontend/                  # Next.js application
│   ├── pages/                 # Pages routes (SSR/SPA)
│   ├── components/            # Reusable UI components
│   ├── public/                # Static assets (images, favicon)
│   └── next.config.js         # Next.js configuration
├── backend/                   # Golang backend service
│   ├── cmd/                   # Entry point programs (main)
│   ├── internal/              # Internal packages
│   │   ├── api/               # API routes & handlers
│   │   ├── scheduler/         # Task scheduling logic (machinery)
│   │   └── modules/           # Feature modules (amass, nmap, nuclei, dnstwist)
│   ├── pkg/                   # Exportable packages
│   ├── go.mod                 # Module definition
│   └── main.go                # Service startup program
├── db/                        # Database related
│   ├── migrations/            # Schema version control (golang-migrate)
│   └── seeds/                 # Initial seed data
└── docker-compose.yml         # Local dev/test service startup
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Go 1.19+ (for local development without Docker)
- Node.js 16+ (for local development without Docker)

### Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/oshjoshu99/easm.git
   cd easm
   ```

2. Start the development environment:
   ```
   docker-compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

### Database Migrations

Run database migrations with:

```
docker-compose exec backend go run cmd/migrate/main.go up
```

### Running Tests

```
# Backend tests
docker-compose exec backend go test ./...

# Frontend tests
docker-compose exec frontend npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
