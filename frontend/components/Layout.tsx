import React, { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaCubes, FaBug, FaSearch, FaCog, FaBars, FaTimes, FaPlayCircle, FaBook } from 'react-icons/fa';
import NotificationCenter from './NotificationCenter';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="d-flex flex-column vh-100">      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand fw-bold">
            EASM
          </Link>
          <button 
            className="navbar-toggler d-lg-none" 
            type="button" 
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="ms-auto d-flex align-items-center">
            <div className="d-none d-lg-block me-3">
              <span className="text-white">Enterprise Attack Surface Management</span>
            </div>
            <div className="me-2">
              <NotificationCenter />
            </div>
            <div className="dropdown">
              <button className="btn btn-link text-white" type="button">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-light text-primary d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                    <strong>A</strong>
                  </div>
                  <span className="d-none d-lg-inline">Admin</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container-fluid flex-grow-1">
        <div className="row h-100">
          {/* Sidebar */}
          <div className={`col-12 col-lg-2 bg-light p-0 sidebar ${sidebarOpen ? 'show' : ''}`}>
            <div className="d-flex flex-column p-3 h-100">              <ul className="nav nav-pills flex-column">
                <li className="nav-item mb-2">
                  <Link href="/" className="nav-link link-dark">
                    <FaHome className="me-2" /> Dashboard
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link href="/assets" className="nav-link link-dark">
                    <FaCubes className="me-2" /> Assets
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link href="/vulnerabilities" className="nav-link link-dark">
                    <FaBug className="me-2" /> Vulnerabilities
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link href="/scans" className="nav-link link-dark">
                    <FaSearch className="me-2" /> Scans
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link href="/settings" className="nav-link link-dark">
                    <FaCog className="me-2" /> Settings
                  </Link>
                </li>
                <li className="nav-item mt-3 mb-2">
                  <hr />
                </li>
                <li className="nav-item mb-2">
                  <Link href="/demo" className="nav-link link-dark">
                    <FaPlayCircle className="me-2" /> Demo
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link href="/documentation" className="nav-link link-dark">
                    <FaBook className="me-2" /> Documentation
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Main Content */}
          <main className="col-12 col-lg-10 py-4 px-4">
            {children}
          </main>
        </div>
      </div>
      
      <footer className="footer bg-light py-3">
        <div className="container-fluid">
          <p className="text-center mb-0">© {new Date().getFullYear()} Enterprise Attack Surface Management</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
