import React from 'react';

export default function Header({ tab, setTab }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 shadow-lg rounded-b-3xl flex items-center px-10 h-20 backdrop-blur-md">
      {/* 로고 */}
      <div className="text-2xl font-extrabold text-blue-700 tracking-tight mr-10 select-none flex items-center gap-2">
        <span className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center">
          <span className="material-symbols-outlined text-blue-600 text-3xl">dashboard</span>
        </span>
        Ansic Dashboard
      </div>
      {/* 탭 네비게이션 */}
      <nav className="flex gap-2">
        <button
          className={`px-5 py-2 rounded-full font-semibold transition-colors text-lg ${tab === 'dashboard' ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
          onClick={() => setTab('dashboard')}
        >
          대시보드
        </button>
        <button
          className={`px-5 py-2 rounded-full font-semibold transition-colors text-lg ${tab === 'input' ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
          onClick={() => setTab('input')}
        >
          직원 입력
        </button>
      </nav>
      {/* 검색창 */}
      <div className="ml-10 flex-1 flex items-center">
        <input type="text" placeholder="검색어를 입력하세요..." className="w-full max-w-xs px-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition" />
      </div>
      {/* 우측 아이콘/유저 */}
      <div className="ml-auto flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <span className="material-symbols-outlined text-2xl text-gray-500">notifications</span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <span className="material-symbols-outlined text-2xl text-gray-500">settings</span>
        </button>
        <div className="w-11 h-11 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700 text-lg shadow">
          직
        </div>
      </div>
    </header>
  );
} 