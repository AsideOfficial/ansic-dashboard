import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DailyStatsForm from './components/DailyStatsForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center py-6">일일 매출/운영 데이터 입력</h1>
      <DailyStatsForm />
    </div>
  );
}

export default App
