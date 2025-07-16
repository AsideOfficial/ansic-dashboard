import React from 'react';

type SidebarProps = {
  activePage: string;
  onPageChange: (page: string) => void;
};

const menu = [
  { key: 'dashboard', label: '대시보드', icon: (color: string) => (
    <svg width="20" height="20" fill="none"><rect x="2" y="2" width="16" height="16" rx="4" fill={color} fillOpacity=".12"/><rect x="6" y="6" width="8" height="8" rx="2" fill={color}/></svg>
  ) },
  { key: 'employee', label: '직원 입력', icon: (color: string) => (
    <svg width="20" height="20" fill="none"><rect x="2" y="2" width="16" height="16" rx="4" fill={color} fillOpacity=".12"/><path d="M10 7a2 2 0 110 4 2 2 0 010-4zm0 6c-2.21 0-4 1.12-4 2.5V16h8v-0.5c0-1.38-1.79-2.5-4-2.5z" fill={color}/></svg>
  ) },
  { key: 'report', label: '보고서', icon: (color: string) => (
    <svg width="20" height="20" fill="none"><rect x="2" y="2" width="16" height="16" rx="4" fill={color} fillOpacity=".12"/><path d="M7 7h6v2H7V7zm0 4h6v2H7v-2z" fill={color}/></svg>
  ) },
];

const Sidebar: React.FC<SidebarProps> = ({ activePage, onPageChange }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 32px 40px 32px' }}>
        <span style={{ display: 'inline-flex', width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #2d8cff 60%, #6ecbff 100%)', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#fff" fillOpacity=".2"/></svg>
        </span>
        <span style={{ fontWeight: 800, fontSize: '1.5rem', color: '#2d8cff', letterSpacing: 1 }}>ANSIC</span>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menu.map((item) => {
            const isActive = activePage === item.key;
            const color = isActive ? '#2d8cff' : '#7b8aaf';
            return (
              <li key={item.key}>
                <button
                  className={`nav-item${isActive ? ' active' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}
                  onClick={() => onPageChange(item.key)}
                >
                  {isActive && <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, borderRadius: '4px', background: '#2d8cff' }} />}
                  <span>{item.icon(color)}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 