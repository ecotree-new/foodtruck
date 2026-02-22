'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { REGIONS } from '@/lib/constants';

interface FormData {
  organizationName: string;
  representativeName: string;
  bizNum1: string;
  bizNum2: string;
  bizNum3: string;
  phone1: string;
  phone2: string;
  phone3: string;
  mainMenu: string;
  region: string;
  privacyConsent: boolean;
}

const PRIVACY_POLICY_TEXT = `개인정보보호법 규정에 따라 세계음식 한국 푸드트럭 중앙회(이하 '중앙회')는 푸드트럭 중앙회(이하 '서비스')에 대해 문의하시는 이용자분들께 수집하는 개인정보 항목, 이용목적 및 개인정보의 보유 및 이용기간을 안내드리니 자세히 읽어 보시고, 동의하여 주시기 바랍니다.

1. 개인정보의 이용 목적
중앙회는 개인정보를 다음의 목적을 위해 이용합니다. 이용되는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경될 시에는 사전 동의를 구할 예정입니다.
- 이용 목적: 고객센터 상담 문의
2. 개인정보의 항목 및 수집 방법
중앙회는 고객문의에 대한 상담업무를 위해 아래와 같은 개인정보를 수집하고 있습니다.`;

export default function JoinInquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    organizationName: '',
    representativeName: '',
    bizNum1: '',
    bizNum2: '',
    bizNum3: '',
    phone1: '',
    phone2: '',
    phone3: '',
    mainMenu: '',
    region: '',
    privacyConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if ((name === 'organizationName' || name === 'representativeName' || name === 'mainMenu') && value.length > 30) return;
    if ((name === 'phone1' || name === 'phone2' || name === 'phone3') && value.length > 4) return;
    if ((name === 'phone1' || name === 'phone2' || name === 'phone3') && !/^\d*$/.test(value)) return;
    if (name === 'bizNum1' && value.length > 3) return;
    if (name === 'bizNum2' && value.length > 2) return;
    if (name === 'bizNum3' && value.length > 5) return;
    if ((name === 'bizNum1' || name === 'bizNum2' || name === 'bizNum3') && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyConsent) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    const fullPhone = `${formData.phone1}-${formData.phone2}-${formData.phone3}`;
    const fullBizNum = `${formData.bizNum1}-${formData.bizNum2}-${formData.bizNum3}`;
    const regionLabel = REGIONS.find((r) => r.value === formData.region)?.label || formData.region;

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          organization_name: formData.organizationName,
          representative_name: formData.representativeName,
          business_number: fullBizNum,
          phone: fullPhone,
          main_menu: formData.mainMenu,
          region: regionLabel,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSubmitResult({ success: true, message: '문의가 성공적으로 접수되었습니다.' });
      setFormData({
        organizationName: '',
        representativeName: '',
        bizNum1: '',
        bizNum2: '',
        bizNum3: '',
        phone1: '',
        phone2: '',
        phone3: '',
        mainMenu: '',
        region: '',
        privacyConsent: false,
      });
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitResult({ success: false, message: '문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.privacyConsent &&
    formData.organizationName &&
    formData.representativeName &&
    formData.bizNum1 &&
    formData.bizNum2 &&
    formData.bizNum3 &&
    formData.phone1 &&
    formData.phone2 &&
    formData.phone3 &&
    formData.mainMenu &&
    formData.region;

  const fields = [
    { label: '단체명, 기업명', height: 'h-[60px] lg:h-[66px] xl:h-[72px]' },
    { label: '대표자명', height: 'h-[60px] lg:h-[66px] xl:h-[72px]' },
    { label: '사업자등록번호', height: 'h-[60px] lg:h-[66px] xl:h-[72px]' },
    { label: '전화 번호', height: 'h-[60px] lg:h-[66px] xl:h-[72px]' },
    { label: '대표메뉴', height: 'h-[60px] lg:h-[66px] xl:h-[72px]' },
    { label: '지역', height: 'h-[60px] lg:h-[66px] xl:h-[72px]' },
    { label: '개인정보 수집 및\n이용 동의', height: 'h-[200px] lg:h-[220px] xl:h-[240px]', multiline: true },
  ];

  return (
    <div>
      <h1 className="text-[32px] font-bold text-text-inverse mb-10 md:mb-16">중앙회 가입 문의</h1>

      {submitResult && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            submitResult.success
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {submitResult.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row overflow-hidden">
          {/* Left Column - Labels (Hidden on Mobile) */}
          <div className="hidden md:block w-[180px] lg:w-[220px] xl:w-[280px] flex-shrink-0 bg-[#FFF4EE]">
            {fields.map((field) => (
              <div key={field.label} className={`${field.height} flex items-center justify-center`}>
                <span className="text-[13px] lg:text-[14px] text-[#111111] font-medium text-center leading-tight">
                  {field.multiline ? (
                    <>
                      개인정보 수집 및<br className="md:hidden lg:inline" /> 이용 동의 <span className="text-[#111111]">*</span>
                    </>
                  ) : (
                    <>
                      {field.label} <span className="text-[#111111]">*</span>
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Right Column - Inputs */}
          <div className="flex-1 bg-white min-w-0">
            {/* 1. Organization Name */}
            <div className="py-3 px-3 sm:py-4 sm:px-4 md:h-[60px] lg:h-[66px] xl:h-[72px] md:flex md:items-center md:py-3 md:px-6 lg:px-10 xl:px-[65px]">
              <label className="block md:hidden text-[13px] sm:text-[14px] text-[#111111] font-medium mb-2">
                단체명, 기업명 <span className="text-[#111111]">*</span>
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  maxLength={30}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-2 border border-[#F0D0BD] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B26] text-[13px] sm:text-[14px] pr-14 sm:pr-16"
                />
                <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[11px] sm:text-[12px] text-[#BFBFBF]">
                  {formData.organizationName.length}/30
                </span>
              </div>
            </div>

            {/* 2. Representative Name */}
            <div className="py-3 px-3 sm:py-4 sm:px-4 md:h-[60px] lg:h-[66px] xl:h-[72px] md:flex md:items-center md:py-3 md:px-6 lg:px-10 xl:px-[65px]">
              <label className="block md:hidden text-[13px] sm:text-[14px] text-[#111111] font-medium mb-2">
                대표자명 <span className="text-[#111111]">*</span>
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  name="representativeName"
                  value={formData.representativeName}
                  onChange={handleChange}
                  maxLength={30}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-2 border border-[#F0D0BD] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B26] text-[13px] sm:text-[14px] pr-14 sm:pr-16"
                />
                <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[11px] sm:text-[12px] text-[#BFBFBF]">
                  {formData.representativeName.length}/30
                </span>
              </div>
            </div>

            {/* 3. Business Registration Number */}
            <div className="py-3 px-3 sm:py-4 sm:px-4 md:h-[60px] lg:h-[66px] xl:h-[72px] md:flex md:items-center md:py-3 md:px-6 lg:px-10 xl:px-[65px]">
              <label className="block md:hidden text-[13px] sm:text-[14px] text-[#111111] font-medium mb-2">
                사업자등록번호 <span className="text-[#111111]">*</span>
              </label>
              <div className="flex items-center gap-1 sm:gap-2 w-full">
                <input
                  type="text"
                  name="bizNum1"
                  value={formData.bizNum1}
                  onChange={handleChange}
                  maxLength={3}
                  inputMode="numeric"
                  className="flex-1 min-w-0 px-1 sm:px-2 md:px-3 lg:px-4 py-2.5 sm:py-3 md:py-2 border border-[#F0D0BD] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B26] text-[13px] sm:text-[14px] text-center"
                />
                <span className="text-[#727783] text-[12px] sm:text-base">-</span>
                <input
                  type="text"
                  name="bizNum2"
                  value={formData.bizNum2}
                  onChange={handleChange}
                  maxLength={2}
                  inputMode="numeric"
                  className="flex-1 min-w-0 px-1 sm:px-2 md:px-3 lg:px-4 py-2.5 sm:py-3 md:py-2 border border-[#F0D0BD] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B26] text-[13px] sm:text-[14px] text-center"
                />
                <span className="text-[#727783] text-[12px] sm:text-base">-</span>
                <input
                  type="text"
                  name="bizNum3"
                  value={formData.bizNum3}
                  onChange={handleChange}
                  maxLength={5}
                  inputMode="numeric"
                  className="flex-1 min-w-0 px-1 sm:px-2 md:px-3 lg:px-4 py-2.5 sm:py-3 md:py-2 border border-[#F0D0BD] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B26] text-[13px] sm:text-[14px] text-center"
                />
              </div>
            </div>

            {/* 4. Phone Number */}
            <div className="py-3 px-3 sm:py-4 sm:px-4 md:h-[60px] lg:h-[66px] xl:h-[72px] md:flex md:items-center md:py-3 md:px-6 lg:px-10 xl:px-[65px]">
              <label className="block md:hidden text-[13px] sm:text-[14px] text-[#111111] font-medium mb-2">
                전화 번호 <span className="text-[#111111]">*</span>
              </label>
              <div className="flex items-center gap-1 sm:gap-2 w-full">
                <input
                  type="text"
                  name="phone1"
                  value={formData.phone1}
                  onChange={handleChange}
                  maxLength={4}
                  inputMode="numeric"
                  className="flex-1 min-w-0 px-1 sm:px-2 md:px-3 lg:px-4 py-2.5 sm:py-3 md:py-2 border border-[#F0D0BD] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B26] text-[13px] sm:text-[14px] text-center"
                />
                <span className="text-[#727783] text-[12px] sm:text-base">-</span>
                <input
                  type="text"
                  name="phone2"
                  value={formData.phone2}
                  onChange={handleChange}
                  maxLength={4}
                  inputMode="numeric"
                  className="flex-1 min-w-0 px-1 sm:px-2 md:px-3 lg:px-4 py-2.5 sm:py-3 md:py-2 border border-[#F0D0BD] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B26] text-[13px] sm:text-[14px] text-center"
                />
                <span className="text-[#727783] text-[12px] sm:text-base">-</span>
                <input
                  type="text"
                  name="phone3"
                  value={formData.phone3}
                  onChange={handleChange}
                  maxLength={4}
                  inputMode="numeric"
                  className="flex-1 min-w-0 px-1 sm:px-2 md:px-3 lg:px-4 py-2.5 sm:py-3 md:py-2 border border-[#F0D0BD] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B26] text-[13px] sm:text-[14px] text-center"
                />
              </div>
            </div>

            {/* 5. Main Menu */}
            <div className="py-3 px-3 sm:py-4 sm:px-4 md:h-[60px] lg:h-[66px] xl:h-[72px] md:flex md:items-center md:py-3 md:px-6 lg:px-10 xl:px-[65px]">
              <label className="block md:hidden text-[13px] sm:text-[14px] text-[#111111] font-medium mb-2">
                대표메뉴 <span className="text-[#111111]">*</span>
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  name="mainMenu"
                  value={formData.mainMenu}
                  onChange={handleChange}
                  maxLength={30}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-2 border border-[#F0D0BD] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B26] text-[13px] sm:text-[14px] pr-14 sm:pr-16"
                />
                <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[11px] sm:text-[12px] text-[#BFBFBF]">
                  {formData.mainMenu.length}/30
                </span>
              </div>
            </div>

            {/* 6. Region */}
            <div className="py-3 px-3 sm:py-4 sm:px-4 md:h-[60px] lg:h-[66px] xl:h-[72px] md:flex md:items-center md:py-3 md:px-6 lg:px-10 xl:px-[65px]">
              <label className="block md:hidden text-[13px] sm:text-[14px] text-[#111111] font-medium mb-2">
                지역 <span className="text-[#111111]">*</span>
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-2 pr-10 border border-[#F0D0BD] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B26] text-[13px] sm:text-[14px] text-[#727783] appearance-none bg-no-repeat bg-[right_12px_center]"
                style={{ backgroundImage: 'url(/chevron-bottom.svg)', backgroundSize: '12px 12px' }}
              >
                {REGIONS.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 7. Privacy Consent */}
            <div className="py-3 px-3 sm:py-4 sm:px-4 md:h-[200px] lg:h-[220px] xl:h-[240px] md:py-3 md:px-6 lg:px-10 xl:px-[65px]">
              <label className="block md:hidden text-[13px] sm:text-[14px] text-[#111111] font-medium mb-2">
                개인정보 수집 및 이용 동의 <span className="text-[#111111]">*</span>
              </label>
              <div className="h-[120px] sm:h-[160px] md:h-[120px] lg:h-[140px] xl:h-[160px] p-3 sm:p-4 md:p-3 lg:p-4 border border-[#F0D0BD] rounded overflow-y-auto mb-3 sm:mb-4 md:mb-3 lg:mb-4">
                <p className="text-[11px] sm:text-[12px] text-[#C4C4C4] leading-relaxed whitespace-pre-wrap">
                  {PRIVACY_POLICY_TEXT}
                </p>
              </div>
              <label className="flex items-start sm:items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 sm:mt-0 rounded border-gray-300 text-[#FF6B26] focus:ring-[#FF6B26] flex-shrink-0"
                />
                <span className="text-[13px] sm:text-[14px] text-[#111111]">개인정보 수집 및 이용에 동의합니다.</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`
            w-full mt-4 sm:mt-6 py-3 sm:py-4 font-medium rounded-lg transition-all text-[14px] sm:text-[16px]
            ${isFormValid && !isSubmitting
              ? 'bg-[#FF6B26] text-white hover:bg-[#E55A1B]'
              : 'bg-[#FFC4A9] text-white cursor-not-allowed'
            }
          `}
        >
          {isSubmitting ? '전송 중...' : '문의하기'}
        </button>
      </form>
    </div>
  );
}
