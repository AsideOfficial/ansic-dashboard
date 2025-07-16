import React from 'react';

export const TopRevenueTable: React.FC = () => (
  <div className="table-section">
    <div className="card-title" style={{ marginBottom: 16 }}>Top Revenue Generators</div>
    <table style={{ width: '100%' }}>
      <tbody>
        <tr><td>🚗 Tesla</td><td style={{ textAlign: 'right', fontWeight: 600 }}>$5.4m</td></tr>
        <tr><td>🍔 McDonald's</td><td style={{ textAlign: 'right', fontWeight: 600 }}>$2.3m</td></tr>
        <tr><td>🏦 AARP</td><td style={{ textAlign: 'right', fontWeight: 600 }}>$800k</td></tr>
        <tr><td>💊 Prime Therapeutics</td><td style={{ textAlign: 'right', fontWeight: 600 }}>$200k</td></tr>
      </tbody>
    </table>
  </div>
);

export const AdminActivityTable: React.FC = () => (
  <div className="table-section">
    <div className="card-title" style={{ marginBottom: 16 }}>Admin Activity</div>
    <table style={{ width: '100%' }}>
      <tbody>
        <tr><td>People Added</td><td style={{ textAlign: 'right', fontWeight: 600 }}>1,923</td></tr>
        <tr><td>Surveys Created</td><td style={{ textAlign: 'right', fontWeight: 600 }}>782</td></tr>
        <tr><td>Topics Created</td><td style={{ textAlign: 'right', fontWeight: 600 }}>477</td></tr>
        <tr><td>Reports Downloaded</td><td style={{ textAlign: 'right', fontWeight: 600 }}>283</td></tr>
      </tbody>
    </table>
  </div>
);

export const EmployeeActivityTable: React.FC = () => (
  <div className="table-section">
    <div className="card-title" style={{ marginBottom: 16 }}>Employee Activity</div>
    <table style={{ width: '100%' }}>
      <tbody>
        <tr><td>Assignments</td><td style={{ textAlign: 'right', fontWeight: 600 }}>830</td></tr>
        <tr><td>Badges</td><td style={{ textAlign: 'right', fontWeight: 600 }}>492</td></tr>
        <tr><td>Surveys</td><td style={{ textAlign: 'right', fontWeight: 600 }}>384</td></tr>
        <tr><td>Feedback</td><td style={{ textAlign: 'right', fontWeight: 600 }}>297</td></tr>
      </tbody>
    </table>
  </div>
); 