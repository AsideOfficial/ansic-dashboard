import React, { useState } from 'react';
import DailyStatsForm from './components/DailyStatsForm';
import Dashboard from './components/Dashboard';
import MainLayout from './layout/MainLayout';

function App() {
  const [tab, setTab] = useState('dashboard');

  return (
    <MainLayout tab={tab} setTab={setTab}>
      {tab === 'input' && <DailyStatsForm />}
      {tab === 'dashboard' && <Dashboard />}
    </MainLayout>
  );
}

export default App;
