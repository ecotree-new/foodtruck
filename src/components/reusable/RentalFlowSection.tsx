'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { REUSABLE_RENTAL_FLOW } from '@/lib/constants';

const STEP_COUNT = 4;

export default function RentalFlowSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const firstIndicatorRef = useRef<HTMLDivElement>(null);
  const lastIndicatorRef = useRef<HTMLDivElement>(null);
  const [lineStyle, setLineStyle] = useState({ top: 7, height: 200 });
  const [currentStep, setCurrentStep] = useState(1);

  const steps = REUSABLE_RENTAL_FLOW.steps;

  // Pure scroll-position driven step calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      // Map so step 4 lands near the very end (minimal dead zone)
      const step = Math.min(Math.round(progress * (STEP_COUNT - 1)) + 1, STEP_COUNT);

      setCurrentStep(step);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dotted line position
  useEffect(() => {
    const update = () => {
      if (!firstIndicatorRef.current || !lastIndicatorRef.current || !stepsContainerRef.current) return;

      const c = stepsContainerRef.current.getBoundingClientRect();
      const f = firstIndicatorRef.current.getBoundingClientRect();
      const l = lastIndicatorRef.current.getBoundingClientRect();

      setLineStyle({
        top: f.top - c.top + f.height / 2,
        height: l.top - f.top,
      });
    };

    update();
    const ro = new ResizeObserver(() => requestAnimationFrame(update));
    if (stepsContainerRef.current) ro.observe(stepsContainerRef.current);
    window.addEventListener('resize', update);
    return () => { ro.disconnect(); window.removeEventListener('resize', update); };
  }, [currentStep]);

  const currentStepData = steps[currentStep - 1];

  return (
    <div ref={wrapperRef} style={{ height: '300vh' }} className="relative">
      <div className="sticky top-16 h-[calc(100vh-64px)] bg-[#FBFBFB]">
        <div className="h-full w-full overflow-hidden">
          <div className="container-content h-full flex flex-col justify-center">
            {/* Header */}
            <div className="mb-8 md:mb-12 short-h:md:mb-6">
              <p className="text-[10px] md:text-[16px] text-[#FF6B26] font-medium mb-2">
                {REUSABLE_RENTAL_FLOW.label}
              </p>
              <h2 className="text-[18px] md:text-[40px] font-bold text-[#111111]">
                {REUSABLE_RENTAL_FLOW.title}
              </h2>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex flex-col">
              <div className="mb-2">
                <span
                  className="text-[20px] text-[#FF6B26] font-normal"
                  style={{ fontFamily: 'SlowGothic, sans-serif' }}
                >
                  {currentStepData.number}
                </span>
                <span className="text-[18px] font-semibold text-[#000000] ml-2">
                  {currentStepData.title}
                </span>
              </div>

              <p className="text-[10px] font-medium text-[#000000] mb-6">
                {currentStepData.description}
              </p>

              <div className="w-full h-[200px] relative rounded-2xl overflow-hidden bg-gray-200">
                <Image
                  src={currentStepData.image}
                  alt={currentStepData.title}
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>

              <div className="flex justify-center gap-3 mt-6">
                {steps.map((step) => (
                  <div key={step.id} className="relative w-[14px] h-[14px] flex items-center justify-center">
                    <div className={`absolute w-[14px] h-[14px] rounded-full transition-colors duration-300 ${
                      currentStep === step.id ? 'bg-[#FFC4A9]' : 'bg-[#FFE8DB]'
                    }`} />
                    <div className={`absolute w-[7px] h-[7px] rounded-full transition-colors duration-300 ${
                      currentStep === step.id ? 'bg-[#FF6B26]' : 'bg-[#FFC4A9]'
                    }`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden md:flex flex-row gap-12 lg:gap-16 short-h:gap-8 items-center">
              <div ref={stepsContainerRef} className="w-[320px] lg:w-[400px] flex-shrink-0 relative">
                <div
                  className="absolute left-[7px] w-[2px] -translate-x-1/2"
                  style={{
                    top: `${lineStyle.top}px`,
                    height: `${lineStyle.height}px`,
                    backgroundImage: 'repeating-linear-gradient(to bottom, #FF6B26 0px, #FF6B26 6px, transparent 6px, transparent 12px)',
                  }}
                />

                <div className="space-y-6 short-h:space-y-3">
                  {steps.map((step, index) => {
                    const isActive = currentStep === step.id;
                    return (
                      <div key={step.id} className="flex items-start gap-4">
                        <div
                          ref={index === 0 ? firstIndicatorRef : index === steps.length - 1 ? lastIndicatorRef : null}
                          className="flex-shrink-0 relative z-10 w-[14px] h-[14px] flex items-center justify-center mt-[9px]"
                        >
                          <div className="absolute w-[16px] h-[16px] rounded-full bg-white" />
                          <div className={`absolute w-[14px] h-[14px] rounded-full transition-colors duration-300 ${
                            isActive ? 'bg-[#FFC4A9]' : 'bg-[#FFE8DB]'
                          }`} />
                          <div className={`absolute w-[7px] h-[7px] rounded-full transition-colors duration-300 ${
                            isActive ? 'bg-[#FF6B26]' : 'bg-[#FFC4A9]'
                          }`} />
                        </div>

                        <div className={`flex-1 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                          <div className="flex items-baseline gap-3">
                            <span
                              className={`text-[32px] leading-none transition-colors duration-300 ${
                                isActive ? 'text-[#FF6B26]' : 'text-[#C4C4C4]'
                              }`}
                              style={{ fontFamily: 'SlowGothic, sans-serif' }}
                            >
                              {step.number}
                            </span>
                            <h3 className="text-[20px] font-semibold text-[#000000]">
                              {step.title}
                            </h3>
                          </div>
                          <AnimatePresence mode="wait">
                            {isActive && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-[16px] font-medium text-[#000000] leading-relaxed mt-2 pl-[44px]"
                              >
                                {step.description}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="h-[400px] short-h:h-[280px] aspect-[16/10] relative rounded-2xl overflow-hidden bg-gray-200">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentStepData.image}
                      alt={currentStepData.title}
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
