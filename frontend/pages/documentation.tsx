import Head from 'next/head';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { 
  FaBook, 
  FaServer, 
  FaNetworkWired, 
  FaDatabase, 
  FaUserShield,
  FaSearch,
  FaFileAlt
} from 'react-icons/fa';

export default function Documentation() {
  return (
    <Layout>
      <Head>
        <title>Documentation | EASM</title>
        <meta name="description" content="EASM System Documentation" />
      </Head>

      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">System Documentation</h1>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <Card title="EASM Architecture Overview" icon={<FaBook />}>
              <div className="row">
                <div className="col-md-8">
                  <p>
                    The Enterprise Attack Surface Management (EASM) system is designed to discover, inventory, 
                    classify, and monitor all assets within an organization's attack surface. The system continuously 
                    scans for vulnerabilities and misconfigurations, providing actionable insights for security teams.
                  </p>
                  <h5>Key Components</h5>
                  <ul>
                    <li><strong>Asset Discovery Engine:</strong> Identifies and categorizes assets across network, web, and cloud environments.</li>
                    <li><strong>Vulnerability Scanner:</strong> Detects security issues across the discovered assets.</li>
                    <li><strong>Risk Assessment Module:</strong> Prioritizes findings based on exploitability and business impact.</li>
                    <li><strong>Monitoring Service:</strong> Continuously tracks changes to the attack surface.</li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <div className="bg-light p-3 rounded text-center">
                    <div className="py-3">
                      <h6 className="text-muted">Architecture Diagram</h6>
                      <div className="bg-white p-3 rounded border">
                        [Architecture diagram placeholder]
                      </div>
                      <small className="text-muted d-block mt-2">High-level system architecture</small>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <Card title="Backend Services" icon={<FaServer />} className="h-100">
              <h5>Core Services</h5>
              <ul>
                <li><strong>Asset Management Service</strong> - Maintains the inventory of all discovered assets</li>
                <li><strong>Scan Orchestrator</strong> - Coordinates and schedules scanning activities</li>
                <li><strong>Vulnerability Processor</strong> - Analyzes and stores vulnerability data</li>
              </ul>
              
              <h5>Technologies</h5>
              <div className="d-flex flex-wrap">
                <span className="badge bg-primary me-2 mb-2">Go</span>
                <span className="badge bg-secondary me-2 mb-2">PostgreSQL</span>
                <span className="badge bg-success me-2 mb-2">Docker</span>
                <span className="badge bg-info me-2 mb-2">RESTful APIs</span>
              </div>
              
              <h5 className="mt-3">External Integrations</h5>
              <ul>
                <li>Nmap - Network scanning tool</li>
                <li>Nuclei - Vulnerability scanner</li>
                <li>Amass - Asset discovery tool</li>
                <li>DNSTwist - Domain monitoring tool</li>
              </ul>
            </Card>
          </div>
          <div className="col-lg-6">
            <Card title="Frontend Architecture" icon={<FaUserShield />} className="h-100">
              <h5>User Interface Components</h5>
              <ul>
                <li><strong>Dashboard</strong> - Overview of attack surface metrics and recent activity</li>
                <li><strong>Asset Explorer</strong> - Detailed view of all discovered assets</li>
                <li><strong>Vulnerability Manager</strong> - Interface for reviewing and managing vulnerabilities</li>
                <li><strong>Scan Configuration</strong> - Tools for configuring and scheduling scans</li>
                <li><strong>Settings</strong> - System configuration and user management</li>
              </ul>
              
              <h5>Technologies</h5>
              <div className="d-flex flex-wrap">
                <span className="badge bg-primary me-2 mb-2">React</span>
                <span className="badge bg-secondary me-2 mb-2">Next.js</span>
                <span className="badge bg-success me-2 mb-2">TypeScript</span>
                <span className="badge bg-info me-2 mb-2">Bootstrap</span>
                <span className="badge bg-warning text-dark me-2 mb-2">Chart.js</span>
              </div>
              
              <h5 className="mt-3">Key Features</h5>
              <ul>
                <li>Responsive design for desktop and mobile</li>
                <li>Real-time data updates</li>
                <li>Interactive visualizations</li>
                <li>Role-based access control</li>
              </ul>
            </Card>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 mb-4">
            <Card title="Data Model" icon={<FaDatabase />} className="h-100">
              <h5>Core Entities</h5>
              <ul>
                <li><strong>Assets</strong> - Devices, applications, and resources</li>
                <li><strong>Vulnerabilities</strong> - Security issues and exposures</li>
                <li><strong>Scans</strong> - Discovery and assessment operations</li>
                <li><strong>Users</strong> - System users and their roles</li>
              </ul>
              
              <h5>Relationships</h5>
              <ul>
                <li>Assets can have multiple vulnerabilities</li>
                <li>Assets can belong to multiple groups</li>
                <li>Scans can target multiple assets</li>
                <li>Users can have different permissions</li>
              </ul>
            </Card>
          </div>
          <div className="col-lg-4 mb-4">
            <Card title="API Documentation" icon={<FaFileAlt />} className="h-100">
              <h5>RESTful API Endpoints</h5>
              <ul>
                <li><code>/api/assets</code> - Asset management</li>
                <li><code>/api/vulnerabilities</code> - Vulnerability data</li>
                <li><code>/api/scans</code> - Scan operations</li>
                <li><code>/api/users</code> - User management</li>
                <li><code>/api/auth</code> - Authentication</li>
                <li><code>/api/health</code> - System health</li>
              </ul>
              
              <h5>Authentication</h5>
              <p>All API requests require JWT authentication tokens obtained through the <code>/api/auth/login</code> endpoint.</p>
              
              <h5>Rate Limiting</h5>
              <p>API requests are limited to 100 requests per minute per user.</p>
            </Card>
          </div>
          <div className="col-lg-4 mb-4">
            <Card title="Search Functionality" icon={<FaSearch />} className="h-100">
              <h5>Search Capabilities</h5>
              <ul>
                <li>Full-text search across all assets</li>
                <li>Advanced filtering by asset properties</li>
                <li>Vulnerability search by CVE, name, or severity</li>
                <li>Search history and saved searches</li>
              </ul>
              
              <h5>Implementation</h5>
              <p>Search is powered by PostgreSQL full-text search capabilities with additional indexing for performance optimization.</p>
              
              <h5>Future Enhancements</h5>
              <ul>
                <li>Elasticsearch integration for advanced search</li>
                <li>Natural language query processing</li>
                <li>Search result export functionality</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
