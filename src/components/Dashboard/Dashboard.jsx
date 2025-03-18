// Dashboard.jsx
import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ role }) => {
  const [activeTab, setActiveTab] = useState('customers');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const modules = [
    {
      id: 'customers',
      title: 'Customers Management',
      icon: '👥',
      description: 'Manage customer profiles, history, and preferences',
      color: '#3b82f6'
    },
    {
      id: 'bookings',
      title: 'Booking Management',
      icon: '📅',
      description: 'Schedule and manage appointments and reservations',
      color: '#10b981'
    },
    {
      id: 'services',
      title: 'Service Category Management',
      icon: '🔧',
      description: 'Create and manage service categories and offerings',
      color: '#f59e0b'
    },
    {
      id: 'products',
      title: 'Product Management',
      icon: '📦',
      description: 'Inventory and product catalog management',
      color: '#8b5cf6'
    },
    {
      id: 'reports',
      title: 'Reports Generation',
      icon: '📊',
      description: 'Generate and view business analytics and reports',
      color: '#ef4444'
    },
    {
      id: 'staff',
      title: 'Manage Staff',
      icon: '👤',
      description: 'Staff scheduling, permissions, and management',
      color: '#14b8a6'
    }
  ];

  // Find the active module
  const activeModule = modules.find(module => module.id === activeTab);

  // Placeholder content for each tab
  const renderTabContent = () => {
    return (
      <div className="tab-content">
        <div className="module-header" style={{ backgroundColor: activeModule.color }}>
          <span className="module-icon-large">{activeModule.icon}</span>
          <h2>{activeModule.title}</h2>
        </div>
        <div className="module-description">
          <p>{activeModule.description}</p>
        </div>
        <div className="placeholder-content">
          <p>This is the {activeModule.title} module</p>
        </div>
      </div>
    );
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <img width={150} src="/logo-smart.png"></img>
          <button className="collapse-btn" onClick={toggleSidebar}>
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>
        
        <div className="sidebar-user">
          <div className="user-avatar">{role.charAt(0).toUpperCase()}</div>
          {!sidebarCollapsed && (
            <div className="user-details">
              <div className="user-role">{role}</div>
              <div className="user-status">Online</div>
            </div>
          )}
        </div>
        
        <nav className="sidebar-nav">
          {modules.map(module => (
            <button
              key={module.id}
              className={`sidebar-nav-item ${activeTab === module.id ? 'active' : ''}`}
              onClick={() => setActiveTab(module.id)}
              title={sidebarCollapsed ? module.title : ''}
            >
              <span className="sidebar-icon" style={{ backgroundColor: activeTab === module.id ? module.color : 'transparent' }}>
                {module.icon}
              </span>
              {!sidebarCollapsed && <span className="sidebar-text">{module.title}</span>}
            </button>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-button">
            <span className="sidebar-icon">🚪</span>
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
      
      <main className={`dashboard-main ${sidebarCollapsed ? 'expanded' : ''}`}>
        <header className="top-header">
          <h2>{activeModule.title}</h2>
          <div className="header-actions">
            <button className="action-button">⚙️ Settings</button>
            <button className="action-button">🔔 Notifications</button>
          </div>
        </header>
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Dashboard;