import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import { FaServer, FaFilter, FaSearch, FaSortAmountDown } from 'react-icons/fa';

// Types
interface Asset {
  id: string;
  name: string;
  type: string;
  ipAddress?: string;
  hostname: string;
  discoveredAt: string;
  tags: string[];
  riskScore: number;
  status: 'active' | 'inactive';
  vulnerabilityCount: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export default function Assets() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Mock data for assets
  const mockAssets: Asset[] = [
    {
      id: '1',
      name: 'web-server-1',
      type: 'Web Server',
      ipAddress: '203.0.113.10',
      hostname: 'web-server-1.example.com',
      discoveredAt: '2025-04-10T12:30:00Z',
      tags: ['production', 'external'],
      riskScore: 85,
      status: 'active',
      vulnerabilityCount: { critical: 2, high: 4, medium: 7, low: 12 }
    },
    {
      id: '2',
      name: 'db-server-1',
      type: 'Database',
      ipAddress: '10.0.0.5',
      hostname: 'db-1.internal.example.com',
      discoveredAt: '2025-04-12T09:15:00Z',
      tags: ['production', 'internal'],
      riskScore: 45,
      status: 'active',
      vulnerabilityCount: { critical: 0, high: 2, medium: 3, low: 8 }
    },
    {
      id: '3',
      name: 'cloud-storage-1',
      type: 'Cloud Resource',
      hostname: 'storage.example.com',
      discoveredAt: '2025-04-15T14:20:00Z',
      tags: ['production', 'cloud'],
      riskScore: 60,
      status: 'active',
      vulnerabilityCount: { critical: 1, high: 3, medium: 5, low: 9 }
    },
    {
      id: '4',
      name: 'router-1',
      type: 'Network Device',
      ipAddress: '203.0.113.1',
      hostname: 'edge-router-1.example.com',
      discoveredAt: '2025-04-01T08:45:00Z',
      tags: ['infrastructure', 'network'],
      riskScore: 70,
      status: 'active',
      vulnerabilityCount: { critical: 1, high: 2, medium: 4, low: 5 }
    },
    {
      id: '5',
      name: 'web-server-2',
      type: 'Web Server',
      ipAddress: '203.0.113.11',
      hostname: 'web-server-2.example.com',
      discoveredAt: '2025-04-10T13:30:00Z',
      tags: ['staging', 'external'],
      riskScore: 40,
      status: 'inactive',
      vulnerabilityCount: { critical: 0, high: 1, medium: 4, low: 7 }
    }
  ];

  // Asset types for filter
  const assetTypes = ['Web Server', 'Database', 'Cloud Resource', 'Network Device', 'Endpoint'];

  // Filter and sort assets
  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.hostname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (asset.ipAddress && asset.ipAddress.includes(searchQuery));
    
    const matchesType = selectedType === 'all' || asset.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    let comparison = 0;
    
    switch(sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
      case 'hostname':
        comparison = a.hostname.localeCompare(b.hostname);
        break;
      case 'riskScore':
        comparison = a.riskScore - b.riskScore;
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
      setSortDirection('asc');
    }
  };

  const renderSortIndicator = (field: string) => {
    if (sortBy === field) {
      return <FaSortAmountDown className={`ms-1 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />;
    }
    return null;
  };

  // Get risk level class
  const getRiskLevelClass = (score: number) => {
    if (score >= 80) return 'bg-danger';
    if (score >= 60) return 'bg-warning';
    if (score >= 40) return 'bg-info';
    return 'bg-success';
  };

  return (
    <Layout>
      <Head>
        <title>Assets | EASM</title>
        <meta name="description" content="Asset management for EASM" />
      </Head>
      
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Asset Inventory</h1>
          <button className="btn btn-primary">Add New Asset</button>
        </div>
        
        <Card title="Assets" icon={<FaServer />}>
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
                  placeholder="Search by name, hostname, or IP..."
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
                  <option value="all">All Asset Types</option>
                  {assetTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Assets Table */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th className="sortable" onClick={() => handleSort('name')}>
                    Name {renderSortIndicator('name')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('type')}>
                    Type {renderSortIndicator('type')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('hostname')}>
                    Hostname / IP {renderSortIndicator('hostname')}
                  </th>
                  <th>Tags</th>
                  <th className="sortable" onClick={() => handleSort('riskScore')}>
                    Risk Score {renderSortIndicator('riskScore')}
                  </th>
                  <th>Vulnerabilities</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedAssets.map((asset) => (
                  <tr key={asset.id}>
                    <td>
                      <a href={`/assets/${asset.id}`} className="text-decoration-none">
                        {asset.name}
                      </a>
                    </td>
                    <td>{asset.type}</td>
                    <td>
                      {asset.hostname}
                      {asset.ipAddress && (
                        <div className="small text-muted">{asset.ipAddress}</div>
                      )}
                    </td>
                    <td>
                      {asset.tags.map((tag) => (
                        <span key={tag} className="badge bg-secondary me-1">{tag}</span>
                      ))}
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div 
                          className={`progress flex-grow-1 me-2 ${getRiskLevelClass(asset.riskScore)}`} 
                          style={{ height: "8px" }}
                        >
                          <div 
                            className={`progress-bar ${getRiskLevelClass(asset.riskScore)}`} 
                            role="progressbar" 
                            style={{ width: `${asset.riskScore}%` }} 
                            aria-valuenow={asset.riskScore} 
                            aria-valuemin={0} 
                            aria-valuemax={100}
                          />
                        </div>
                        <span className="small">{asset.riskScore}</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex">
                        {asset.vulnerabilityCount.critical > 0 && (
                          <span className="badge bg-danger me-1">{asset.vulnerabilityCount.critical}</span>
                        )}
                        {asset.vulnerabilityCount.high > 0 && (
                          <span className="badge bg-warning me-1">{asset.vulnerabilityCount.high}</span>
                        )}
                        {asset.vulnerabilityCount.medium > 0 && (
                          <span className="badge bg-info me-1">{asset.vulnerabilityCount.medium}</span>
                        )}
                        {asset.vulnerabilityCount.low > 0 && (
                          <span className="badge bg-secondary me-1">{asset.vulnerabilityCount.low}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${asset.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                        {asset.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {sortedAssets.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-5">
                      No assets found matching your criteria
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
