import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* 날짜/기간 필터 (추후 구현) */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>기간 선택</h2>
        <div>날짜/기간 필터 UI (연/월/주/일, 범위 선택 등)</div>
      </section>

      {/* A) 매출 */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18 }}>A. 매출</h2>
        <div style={{ display: 'flex', gap: 18, marginBottom: 24 }}>
          {/* 요약 카드 */}
          <div className="summary-card">총 매출</div>
          <div className="summary-card">순이익</div>
          <div className="summary-card">매출 목표/달성률</div>
        </div>
        <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
          {/* 차트 */}
          <div style={{ flex: 2, background: '#fff', borderRadius: 12, minHeight: 180, boxShadow: '0 2px 12px rgba(30,34,40,0.06)', padding: 18 }}>
            총 매출 BarChart (연/월/주/일별)
          </div>
          <div style={{ flex: 3, background: '#fff', borderRadius: 12, minHeight: 180, boxShadow: '0 2px 12px rgba(30,34,40,0.06)', padding: 18 }}>
            매출 세부 항목 StackedBarChart
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, minHeight: 120, boxShadow: '0 2px 12px rgba(30,34,40,0.06)', padding: 18 }}>
          매출 목표/실적/미달성 표
        </div>
      </section>

      {/* B) 인원 */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18 }}>B. 인원</h2>
        <div style={{ display: 'flex', gap: 18, marginBottom: 24 }}>
          <div className="summary-card">예약 인원</div>
          <div className="summary-card">워크인 인원</div>
          <div className="summary-card">총 방문 인원</div>
          <div className="summary-card">회전율</div>
          <div className="summary-card">채널 유입</div>
        </div>
        <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
          <div style={{ flex: 2, background: '#fff', borderRadius: 12, minHeight: 180, boxShadow: '0 2px 12px rgba(30,34,40,0.06)', padding: 18 }}>
            인원 추이 Bar/Line Chart
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: 12, minHeight: 180, boxShadow: '0 2px 12px rgba(30,34,40,0.06)', padding: 18 }}>
            채널별 유입 PieChart
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

export default Dashboard; 