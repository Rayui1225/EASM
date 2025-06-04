import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { FaPlayCircle, FaStopCircle, FaInfoCircle } from 'react-icons/fa';

export default function Demo() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const demos = [
    {
      id: 'dashboard-overview',
      title: 'Dashboard Overview',
      description: 'Walkthrough of the main dashboard features including asset statistics, vulnerability trends, and recent scan tasks.',
      duration: '2:15',
    },
    {
      id: 'asset-discovery',
      title: 'Asset Discovery Demo',
      description: 'Demonstration of the asset discovery process and how newly discovered assets are categorized and assessed for vulnerabilities.',
      duration: '3:45',
    },
    {
      id: 'vulnerability-management',
      title: 'Vulnerability Management',
      description: 'How to identify, prioritize, and manage vulnerabilities across your attack surface.',
      duration: '4:10',
    },
    {
      id: 'scan-configurations',
      title: 'Configuring Scan Schedules',
      description: 'How to set up and manage automated scan schedules for continuous monitoring.',
      duration: '2:50',
    },
    {
      id: 'reporting',
      title: 'Security Reporting',
      description: 'Generating and customizing security reports for different stakeholders.',
      duration: '3:30',
    },
  ];

  const startDemo = (demoId: string) => {
    setActiveDemo(demoId);
    setIsPlaying(true);
  };

  const stopDemo = () => {
    setIsPlaying(false);
  };

  return (
    <Layout>
      <Head>
        <title>Feature Demonstrations | EASM</title>
        <meta name="description" content="EASM Feature Demonstrations" />
      </Head>

      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Feature Demonstrations</h1>
        </div>

        <div className="row">
          <div className="col-12 col-lg-8 mb-4">
            <Card title="Demo Player" className="h-100">
              {activeDemo ? (
                <div className="demo-player">
                  <div className="demo-video bg-dark d-flex align-items-center justify-content-center text-white" style={{ height: '400px', borderRadius: '4px' }}>
                    {isPlaying ? (
                      <div className="text-center">
                        <h3>Now Playing: {demos.find(d => d.id === activeDemo)?.title}</h3>
                        <p className="mb-4">This would be a video player in the production version.</p>
                        <button className="btn btn-danger" onClick={stopDemo}>
                          <FaStopCircle className="me-2" /> Stop Demo
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <h3>{demos.find(d => d.id === activeDemo)?.title}</h3>
                        <p>Click play to start the demonstration</p>
                        <button className="btn btn-primary" onClick={() => setIsPlaying(true)}>
                          <FaPlayCircle className="me-2" /> Play Demo
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="demo-description mt-3">
                    <h5>{demos.find(d => d.id === activeDemo)?.title}</h5>
                    <p>{demos.find(d => d.id === activeDemo)?.description}</p>
                    <div className="d-flex justify-content-between">
                      <span>Duration: {demos.find(d => d.id === activeDemo)?.duration}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-5">
                  <FaInfoCircle size={48} className="mb-3 text-secondary" />
                  <h4>Select a demo from the list to begin</h4>
                  <p className="text-muted">Choose from the available demonstrations to see EASM features in action.</p>
                </div>
              )}
            </Card>
          </div>

          <div className="col-12 col-lg-4">
            <Card title="Available Demos">
              <div className="list-group">
                {demos.map((demo) => (
                  <button
                    key={demo.id}
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                      activeDemo === demo.id ? 'active' : ''
                    }`}
                    onClick={() => startDemo(demo.id)}
                  >
                    <div>
                      <h6 className="mb-1">{demo.title}</h6>
                      <small className={activeDemo === demo.id ? 'text-light' : 'text-muted'}>
                        {demo.duration}
                      </small>
                    </div>
                    <FaPlayCircle />
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
        
        <div className="row mt-4">
          <div className="col-12">
            <Card title="About EASM Features">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <h5>Asset Discovery & Management</h5>
                  <ul className="list-unstyled">
                    <li>✓ Automated asset discovery across multiple environments</li>
                    <li>✓ Asset classification and tagging</li>
                    <li>✓ Risk scoring and prioritization</li>
                    <li>✓ Relationship mapping between assets</li>
                  </ul>
                </div>
                <div className="col-md-6 mb-4">
                  <h5>Vulnerability Management</h5>
                  <ul className="list-unstyled">
                    <li>✓ Continuous vulnerability scanning</li>
                    <li>✓ Integration with threat intelligence</li>
                    <li>✓ Remediation guidance and tracking</li>
                    <li>✓ Compliance mapping (NIST, CIS, etc.)</li>
                  </ul>
                </div>
                <div className="col-md-6 mb-4">
                  <h5>Attack Surface Monitoring</h5>
                  <ul className="list-unstyled">
                    <li>✓ Shadow IT detection</li>
                    <li>✓ Cloud misconfiguration detection</li>
                    <li>✓ Domain and subdomain monitoring</li>
                    <li>✓ SSL/TLS certificate monitoring</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5>Reporting & Integrations</h5>
                  <ul className="list-unstyled">
                    <li>✓ Customizable executive dashboards</li>
                    <li>✓ Scheduled reports</li>
                    <li>✓ API integrations with security tools</li>
                    <li>✓ Ticketing system integration</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
