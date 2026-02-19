import InquiryForm from '@/components/contact/InquiryForm';
import { EVENT_TYPES_EVENT } from '@/lib/constants';

export default function JoinContactPage() {
  return (
    <main>
      <section className="bg-bg-inverse py-16 md:py-24">
        <div className="container-content">
          <InquiryForm
            title="중앙회 가입 문의"
            selectLabel="행사 종류"
            selectOptions={EVENT_TYPES_EVENT}
          />
        </div>
      </section>
    </main>
  );
}
