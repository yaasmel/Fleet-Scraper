import React, { useRef } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ScraperForm } from '@/components/ScraperForm';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection onCtaClick={scrollToForm} />
        <ScraperForm formRef={formRef} />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
