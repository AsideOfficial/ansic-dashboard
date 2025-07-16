import React from 'react';
import SummaryCard from '../components/SummaryCard';
import { BarChart, LineChart } from '../components/DashboardChart';
import { TopRevenueTable, AdminActivityTable, EmployeeActivityTable } from '../components/DashboardTable';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Overview</h2>
        <p>All key metrics and activity at a glance</p>
      </div>
      {/* 상단 필터 바 */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        <select style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e0e6ef', fontWeight: 500 }}>
          <option>Timeframe: All-time</option>
        </select>
        <select style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e0e6ef', fontWeight: 500 }}>
          <option>Client: All</option>
        </select>
        <select style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e0e6ef', fontWeight: 500 }}>
          <option>Workspace: All</option>
        </select>
      </div>
      {/* 요약 카드 */}
      <div className="summary-grid">
        <SummaryCard title="Users" value="638,402" donutPercent={0.75} donutColors={["#2d8cff"]}>
          <div style={{ fontSize: 13, color: '#7f8c8d', marginTop: 8 }}>
            <span style={{ color: '#2d8cff' }}>●</span> 62% New &nbsp;
            <span style={{ color: '#7b8aaf' }}>●</span> 13% Returning &nbsp;
            <span style={{ color: '#b0b8c1' }}>●</span> 23% Inactive
          </div>
        </SummaryCard>
        <SummaryCard title="Subscriptions" value="468,200" donutPercent={0.4} donutColors={["#2d8cff"]}>
          <div style={{ fontSize: 13, color: '#7f8c8d', marginTop: 8 }}>
            <span style={{ color: '#2d8cff' }}>●</span> 40% Paid &nbsp;
            <span style={{ color: '#b0b8c1' }}>●</span> 60% Trial
          </div>
        </SummaryCard>
        <SummaryCard title="Revenue" value="$2.5B" />
        <SummaryCard title="Revenue" value="$3,500" />
        <SummaryCard title="Revenue" value="$2,387" />
        <SummaryCard title="ARPU" value="$50m" />
        <SummaryCard title="TTV" value="7 Days" />
        <SummaryCard title="PQLs" value="850" />
      </div>
      {/* 차트 영역 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 24, marginBottom: 24 }}>
        <div className="chart-section">
          <div className="card-title" style={{ marginBottom: 12 }}>Overall User Acquisition <span style={{ color: '#b0b8c1', fontWeight: 400, fontSize: 13 }}>(Month)</span></div>
          <BarChart />
        </div>
        <div className="chart-section">
          <div className="card-title" style={{ marginBottom: 12 }}>Activity <span style={{ color: '#b0b8c1', fontWeight: 400, fontSize: 13 }}>(Month)</span></div>
          <LineChart />
        </div>
      </div>
      {/* 표 영역 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 24 }}>
        <TopRevenueTable />
        <AdminActivityTable />
        <EmployeeActivityTable />
      </div>
    </div>
  );
};

export default Dashboard; 