import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import { 
  FaServer, 
  FaNetworkWired, 
  FaExclamationTriangle, 
  FaHistory, 
  FaTerminal,
  FaKey,
  FaTags
} from 'react-icons/fa';

interface Vulnerability {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cve?: string;
  discoveredAt: string;
  description: string;
  status: 'open' | 'fixed' | 'false_positive';
}

interface Service {
  id: string;
  name: string;
  port: number;
  protocol: string;
  version?: string;
  status: 'open' | 'filtered' | 'closed';
}

export default function AssetDetail() {
  const router = useRouter();
  const { assetId } = router.query;

  // Mock asset data
  const asset = {
    id: '1',
    name: 'web-server-1',
    type: 'Web Server',
    ipAddress: '203.0.113.10',
    hostname: 'web-server-1.example.com',
    discoveredAt: '2025-04-10T12:30:00Z',
    lastScan: '2025-05-05T08:15:00Z',
    os: 'Ubuntu 22.04 LTS',
    osCpe: 'cpe:/o:canonical:ubuntu:22.04',
    description: 'Primary web server hosting the company website and customer portal.',
    tags: ['production', 'external', 'pci-dss'],
    owner: 'Web Operations Team',
    riskScore: 85,
    status: 'active',
    vulnerabilityCount: { critical: 2, high: 4, medium: 7, low: 12 }
  };

  // Mock vulnerabilities
  const vulnerabilities: Vulnerability[] = [
    {
      id: 'vuln-1',
      title: 'Log4j Remote Code Execution',
      severity: 'critical',
      cve: 'CVE-2021-44228',
      discoveredAt: '2025-05-01T14:30:00Z',
      description: 'A remote code execution vulnerability in Apache Log4j library.',
      status: 'open'
    },
    {
      id: 'vuln-2',
      title: 'OpenSSL Heartbleed',
      severity: 'critical',
      cve: 'CVE-2014-0160',
      discoveredAt: '2025-05-01T14:30:00Z',
      description: 'A serious vulnerability in the OpenSSL cryptographic software library.',
      status: 'open'
    },
    {
      id: 'vuln-3',
      title: 'Cross-Site Scripting in Web Application',
      severity: 'high',
      discoveredAt: '2025-05-01T14:35:00Z',
      description: 'A cross-site scripting vulnerability in the customer portal.',
      status: 'open'
    },
    {
      id: 'vuln-4',
      title: 'Outdated PHP Version',
      severity: 'medium',
      discoveredAt: '2025-05-01T14:40:00Z',
      description: 'The server is running an outdated version of PHP with known security issues.',
      status: 'open'
    },
  ];

  // Mock services
  const services: Service[] = [
    {
      id: 'service-1',
      name: 'HTTP',
      port: 80,
      protocol: 'tcp',
      version: 'Apache 2.4.52',
      status: 'open'
    },
    {
      id: 'service-2',
      name: 'HTTPS',
      port: 443,
      protocol: 'tcp',
      version: 'Apache 2.4.52',
      status: 'open'
    },
    {
      id: 'service-3',
      name: 'SSH',
      port: 22,
      protocol: 'tcp',
      version: 'OpenSSH 8.9p1',
      status: 'open'
    },
    {
      id: 'service-4',
      name: 'FTP',
      port: 21,
      protocol: 'tcp',
      version: 'vsftpd 3.0.3',
      status: 'filtered'
    }
  ];

  // Activity history
  const activityHistory = [
    {
      id: 'activity-1',
      action: 'Vulnerability Scan',
      timestamp: '2025-05-05T08:15:00Z',
      details: 'Completed vulnerability scan with Nuclei'
    },
    {
      id: 'activity-2',
      action: 'Port Scan',
      timestamp: '2025-05-05T08:00:00Z',
      details: 'Completed port scan with Nmap'
    },
    {
      id: 'activity-3',
      action: 'New Vulnerability Found',
      timestamp: '2025-05-05T08:20:00Z',
      details: 'Discovered CVE-2021-44228 (Log4j)'
    },
    {
      id: 'activity-4',
      action: 'Asset Added',
      timestamp: '2025-04-10T12:30:00Z',
      details: 'Asset was discovered and added to inventory'
    }
  ];

  // Active tab state
  const [activeTab, setActiveTab] = useState('overview');

  // Get severity badge class
  const getSeverityBadgeClass = (severity: string) => {
    switch(severity) {
      case 'critical': return 'bg-danger';
      case 'high': return 'bg-warning';
      case 'medium': return 'bg-info';
      case 'low': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  };

  // Get service status badge
  const getServiceStatusBadge = (status: string) => {
    switch(status) {
      case 'open': return <span className="badge bg-success">Open</span>;
      case 'filtered': return <span className="badge bg-warning">Filtered</span>;
      case 'closed': return <span className="badge bg-secondary">Closed</span>;
      default: return null;
    }
  };

  return (
    <Layout>
      <Head>
        <title>{asset.name} | EASM</title>
        <meta name="description" content={`Details for asset ${asset.name}`} />
      </Head>
      
      <div>
        {/* Asset Header */}
        <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-2">
          <div>
            <div className="d-flex align-items-center">
              <h1 className="h3 mb-0">{asset.name}</h1>
              <span className={`badge ms-2 ${asset.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                {asset.status}
              </span>
            </div>
            <p className="text-muted mb-0">{asset.hostname} {asset.ipAddress && `(${asset.ipAddress})`}</p>
          </div>
          <div>
            <button className="btn btn-outline-primary me-2">Run Scan</button>
            <button className="btn btn-outline-secondary">Edit Asset</button>
          </div>
        </div>

        {/* Asset Quick Stats */}
        <div className="row mb-4">
          <div className="col-md-3 mb-4 mb-md-0">
            <div className="card h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="text-muted mb-1">Risk Score</h6>
                    <h2 className="mb-0">{asset.riskScore}</h2>
                  </div>
                  <div className={`rounded-circle p-3 ${asset.riskScore >= 80 ? 'bg-danger' : asset.riskScore >= 60 ? 'bg-warning' : 'bg-info'}`}>
                    <FaExclamationTriangle className="text-white" />
                  </div>
                </div>
                <div className="progress mt-3" style={{ height: '8px' }}>
                  <div 
                    className={`progress-bar ${asset.riskScore >= 80 ? 'bg-danger' : asset.riskScore >= 60 ? 'bg-warning' : 'bg-info'}`} 
                    role="progressbar" 
                    style={{ width: `${asset.riskScore}%` }} 
                    aria-valuenow={asset.riskScore} 
                    aria-valuemin={0} 
                    aria-valuemax={100}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card h-100">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-md-4 mb-3 mb-md-0">
                    <h6 className="text-muted mb-1">Vulnerabilities</h6>
                    <div className="d-flex mt-2">
                      {asset.vulnerabilityCount.critical > 0 && (
                        <div className="me-3">
                          <span className="badge bg-danger fs-6 px-2">{asset.vulnerabilityCount.critical}</span>
                          <span className="ms-1 small">Critical</span>
                        </div>
                      )}
                      {asset.vulnerabilityCount.high > 0 && (
                        <div className="me-3">
                          <span className="badge bg-warning fs-6 px-2">{asset.vulnerabilityCount.high}</span>
                          <span className="ms-1 small">High</span>
                        </div>
                      )}
                    </div>
                    <div className="d-flex mt-2">
                      {asset.vulnerabilityCount.medium > 0 && (
                        <div className="me-3">
                          <span className="badge bg-info fs-6 px-2">{asset.vulnerabilityCount.medium}</span>
                          <span className="ms-1 small">Medium</span>
                        </div>
                      )}
                      {asset.vulnerabilityCount.low > 0 && (
                        <div className="me-3">
                          <span className="badge bg-secondary fs-6 px-2">{asset.vulnerabilityCount.low}</span>
                          <span className="ms-1 small">Low</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4 mb-3 mb-md-0">
                    <h6 className="text-muted mb-1">Last Scan</h6>
                    <p className="mb-0">{new Date(asset.lastScan).toLocaleString()}</p>
                    <small className="text-muted">2 days ago</small>
                  </div>
                  <div className="col-md-4">
                    <h6 className="text-muted mb-1">Owner</h6>
                    <p className="mb-0">{asset.owner}</p>
                    <small className="text-muted">{asset.type}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs navigation */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <a 
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
              style={{ cursor: 'pointer' }}
            >
              Overview
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={`nav-link ${activeTab === 'vulnerabilities' ? 'active' : ''}`}
              onClick={() => setActiveTab('vulnerabilities')}
              style={{ cursor: 'pointer' }}
            >
              Vulnerabilities
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
              style={{ cursor: 'pointer' }}
            >
              Services
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
              style={{ cursor: 'pointer' }}
            >
              Activity History
            </a>
          </li>
        </ul>
        
        {/* Tab content */}
        <div className="tab-content">
          {/* Overview tab */}
          {activeTab === 'overview' && (
            <div className="row">
              <div className="col-lg-6 mb-4">
                <Card title="Asset Details" icon={<FaServer />}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="mb-3">
                        <h6 className="text-muted mb-1">Type</h6>
                        <p className="mb-0">{asset.type}</p>
                      </div>
                      <div className="mb-3">
                        <h6 className="text-muted mb-1">Hostname</h6>
                        <p className="mb-0">{asset.hostname}</p>
                      </div>
                      <div className="mb-3">
                        <h6 className="text-muted mb-1">IP Address</h6>
                        <p className="mb-0">{asset.ipAddress || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <h6 className="text-muted mb-1">Operating System</h6>
                        <p className="mb-0">{asset.os}</p>
                        <small className="text-muted">{asset.osCpe}</small>
                      </div>
                      <div className="mb-3">
                        <h6 className="text-muted mb-1">Discovered At</h6>
                        <p className="mb-0">{new Date(asset.discoveredAt).toLocaleString()}</p>
                      </div>
                      <div className="mb-3">
                        <h6 className="text-muted mb-1">Owner</h6>
                        <p className="mb-0">{asset.owner}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <h6 className="text-muted mb-2">Description</h6>
                    <p>{asset.description}</p>
                  </div>
                </Card>
              </div>
              
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-12 mb-4">
                    <Card title="Tags" icon={<FaTags />}>
                      <div>
                        {asset.tags.map((tag) => (
                          <span key={tag} className="badge bg-secondary me-2 mb-2 p-2">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </div>
                  
                  <div className="col-12">
                    <Card title="Recent Vulnerabilities" icon={<FaExclamationTriangle />}>
                      <div className="list-group list-group-flush">
                        {vulnerabilities.slice(0, 3).map((vuln) => (
                          <div key={vuln.id} className="list-group-item px-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h6 className="mb-1">{vuln.title}</h6>
                                <div>
                                  <span className={`badge ${getSeverityBadgeClass(vuln.severity)}`}>
                                    {vuln.severity}
                                  </span>
                                  {vuln.cve && <span className="ms-2 small">{vuln.cve}</span>}
                                </div>
                              </div>
                              <small className="text-muted">
                                {new Date(vuln.discoveredAt).toLocaleDateString()}
                              </small>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-end">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setActiveTab('vulnerabilities')}
                        >
                          View All Vulnerabilities
                        </button>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Vulnerabilities tab */}
          {activeTab === 'vulnerabilities' && (
            <Card title="Vulnerabilities" icon={<FaExclamationTriangle />}>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Severity</th>
                      <th>CVE</th>
                      <th>Discovered</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vulnerabilities.map((vuln) => (
                      <tr key={vuln.id}>
                        <td>
                          <div>
                            <strong>{vuln.title}</strong>
                            <div className="small text-muted">{vuln.description}</div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${getSeverityBadgeClass(vuln.severity)}`}>
                            {vuln.severity}
                          </span>
                        </td>
                        <td>{vuln.cve || 'N/A'}</td>
                        <td>{new Date(vuln.discoveredAt).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${vuln.status === 'open' ? 'bg-danger' : vuln.status === 'fixed' ? 'bg-success' : 'bg-secondary'}`}>
                            {vuln.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">Details</button>
                          <button className="btn btn-sm btn-outline-success">Mark Fixed</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
          
          {/* Services tab */}
          {activeTab === 'services' && (
            <Card title="Network Services" icon={<FaNetworkWired />}>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Service</th>
                      <th>Port</th>
                      <th>Protocol</th>
                      <th>Version</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.id}>
                        <td>{service.name}</td>
                        <td>{service.port}</td>
                        <td>{service.protocol}</td>
                        <td>{service.version || 'Unknown'}</td>
                        <td>{getServiceStatusBadge(service.status)}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary">Scan</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
          
          {/* Activity history tab */}
          {activeTab === 'history' && (
            <Card title="Activity History" icon={<FaHistory />}>
              <div className="timeline">
                {activityHistory.map((activity, index) => (
                  <div key={activity.id} className="timeline-item pb-4">
                    <div className="d-flex">
                      <div className="timeline-marker me-3"></div>
                      <div className="timeline-content">
                        <h6 className="mb-1">{activity.action}</h6>
                        <p className="mb-1">{activity.details}</p>
                        <small className="text-muted">
                          {new Date(activity.timestamp).toLocaleString()}
                        </small>
                      </div>
                    </div>
                    {index < activityHistory.length - 1 && <div className="timeline-line"></div>}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
