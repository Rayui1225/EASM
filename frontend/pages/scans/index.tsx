import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import { 
  FaSearch, 
  FaPlus, 
  FaCheck, 
  FaTimes, 
  FaSpinner,
  FaHistory,
  FaFilter 
} from 'react-icons/fa';

// Types
interface ScanTask {
  id: string;
  name: string;
  type: string;
  target: string;
  startTime: string;
  endTime?: string;
  status: 'completed' | 'failed' | 'running' | 'scheduled';
  foundVulnerabilities?: number;
  progress?: number;
}

export default function Scans() {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Mock scan tasks
  const mockScanTasks: ScanTask[] = [
    {
      id: '1',
      name: 'External Subnet Scan',
      type: 'Network Scan',
      target: '203.0.113.0/24',
      startTime: '2025-05-07T08:30:00Z',
      status: 'running',
      progress: 65
    },
    {
      id: '2',
      name: 'Web App Vulnerability Scan',
      type: 'Vulnerability Scan',
      target: 'https://app.example.com',
      startTime: '2025-05-07T09:15:00Z',
      status: 'running',
      progress: 25
    },
    {
      id: '3',
      name: 'Daily Security Scan',
      type: 'Scheduled Scan',
      target: 'All Production Assets',
      startTime: '2025-05-08T00:00:00Z',
      status: 'scheduled'
    },
    {
      id: '4',
      name: 'Domain Enumeration',
      type: 'Discovery Scan',
      target: 'example.com',
      startTime: '2025-05-06T12:00:00Z',
      endTime: '2025-05-06T14:00:00Z',
      status: 'completed',
      foundVulnerabilities: 3
    },
    {
      id: '5',
      name: 'Internal Network Scan',
      type: 'Network Scan',
      target: '10.0.0.0/8',
      startTime: '2025-05-06T16:00:00Z',
      endTime: '2025-05-06T16:15:00Z',
      status: 'failed',
    },
    {
      id: '6',
      name: 'Cloud Resources Audit',
      type: 'Security Audit',
      target: 'AWS Account',
      startTime: '2025-05-06T08:30:00Z',
      endTime: '2025-05-06T10:45:00Z',
      status: 'completed',
      foundVulnerabilities: 12
    }
  ];

  // Scan types for filter
  const scanTypes = ['Network Scan', 'Vulnerability Scan', 'Discovery Scan', 'Security Audit', 'Scheduled Scan'];

  // Filter scan tasks based on active tab, search query and type filter
  const filteredScans = mockScanTasks.filter(scan => {
    const matchesSearch = 
      scan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.target.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'all' || scan.type === selectedType;
    
    // Filter by status based on active tab
    let matchesTab = true;
    if (activeTab === 'active') {
      matchesTab = scan.status === 'running' || scan.status === 'scheduled';
    } else if (activeTab === 'completed') {
      matchesTab = scan.status === 'completed' || scan.status === 'failed';
    }
    
    return matchesSearch && matchesType && matchesTab;
  });

  // Render status indicator
  const renderStatus = (status: string, progress?: number) => {
    switch (status) {
      case 'completed':
        return <FaCheck className="text-success" />;
      case 'failed':
        return <FaTimes className="text-danger" />;
      case 'running':
        return (
          <div className="d-flex align-items-center">
            <FaSpinner className="text-primary fa-spin me-2" />
            {progress !== undefined && <span className="small">{progress}%</span>}
          </div>
        );
      case 'scheduled':
        return <FaHistory className="text-secondary" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Scan Management | EASM</title>
        <meta name="description" content="Manage and run security scans" />
      </Head>
      
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Scan Management</h1>
          <button className="btn btn-primary">
            <FaPlus className="me-2" /> New Scan
          </button>
        </div>
        
        <Card title="Scans" icon={<FaSearch />}>
          {/* Tabs for active/history */}
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <a 
                className={`nav-link ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}
                style={{ cursor: 'pointer' }}
              >
                Active & Scheduled
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`}
                onClick={() => setActiveTab('completed')}
                style={{ cursor: 'pointer' }}
              >
                Completed
              </a>
            </li>
          </ul>
          
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
                  placeholder="Search scans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaFilter />
                </span>
                <select 
                  className="form-select" 
                  value={selectedType} 
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Scan Types</option>
                  {scanTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Scans Table */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Target</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Status</th>
                  {activeTab === 'completed' && <th>Results</th>}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredScans.map((scan) => (
                  <tr key={scan.id}>
                    <td>{scan.name}</td>
                    <td>{scan.type}</td>
                    <td>{scan.target}</td>
                    <td>
                      {scan.status === 'scheduled' 
                        ? <span className="text-muted">Scheduled for {new Date(scan.startTime).toLocaleString()}</span>
                        : new Date(scan.startTime).toLocaleString()
                      }
                    </td>
                    <td>{scan.endTime ? new Date(scan.endTime).toLocaleString() : '-'}</td>
                    <td className="text-center">{renderStatus(scan.status, scan.progress)}</td>
                    {activeTab === 'completed' && (
                      <td>
                        {scan.status === 'completed' && (
                          <span>
                            {scan.foundVulnerabilities !== undefined 
                              ? <span>{scan.foundVulnerabilities} issues found</span>
                              : '-'
                            }
                          </span>
                        )}
                        {scan.status === 'failed' && (
                          <span className="text-danger">Failed to complete</span>
                        )}
                      </td>
                    )}
                    <td>
                      {scan.status === 'running' && (
                        <button className="btn btn-sm btn-outline-danger">Cancel</button>
                      )}
                      {scan.status === 'scheduled' && (
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary">Run Now</button>
                          <button className="btn btn-sm btn-outline-danger">Cancel</button>
                        </div>
                      )}
                      {(scan.status === 'completed' || scan.status === 'failed') && (
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary">View Report</button>
                          <button className="btn btn-sm btn-outline-secondary">Re-run</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredScans.length === 0 && (
                  <tr>
                    <td colSpan={activeTab === 'completed' ? 8 : 7} className="text-center py-5">
                      No scans found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
