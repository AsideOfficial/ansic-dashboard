import React from 'react';
import Header from './Header';

export default function MainLayout({ tab, setTab, children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header tab={tab} setTab={setTab} />
      <div className="flex-1 flex flex-row">
        {/* 좌측 여백(사이드바 자리, 추후 확장 가능) */}
        <aside className="hidden md:block w-48" />
        {/* 메인 컨텐츠 */}
        <main className="flex-1 max-w-7xl mx-auto py-8 px-4 md:px-0">
          {children}
        </main>
      </div>
    </div>
  );
} 