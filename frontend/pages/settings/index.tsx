import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import { 
  FaCog,
  FaUsersCog,
  FaTools,
  FaBell,
  FaExclamationTriangle,
  FaKey,
  FaCloudDownloadAlt,
  FaSave,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  
  // Mock data for scan configurations
  const scanConfigurations = [
    { id: 'nmap', name: 'Nmap', enabled: true, path: '/usr/bin/nmap', version: '7.92' },
    { id: 'nuclei', name: 'Nuclei', enabled: true, path: '/usr/local/bin/nuclei', version: '2.8.2' },
    { id: 'amass', name: 'Amass', enabled: true, path: '/usr/local/bin/amass', version: '3.19.2' },
    { id: 'dnstwist', name: 'DNSTwist', enabled: false, path: '/usr/local/bin/dnstwist', version: '20220613' },
  ];
  
  // Mock data for users
  const users = [
    { id: 'user1', name: 'Admin User', email: 'admin@example.com', role: 'Administrator', active: true },
    { id: 'user2', name: 'Security Analyst', email: 'analyst@example.com', role: 'Analyst', active: true },
    { id: 'user3', name: 'Read Only User', email: 'readonly@example.com', role: 'Read Only', active: true },
    { id: 'user4', name: 'API User', email: 'api@example.com', role: 'API', active: false },
  ];

  return (
    <Layout>
      <Head>
        <title>Settings | EASM</title>
        <meta name="description" content="Configure system settings" />
      </Head>
      
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Settings</h1>
        </div>
        
        <div className="row">
          {/* Settings Navigation */}
          <div className="col-md-3 mb-4 mb-md-0">
            <div className="list-group">
              <a 
                className={`list-group-item list-group-item-action ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveTab('general')}
                style={{ cursor: 'pointer' }}
              >
                <FaCog className="me-2" /> General
              </a>
              <a 
                className={`list-group-item list-group-item-action ${activeTab === 'scans' ? 'active' : ''}`}
                onClick={() => setActiveTab('scans')}
                style={{ cursor: 'pointer' }}
              >
                <FaTools className="me-2" /> Scan Configuration
              </a>
              <a 
                className={`list-group-item list-group-item-action ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
                style={{ cursor: 'pointer' }}
              >
                <FaUsersCog className="me-2" /> Users & Roles
              </a>
              <a 
                className={`list-group-item list-group-item-action ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
                style={{ cursor: 'pointer' }}
              >
                <FaBell className="me-2" /> Notifications
              </a>
              <a 
                className={`list-group-item list-group-item-action ${activeTab === 'api' ? 'active' : ''}`}
                onClick={() => setActiveTab('api')}
                style={{ cursor: 'pointer' }}
              >
                <FaKey className="me-2" /> API Access
              </a>
            </div>
          </div>
          
          {/* Settings Content */}
          <div className="col-md-9">
            {/* General Settings */}
            {activeTab === 'general' && (
              <Card title="General Settings" icon={<FaCog />}>
                <form>
                  <div className="mb-3">
                    <label htmlFor="systemName" className="form-label">System Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="systemName" 
                      defaultValue="Enterprise Attack Surface Management"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="defaultDomain" className="form-label">Default Target Domain</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="defaultDomain" 
                      defaultValue="example.com"
                    />
                    <div className="form-text">
                      Default domain to use for discovery and asset identification.
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Dashboard Widgets</label>
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="showVulnTrends" 
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="showVulnTrends">
                        Show Vulnerability Trends
                      </label>
                    </div>
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="showAssetDist" 
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="showAssetDist">
                        Show Asset Distribution
                      </label>
                    </div>
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="showRecentScans" 
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="showRecentScans">
                        Show Recent Scans
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="dataRetention" className="form-label">Data Retention Period (days)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="dataRetention" 
                      defaultValue="365"
                      min="30"
                    />
                    <div className="form-text">
                      How long to keep historical scan data before automatic cleanup.
                    </div>
                  </div>
                  
                  <button type="submit" className="btn btn-primary">
                    <FaSave className="me-2" /> Save Changes
                  </button>
                </form>
              </Card>
            )}
            
            {/* Scan Configuration */}
            {activeTab === 'scans' && (
              <Card title="Scan Configuration" icon={<FaTools />}>
                <div className="alert alert-info mb-4">
                  <FaExclamationTriangle className="me-2" />
                  Configure the scanning tools and their settings to be used during vulnerability scans.
                </div>
                
                <div className="table-responsive mb-4">
                  <table className="table">
                    <thead className="table-light">
                      <tr>
                        <th>Scanner</th>
                        <th>Path</th>
                        <th>Version</th>
                        <th>Enabled</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scanConfigurations.map((scanner) => (
                        <tr key={scanner.id}>
                          <td>{scanner.name}</td>
                          <td>{scanner.path}</td>
                          <td>{scanner.version}</td>
                          <td>
                            <div className="form-check form-switch">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id={`scanner-${scanner.id}`} 
                                defaultChecked={scanner.enabled}
                              />
                            </div>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">Configure</button>
                            <button className="btn btn-sm btn-outline-secondary">
                              <FaCloudDownloadAlt /> Update
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="row mb-4">
                  <div className="col-lg-6">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Default Scan Settings</h5>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <label htmlFor="scanConcurrency" className="form-label">Max Concurrent Scans</label>
                          <input 
                            type="number" 
                            className="form-control" 
                            id="scanConcurrency" 
                            defaultValue="5"
                            min="1"
                            max="20"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="scanTimeout" className="form-label">Scan Timeout (minutes)</label>
                          <input 
                            type="number" 
                            className="form-control" 
                            id="scanTimeout" 
                            defaultValue="120"
                            min="5"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Scan Intensity</label>
                          <select className="form-select" defaultValue="medium">
                            <option value="low">Low (Less Intrusive)</option>
                            <option value="medium">Medium (Balanced)</option>
                            <option value="high">High (Comprehensive)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-6">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Scheduled Scans</h5>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              id="enableDailyScans" 
                              defaultChecked
                            />
                            <label className="form-check-label" htmlFor="enableDailyScans">
                              Enable Daily Vulnerability Scans
                            </label>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="dailyScanTime" className="form-label">Daily Scan Time</label>
                          <input 
                            type="time" 
                            className="form-control" 
                            id="dailyScanTime" 
                            defaultValue="02:00"
                          />
                        </div>
                        <div className="mb-3">
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              id="enableWeeklyFullScan" 
                              defaultChecked
                            />
                            <label className="form-check-label" htmlFor="enableWeeklyFullScan">
                              Enable Weekly Full Scan
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <label htmlFor="weeklyDay" className="form-label">Day of Week</label>
                            <select className="form-select" id="weeklyDay" defaultValue="sunday">
                              <option value="sunday">Sunday</option>
                              <option value="monday">Monday</option>
                              <option value="tuesday">Tuesday</option>
                              <option value="wednesday">Wednesday</option>
                              <option value="thursday">Thursday</option>
                              <option value="friday">Friday</option>
                              <option value="saturday">Saturday</option>
                            </select>
                          </div>
                          <div className="col-6">
                            <label htmlFor="weeklyTime" className="form-label">Time</label>
                            <input 
                              type="time" 
                              className="form-control" 
                              id="weeklyTime" 
                              defaultValue="04:00"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button type="submit" className="btn btn-primary">
                  <FaSave className="me-2" /> Save Configuration
                </button>
              </Card>
            )}
            
            {/* Users & Roles */}
            {activeTab === 'users' && (
              <Card title="Users & Roles" icon={<FaUsersCog />}>
                <div className="mb-4 text-end">
                  <button className="btn btn-primary">Add New User</button>
                </div>
                
                <div className="table-responsive">
                  <table className="table">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`badge ${
                              user.role === 'Administrator' ? 'bg-danger' : 
                              user.role === 'Analyst' ? 'bg-primary' : 
                              user.role === 'API' ? 'bg-warning' : 'bg-secondary'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${user.active ? 'bg-success' : 'bg-secondary'}`}>
                              {user.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                            <button className="btn btn-sm btn-outline-danger">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <hr className="my-4" />
                
                <div className="row">
                  <div className="col-lg-6">
                    <h5>Role Permissions</h5>
                    <div className="table-responsive mt-3">
                      <table className="table table-sm">
                        <thead className="table-light">
                          <tr>
                            <th>Permission</th>
                            <th>Administrator</th>
                            <th>Analyst</th>
                            <th>Read Only</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>View Dashboard</td>
                            <td><FaCheck className="text-success" /></td>
                            <td><FaCheck className="text-success" /></td>
                            <td><FaCheck className="text-success" /></td>
                          </tr>
                          <tr>
                            <td>View Assets</td>
                            <td><FaCheck className="text-success" /></td>
                            <td><FaCheck className="text-success" /></td>
                            <td><FaCheck className="text-success" /></td>
                          </tr>
                          <tr>
                            <td>Add/Edit Assets</td>
                            <td><FaCheck className="text-success" /></td>
                            <td><FaCheck className="text-success" /></td>
                            <td><FaTimes className="text-danger" /></td>
                          </tr>
                          <tr>
                            <td>Run Scans</td>
                            <td><FaCheck className="text-success" /></td>
                            <td><FaCheck className="text-success" /></td>
                            <td><FaTimes className="text-danger" /></td>
                          </tr>
                          <tr>
                            <td>Manage Settings</td>
                            <td><FaCheck className="text-success" /></td>
                            <td><FaTimes className="text-danger" /></td>
                            <td><FaTimes className="text-danger" /></td>
                          </tr>
                          <tr>
                            <td>Manage Users</td>
                            <td><FaCheck className="text-success" /></td>
                            <td><FaTimes className="text-danger" /></td>
                            <td><FaTimes className="text-danger" /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {/* Notifications */}
            {activeTab === 'notifications' && (
              <Card title="Notification Settings" icon={<FaBell />}>
                <div className="mb-4">
                  <div className="form-check form-switch mb-3">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="enableEmailNotifications" 
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="enableEmailNotifications">
                      Enable Email Notifications
                    </label>
                  </div>
                  
                  <div className="card mb-3">
                    <div className="card-body">
                      <h6>Email Server Configuration</h6>
                      <div className="row g-3 mt-2">
                        <div className="col-md-6">
                          <label htmlFor="smtpServer" className="form-label">SMTP Server</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            id="smtpServer" 
                            defaultValue="smtp.example.com"
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="smtpPort" className="form-label">Port</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            id="smtpPort" 
                            defaultValue="587"
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="smtpEncryption" className="form-label">Encryption</label>
                          <select className="form-select" id="smtpEncryption" defaultValue="tls">
                            <option value="none">None</option>
                            <option value="ssl">SSL</option>
                            <option value="tls">TLS</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="smtpUsername" className="form-label">Username</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            id="smtpUsername" 
                            defaultValue="notifications@example.com"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="smtpPassword" className="form-label">Password</label>
                          <input 
                            type="password" 
                            className="form-control" 
                            id="smtpPassword" 
                            defaultValue="********"
                          />
                        </div>
                        <div className="col-md-12">
                          <label htmlFor="fromAddress" className="form-label">From Address</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            id="fromAddress" 
                            defaultValue="security-alerts@example.com"
                          />
                        </div>
                        <div className="col-12">
                          <button type="button" className="btn btn-outline-primary">
                            Test Email Configuration
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card">
                    <div className="card-body">
                      <h6>Notification Events</h6>
                      <div className="mt-2">
                        <div className="form-check mb-2">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="notifyCriticalVuln" 
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="notifyCriticalVuln">
                            Critical Vulnerabilities Found
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="notifyHighVuln" 
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="notifyHighVuln">
                            High Vulnerabilities Found
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="notifyNewAsset"
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="notifyNewAsset">
                            New Asset Discovered
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="notifyScanComplete" 
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="notifyScanComplete">
                            Scan Completed
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="notifyScanFailed"
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="notifyScanFailed">
                            Scan Failed
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="form-check form-switch mb-3">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="enableWebhooks" 
                    />
                    <label className="form-check-label" htmlFor="enableWebhooks">
                      Enable Webhook Notifications
                    </label>
                  </div>
                  
                  <div className="card">
                    <div className="card-body">
                      <h6>Webhook Configuration</h6>
                      <div className="row g-3 mt-2">
                        <div className="col-md-12">
                          <label htmlFor="webhookUrl" className="form-label">Webhook URL</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            id="webhookUrl" 
                            placeholder="https://example.com/webhook"
                          />
                        </div>
                        <div className="col-12">
                          <button type="button" className="btn btn-outline-primary">
                            Test Webhook
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button type="submit" className="btn btn-primary">
                  <FaSave className="me-2" /> Save Notification Settings
                </button>
              </Card>
            )}
            
            {/* API Access */}
            {activeTab === 'api' && (
              <Card title="API Access" icon={<FaKey />}>
                <div className="alert alert-warning mb-4">
                  <FaExclamationTriangle className="me-2" />
                  API keys provide full access to the EASM system. Treat them as sensitive credentials.
                </div>
                
                <div className="mb-4">
                  <h5>Your API Keys</h5>
                  <div className="table-responsive mt-3">
                    <table className="table">
                      <thead className="table-light">
                        <tr>
                          <th>Key Name</th>
                          <th>Created</th>
                          <th>Last Used</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Default API Key</td>
                          <td>Apr 15, 2025</td>
                          <td>May 5, 2025</td>
                          <td>
                            <span className="badge bg-success">Active</span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">Show Key</button>
                            <button className="btn btn-sm btn-outline-danger">Revoke</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Integration Key</td>
                          <td>May 1, 2025</td>
                          <td>May 7, 2025</td>
                          <td>
                            <span className="badge bg-success">Active</span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">Show Key</button>
                            <button className="btn btn-sm btn-outline-danger">Revoke</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <button className="btn btn-primary mt-2">
                    <FaKey className="me-2" /> Generate New API Key
                  </button>
                </div>
                
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">API Documentation</h5>
                  </div>
                  <div className="card-body">
                    <p>
                      The EASM system provides a RESTful API for integration with other security tools and services.
                      You can use the API to programmatically access all features available in the UI.
                    </p>
                    <div className="mt-3">
                      <h6>Available Endpoints:</h6>
                      <ul>
                        <li><code>/api/v1/assets</code> - Manage assets</li>
                        <li><code>/api/v1/scans</code> - Control scanning operations</li>
                        <li><code>/api/v1/vulnerabilities</code> - Access vulnerability data</li>
                        <li><code>/api/v1/reports</code> - Generate and retrieve reports</li>
                      </ul>
                    </div>
                    <div className="mt-4">
                      <a href="/api-docs" className="btn btn-outline-primary" target="_blank">
                        View Full API Documentation
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
