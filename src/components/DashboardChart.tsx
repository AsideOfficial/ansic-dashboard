import React from 'react';

// 더미 데이터
const barData = [320, 400, 300, 350, 420, 380, 390, 370, 360, 340, 330, 310];
const lineData = [100, 120, 150, 200, 300, 250, 270, 260, 280, 290, 310, 400];

export const BarChart: React.FC = () => (
  <svg width="100%" height="120" viewBox="0 0 300 120">
    {barData.map((v, i) => (
      <rect
        key={i}
        x={i * 25 + 10}
        y={120 - v / 2}
        width={15}
        height={v / 2}
        fill="#2d8cff"
        rx={4}
      />
    ))}
  </svg>
);

export const LineChart: React.FC = () => {
  const points = lineData.map((v, i) => `${i * 27 + 15},${120 - v / 2}`).join(' ');
  return (
    <svg width="100%" height="120" viewBox="0 0 320 120">
      <polyline
        fill="none"
        stroke="#2d8cff"
        strokeWidth={3}
        points={points}
      />
      {lineData.map((v, i) => (
        <circle
          key={i}
          cx={i * 27 + 15}
          cy={120 - v / 2}
          r={3}
          fill="#2d8cff"
        />
      ))}
    </svg>
  );
}; 