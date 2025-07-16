import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const initialState = {
  예약팀수: '', 예약인원수: '', 예약매출: '', 워크인팀수: '', 워크인인원수: '', 워크인매출: '',
  직원식사팀: '', 직원식사수: '', 직원식사매출: '', 음료테이크아웃수: '', 음료테이크아웃매출: '',
  커피판매수: '', 커피매출: '', Tea판매수: '', Tea매출: '', 주스에이드판매수: '', 주스에이드매출: '',
  논알콜맥주판매수: '', 논알콜맥주매출: '', 배달매출전: '', 배달매출후: '',
  POS현금매출: '', POS카드매출: '', 계좌이체: '',
  유선전화유입: '', 캐치테이블유입: '', 네이버예약유입: '', 네이버QR주문금액: '',
  푸드콘사용팀: '', 푸드콘사용금액: ''
};

type FormKey = keyof typeof initialState;

type FieldUnit = { [K in FormKey]: string };
const fieldUnits: FieldUnit = {
  예약팀수: '팀', 예약인원수: '명', 예약매출: '원', 워크인팀수: '팀', 워크인인원수: '명', 워크인매출: '원',
  직원식사팀: '팀', 직원식사수: '명', 직원식사매출: '원', 음료테이크아웃수: '건', 음료테이크아웃매출: '원',
  커피판매수: '잔', 커피매출: '원', Tea판매수: '잔', Tea매출: '원', 주스에이드판매수: '잔', 주스에이드매출: '원',
  논알콜맥주판매수: '병', 논알콜맥주매출: '원', 배달매출전: '원', 배달매출후: '원',
  POS현금매출: '원', POS카드매출: '원', 계좌이체: '원',
  유선전화유입: '명', 캐치테이블유입: '명', 네이버예약유입: '명', 네이버QR주문금액: '원',
  푸드콘사용팀: '팀', 푸드콘사용금액: '원'
};

const labels = [
  { group: '예약', fields: [
    { key: '예약팀수', label: '예약 팀 수' },
    { key: '예약인원수', label: '예약 인원 수' },
    { key: '예약매출', label: '예약 매출' },
  ]},
  { group: '워크인', fields: [
    { key: '워크인팀수', label: '워크인 팀 수' },
    { key: '워크인인원수', label: '워크인 인원 수' },
    { key: '워크인매출', label: '워크인 매출' },
  ]},
  { group: '직원 식사', fields: [
    { key: '직원식사팀', label: '직원 식사 팀' },
    { key: '직원식사수', label: '직원 식사 수' },
    { key: '직원식사매출', label: '직원 식사 매출' },
  ]},
  { group: '음료/커피/Tea/주스', fields: [
    { key: '음료테이크아웃수', label: '음료 테이크아웃 수' },
    { key: '음료테이크아웃매출', label: '음료 테이크아웃 매출' },
    { key: '커피판매수', label: '커피 판매 수' },
    { key: '커피매출', label: '커피 매출' },
    { key: 'Tea판매수', label: 'Tea 판매 수' },
    { key: 'Tea매출', label: 'Tea 매출' },
    { key: '주스에이드판매수', label: '주스 및 에이드 판매 수' },
    { key: '주스에이드매출', label: '주스 및 에이드 매출' },
    { key: '논알콜맥주판매수', label: '논알콜 맥주 판매 수' },
    { key: '논알콜맥주매출', label: '논알콜 맥주 매출' },
  ]},
  { group: '배달', fields: [
    { key: '배달매출전', label: '배달 매출(수수료 정산 전)' },
    { key: '배달매출후', label: '배달 매출(수수료 정산 후)' },
  ]},
  { group: 'POS/계좌', fields: [
    { key: 'POS현금매출', label: 'POS 현금 매출' },
    { key: 'POS카드매출', label: 'POS 카드 매출' },
    { key: '계좌이체', label: '계좌이체(안식 계좌로 바로 송금)' },
  ]},
  { group: '예약자 유입경로', fields: [
    { key: '유선전화유입', label: '예약자 중 유선전화 유입 수' },
    { key: '캐치테이블유입', label: '예약자 중 캐치테이블 유입 수' },
    { key: '네이버예약유입', label: '예약자 중 네이버예약 유입 수' },
    { key: '네이버QR주문금액', label: '네이버 QR 주문 금액' },
  ]},
  { group: '푸드콘', fields: [
    { key: '푸드콘사용팀', label: '푸드콘 사용팀' },
    { key: '푸드콘사용금액', label: '푸드콘 사용금액' },
  ]},
];

function formatNumberWithComma(value: string) {
  if (!value) return '';
  const num = value.replace(/,/g, '');
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const EmployeeInput: React.FC = () => {
  const [form, setForm] = useState<typeof initialState>(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // 숫자와 콤마만 허용, 콤마는 제거하고 저장
    const raw = value.replace(/,/g, '');
    if (/^\d*$/.test(raw)) {
      setForm(f => ({ ...f, [name]: raw }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 오늘 날짜(yyyy-MM-dd) 기준으로 저장
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const docId = `${yyyy}-${mm}-${dd}`;
      // KST(UTC+9) 기준 시간 생성
      const now = new Date();
      const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
      const createdAt = kst.toISOString();
      await setDoc(doc(db, 'employeeInputs', docId), {
        ...form,
        createdAt,
      });
      alert('저장되었습니다!');
      setForm(initialState);
    } catch (err) {
      alert('저장 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1300, margin: '0 auto', padding: '48px 0' }}>
      <div style={{ background: '#f4f8ff', border: '1px solid #e0e6ef', borderRadius: 10, padding: '28px 48px', marginBottom: 40, color: '#2d8cff', fontWeight: 500, fontSize: 17 }}>
        <div style={{ color: '#2d8cff', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>입력 방법 안내</div>
        각 항목에 해당하는 숫자만 입력해 주세요. <br />
        모든 데이터는 오늘 날짜 기준으로 저장됩니다.
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {labels.map(group => (
          <fieldset
            key={group.group}
            style={{
              border: 'none',
              padding: 0,
              background: '#fff',
              borderRadius: 18,
              boxShadow: '0 2px 12px rgba(30,34,40,0.06)',
              marginBottom: 18,
              paddingTop: 24,
              paddingBottom: 24,
              paddingLeft: 32,
              paddingRight: 32,
            }}
          >
            <legend style={{ fontWeight: 700, color: '#7b8aaf', fontSize: 18, marginBottom: 14 }}>{group.group}</legend>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 20 }}>
              {group.fields.map(field => (
                <label key={field.key} style={{ display: 'flex', flexDirection: 'column', fontWeight: 500, color: '#222', fontSize: 16, position: 'relative' }}>
                  {field.label}
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input
                      type="text"
                      name={field.key}
                      value={formatNumberWithComma(form[field.key as FormKey])}
                      onChange={handleChange}
                      inputMode="numeric"
                      style={{ marginTop: 8, padding: '10px 12px', borderRadius: 7, border: '1px solid #e0e6ef', fontSize: 16, width: '100%' }}
                      autoComplete="off"
                      disabled={loading}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#7b8aaf',
                        fontSize: 15,
                        pointerEvents: 'none'
                      }}
                    >
                      {fieldUnits[field.key as FormKey]}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <button type="submit" style={{ marginTop: 16, padding: '16px 0', background: loading ? '#b0cfff' : '#2d8cff', color: '#fff', border: 'none', borderRadius: 9, fontWeight: 700, fontSize: 19, cursor: loading ? 'not-allowed' : 'pointer' }} disabled={loading}>
          {loading ? '저장 중...' : '저장'}
        </button>
      </form>
    </div>
  );
};

export default EmployeeInput; 