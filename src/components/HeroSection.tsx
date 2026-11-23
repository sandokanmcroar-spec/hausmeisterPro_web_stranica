import { useState } from 'react';
import { ArrowRight, Camera, Check, Globe, MapPin, Smartphone } from 'lucide-react';
import { DEMO_TRANSLATIONS, LANGUAGES, type LanguageCode } from '../data/demoTranslations';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [previewLang, setPreviewLang] = useState<LanguageCode>('pl');
  const translated = DEMO_TRANSLATIONS[previewLang];

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-slate-800/70 bg-[#0B0F19] pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Value Proposition & Primary Actions */}
          <div className="flex flex-col justify-center lg:col-span-7">
            {/* Editorial Kicker (unboxed, zero-pill discipline) */}
            <div className="mb-5 flex items-center gap-3 text-sm font-semibold text-emerald-400">
              <span className="h-px w-6 bg-emerald-400/70" aria-hidden="true" />
              <span>Speziell für Hausmeisterservices &amp; Gebäudereinigung</span>
            </div>

            <h1
              className="font-display font-bold tracking-tight text-white [text-wrap:balance]"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.65rem)', lineHeight: 1.12 }}
            >
              Schluss mit Zettelwirtschaft und Sprachbarrieren im Objektservice.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Planen Sie Aufgaben auf Deutsch – Ihre Mitarbeiter erledigen alles in ihrer
              Muttersprache und liefern den Foto-Nachweis mit 1 Klick. Sofort startklar,
              100 % DSGVO-konform.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={() => onNavigate('kontakt-formular')}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3.5 text-base font-semibold text-slate-950 hover:bg-orange-400 transition-colors duration-150 cursor-pointer whitespace-nowrap min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
              >
                <span>Jetzt als Pilot-Partner kostenlos testen</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('live-demo')}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-base font-semibold text-slate-100 hover:bg-slate-800 hover:border-slate-600 transition-colors duration-150 cursor-pointer whitespace-nowrap min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <Smartphone className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>Live-Demo direkt im Browser testen</span>
              </button>
            </div>

            {/* Trust Line */}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Keine Einrichtungsgebühr</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Serverstandort Deutschland</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>In 10 Minuten startklar</span>
              </span>
            </div>
          </div>

          {/* Right Column: Live Field-to-Office Translation Proof Card */}
          <div className="lg:col-span-5 flex">
            <div className="flex w-full flex-col justify-between rounded-2xl border border-slate-800 bg-[#111827] p-5 sm:p-6">
              <div>
                <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <p className="text-xs font-medium text-slate-400">Büro-Planung (Deutsch)</p>
                    <p className="mt-0.5 font-display text-base font-semibold text-white">
                      Hauptstraße 14 · Wohnanlage Nord
                    </p>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-emerald-400">
                    07:15 Uhr
                  </span>
                </div>

                {/* German Source Task */}
                <div className="mt-4 rounded-xl border border-slate-800/90 bg-[#0B0F19] p-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Aufgabe vom Büro angelegt</span>
                    <span>Deutsch</span>
                  </div>
                  <p className="mt-1.5 font-medium text-slate-100">
                    Mülltonnen rausstellen (Restmüll &amp; Papier)
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Bitte bis 07:30 Uhr an die Straße stellen und Stellplatz kurz fegen.
                  </p>
                </div>

                {/* Language Switcher for Employee View */}
                <div className="mt-5">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300">
                      <Globe className="h-3.5 w-3.5 text-orange-400" />
                      Anzeige auf Mitarbeiter-Handy testen:
                    </span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 rounded-lg bg-[#0B0F19] p-1 border border-slate-800">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => setPreviewLang(lang.code)}
                        title={lang.nativeName}
                        className={`rounded-md py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                          previewLang === lang.code
                            ? 'bg-orange-500 text-slate-950'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Translated Output */}
                <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                  <div className="flex items-center justify-between text-xs text-emerald-300">
                    <span>
                      Sprache: {LANGUAGES.find((l) => l.code === previewLang)?.nativeName}
                    </span>
                    <span className="font-medium">{translated.status.done}</span>
                  </div>
                  <p className="mt-1.5 font-medium text-white">{translated.tasks.t1.title}</p>
                  <p className="mt-1 text-sm text-slate-300">
                    {translated.tasks.t1.instruction}
                  </p>
                </div>
              </div>

              {/* Verified Proof Footer */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-4 text-xs text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <Camera className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{translated.labels.photoCaptured}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono tabular-nums text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-orange-400" />
                  <span>51.4556° N, 7.0116° E · 07:28</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
