import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import { 
  FaBug, 
  FaSearch, 
  FaFilter, 
  FaSortAmountDown,
  FaExclamationTriangle
} from 'react-icons/fa';

// Types
interface Vulnerability {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cve?: string;
  discoveredAt: string;
  affectedAssets: number;
  description: string;
  status: 'open' | 'fixed' | 'false_positive' | 'accepted_risk';
  exploitable: boolean;
}

export default function Vulnerabilities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('severity');
  const [sortDirection, setSortDirection] = useState('desc');

  // Mock data for vulnerabilities
  const mockVulnerabilities: Vulnerability[] = [
    {
      id: 'vuln-1',
      title: 'Log4j Remote Code Execution',
      severity: 'critical',
      cve: 'CVE-2021-44228',
      discoveredAt: '2025-05-01T14:30:00Z',
      affectedAssets: 4,
      description: 'A remote code execution vulnerability in Apache Log4j library.',
      status: 'open',
      exploitable: true
    },
    {
      id: 'vuln-2',
      title: 'OpenSSL Heartbleed',
      severity: 'critical',
      cve: 'CVE-2014-0160',
      discoveredAt: '2025-05-01T14:30:00Z',
      affectedAssets: 2,
      description: 'A serious vulnerability in the OpenSSL cryptographic software library.',
      status: 'fixed',
      exploitable: true
    },
    {
      id: 'vuln-3',
      title: 'Cross-Site Scripting in Web Application',
      severity: 'high',
      discoveredAt: '2025-05-01T14:35:00Z',
      affectedAssets: 3,
      description: 'A cross-site scripting vulnerability in the customer portal.',
      status: 'open',
      exploitable: true
    },
    {
      id: 'vuln-4',
      title: 'Outdated PHP Version',
      severity: 'medium',
      discoveredAt: '2025-05-01T14:40:00Z',
      affectedAssets: 5,
      description: 'The server is running an outdated version of PHP with known security issues.',
      status: 'open',
      exploitable: false
    },
    {
      id: 'vuln-5',
      title: 'Insecure Direct Object Reference',
      severity: 'medium',
      discoveredAt: '2025-05-01T14:45:00Z',
      affectedAssets: 1,
      description: 'An IDOR vulnerability allowing unauthorized access to data.',
      status: 'false_positive',
      exploitable: false
    },
    {
      id: 'vuln-6',
      title: 'Missing HTTP Security Headers',
      severity: 'low',
      discoveredAt: '2025-05-01T14:50:00Z',
      affectedAssets: 8,
      description: 'Security headers such as Content-Security-Policy are not properly configured.',
      status: 'accepted_risk',
      exploitable: false
    }
  ];

  // Filter and sort vulnerabilities
  const filteredVulnerabilities = mockVulnerabilities.filter(vuln => {
    const matchesSearch = 
      vuln.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vuln.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vuln.cve && vuln.cve.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSeverity = selectedSeverity === 'all' || vuln.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || vuln.status === selectedStatus;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const sortedVulnerabilities = [...filteredVulnerabilities].sort((a, b) => {
    let comparison = 0;
    
    switch(sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'severity':
        const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        comparison = severityOrder[a.severity] - severityOrder[b.severity];
        break;
      case 'discoveredAt':
        comparison = new Date(a.discoveredAt).getTime() - new Date(b.discoveredAt).getTime();
        break;
      case 'affectedAssets':
        comparison = a.affectedAssets - b.affectedAssets;
        break;
      default:
        comparison = 0;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Toggle sort direction
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  const renderSortIndicator = (field: string) => {
    if (sortBy === field) {
      return <FaSortAmountDown className={`ms-1 ${sortDirection === 'desc' ? '' : 'rotate-180'}`} />;
    }
    return null;
  };

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

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'open': return 'bg-danger';
      case 'fixed': return 'bg-success';
      case 'false_positive': return 'bg-info';
      case 'accepted_risk': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  return (
    <Layout>
      <Head>
        <title>Vulnerabilities | EASM</title>
        <meta name="description" content="View and manage vulnerabilities" />
      </Head>
      
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Vulnerabilities</h1>
          <div>
            <button className="btn btn-outline-primary me-2">Export Data</button>
            <button className="btn btn-primary">Generate Report</button>
          </div>
        </div>
        
        {/* Vulnerability Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="card bg-danger text-white">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <h3 className="mb-0">2</h3>
                    <div>Critical Vulnerabilities</div>
                  </div>
                  <div className="align-self-center">
                    <FaExclamationTriangle size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="card bg-warning text-dark">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <h3 className="mb-0">1</h3>
                    <div>High Vulnerabilities</div>
                  </div>
                  <div className="align-self-center">
                    <FaExclamationTriangle size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="card bg-info text-white">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <h3 className="mb-0">2</h3>
                    <div>Medium Vulnerabilities</div>
                  </div>
                  <div className="align-self-center">
                    <FaExclamationTriangle size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-secondary text-white">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <h3 className="mb-0">1</h3>
                    <div>Low Vulnerabilities</div>
                  </div>
                  <div className="align-self-center">
                    <FaExclamationTriangle size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Card title="Vulnerabilities" icon={<FaBug />}>
          {/* Filters and Search */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title, CVE, description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="d-flex gap-2">
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaFilter />
                  </span>
                  <select 
                    className="form-select" 
                    value={selectedSeverity} 
                    onChange={(e) => setSelectedSeverity(e.target.value)}
                  >
                    <option value="all">All Severities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaFilter />
                  </span>
                  <select 
                    className="form-select" 
                    value={selectedStatus} 
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="open">Open</option>
                    <option value="fixed">Fixed</option>
                    <option value="false_positive">False Positive</option>
                    <option value="accepted_risk">Accepted Risk</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vulnerabilities Table */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th className="sortable" onClick={() => handleSort('title')}>
                    Title {renderSortIndicator('title')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('severity')}>
                    Severity {renderSortIndicator('severity')}
                  </th>
                  <th>CVE</th>
                  <th className="sortable" onClick={() => handleSort('affectedAssets')}>
                    Affected Assets {renderSortIndicator('affectedAssets')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('discoveredAt')}>
                    Discovered {renderSortIndicator('discoveredAt')}
                  </th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedVulnerabilities.map((vulnerability) => (
                  <tr key={vulnerability.id}>
                    <td>
                      <div>
                        <strong>{vulnerability.title}</strong>
                        <div className="small text-muted">{vulnerability.description}</div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getSeverityBadgeClass(vulnerability.severity)}`}>
                        {vulnerability.severity}
                      </span>
                      {vulnerability.exploitable && (
                        <span className="badge bg-danger ms-1">exploitable</span>
                      )}
                    </td>
                    <td>{vulnerability.cve || 'N/A'}</td>
                    <td>{vulnerability.affectedAssets}</td>
                    <td>{new Date(vulnerability.discoveredAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(vulnerability.status)}`}>
                        {vulnerability.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1">Details</button>
                      <button className="btn btn-sm btn-outline-success">Mark Fixed</button>
                    </td>
                  </tr>
                ))}
                {sortedVulnerabilities.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-5">
                      No vulnerabilities found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex={-1}>Previous</a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">2</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">3</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </Card>
      </div>
    </Layout>
  );
}
