import React from 'react';

type TopbarProps = {
  activeTab: 'sales' | 'person' | 'product';
  onTabChange: (tab: 'sales' | 'person' | 'product') => void;
  activePage: string;
};

const tabList = [
  { key: 'sales', label: '매출' },
  { key: 'person', label: '인원' },
  { key: 'product', label: '상품 수' },
];

const pageTitles: Record<string, string> = {
  dashboard: '대시보드',
  employee: '직원 입력',
  report: '보고서',
};

const Topbar: React.FC<TopbarProps> = ({ activeTab, onTabChange, activePage }) => {
  return (
    <header className="topbar" style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '0 40px', borderBottom: '1px solid #e0e6ef', minHeight: 68, background: '#fff' }}>
      <div className="topbar-title" style={{ fontSize: '1.35rem', fontWeight: 700, color: '#222', letterSpacing: 0.5, whiteSpace: 'nowrap' }}>{pageTitles[activePage] || ''}</div>
      {activePage === 'dashboard' && (
        <nav style={{ display: 'flex', gap: 24 }}>
          {tabList.map(tab => (
            <button
              key={tab.key}
              style={{
                background: activeTab === tab.key ? '#f4f8ff' : 'none',
                color: activeTab === tab.key ? '#2d8cff' : '#7f8c8d',
                border: 'none',
                borderRadius: 8,
                padding: '8px 20px',
                fontWeight: activeTab === tab.key ? 700 : 500,
                fontSize: 15,
                boxShadow: activeTab === tab.key ? '0 1px 2px rgba(45,140,255,0.04)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onClick={() => onTabChange(tab.key as any)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Topbar; 