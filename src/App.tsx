import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import EmployeeInput from './pages/EmployeeInput';
import Report from './pages/Report';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  // 상단 탭 상태(매출/인원/상품 수)
  const [activeTab, setActiveTab] = useState<'sales' | 'person' | 'product'>('sales');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard activeTab={activeTab} onTabChange={setActiveTab} />;
      case 'employee':
        return <EmployeeInput />;
      case 'report':
        return <Report />;
      default:
        return <Dashboard activeTab={activeTab} onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <div className="main-content">
        <Topbar activeTab={activeTab} onTabChange={setActiveTab} activePage={activePage} />
        <div className="page-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;
