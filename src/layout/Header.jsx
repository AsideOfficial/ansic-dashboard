import React from 'react';

export default function Header({ tab, setTab }) {
  return (
    <header className="sticky top-0 z-30 bg-white shadow flex items-center px-8 h-16">
      {/* 로고 */}
      <div className="text-xl font-extrabold text-blue-700 tracking-tight mr-8 select-none">🍽️ Ansic Dashboard</div>
      {/* 탭 네비게이션 */}
      <nav className="flex gap-2">
        <button
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${tab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
          onClick={() => setTab('dashboard')}
        >
          대시보드
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${tab === 'input' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
          onClick={() => setTab('input')}
        >
          직원 입력
        </button>
      </nav>
      {/* 우측 아이콘/유저 */}
      <div className="ml-auto flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <span className="material-symbols-outlined">search</span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">직</div>
      </div>
    </header>
  );
} 