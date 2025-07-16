import React, { useEffect, useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { BarChart, LineChart } from '../components/DashboardChart';
import { TopRevenueTable, AdminActivityTable, EmployeeActivityTable } from '../components/DashboardTable';

// 매출 계산에 사용할 필드 목록
const salesFields = [
  '예약매출', '워크인매출', '직원식사매출', '배달매출전',
  'POS현금매출', 'POS카드매출', '계좌이체', '음료테이크아웃매출',
  '네이버QR주문금액', '푸드콘사용금액'
];

function sumSales(data: any) {
  return salesFields.reduce((sum, key) => sum + (parseInt(data[key] || '0', 10)), 0);
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dailySales, setDailySales] = useState<{ date: string, total: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const snap = await getDocs(collection(db, 'employeeInputs'));
      const arr: { date: string, total: number }[] = [];
      snap.forEach(doc => {
        const data = doc.data();
        const total = sumSales(data);
        arr.push({ date: doc.id, total });
      });
      // 날짜순 정렬
      arr.sort((a, b) => a.date.localeCompare(b.date));
      setDailySales(arr);
      setLoading(false);
    }
    fetchData();
  }, []);

  // 최근 일자 데이터
  const latest = dailySales.length > 0 ? dailySales[dailySales.length - 1] : null;

  // 차트용 데이터 (일별 총매출)
  const barData = dailySales.map(d => d.total);
  const barLabels = dailySales.map(d => d.date.slice(5)); // MM-DD

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Overview</h2>
        <p>파이어베이스에 저장된 실제 데이터를 기반으로 매출을 시각화합니다.</p>
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
        <SummaryCard title="총 매출 (최근일자)" value={latest ? latest.total.toLocaleString() + '원' : '-'} />
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
          <div className="card-title" style={{ marginBottom: 12 }}>일별 총 매출</div>
          <BarChartCustom data={barData} labels={barLabels} />
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

// 커스텀 BarChart (실제 데이터 기반)
const BarChartCustom: React.FC<{ data: number[]; labels: string[] }> = ({ data, labels }) => (
  <svg width="100%" height="120" viewBox={`0 0 ${Math.max(320, data.length * 30)} 120`}>
    {data.map((v, i) => (
      <rect
        key={i}
        x={i * 30 + 20}
        y={120 - v / 5000}
        width={18}
        height={v / 5000}
        fill="#2d8cff"
        rx={4}
      />
    ))}
    {labels.map((label, i) => (
      <text key={label} x={i * 30 + 29} y={115} fontSize={10} textAnchor="middle" fill="#7b8aaf">{label}</text>
    ))}
  </svg>
);

export default Dashboard; 