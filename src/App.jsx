import React, { useState } from 'react';
import DailyStatsForm from './components/DailyStatsForm';
import Dashboard from './components/Dashboard';
// Dashboard 컴포넌트는 추후 구현 예정

function App() {
  const [tab, setTab] = useState('input');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 상단 탭 네비게이션 */}
      <header className="bg-white shadow flex items-center px-6 py-4">
        <div className="text-2xl font-bold text-blue-700 mr-8">Restaurant Dashboard</div>
        <nav className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${tab === 'input' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
            onClick={() => setTab('input')}
          >
            직원 입력
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${tab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
            onClick={() => setTab('dashboard')}
          >
            대시보드
          </button>
        </nav>
      </header>
      <main className="max-w-6xl mx-auto py-8">
        {tab === 'input' && <DailyStatsForm />}
        {tab === 'dashboard' && <Dashboard />}
      </main>
    </div>
  );
}

export default App;
