import { ArrowRight, Check, ShieldCheck } from 'lucide-react';

interface HowItWorksAndPricingProps {
  onNavigate: (sectionId: string) => void;
}

interface PricingTier {
  id: string;
  name: string;
  teamRange: string;
  pilotPrice: string;
  regularPrice: string;
  highlighted?: boolean;
  features: string[];
}

export function HowItWorksAndPricing({ onNavigate }: HowItWorksAndPricingProps) {
  const steps = [
    {
      num: '01.',
      title: 'Objekte & Touren anlegen',
      text: 'Mülltonnen, Reinigung, Gartenpflege und QR-Codes für Zähler in wenigen Minuten eintragen.',
    },
    {
      num: '02.',
      title: 'Mitarbeiter per Link einladen',
      text: 'Kein kompliziertes IT-Setup, läuft sofort auf jedem Smartphone in der eigenen Muttersprache.',
    },
    {
      num: '03.',
      title: 'Live verfolgen & Nachweise sichern',
      text: 'In Echtzeit sehen, welche Objekte erledigt sind, und Übergabeprotokolle oder Arbeitszeiten als PDF herunterladen.',
    },
  ];

  const pricingTiers: PricingTier[] = [
    {
      id: 'starter',
      name: 'Starter',
      teamRange: 'bis 10 Mitarbeiter',
      pilotPrice: '49 €',
      regularPrice: '69 € / Monat',
      features: [
        'Voller Funktionsumfang (7 Sprachen, Foto-Nachweis, PDF-Protokolle, QR-Zähler & Zeiterfassung)',
        '0 € Einrichtungsgebühr',
        'Monatlich kündbar',
        'Deutscher Serverstandort (100 % DSGVO)',
      ],
    },
    {
      id: 'betrieb',
      name: 'Betrieb',
      teamRange: '11 bis 20 Mitarbeiter',
      pilotPrice: '89 €',
      regularPrice: '119 € / Monat',
      highlighted: true,
      features: [
        'Voller Funktionsumfang (7 Sprachen, Foto-Nachweis, PDF-Protokolle, QR-Zähler & Zeiterfassung)',
        '0 € Einrichtungsgebühr',
        'Monatlich kündbar',
        'Deutscher Serverstandort (100 % DSGVO)',
        'Persönlicher Einrichtungs-Support für Ihr Team',
      ],
    },
    {
      id: 'profi',
      name: 'Profi-Betrieb',
      teamRange: 'ab 20+ Mitarbeiter',
      pilotPrice: '149 €',
      regularPrice: '189 € / Monat',
      features: [
        'Voller Funktionsumfang (7 Sprachen, Foto-Nachweis, PDF-Protokolle, QR-Zähler & Zeiterfassung)',
        '0 € Einrichtungsgebühr',
        'Monatlich kündbar',
        'Deutscher Serverstandort (100 % DSGVO)',
        'Persönlicher Einrichtungs-Support & Objekt-Import',
      ],
    },
  ];

  return (
    <>
      {/* Section 6: Wie es funktioniert (3 Schritte) */}
      <section className="border-b border-slate-800/70 bg-[#0D121F] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
              In 3 einfachen Schritten startklar
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Ohne lange Schulungen oder aufwändige Einrichtung – Ihre Mitarbeiter starten noch am
              selben Tag.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-7"
              >
                <span className="font-mono text-2xl font-bold tabular-nums text-orange-400">
                  {step.num}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Transparentes Preismodell & Pilot-Programm */}
      <section
        id="pilot-programm"
        className="border-b border-slate-800/70 bg-[#0B0F19] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
              Faire Monatspreise – Starten Sie jetzt als Pilot-Partner
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Testen Sie Hausmeister Pro im echten Betrieb auf Ihren Touren – völlig ohne Risiko
              und ohne versteckte Kosten.
            </p>
          </div>

          {/* 1. Pilot-Vorteil Highlight Banner */}
          <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-orange-500/45 bg-orange-950/20 p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-orange-400" />
                <p className="text-sm leading-relaxed text-slate-100 sm:text-base font-medium">
                  <strong className="text-orange-400">
                    Exklusiv für die ersten 10 Pilot-Partner:
                  </strong>{' '}
                  60 Tage komplett kostenlos testen (0 €) – und danach den vergünstigten Pilot-Preis{' '}
                  <strong className="text-white">DAUERHAFT sichern</strong> (statt der späteren
                  regulären Preise).
                </p>
              </div>
              <span className="shrink-0 self-start sm:self-center font-mono text-xs font-bold text-emerald-300 whitespace-nowrap">
                Limitiert auf 10 Betriebe
              </span>
            </div>
          </div>

          {/* 2. 3 Pricing Cards */}
          <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={`flex flex-col justify-between rounded-2xl border p-6 sm:p-7 transition-colors ${
                  tier.highlighted
                    ? 'border-orange-500 bg-[#141C2E]'
                    : 'border-slate-800 bg-[#111827]'
                }`}
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">{tier.name}</h3>
                      <p className="mt-0.5 text-sm font-medium text-slate-400">{tier.teamRange}</p>
                    </div>
                    {tier.highlighted && (
                      <span className="rounded-md bg-orange-500 px-2.5 py-1 text-xs font-bold text-slate-950 whitespace-nowrap shrink-0">
                        Beliebteste Wahl
                      </span>
                    )}
                  </div>

                  {/* Pilot Start + Permanent Pilot Price vs Regular Price */}
                  <div className="mt-5 rounded-xl border border-slate-800/90 bg-[#0B0F19] p-4">
                    <p className="text-xs font-semibold text-emerald-400">
                      Pilot-Start: 0 € für die ersten 60 Tage
                    </p>

                    <div className="mt-3">
                      <p className="text-xs text-slate-400">Danach dauerhaft:</p>
                      <div className="mt-1 flex items-baseline gap-2.5 flex-wrap">
                        <span className="font-display text-3xl font-extrabold text-white tabular-nums">
                          {tier.pilotPrice}
                        </span>
                        <span className="text-sm font-semibold text-slate-200">/ Monat</span>
                      </div>
                      <p className="mt-1.5 text-xs text-slate-400">
                        statt regulär{' '}
                        <span className="line-through text-slate-500 font-medium tabular-nums">
                          {tier.regularPrice}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-sm leading-snug text-slate-200"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action */}
                <div className="mt-7 pt-5 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => onNavigate('kontakt-formular')}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition-colors cursor-pointer min-h-[46px] ${
                      tier.highlighted
                        ? 'bg-orange-500 text-slate-950 hover:bg-orange-400'
                        : 'border border-slate-700 bg-slate-800/90 text-white hover:bg-slate-700'
                    }`}
                  >
                    <span>60 Tage kostenlos testen</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Trust / Price Guarantee Notice */}
          <div className="mx-auto mt-8 max-w-4xl rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-5 py-4 text-center">
            <p className="text-sm leading-relaxed text-emerald-100">
              <strong className="text-emerald-400">✓ Preisgarantie:</strong> Als einer der ersten
              10 Pilot-Betriebe behalten Sie Ihren vergünstigten Monatspreis dauerhaft – auch wenn
              wir später auf die regulären Preise umstellen. Keine versteckten Kosten, monatlich
              kündbar.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

