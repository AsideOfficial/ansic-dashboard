import React from "react";

function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white rounded-3xl shadow-xl m-6 p-6 gap-4 min-h-[calc(100vh-48px)]">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center">
          <span className="text-white text-2xl font-bold">Z</span>
        </div>
        <div className="font-bold text-xl text-gray-700">Zunra<br /><span className="text-xs font-normal text-gray-400">Dashboard</span></div>
      </div>
      <nav className="flex flex-col gap-2 text-gray-400 text-lg font-medium">
        <button className="flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-bold"><span className="material-symbols-outlined">dashboard</span>Dashboard</button>
        <button className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-blue-50"><span className="material-symbols-outlined">bar_chart</span>Revenue</button>
        <button className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-blue-50"><span className="material-symbols-outlined">account_balance_wallet</span>Wallet</button>
        <button className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-blue-50"><span className="material-symbols-outlined">description</span>Report</button>
        <button className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-blue-50"><span className="material-symbols-outlined">settings</span>Settings</button>
      </nav>
      <div className="mt-auto bg-white rounded-2xl shadow p-4 flex flex-col items-center gap-2">
        <span className="material-symbols-outlined text-blue-600 text-3xl">code</span>
        <div className="text-xs text-gray-400 text-center">New update available<br />click to update</div>
        <button className="bg-blue-500 text-white rounded-xl px-6 py-2 font-bold mt-2 shadow hover:bg-blue-600">Update</button>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="flex items-center h-20 px-10 bg-white rounded-b-3xl shadow sticky top-0 z-20 gap-4">
      <input type="text" placeholder="Search for transaction, item, etc" className="flex-1 max-w-lg px-5 py-3 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-700" />
      <button className="bg-blue-500 text-white px-8 py-2 rounded-full font-bold shadow hover:bg-blue-600">Search</button>
      <div className="flex items-center gap-4 ml-auto">
        <span className="fi fi-us fis text-2xl"></span>
        <span className="material-symbols-outlined text-gray-400 text-2xl">notifications</span>
        <span className="material-symbols-outlined text-gray-400 text-2xl">settings</span>
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="user" className="w-10 h-10 rounded-full border-2 border-white shadow" />
      </div>
    </header>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl shadow p-6 min-w-[180px]">
      <span className="bg-blue-100 text-blue-600 rounded-xl p-3 text-3xl material-symbols-outlined">{icon}</span>
      <div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <div className="text-gray-400 text-sm">{label}</div>
      </div>
      <span className="ml-auto material-symbols-outlined text-gray-300">chevron_right</span>
    </div>
  );
}

function BlueCard() {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl shadow-lg p-8 flex flex-col items-center text-white min-h-[180px]">
      <div className="font-semibold text-lg mb-2">🎉 Congratulations John</div>
      <div className="text-xs mb-4">now you are a top seller</div>
      <div className="text-3xl font-extrabold mb-4">$48,9k</div>
      <button className="bg-white text-blue-600 rounded-full px-8 py-2 font-bold shadow hover:bg-blue-50">View sales</button>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col min-h-[120px]">
      <div className="text-gray-400 text-sm mb-2 font-semibold">{title}</div>
      <div className="flex-1 flex items-center justify-center">{children}</div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard icon="check_circle" label="Sales" value="230k" />
              <StatCard icon="group" label="Customer" value="8,549k" />
              <StatCard icon="inventory_2" label="Product" value="1,423k" />
              <StatCard icon="payments" label="Revenue" value="974k" />
            </div>
            <div className="bg-white rounded-2xl shadow p-6 mt-2">
              <div className="flex justify-between items-center mb-2">
                <div className="text-gray-400 font-semibold">Revenue Report</div>
                <select className="bg-gray-100 rounded px-2 py-1 text-sm">
                  <option>Month</option>
                </select>
              </div>
              <div className="h-48 flex items-end gap-2">
                {/* 샘플 바 차트 */}
                {[120, 80, 160, 100, 200, 140, 180, 90, 170, 130, 110, 150].map((v, i) => (
                  <div key={i} className="flex flex-col items-center justify-end h-full">
                    <div className="w-4 rounded-t bg-yellow-400" style={{ height: v / 2 }}></div>
                    <div className="w-4 rounded-t bg-blue-400 mt-1" style={{ height: (220 - v) / 4 }}></div>
                    <div className="text-xs text-gray-400 mt-1">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nov','Des'][i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
            <BlueCard />
            <ChartCard title="Orders">
              {/* 샘플 미니 바차트 */}
              <div className="flex items-end gap-1 h-12">
                {[8, 5, 10, 7, 12].map((v, i) => (
                  <div key={i} className="w-2 rounded bg-yellow-400" style={{ height: v * 6 }}></div>
                ))}
              </div>
            </ChartCard>
            <ChartCard title="Profit">
              {/* 샘플 라인차트 (svg) */}
              <svg width="80" height="48"><polyline fill="none" stroke="#60a5fa" strokeWidth="4" points="0,40 16,30 32,35 48,20 64,10 80,18" /></svg>
            </ChartCard>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
            <ChartCard title="Earnings this month">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-gray-800 mb-2">$29,214.00</div>
                {/* 샘플 게이지 */}
                <svg width="100" height="50">
                  <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <path d="M10,50 A40,40 0 0,1 70,20" fill="none" stroke="#3b82f6" strokeWidth="10" />
                  <text x="50" y="45" textAnchor="middle" fontSize="18" fill="#3b82f6">53%</text>
                </svg>
                <div className="text-xs text-gray-400 mt-2 text-center">68% more earnings than last month, keep watching to find out your earnings <span className="text-yellow-500">🔥</span></div>
              </div>
            </ChartCard>
          </div>
        </main>
      </div>
    </div>
  );
} 