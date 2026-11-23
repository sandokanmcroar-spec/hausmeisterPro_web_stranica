import {
  BellRing,
  Camera,
  ClipboardCheck,
  Clock,
  Globe,
  KeyRound,
  MapPin,
  QrCode,
  Trees,
} from 'lucide-react';
import { LANGUAGES, type DemoTab, type LanguageCode } from '../data/demoTranslations';

interface FeaturesSectionProps {
  onTryInDemo: (tab: DemoTab, lang?: LanguageCode) => void;
}

export function FeaturesSection({ onTryInDemo }: FeaturesSectionProps) {
  const everydayFeatures: {
    title: string;
    description: string;
    icon: typeof Trees;
    demoTab: DemoTab;
  }[] = [
    {
      title: 'Garten- & Grünflächenservice',
      description:
        'Rasenmähen, Heckenschnitt, Laubentsorgung und Pflegeintervalle sauber planen und mit Vorher-/Nachher-Fotos gegenüber Eigentümern und Hausverwaltungen belegen.',
      icon: Trees,
      demoTab: 'tasks',
    },
    {
      title: 'Digitale Wohnungsübergabe mit PDF-Protokoll',
      description:
        'Zustand der Räume, Mängel und Fotos direkt auf dem Smartphone oder Tablet festhalten, digital unterschreiben lassen und sofort als fertiges PDF-Übergabeprotokoll versenden.',
      icon: ClipboardCheck,
      demoTab: 'handover',
    },
    {
      title: 'Lückenlose Schlüsselübergabe',
      description:
        'Genau dokumentieren, welcher Schlüssel (Haustür, Keller, Briefkasten, Technikraum) wann an Mieter, Handwerker oder Eigentümer übergeben oder zurückgenommen wurde – inklusive digitaler Unterschrift.',
      icon: KeyRound,
      demoTab: 'handover',
    },
    {
      title: 'Zählerablesung mit QR-Code',
      description:
        'QR-Code am Strom-, Wasser- oder Wärmezähler scannen, Zählerstand eintragen und Foto anhängen – ohne Zahlendreher und ohne langes Suchen nach Zählernummern im dunklen Keller.',
      icon: QrCode,
      demoTab: 'meter_time',
    },
    {
      title: 'Arbeitszeiterfassung mit PDF-Stundennachweis',
      description:
        'Mitarbeiter stempeln Arbeitsbeginn, Pausen und Feierabend direkt in der App. Am Monatsende lassen sich alle Arbeitszeiten mit einem Klick als fertiger PDF-Stundenzettel für die Lohnbuchhaltung oder als Leistungsnachweis herunterladen.',
      icon: Clock,
      demoTab: 'meter_time',
    },
    {
      title: 'Übersichtlicher Einsatzkalender & Sofort-Benachrichtigungen',
      description:
        'Alle wiederkehrenden Touren und Einzeltermine im Blick behalten. Mitarbeiter erhalten automatisch eine Push-Benachrichtigung aufs Handy bei neuen oder dringenden Einsätzen (z. B. Winterdienst), und Sie im Büro sehen sofort, wenn ein Auftrag erledigt wurde.',
      icon: BellRing,
      demoTab: 'map',
    },
  ];

  return (
    <section id="funktionen" className="border-b border-slate-800/70 bg-[#0B0F19] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Part 1: Die 3 größten Probleme gelöst */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-orange-400">
            Für Betriebe mit 3 bis 30 Mitarbeitern entwickelt
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
            Die 3 größten Alltagsprobleme im Objektservice – endgültig gelöst
          </h2>
        </div>

        {/* Asymmetric Bento Grid (1 wide hero feature + 2 structured cards) */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Card 1: 7 Sprachen (Wide Span) */}
          <div className="lg:col-span-12 rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-8">
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  <Globe className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-white sm:text-2xl">
                  7 Sprachen für Ihre Mitarbeiter (Keine Sprachbarriere)
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-300">
                  Sie legen Objekte und Aufgaben ganz normal auf Deutsch an. Ihre Mitarbeiter vor
                  Ort stellen die App mit einem Klick auf Polnisch, Kroatisch, Türkisch, Russisch,
                  Albanisch, Englisch oder Deutsch um. Missverständnisse gehören der Vergangenheit
                  an.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-xl border border-slate-800 bg-[#0B0F19] p-4">
                  <p className="text-xs font-medium text-slate-400 mb-3">
                    Klicken, um Sprache in der Live-Demo auszuwählen:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => onTryInDemo('tasks', lang.code)}
                        className="flex items-center justify-between rounded-lg border border-slate-800 bg-[#111827] px-3 py-2 text-xs font-medium text-slate-200 hover:border-orange-500/60 hover:text-white transition-colors cursor-pointer"
                      >
                        <span>{lang.nativeName}</span>
                        <span className="font-mono text-[11px] text-orange-400">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Foto-Nachweis */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <Camera className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">
                Rechtssicherer Foto-Nachweis mit GPS &amp; Zeitstempel
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                Ob Mülltonnendienst, Reinigung, Gartenpflege oder Winterdienst: Mit einem Klick auf
                ‚Foto senden &amp; erledigt‘ dokumentiert der Mitarbeiter die Arbeit vor Ort. Sie
                haben sofort den lückenlosen Nachweis für die Hausverwaltung.
              </p>
            </div>
            <div className="mt-6 border-t border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => onTryInDemo('tasks')}
                className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                Foto-Nachweis in der Demo testen →
              </button>
            </div>
          </div>

          {/* Card 3: Kartenansicht, Kalender & Offline-Modus */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">
                Kartenansicht, Kalender &amp; Offline-Modus in einer App
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                Alle Objekte auf einer übersichtlichen Karte (Überfällig, Offen, Erledigt),
                inklusive Einsatzkalender und voller Offline-Funktion für Tiefgaragen oder Keller
                ohne Empfang.
              </p>
            </div>
            <div className="mt-6 border-t border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => onTryInDemo('map')}
                className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
              >
                Kartenansicht in der Demo öffnen →
              </button>
            </div>
          </div>
        </div>

        {/* Part 2: Weitere Praxis-Funktionen aus dem Alltag */}
        <div className="mt-20 sm:mt-24">
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
              Weitere Praxis-Funktionen aus dem Arbeitsalltag
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Vom Winterdienst bis zum fertigen PDF-Stundenzettel für die Lohnbuchhaltung: Alles
              greift sauber ineinander.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {everydayFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <article
                  key={feat.title}
                  className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#111827] p-6 hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-[#0B0F19] text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-white leading-snug">
                      {feat.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                      {feat.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => onTryInDemo(feat.demoTab)}
                      className="text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
                    >
                      Funktion in der Live-Demo ansehen →
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
