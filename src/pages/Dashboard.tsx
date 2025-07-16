import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

// 매출 관련 필드
const salesFields = [
  { key: '예약매출', label: '예약 매출' },
  { key: '워크인매출', label: '워크인 매출' },
  { key: '환자식사매출', label: '환자 식사 매출' },
  { key: '직원식사매출', label: '직원 식사 매출' },
  { key: '배달매출전', label: '배달 매출' },
  { key: '계좌이체', label: '계좌이체' },
  { key: '음료테이크아웃매출', label: '테이크아웃 음료 매출' },
  { key: '네이버QR주문금액', label: '네이버 QR 주문 매출' },
  { key: '푸드콘사용금액', label: '푸드콘 매출' },
];

type SalesRow = { [key: string]: string | number } & { id: string };

type GroupedPeriod = {
  period: string;
  rows: SalesRow[];
};

type TotalSalesByPeriod = {
  period: string;
  total: number;
} & { [key: string]: number | string };

function sumFields(data: { [key: string]: any }, keys: string[]): number {
  return keys.reduce((sum: number, key: string) => sum + (parseInt(data[key] || '0', 10)), 0);
}

const Dashboard: React.FC = () => {
  // 기간 필터 상태
  const [period, setPeriod] = useState<'year' | 'month' | 'week' | 'day'>('month');
  const [employeeInputs, setEmployeeInputs] = useState<SalesRow[]>([]);
  const [loading, setLoading] = useState(true);

  // 데이터 fetch
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const snap = await getDocs(collection(db, 'employeeInputs'));
      const arr: SalesRow[] = [];
      snap.forEach(doc => {
        arr.push({ id: doc.id, ...doc.data() });
      });
      arr.sort((a, b) => a.id.localeCompare(b.id));
      setEmployeeInputs(arr);
      setLoading(false);
    }
    fetchData();
  }, []);

  // 집계: 일별, 월별, 연별 등 그룹핑
  function groupByPeriod(data: SalesRow[], period: 'year' | 'month' | 'week' | 'day'): GroupedPeriod[] {
    const map = new Map<string, SalesRow[]>();
    data.forEach((row: SalesRow) => {
      let key = row.id;
      if (period === 'year') key = row.id.slice(0, 4);
      else if (period === 'month') key = row.id.slice(0, 7);
      else if (period === 'week') key = row.id.slice(0, 7) + '-W' + getWeekOfMonth(row.id);
      // else day 그대로
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(row);
    });
    return Array.from(map.entries()).map(([k, v]) => ({ period: k, rows: v }));
  }
  function getWeekOfMonth(dateStr: string): number {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return Math.ceil((date.getDate() + new Date(y, m - 1, 1).getDay()) / 7);
  }

  // 매출 집계
  const grouped = groupByPeriod(employeeInputs, period);
  const totalSalesByPeriod: TotalSalesByPeriod[] = grouped.map(g => ({
    period: g.period,
    total: sumFields(
      g.rows.reduce((acc: { [key: string]: number }, cur: SalesRow) => {
        salesFields.forEach(f => {
          acc[f.key] = (acc[f.key] || 0) + parseInt(cur[f.key] as string || '0', 10);
        });
        return acc;
      }, {}),
      salesFields.map(f => f.key)
    ),
    ...salesFields.reduce((acc: { [key: string]: number }, f) => {
      acc[f.key] = g.rows.reduce((sum: number, row: SalesRow) => sum + parseInt(row[f.key] as string || '0', 10), 0);
      return acc;
    }, {})
  }));

  // 최근 기간 데이터
  const latest = totalSalesByPeriod.length > 0 ? totalSalesByPeriod[totalSalesByPeriod.length - 1] : null;

  // 목표/순이익 등은 임시(추후 로직 추가)
  const 목표 = 10000000; // 예시 목표
  const 순이익 = latest ? Math.round((latest.total as number) * 0.25) : 0; // 예시: 25% 마진
  const 미달성 = latest ? Math.max(0, 목표 - (latest.total as number)) : 0;

  // 인원 집계
  const personFields = [
    { key: '예약인원수', label: '예약 인원' },
    { key: '워크인인원수', label: '워크인 인원' },
  ];
  const channelFields = [
    { key: '유선전화유입', label: '유선전화' },
    { key: '캐치테이블유입', label: '캐치테이블' },
    { key: '네이버예약유입', label: '네이버예약' },
  ];
  const latestPerson = grouped.length > 0 ? grouped[grouped.length - 1].rows : [];
  const sumPerson = (key: string) => latestPerson.reduce((sum, row) => sum + parseInt(row[key] as string || '0', 10), 0);
  const 예약인원 = sumPerson('예약인원수');
  const 워크인인원 = sumPerson('워크인인원수');
  const 총방문인원 = 예약인원 + 워크인인원;
  const 회전율 = (총방문인원 / 30).toFixed(2);
  const 채널유입 = channelFields.map(f => ({ label: f.label, value: sumPerson(f.key) }));
  const 채널유입합 = 채널유입.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="dashboard" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* 날짜/기간 필터 */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>기간 선택</h2>
        <select value={period} onChange={e => setPeriod(e.target.value as any)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e0e6ef', fontWeight: 500 }}>
          <option value="year">연도별</option>
          <option value="month">월별</option>
          <option value="week">주별</option>
          <option value="day">일별</option>
        </select>
      </section>

      {/* A) 매출 */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18 }}>A. 매출</h2>
        <div style={{ display: 'flex', gap: 18, marginBottom: 24 }}>
          <div className="summary-card">총 매출<br /><b>{latest ? (latest.total as number).toLocaleString() + '원' : '-'}</b></div>
          <div className="summary-card">순이익<br /><b>{latest ? 순이익.toLocaleString() + '원' : '-'}</b></div>
          <div className="summary-card">매출 목표/달성률<br /><b>{목표.toLocaleString()}원 / {latest ? (((latest.total as number) / 목표) * 100).toFixed(1) : '-'}%</b></div>
        </div>
        <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
          {/* 총 매출 BarChart */}
          <div style={{ flex: 2, background: '#fff', borderRadius: 12, minHeight: 180, boxShadow: '0 2px 12px rgba(30,34,40,0.06)', padding: 18 }}>
            <b>총 매출</b>
            <BarChartCustom data={totalSalesByPeriod.map(d => d.total as number)} labels={totalSalesByPeriod.map(d => d.period)} />
          </div>
          {/* 매출 세부 항목 StackedBarChart */}
          <div style={{ flex: 3, background: '#fff', borderRadius: 12, minHeight: 180, boxShadow: '0 2px 12px rgba(30,34,40,0.06)', padding: 18 }}>
            <b>매출 세부 항목</b>
            <StackedBarChart data={totalSalesByPeriod} fields={salesFields} />
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, minHeight: 120, boxShadow: '0 2px 12px rgba(30,34,40,0.06)', padding: 18 }}>
          <b>매출 목표/실적/미달성</b>
          <table style={{ width: '100%', marginTop: 12, fontSize: 15 }}>
            <thead>
              <tr style={{ color: '#7b8aaf', fontWeight: 700 }}>
                <th>기간</th>
                <th>실적</th>
                <th>목표</th>
                <th>미달성</th>
              </tr>
            </thead>
            <tbody>
              {totalSalesByPeriod.map(d => (
                <tr key={d.period}>
                  <td>{d.period}</td>
                  <td>{(d.total as number).toLocaleString()}원</td>
                  <td>{목표.toLocaleString()}원</td>
                  <td>{Math.max(0, 목표 - (d.total as number)).toLocaleString()}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* B) 인원 */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18 }}>B. 인원</h2>
        <div style={{ display: 'flex', gap: 18, marginBottom: 24 }}>
          <div className="summary-card">예약 인원<br /><b>{예약인원.toLocaleString()}명</b></div>
          <div className="summary-card">워크인 인원<br /><b>{워크인인원.toLocaleString()}명</b></div>
          <div className="summary-card">총 방문 인원<br /><b>{총방문인원.toLocaleString()}명</b></div>
          <div className="summary-card">회전율<br /><b>{회전율}</b></div>
          <div className="summary-card">채널 유입<br /><b>{채널유입합.toLocaleString()}명</b></div>
        </div>
        <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
          <div style={{ flex: 2, background: '#fff', borderRadius: 12, minHeight: 180, boxShadow: '0 2px 12px rgba(30,34,40,0.06)', padding: 18 }}>
            <b>방문 인원 추이</b>
            <BarChartCustom data={grouped.map(g => g.rows.reduce((sum, row) => sum + parseInt(row['예약인원수'] as string || '0', 10) + parseInt(row['워크인인원수'] as string || '0', 10), 0))} labels={grouped.map(g => g.period)} />
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: 12, minHeight: 180, boxShadow: '0 2px 12px rgba(30,34,40,0.06)', padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <b>채널별 유입</b>
            <PieChart data={채널유입} />
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, minHeight: 120, boxShadow: '0 2px 12px rgba(30,34,40,0.06)', padding: 18 }}>
          연령대별 매출/고객수 표
        </div>
      </section>

      {/* C) 상품 수 */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18 }}>C. 상품 수</h2>
        <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
          <div style={{ flex: 2, background: '#fff', borderRadius: 12, minHeight: 180, boxShadow: '0 2px 12px rgba(30,34,40,0.06)', padding: 18 }}>
            상품별 판매 순위 BarChart
          </div>
          <div style={{ flex: 3, background: '#fff', borderRadius: 12, minHeight: 180, boxShadow: '0 2px 12px rgba(30,34,40,0.06)', padding: 18 }}>
            상품별 판매량/매출 표
          </div>
        </div>
      </section>
    </div>
  );
};

// 총 매출 BarChart
const BarChartCustom: React.FC<{ data: number[]; labels: string[] }> = ({ data, labels }) => (
  <svg width="100%" height="120" viewBox={`0 0 ${Math.max(320, data.length * 40)} 120`}>
    {data.map((v, i) => (
      <rect
        key={i}
        x={i * 40 + 30}
        y={120 - v / 5000}
        width={24}
        height={v / 5000}
        fill="#2d8cff"
        rx={5}
      />
    ))}
    {labels.map((label, i) => (
      <text key={label} x={i * 40 + 42} y={115} fontSize={11} textAnchor="middle" fill="#7b8aaf">{label}</text>
    ))}
  </svg>
);

// 매출 세부 항목 StackedBarChart
const colors = ['#2d8cff', '#7b8aaf', '#ffb347', '#6ecbff', '#ff6b81', '#b0b8c1', '#00b894', '#fdcb6e', '#636e72'];
const StackedBarChart: React.FC<{ data: TotalSalesByPeriod[]; fields: { key: string, label: string }[] }> = ({ data, fields }) => {
  const max = Math.max(...data.map(d => d.total as number), 1);
  return (
    <svg width="100%" height="120" viewBox={`0 0 ${Math.max(320, data.length * 40)} 120`}>
      {data.map((row, i) => {
        let y = 120;
        return fields.map((f, j) => {
          const h = ((row[f.key] as number) / max) * 100;
          y -= h;
          return (
            <rect
              key={f.key}
              x={i * 40 + 30}
              y={y}
              width={24}
              height={h}
              fill={colors[j % colors.length]}
              rx={j === 0 ? 5 : 0}
            />
          );
        });
      })}
      {data.map((row, i) => (
        <text key={row.period} x={i * 40 + 42} y={115} fontSize={11} textAnchor="middle" fill="#7b8aaf">{row.period}</text>
      ))}
    </svg>
  );
};

// PieChart for channel
const PieChart: React.FC<{ data: { label: string; value: number }[] }> = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  let acc = 0;
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      {data.map((d, i) => {
        const start = acc;
        const angle = (d.value / total) * 360;
        acc += angle;
        const x1 = 60 + 50 * Math.cos((Math.PI * (start - 90)) / 180);
        const y1 = 60 + 50 * Math.sin((Math.PI * (start - 90)) / 180);
        const x2 = 60 + 50 * Math.cos((Math.PI * (start + angle - 90)) / 180);
        const y2 = 60 + 50 * Math.sin((Math.PI * (start + angle - 90)) / 180);
        const large = angle > 180 ? 1 : 0;
        return (
          <path
            key={d.label}
            d={`M60,60 L${x1},${y1} A50,50 0 ${large} 1 ${x2},${y2} Z`}
            fill={colors[i % colors.length]}
            stroke="#fff"
            strokeWidth={2}
          />
        );
      })}
      {data.map((d, i) => (
        <text
          key={d.label}
          x={60 + 60 * Math.cos((Math.PI * ((acc = acc - (d.value / total) * 360) + (d.value / total) * 180 - 90)) / 180)}
          y={60 + 60 * Math.sin((Math.PI * (acc + (d.value / total) * 180 - 90)) / 180)}
          fontSize={11}
          textAnchor="middle"
          fill="#7b8aaf"
        >
          {d.label}
        </text>
      ))}
    </svg>
  );
};

export default Dashboard; 