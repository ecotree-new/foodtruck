export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-bg-default flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="container-foodtruck text-center">
          <h1 className="text-heading-1 md:text-title-1 lg:text-display-2 font-bold text-text-primary leading-tight">
            한국 세계음식
            <br />
            <span className="text-brand-primary">푸드트럭</span> 중앙회
          </h1>
          <p className="mt-6 text-body-2 md:text-body-1 text-text-subtle max-w-2xl mx-auto">
            전국 푸드트럭 산업의 발전과 체계적인 운영을 위해 함께합니다
          </p>
          <div className="mt-10">
            <a
              href="/contact"
              className="inline-block bg-brand-primary text-white font-semibold px-8 py-4 rounded-lg text-body-2 hover:opacity-90 transition-opacity"
            >
              문의하기
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
