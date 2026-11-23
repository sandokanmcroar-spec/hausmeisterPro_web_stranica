import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LiveDemoSection } from './components/LiveDemoSection';
import { FeaturesSection } from './components/FeaturesSection';
import { PhotoProofSection } from './components/PhotoProofSection';
import { HowItWorksAndPricing } from './components/HowItWorksAndPricing';
import { FaqAndContactSection } from './components/FaqAndContactSection';
import { Footer } from './components/Footer';
import type { DemoTab, LanguageCode } from './data/demoTranslations';

export default function App() {
  const [demoTab, setDemoTab] = useState<DemoTab>('tasks');
  const [demoLang, setDemoLang] = useState<LanguageCode>('de');
  const [demoViewMode, setDemoViewMode] = useState<'live' | 'simulator'>('live');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTryInDemo = (tab: DemoTab, lang?: LanguageCode) => {
    setDemoTab(tab);
    if (lang) {
      setDemoLang(lang);
    }
    setDemoViewMode('simulator');
    scrollToSection('live-demo');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col">
      <Header onNavigate={scrollToSection} />
      <main className="flex-1">
        <HeroSection onNavigate={scrollToSection} />
        <LiveDemoSection
          activeTab={demoTab}
          onTabChange={setDemoTab}
          language={demoLang}
          onLanguageChange={setDemoLang}
          demoViewMode={demoViewMode}
          onDemoViewModeChange={setDemoViewMode}
        />
        <FeaturesSection onTryInDemo={handleTryInDemo} />
        <PhotoProofSection />
        <HowItWorksAndPricing onNavigate={scrollToSection} />
        <FaqAndContactSection />
      </main>
      <Footer />
    </div>
  );
}
