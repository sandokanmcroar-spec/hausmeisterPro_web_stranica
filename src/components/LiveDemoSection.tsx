import { useState } from 'react';
import {
  Camera,
  Check,
  ClipboardCheck,
  Copy,
  ExternalLink,
  Globe,
  Map as MapIcon,
  Maximize2,
  QrCode,
  RotateCw,
  Smartphone,
  X,
} from 'lucide-react';
import { PhoneAppSimulator } from './PhoneAppSimulator';
import { LANGUAGES, type DemoTab, type LanguageCode } from '../data/demoTranslations';

const LIVE_APP_URL = 'https://hausmeister.pro.vision-it-systems.de/';

interface LiveDemoSectionProps {
  activeTab: DemoTab;
  onTabChange: (tab: DemoTab) => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  demoViewMode: 'live' | 'simulator';
  onDemoViewModeChange: (mode: 'live' | 'simulator') => void;
}

export function LiveDemoSection({
  activeTab,
  onTabChange,
  language,
  onLanguageChange,
  demoViewMode,
  onDemoViewModeChange,
}: LiveDemoSectionProps) {
  const [copied, setCopied] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const handleCopyCredentials = async () => {
    const text = 'demo@vision-it.de / 12345678';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const quickScenarios: {
    id: DemoTab;
    title: string;
    desc: string;
    icon: typeof Camera;
  }[] = [
    {
      id: 'tasks',
      title: 'Foto-Nachweis & 7 Sprachen',
      desc: 'Aufgabe antippen, Sprache umschalten und mit „Foto senden & erledigt“ abschließen.',
      icon: Camera,
    },
    {
      id: 'map',
      title: 'Kartenansicht & Offline-Modus',
      desc: 'Alle Objekte nach Status (Überfällig, Offen, Erledigt) auf einen Blick sehen.',
      icon: MapIcon,
    },
    {
      id: 'handover',
      title: 'Wohnungsübergabe & PDF-Protokoll',
      desc: 'Schlüssel zählen, direkt auf dem Display unterschreiben und PDF erzeugen.',
      icon: ClipboardCheck,
    },
    {
      id: 'meter_time',
      title: 'QR-Zählerablesung & Arbeitszeit',
      desc: 'Zähler per QR-Code erfassen oder Start, Pause und Feierabend stempeln.',
      icon: QrCode,
    },
  ];

  return (
    <section
      id="live-demo"
      className="border-b border-slate-800/70 bg-[#0D121F] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
            Testen Sie Hausmeister Pro jetzt sofort – ohne Registrierung
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Klicken Sie sich direkt hier im Smartphone-Vorschaufenster durch die App. Testen Sie
            die Kartenansicht, den Foto-Nachweis, Übergabeprotokolle und die Sprachumschaltung.
          </p>
        </div>

        {/* Interactive Demo Toolbar Bar */}
        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-slate-800 bg-[#111827] p-3 sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* URL + Credentials */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              <a
                href={LIVE_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-[#0B0F19] px-3 py-2 font-mono text-xs text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
              >
                <span className="truncate max-w-[230px] sm:max-w-none">{LIVE_APP_URL}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              </a>

              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-800 bg-[#0B0F19] px-3 py-1.5">
                <span className="text-slate-400">Test-Login:</span>
                <code className="font-mono text-xs font-medium text-emerald-300">
                  demo@vision-it.de / 12345678
                </code>
                <button
                  type="button"
                  onClick={handleCopyCredentials}
                  className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-100 hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Kopiert</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Fullscreen Action */}
            <button
              type="button"
              onClick={() => setFullscreenOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-orange-400 transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[44px]"
            >
              <Maximize2 className="h-4 w-4 shrink-0" />
              <span>Im Vollbild öffnen</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Demo Workspace */}
        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Controls: Mode Switch & Guided Highlights */}
          <div className="space-y-4 lg:col-span-6">
            {/* Switch between Live Embedded App & Quick Interactive Simulation */}
            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-4">
              <p className="text-xs font-medium text-slate-400 mb-2.5">
                Ansicht im Smartphone-Fenster wählen:
              </p>
              <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-[#0B0F19] p-1 border border-slate-800">
                <button
                  type="button"
                  onClick={() => onDemoViewModeChange('live')}
                  className={`inline-flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    demoViewMode === 'live'
                      ? 'bg-orange-500 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5 shrink-0" />
                  <span>Live-App (Eingebettet)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onDemoViewModeChange('simulator')}
                  className={`inline-flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    demoViewMode === 'simulator'
                      ? 'bg-orange-500 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Globe className="h-3.5 w-3.5 shrink-0" />
                  <span>Schnell-Vorschau</span>
                </button>
              </div>
              {demoViewMode === 'live' && (
                <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">
                  Original-App direkt eingebettet. Melden Sie sich im Fenster mit{' '}
                  <span className="font-mono text-emerald-300">demo@vision-it.de</span> /{' '}
                  <span className="font-mono text-emerald-300">12345678</span> an oder wechseln Sie
                  zur Schnell-Vorschau ohne Login.
                </p>
              )}
            </div>

            {/* Language Quick Switcher (syncs with Simulator) */}
            {demoViewMode === 'simulator' && (
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                    <Globe className="h-4 w-4 text-orange-400" />
                    <span>Sprachumschaltung live testen</span>
                  </span>
                  <span className="text-xs text-slate-400">7 Sprachen</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => onLanguageChange(lang.code)}
                      className={`rounded-lg py-2 px-1.5 text-center transition-colors cursor-pointer border ${
                        language === lang.code
                          ? 'border-orange-500 bg-orange-500 text-slate-950 font-bold'
                          : 'border-slate-800 bg-[#0B0F19] text-slate-300 hover:border-slate-600 hover:text-white'
                      }`}
                    >
                      <span className="block text-xs font-bold">{lang.label}</span>
                      <span className="block text-[10px] opacity-80 truncate">
                        {lang.nativeName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Guided Feature Highlights */}
            <div className="space-y-2.5">
              {quickScenarios.map((item) => {
                const Icon = item.icon;
                const isSelected = demoViewMode === 'simulator' && activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onTabChange(item.id);
                      onDemoViewModeChange('simulator');
                    }}
                    className={`flex w-full items-start gap-3.5 rounded-xl border p-4 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-orange-500/70 bg-[#151D2F]'
                        : 'border-slate-800 bg-[#111827] hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isSelected
                          ? 'bg-orange-500 text-slate-950'
                          : 'bg-slate-800 text-emerald-400'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-sm font-bold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-300 leading-snug">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Embedded Smartphone Frame */}
          <div className="lg:col-span-6 flex justify-center">
            {demoViewMode === 'live' ? (
              <div className="mx-auto flex h-[660px] w-full max-w-[380px] flex-col overflow-hidden rounded-[36px] border-[6px] border-slate-800 bg-[#0B0F19] shadow-2xl">
                {/* Smartphone Top Bezel Bar */}
                <div className="flex items-center justify-between bg-[#0E1422] px-4 py-2.5 text-[11px] font-medium text-slate-300 border-b border-slate-800/80">
                  <span className="font-mono tabular-nums text-slate-400">hausmeister.pro</span>
                  <div
                    className="h-3.5 w-16 rounded-full bg-slate-900 border border-slate-800"
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setIframeKey((k) => k + 1)}
                      title="App neu laden"
                      className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer"
                    >
                      <RotateCw className="h-3.5 w-3.5" />
                    </button>
                    <a
                      href={LIVE_APP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="In neuem Tab öffnen"
                      className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Embedded Live App iFrame */}
                <div className="relative flex-1 w-full bg-[#0B0F19]">
                  <iframe
                    key={iframeKey}
                    src={LIVE_APP_URL}
                    title="Hausmeister Pro Live-Demo"
                    className="h-full w-full border-0 bg-white"
                    allow="geolocation; camera; clipboard-write"
                  />
                </div>
              </div>
            ) : (
              <PhoneAppSimulator
                activeTab={activeTab}
                onTabChange={onTabChange}
                language={language}
                onLanguageChange={onLanguageChange}
              />
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Interactive Modal */}
      {fullscreenOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Hausmeister Pro Vollbild-Demo"
          className="fixed inset-0 z-50 flex flex-col bg-[#070A12]/95 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
        >
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="min-w-0">
              <p className="font-display text-base font-bold text-white truncate">
                Hausmeister Pro · Live-Demo ({LIVE_APP_URL})
              </p>
              <p className="font-mono text-xs text-slate-400 truncate">
                Test-Login: demo@vision-it.de / 12345678
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={LIVE_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800"
              >
                <span>In neuem Tab öffnen</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setFullscreenOpen(false)}
                aria-label="Vollbild schließen"
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-700 cursor-pointer min-h-[40px]"
              >
                <X className="h-4 w-4" />
                <span>Schließen</span>
              </button>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center py-4">
            {demoViewMode === 'live' ? (
              <div className="h-[78vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-700 bg-white shadow-2xl">
                <iframe
                  src={LIVE_APP_URL}
                  title="Hausmeister Pro Live-App Vollbild"
                  className="h-full w-full border-0"
                  allow="geolocation; camera; clipboard-write"
                />
              </div>
            ) : (
              <PhoneAppSimulator
                activeTab={activeTab}
                onTabChange={onTabChange}
                language={language}
                onLanguageChange={onLanguageChange}
                isFullscreen
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
