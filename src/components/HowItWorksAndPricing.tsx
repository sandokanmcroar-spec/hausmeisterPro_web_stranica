import { useState } from 'react';
import { ArrowRight, Calculator, Check, ShieldCheck } from 'lucide-react';

interface HowItWorksAndPricingProps {
  onNavigate: (sectionId: string) => void;
}

interface PricingTier {
  id: 'starter' | 'betrieb' | 'profi';
  name: string;
  teamRange: string;
  buttonLabel: string;
  pilotPrice: string;
  pilotPriceNum: number;
  regularPrice: string;
  regularPriceNum: number;
  defaultHoursPerWeek: number;
  highlighted?: boolean;
  features: string[];
}

export function HowItWorksAndPricing({ onNavigate }: HowItWorksAndPricingProps) {
  const [selectedTierId, setSelectedTierId] = useState<'starter' | 'betrieb' | 'profi'>('betrieb');
  const [weeklyPaperworkHours, setWeeklyPaperworkHours] = useState<number>(6);

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
      buttonLabel: 'Bis 10 Mitarbeiter',
      pilotPrice: '49 €',
      pilotPriceNum: 49,
      regularPrice: '69 € / Monat',
      regularPriceNum: 69,
      defaultHoursPerWeek: 4,
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
      buttonLabel: 'Bis 20 Mitarbeiter',
      pilotPrice: '89 €',
      pilotPriceNum: 89,
      regularPrice: '119 € / Monat',
      regularPriceNum: 119,
      defaultHoursPerWeek: 6,
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
      buttonLabel: '20+ Mitarbeiter',
      pilotPrice: '149 €',
      pilotPriceNum: 149,
      regularPrice: '189 € / Monat',
      regularPriceNum: 189,
      defaultHoursPerWeek: 10,
      features: [
        'Voller Funktionsumfang (7 Sprachen, Foto-Nachweis, PDF-Protokolle, QR-Zähler & Zeiterfassung)',
        '0 € Einrichtungsgebühr',
        'Monatlich kündbar',
        'Deutscher Serverstandort (100 % DSGVO)',
        'Persönlicher Einrichtungs-Support & Objekt-Import',
      ],
    },
  ];

  const activeTier = pricingTiers.find((t) => t.id === selectedTierId) || pricingTiers[1];
  const monthlyHoursSaved = Math.round(weeklyPaperworkHours * 4.3 * 0.75);
  const hourlyRateEuro = 40;
  const grossMonthlyValue = monthlyHoursSaved * hourlyRateEuro;
  const netMonthlySavings = Math.max(0, grossMonthlyValue - activeTier.pilotPriceNum);
  const annualPilotDiscount = (activeTier.regularPriceNum - activeTier.pilotPriceNum) * 12;

  const handleSelectTier = (tier: PricingTier) => {
    setSelectedTierId(tier.id);
    setWeeklyPaperworkHours(tier.defaultHoursPerWeek);
  };

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

          {/* 4. Ersparnis-Rechner / Konfigurator */}
          <div
            id="ersparnis-rechner"
            className="mx-auto mt-14 max-w-5xl rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-10"
          >
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-orange-400">
                <Calculator className="h-4 w-4 shrink-0" />
                <span>Ersparnis-Rechner &amp; Team-Konfigurator</span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
                Ein Festpreis für Ihr gesamtes Team – ohne zusätzliche Lizenzen pro neuem
                Mitarbeiter.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                Wählen Sie Ihr Team-Paket (bis 10, bis 20 oder 20+ Mitarbeiter) zu garantierten
                Festpreisen – ohne versteckte Kosten oder Pro-Kopf-Gebühren – und berechnen Sie
                sofort Ihre Ersparnis.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
              {/* Left Column: 3 Compact Team-Size Buttons + Weekly Paperwork Hours */}
              <div className="space-y-6 lg:col-span-6">
                <div>
                  <p className="text-sm font-semibold text-slate-200 mb-3">
                    1. Teamgröße wählen (Festpreis-Stufen):
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {pricingTiers.map((tier) => {
                      const active = selectedTierId === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => handleSelectTier(tier)}
                          className={`rounded-xl border px-3.5 py-3 text-left transition-colors cursor-pointer min-h-[56px] ${
                            active
                              ? 'border-orange-500 bg-orange-500 text-slate-950'
                              : 'border-slate-700 bg-[#0B0F19] text-slate-200 hover:border-slate-500'
                          }`}
                        >
                          <span className="block text-sm font-bold whitespace-nowrap">
                            {tier.buttonLabel}
                          </span>
                          <span
                            className={`mt-0.5 block font-mono text-xs tabular-nums ${
                              active ? 'text-slate-900 font-semibold' : 'text-slate-400'
                            }`}
                          >
                            {tier.pilotPrice} / Monat
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-200 mb-3">
                    2. Bisheriger Aufwand für Zettel, Rückfragen &amp; Stundenzettel pro Woche:
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 6, 10, 15].map((hrs) => {
                      const active = weeklyPaperworkHours === hrs;
                      return (
                        <button
                          key={hrs}
                          type="button"
                          onClick={() => setWeeklyPaperworkHours(hrs)}
                          className={`rounded-lg border py-2.5 text-center font-mono text-xs font-bold tabular-nums transition-colors cursor-pointer min-h-[44px] ${
                            active
                              ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                              : 'border-slate-700 bg-[#0B0F19] text-slate-300 hover:border-slate-500'
                          }`}
                        >
                          {hrs} Std.
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Instant Calculation Summary */}
              <div className="rounded-xl border border-slate-800 bg-[#0B0F19] p-5 sm:p-6 lg:col-span-6">
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <p className="text-xs text-slate-400">Gewähltes Festpreis-Paket</p>
                    <p className="font-display text-lg font-bold text-white">
                      {activeTier.name} ({activeTier.buttonLabel})
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-2xl font-extrabold text-orange-400 tabular-nums">
                      {activeTier.pilotPrice}
                    </span>
                    <span className="text-xs text-slate-400"> / Monat</span>
                  </div>
                </div>

                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-slate-300">Zusatzkosten pro neuem Mitarbeiter:</dt>
                    <dd className="font-mono font-bold tabular-nums text-emerald-400">0 €</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-slate-300">Eingesparte Büro- &amp; Abstimmungszeit:</dt>
                    <dd className="font-mono font-bold tabular-nums text-white">
                      ca. {monthlyHoursSaved} Std. / Monat
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-slate-300">Pilot-Rabatt gegenüber regulärem Preis:</dt>
                    <dd className="font-mono font-bold tabular-nums text-emerald-400">
                      {annualPilotDiscount} € / Jahr gespart
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-emerald-300">
                      Ihre geschätzte Netto-Ersparnis pro Monat
                    </p>
                    <p className="text-[11px] text-slate-400">
                      bei 40 €/Std. internem Aufwand abzgl. Festpreis
                    </p>
                  </div>
                  <p className="font-display text-2xl font-extrabold text-emerald-400 tabular-nums whitespace-nowrap">
                    +{netMonthlySavings} €
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('kontakt-formular')}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-orange-400 transition-colors cursor-pointer min-h-[46px]"
                >
                  <span>Paket „{activeTier.name}“ 60 Tage kostenlos testen</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>

                <p className="mt-3.5 text-xs leading-relaxed text-slate-400">
                  Alle angegebenen Preise sind Endpreise. Gemäß § 19 UStG wird keine Umsatzsteuer
                  berechnet und ausgewiesen (Kleinunternehmerregelung).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


