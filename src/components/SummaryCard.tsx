import React from 'react';

type SummaryCardProps = {
  title: string;
  value: string | number;
  donutPercent?: number;
  donutColors?: string[];
  children?: React.ReactNode;
};

const Donut: React.FC<{ percent: number; colors: string[] }> = ({ percent, colors }) => {
  const r = 22, c = 2 * Math.PI * r;
  return (
    <svg width="54" height="54" viewBox="0 0 54 54">
      <circle cx="27" cy="27" r={r} fill="none" stroke="#f0f2f7" strokeWidth="8" />
      <circle
        cx="27" cy="27" r={r}
        fill="none"
        stroke={colors[0]}
        strokeWidth="8"
        strokeDasharray={`${c * percent},${c}`}
        strokeLinecap="round"
        transform="rotate(-90 27 27)"
      />
    </svg>
  );
};

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, donutPercent, donutColors = ['#2d8cff'], children }) => {
  return (
    <div className="summary-card" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      {donutPercent !== undefined && (
        <Donut percent={donutPercent} colors={donutColors} />
      )}
      <div style={{ flex: 1 }}>
        <div className="card-title">{title}</div>
        <div className="card-value" style={{ margin: '2px 0 0 0' }}>{value}</div>
        {children && <div style={{ marginTop: 10 }}>{children}</div>}
      </div>
    </div>
  );
};

export default SummaryCard; 