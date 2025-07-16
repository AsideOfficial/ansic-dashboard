import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  reservationTeamCount: 0,
  reservationPersonCount: 0,
  reservationSales: 0,
  walkinTeamCount: 0,
  walkinPersonCount: 0,
  walkinSales: 0,
  staffMealTeam: 0,
  staffMealCount: 0,
  staffMealSales: 0,
  drinkTakeoutCount: 0,
  drinkTakeoutSales: 0,
  coffeeCount: 0,
  coffeeSales: 0,
  teaCount: 0,
  teaSales: 0,
  juiceCount: 0,
  juiceSales: 0,
  beerCount: 0,
  beerSales: 0,
  deliverySalesBefore: 0,
  deliverySalesAfter: 0,
  posCashSales: 0,
  posCardSales: 0,
  accountTransfer: 0,
  inflowPhone: 0,
  inflowCatchTable: 0,
  inflowNaver: 0,
  naverQrSales: 0,
  foodconTeam: 0,
  foodconSales: 0,
};

const fieldLabels = [
  { key: 'reservationTeamCount', label: '예약 팀 수' },
  { key: 'reservationPersonCount', label: '예약 인원 수' },
  { key: 'reservationSales', label: '예약 매출' },
  { key: 'walkinTeamCount', label: '워크인 팀 수' },
  { key: 'walkinPersonCount', label: '워크인 인원 수' },
  { key: 'walkinSales', label: '워크인 매출' },
  { key: 'staffMealTeam', label: '직원 식사 팀' },
  { key: 'staffMealCount', label: '직원 식사 수' },
  { key: 'staffMealSales', label: '직원 식사 매출' },
  { key: 'drinkTakeoutCount', label: '음료 테이크아웃 수' },
  { key: 'drinkTakeoutSales', label: '음료 테이크아웃 매출' },
  { key: 'coffeeCount', label: '커피 판매 수' },
  { key: 'coffeeSales', label: '커피 매출' },
  { key: 'teaCount', label: 'Tea 판매 수' },
  { key: 'teaSales', label: 'Tea 매출' },
  { key: 'juiceCount', label: '주스 및 에이드 판매 수' },
  { key: 'juiceSales', label: '주스 및 에이드 매출' },
  { key: 'beerCount', label: '논알콜 맥주 판매 수' },
  { key: 'beerSales', label: '논알콜 맥주 매출' },
  { key: 'deliverySalesBefore', label: '배달 매출(정산 전)' },
  { key: 'deliverySalesAfter', label: '배달 매출(정산 후)' },
  { key: 'posCashSales', label: 'POS 현금 매출' },
  { key: 'posCardSales', label: 'POS 카드 매출' },
  { key: 'accountTransfer', label: '계좌이체' },
  { key: 'inflowPhone', label: '유선전화 유입 수' },
  { key: 'inflowCatchTable', label: '캐치테이블 유입 수' },
  { key: 'inflowNaver', label: '네이버예약 유입 수' },
  { key: 'naverQrSales', label: '네이버 QR 주문 금액' },
  { key: 'foodconTeam', label: '푸드콘 사용팀' },
  { key: 'foodconSales', label: '푸드콘 사용금액' },
];

function validate(form) {
  for (const { key, label } of fieldLabels) {
    if (form[key] < 0 || isNaN(form[key])) {
      return `${label}은(는) 0 이상의 숫자여야 합니다.`;
    }
  }
  if (!form.date) return '날짜를 선택해 주세요.';
  return null;
}

export default function DailyStatsForm() {
  const [form, setForm] = useState(initialState);
  const [loadingType, setLoadingType] = useState(null); // null | 'fetch' | 'save' | 'delete'
  const [result, setResult] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // 날짜 변경 시 데이터 조회
  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      setLoadingType('fetch');
      setResult(null);
      const ref = doc(db, 'dailyStats', form.date);
      const snap = await getDoc(ref);
      if (!ignore) {
        if (snap.exists()) {
          setForm(snap.data());
          setIsEdit(true);
        } else {
          setForm({ ...initialState, date: form.date });
          setIsEdit(false);
        }
        setLoadingType(null);
      }
    }
    fetchData();
    return () => { ignore = true; };
    // eslint-disable-next-line
  }, [form.date]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // 숫자 입력값 검증: 0 이상, 숫자만
    if (type === 'number' && (value === '' || isNaN(Number(value)) || Number(value) < 0)) return;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate(form);
    if (error) {
      setResult(error);
      return;
    }
    setLoadingType('save');
    setResult(null);
    try {
      await setDoc(doc(db, 'dailyStats', form.date), form);
      setResult(isEdit ? '수정 성공!' : '저장 성공!');
      setIsEdit(true);
    } catch (err) {
      setResult('저장 실패: ' + err.message);
    } finally {
      setLoadingType(null);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    setLoadingType('delete');
    setResult(null);
    try {
      await deleteDoc(doc(db, 'dailyStats', form.date));
      setForm({ ...initialState, date: form.date });
      setIsEdit(false);
      setResult('삭제 성공!');
    } catch (err) {
      setResult('삭제 실패: ' + err.message);
    } finally {
      setLoadingType(null);
    }
  };

  const isFetching = loadingType === 'fetch';
  const isSaving = loadingType === 'save';
  const isDeleting = loadingType === 'delete';

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow flex flex-col gap-2">
      <label className="font-bold">날짜
        <input type="date" name="date" value={form.date} onChange={handleChange} className="ml-2 border rounded px-2 py-1" required disabled={isFetching || isSaving || isDeleting} />
      </label>
      {fieldLabels.map(({ key, label }) => (
        <label key={key} className="flex justify-between items-center">
          <span>{label}</span>
          <input
            type="number"
            name={key}
            value={form[key]}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-32 text-right"
            min={0}
            step={1}
            required
            disabled={isFetching || isSaving || isDeleting}
          />
        </label>
      ))}
      <div className="flex gap-2 mt-4">
        <button type="submit" disabled={isFetching || isSaving || isDeleting} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1">
          {isEdit
            ? (isSaving ? '수정 중...' : '수정하기')
            : (isSaving ? '저장 중...' : '저장하기')}
        </button>
        {isEdit && (
          <button type="button" onClick={handleDelete} disabled={isFetching || isSaving || isDeleting} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex-1">
            {isDeleting ? '삭제 중...' : '삭제하기'}
          </button>
        )}
      </div>
      {result && <div className="mt-2 text-center font-semibold">{result}</div>}
    </form>
  );
} 