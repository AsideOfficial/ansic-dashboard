import React from 'react';

type TopbarProps = {
  activePage: string;
};

const pageTitles: Record<string, string> = {
  dashboard: '대시보드',
  employee: '직원 입력',
  report: '보고서',
};

const Topbar: React.FC<TopbarProps> = ({ activePage }) => {
  return (
    <header className="topbar">
      <div className="topbar-title">{pageTitles[activePage] || ''}</div>
      <nav style={{ display: 'flex', gap: 24 }}>
        <button style={{
          background: '#f4f8ff',
          color: '#2d8cff',
          border: 'none',
          borderRadius: 8,
          padding: '8px 20px',
          fontWeight: 600,
          fontSize: 15,
          boxShadow: '0 1px 2px rgba(45,140,255,0.04)',
          cursor: 'pointer',
        }}>Overview</button>
        <button style={{
          background: 'none',
          color: '#7f8c8d',
          border: 'none',
          fontWeight: 500,
          fontSize: 15,
          cursor: 'pointer',
        }}>Product</button>
        <button style={{
          background: 'none',
          color: '#7f8c8d',
          border: 'none',
          fontWeight: 500,
          fontSize: 15,
          cursor: 'pointer',
        }}>Sales</button>
        <button style={{
          background: 'none',
          color: '#7f8c8d',
          border: 'none',
          fontWeight: 500,
          fontSize: 15,
          cursor: 'pointer',
        }}>Marketing</button>
      </nav>
    </header>
  );
};

export default Topbar; 