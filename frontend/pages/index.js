import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import VulnerabilityTrendChart from '../components/VulnerabilityTrendChart';
import AssetDistributionChart from '../components/AssetDistributionChart';
import RecentScanTasks from '../components/RecentScanTasks';

// Icons
import { 
  FaCubes, 
  FaServer, 
  FaExclamationTriangle, 
  FaGlobe,
  FaShieldAlt,
  FaChartLine
} from 'react-icons/fa';

export default function Dashboard() {
  const [status, setStatus] = useState('Loading...');
  const [assetStats, setAssetStats] = useState({
    totalAssets: 145,
    criticalVulnerabilities: 23,
    highRiskAssets: 17,
    activeAssets: 132
  });

  // Mock data for the charts and tables
  const vulnerabilityTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Critical',
        data: [12, 19, 15, 23, 18, 23],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
      {
        label: 'High',
        data: [25, 32, 28, 35, 29, 33],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Medium',
        data: [45, 52, 49, 55, 47, 58],
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
        tension: 0.3,
      }
    ],
  };

  const assetDistributionData = {
    labels: ['Web Servers', 'Databases', 'Cloud Resources', 'Network Devices', 'Endpoints'],
    datasets: [
      {
        data: [65, 22, 38, 15, 42],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const recentScanTasks = [
    {
      id: '1',
      name: 'External Subnet Scan',
      type: 'Network Scan',
      status: 'completed',
      target: '203.0.113.0/24',
      startTime: '2025-05-06T14:30:00Z',
      endTime: '2025-05-06T15:45:00Z'
    },
    {
      id: '2',
      name: 'Web App Vulnerability Scan',
      type: 'Vulnerability Scan',
      status: 'failed',
      target: 'https://app.example.com',
      startTime: '2025-05-06T16:00:00Z',
      endTime: '2025-05-06T16:15:00Z'
    },
    {
      id: '3',
      name: 'Domain Enumeration',
      type: 'Discovery Scan',
      status: 'completed',
      target: 'example.com',
      startTime: '2025-05-06T12:00:00Z',
      endTime: '2025-05-06T14:00:00Z'
    },
    {
      id: '4',
      name: 'Cloud Resources Audit',
      type: 'Security Audit',
      status: 'running',
      target: 'AWS Account',
      startTime: '2025-05-07T08:30:00Z',
      endTime: undefined
    }
  ];

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch('/api/health');
        if (response.ok) {
          setStatus('Backend is connected!');
        } else {
          setStatus('Backend is reachable but reported an error');
        }
      } catch (error) {
        setStatus('Cannot connect to backend');
      }
    };

    checkBackendStatus();
    
    // In a real app, we would fetch the dashboard data here
    // For now we're using mock data
  }, []);

  return (
    <Layout>
      <Head>
        <title>Dashboard | EASM</title>
        <meta name="description" content="Enterprise Attack Surface Management Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Dashboard</h1>
          <div>
            <span className="badge bg-secondary me-2">Last updated: {new Date().toISOString().split('T')[0]}</span>
            <span className={`badge ${status.includes('connected') ? 'bg-success' : 'bg-danger'}`}>
              {status}
            </span>
          </div>
        </div>
        
        {/* Asset Statistics */}
        <div className="row mb-4">
          <div className="col-md-6 col-lg-3 mb-3 mb-lg-0">
            <StatCard 
              title="Total Assets" 
              value={assetStats.totalAssets}
              icon={<FaCubes size={18} />} 
              color="bg-info-light" 
              subtext="Monitored assets"
            />
          </div>
          <div className="col-md-6 col-lg-3 mb-3 mb-lg-0">
            <StatCard 
              title="Critical Vulnerabilities" 
              value={assetStats.criticalVulnerabilities}
              icon={<FaExclamationTriangle size={18} />}  
              color="bg-danger-light"
              subtext="Needs immediate attention"
            />
          </div>
          <div className="col-md-6 col-lg-3 mb-3 mb-lg-0">
            <StatCard 
              title="High Risk Assets" 
              value={assetStats.highRiskAssets}
              icon={<FaShieldAlt size={18} />} 
              color="bg-warning-light"
              subtext="Public-facing with vulnerabilities" 
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <StatCard 
              title="Active Assets" 
              value={assetStats.activeAssets}
              icon={<FaServer size={18} />} 
              color="bg-success-light"
              subtext="Currently online" 
            />
          </div>
        </div>
        
        {/* Charts Row */}
        <div className="row mb-4">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <Card title="Vulnerability Trend" icon={<FaChartLine />}>
              <VulnerabilityTrendChart data={vulnerabilityTrendData} />
            </Card>
          </div>
          <div className="col-lg-4">
            <Card title="Asset Distribution" icon={<FaGlobe />}>
              <AssetDistributionChart data={assetDistributionData} />
            </Card>
          </div>
        </div>
        
        {/* Recent Scan Tasks */}
        <div className="row">
          <div className="col-12">
            <Card title="Recent Scan Tasks">
              <RecentScanTasks tasks={recentScanTasks} />
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
