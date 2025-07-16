import React from 'react';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* 상단 인사/필터/다운로드 */}
      <div className="col-span-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">안녕하세요, 직원님!</h2>
          <div className="flex gap-2 mt-2">
            <button className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">필터</button>
            <select className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
              <option>월별</option>
              <option>주별</option>
              <option>일별</option>
            </select>
            <button className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">데이터 다운로드</button>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700">+ 새 데이터 입력</button>
      </div>

      {/* 매출/지표 카드 */}
      <div className="col-span-12 md:col-span-4 bg-white rounded-xl shadow p-6 flex flex-col justify-between">
        <div className="text-gray-500 text-sm mb-2">총 매출</div>
        <div className="text-3xl font-bold text-blue-700 mb-2">₩0</div>
        <div className="text-xs text-gray-400">이번 달</div>
      </div>
      <div className="col-span-12 md:col-span-4 bg-white rounded-xl shadow p-6 flex flex-col justify-between">
        <div className="text-gray-500 text-sm mb-2">예약 매출</div>
        <div className="text-2xl font-bold text-blue-700 mb-2">₩0</div>
        <div className="text-xs text-gray-400">이번 달</div>
      </div>
      <div className="col-span-12 md:col-span-4 bg-white rounded-xl shadow p-6 flex flex-col justify-between">
        <div className="text-gray-500 text-sm mb-2">워크인 매출</div>
        <div className="text-2xl font-bold text-blue-700 mb-2">₩0</div>
        <div className="text-xs text-gray-400">이번 달</div>
      </div>

      {/* 그래프/차트 카드 (자리만) */}
      <div className="col-span-12 md:col-span-8 bg-white rounded-xl shadow p-6 mt-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <div className="text-gray-500 text-sm">매출 추이</div>
          <button className="text-xs text-blue-600">상세보기</button>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-300 h-40">[그래프 자리]</div>
      </div>
      <div className="col-span-12 md:col-span-4 bg-white rounded-xl shadow p-6 mt-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <div className="text-gray-500 text-sm">방문 인원/회전율</div>
          <button className="text-xs text-blue-600">상세보기</button>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-300 h-40">[그래프 자리]</div>
      </div>

      {/* 상품별 판매/매출 순위 등 추가 카드 */}
      <div className="col-span-12 bg-white rounded-xl shadow p-6 mt-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-gray-500 text-sm">상품별 판매/매출 순위</div>
          <button className="text-xs text-blue-600">상세보기</button>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-300 h-32">[테이블/차트 자리]</div>
      </div>
    </div>
  );
} 