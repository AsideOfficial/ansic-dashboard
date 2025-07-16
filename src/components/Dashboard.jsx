import React from 'react';

export default function Dashboard() {
  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-0">
      {/* 상단 인사/필터/다운로드 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
            안녕하세요, <span className="text-blue-600">직원님!</span>
          </h2>
          <div className="flex gap-2 mt-2">
            <button className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold shadow hover:bg-blue-100 transition">필터</button>
            <select className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold shadow hover:bg-blue-100 transition">
              <option>월별</option>
              <option>주별</option>
              <option>일별</option>
            </select>
            <button className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold shadow hover:bg-blue-100 transition">데이터 다운로드</button>
          </div>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:from-blue-600 hover:to-blue-500 transition text-lg whitespace-nowrap">+ 새 데이터 입력</button>
      </div>

      {/* 대시보드 카드/그래프/테이블 */}
      <div className="grid grid-cols-12 gap-6">
        {/* 주요 매출 카드 */}
        <div className="col-span-12 md:col-span-4 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between min-h-[120px] border border-blue-50">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-100 text-blue-600 rounded-xl p-2 text-2xl material-symbols-outlined">paid</span>
            <span className="text-gray-500 text-sm">총 매출</span>
          </div>
          <div className="text-3xl font-extrabold text-blue-700 mb-2">₩0</div>
          <div className="text-xs text-gray-400">이번 달</div>
        </div>
        <div className="col-span-12 md:col-span-4 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between min-h-[120px] border border-blue-50">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-100 text-blue-600 rounded-xl p-2 text-2xl material-symbols-outlined">event_available</span>
            <span className="text-gray-500 text-sm">예약 매출</span>
          </div>
          <div className="text-2xl font-extrabold text-blue-700 mb-2">₩0</div>
          <div className="text-xs text-gray-400">이번 달</div>
        </div>
        <div className="col-span-12 md:col-span-4 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between min-h-[120px] border border-blue-50">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-100 text-blue-600 rounded-xl p-2 text-2xl material-symbols-outlined">directions_walk</span>
            <span className="text-gray-500 text-sm">워크인 매출</span>
          </div>
          <div className="text-2xl font-extrabold text-blue-700 mb-2">₩0</div>
          <div className="text-xs text-gray-400">이번 달</div>
        </div>

        {/* 그래프/차트 카드 */}
        <div className="col-span-12 md:col-span-8 bg-white rounded-2xl shadow-lg p-6 flex flex-col min-h-[220px] border border-blue-50">
          <div className="flex justify-between items-center mb-2">
            <div className="text-gray-500 text-sm font-semibold">매출 추이</div>
            <button className="text-xs text-blue-600 font-semibold hover:underline">상세보기</button>
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-300 h-40 text-lg">[그래프 자리]</div>
        </div>
        <div className="col-span-12 md:col-span-4 bg-white rounded-2xl shadow-lg p-6 flex flex-col min-h-[220px] border border-blue-50">
          <div className="flex justify-between items-center mb-2">
            <div className="text-gray-500 text-sm font-semibold">방문 인원/회전율</div>
            <button className="text-xs text-blue-600 font-semibold hover:underline">상세보기</button>
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-300 h-40 text-lg">[그래프 자리]</div>
        </div>

        {/* 상품별 판매/매출 순위 등 추가 카드 */}
        <div className="col-span-12 bg-white rounded-2xl shadow-lg p-6 border border-blue-50">
          <div className="flex justify-between items-center mb-2">
            <div className="text-gray-500 text-sm font-semibold">상품별 판매/매출 순위</div>
            <button className="text-xs text-blue-600 font-semibold hover:underline">상세보기</button>
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-300 h-32 text-lg">[테이블/차트 자리]</div>
        </div>
      </div>
    </div>
  );
} 