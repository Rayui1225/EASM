# EASM Frontend

This is the frontend for the Enterprise Attack Surface Management (EASM) system, built with Next.js, React, TypeScript, and Bootstrap.

## Overview

The EASM frontend provides a user interface for security professionals to manage and monitor their organization's attack surface. It includes:

- Dashboard with asset statistics and vulnerability trends
- Asset inventory and details
- Vulnerability management
- Scan configuration and monitoring
- System settings

## Tech Stack

- **Framework**: Next.js 13.x
- **UI Library**: React 18.x
- **Styling**: Bootstrap 5.x
- **Language**: TypeScript
- **Data Visualization**: Chart.js with react-chartjs-2
- **Icons**: react-icons (Font Awesome)

## Project Structure

```
frontend/
├── components/          # Reusable UI components
├── pages/               # Next.js pages/routes
│   ├── assets/          # Asset management pages
│   ├── scans/           # Scan management pages
│   ├── settings/        # System settings pages
│   └── vulnerabilities/ # Vulnerability management pages
├── public/              # Static assets
└── styles/              # Global CSS styles
```

## Components

### Core Components

- **Layout**: Main layout with navigation and structure
- **Card**: Multi-purpose card component used throughout the application
- **StatCard**: Used for dashboard statistics

### Data Visualization

- **VulnerabilityTrendChart**: Line chart for vulnerability trends
- **AssetDistributionChart**: Pie chart for asset type distribution

### Data Display

- **RecentScanTasks**: Table for displaying recent scan activities
- **NotificationCenter**: For system alerts and notifications

## Pages

### Dashboard (/pages/index.js)

The main dashboard with:
- Asset statistics cards
- Vulnerability trend chart
- Asset distribution pie chart
- Recent scan tasks list

### Assets (/pages/assets/)

- Asset listing with filtering and search
- Individual asset details with:
  - Overview information
  - Vulnerabilities
  - Services
  - History

### Vulnerabilities (/pages/vulnerabilities/)

- Vulnerability listing with filtering by severity and status
- Detailed vulnerability information

### Scans (/pages/scans/)

- Active and completed scans
- Scan configuration
- Scan scheduling

### Settings (/pages/settings/)

- General system settings
- User management
- Scan tool configuration
- Notification settings
- API key management

## Development

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

### Building for Production

```bash
# Build the production version
npm run build

# Start the production server
npm start
```

## Integration with Backend

The frontend integrates with the EASM backend via RESTful APIs. Currently, the frontend uses mock data for development, but it's designed to easily switch to actual API data by updating the data fetching methods.

## Future Enhancements

- Real-time updates using WebSockets
- PDF report generation
- Dark mode support
- Mobile-responsive design improvements
- Interactive network topology visualization
