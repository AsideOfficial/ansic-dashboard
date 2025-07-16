import React from 'react';
import Header from './Header';

export default function MainLayout({ tab, setTab, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] flex flex-col">
      <Header tab={tab} setTab={setTab} />
      <div className="flex-1 flex flex-row max-w-[1440px] mx-auto w-full">
        {/* 사이드바 */}
        <aside className="hidden md:flex flex-col w-60 bg-white/80 rounded-3xl shadow-xl m-6 p-6 gap-4 min-h-[calc(100vh-64px-48px)]">
          {/* TODO: 아이콘/네비/업데이트 버튼 등 추가 예정 */}
        </aside>
        {/* 메인 컨텐츠 */}
        <main className="flex-1 py-8 px-2 md:px-8">
          <div className="bg-white/90 rounded-3xl shadow-xl p-6 min-h-[80vh]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 