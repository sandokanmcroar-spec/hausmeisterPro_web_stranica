import { useState } from 'react';
import { AlertTriangle, Camera, Check, Clock, MapPin, ShieldCheck, X } from 'lucide-react';

interface ProofCardItem {
  id: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  taskTitle: string;
  timestamp?: string;
  note?: string;
  gps: string;
  statusType: 'done' | 'open';
  statusText: string;
}

const PROOF_CARDS: ProofCardItem[] = [
  {
    id: 'winterdienst',
    category: 'Winterdienst · Morgengrauen',
    imageSrc: '/src/assets/images/winterdienst_gehweg_1795420179718.jpg',
    imageAlt:
      'Frisch geräumter und gestreuter Gehweg vor einem deutschen Mehrfamilienhaus am frühen Morgen',
    taskTitle: 'Winterdienst – Gehweg geräumt & gestreut',
    timestamp: '14.01.2026 | 06:14 Uhr',
    gps: 'GPS: 51.9607° N, 7.6261° E (Lindenstraße 12)',
    statusType: 'done',
    statusText: 'ERLEDIGT',
  },
  {
    id: 'muelltonnendienst',
    category: 'Mülltonnendienst',
    imageSrc: '/src/assets/images/muelltonnendienst_haus_1795420179331.jpg',
    imageAlt:
      'Ordentlich an die Straße gestellte Mülltonnen in Schwarz, Gelb und Blau vor einem Wohnhaus',
    taskTitle: 'Mülltonnen bereitgestellt (Restmüll & Papier)',
    timestamp: '15.01.2026 | 07:32 Uhr',
    gps: 'GPS: 51.9582° N, 7.6194° E (Parkallee 8)',
    statusType: 'done',
    statusText: 'ERLEDIGT',
  },
  {
    id: 'gartenpflege',
    category: 'Garten- & Grünflächenservice · Offen / Fällig',
    imageSrc: '/src/assets/images/garten_gruenflaeche_offen_1795420446970.jpg',
    imageAlt:
      'Ungepflegte, hoch gewachsene Wiese und Hecke vor einem deutschen Mehrfamilienhaus vor dem Einsatz',
    taskTitle: 'Grünflächenpflege – Rasen mähen & Hecke schneiden',
    note: 'Wartet auf Foto-Nachweis vor Ort',
    gps: 'GPS: 51.9631° N, 7.6310° E (Hauptstraße 44)',
    statusType: 'open',
    statusText: '⚠️ OFFEN • Fällig am 16.05.2026, 14:00 Uhr',
  },
];

export function PhotoProofSection() {
  const [activeCard, setActiveCard] = useState<ProofCardItem | null>(null);

  return (
    <section
      id="foto-nachweise"
      className="border-b border-slate-800/70 bg-[#0D121F] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Wasserdichte Dokumentation für Hausverwaltungen &amp; Eigentümer</span>
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
            Rechtssichere Foto-Nachweise aus dem Arbeitsalltag – So sieht es für Ihre Hausverwaltung
            aus
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            Bei Rückfragen oder Beschwerden von Mietern und Hausverwaltungen öffnen Sie einfach den
            Auftrag: Jedes Foto wird automatisch mit exakter Uhrzeit, Datum und GPS-Standort fest
            versiegelt – und offene Einsätze fallen sofort rot ins Auge. Gleichzeitig wird jedes
            neu angelegte Objekt automatisch auf der Karte eingetragen, sodass Ihre Mitarbeiter per
            1-Klick direkt die Navigation starten können.
          </p>
        </div>

        {/* 3-Column Photo Proof Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PROOF_CARDS.map((card) => {
            const isOpen = card.statusType === 'open';
            return (
              <article
                key={card.id}
                className={`group flex flex-col overflow-hidden rounded-2xl border bg-[#111827] transition-colors ${
                  isOpen
                    ? 'border-rose-500/40 hover:border-rose-500/70'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Photo Frame with Bottom-Third App Timestamp Overlay */}
                <button
                  type="button"
                  onClick={() => setActiveCard(card)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  aria-label={`${card.taskTitle} – Nachweis vergrößern`}
                >
                  {/* Fallback Background */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-800 to-slate-900 text-slate-400">
                    <Camera className="h-8 w-8" />
                    <span className="text-xs font-medium">{card.category}</span>
                  </div>

                  {/* Real Documentary Photo */}
                  <img
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    referrerPolicy="no-referrer"
                    className="relative h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  {/* Contrast Scrim */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/15"
                    aria-hidden="true"
                  />

                  {/* Bottom-Third Semi-Transparent Dark App Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-[#0B0F19]/85 backdrop-blur-md border-t border-white/15 px-4 py-3.5">
                    {isOpen ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded bg-rose-600 px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-white shadow-sm">
                          <span>{card.statusText}</span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-500 px-2 py-0.5 text-[11px] font-extrabold tracking-wide text-slate-950">
                          <Check className="h-3 w-3 stroke-[3]" />
                          <span>{card.statusText}</span>
                        </span>
                        {card.timestamp && (
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium tabular-nums text-slate-200">
                            <Clock className="h-3 w-3 text-emerald-400 shrink-0" />
                            <span>{card.timestamp}</span>
                          </span>
                        )}
                      </div>
                    )}

                    <p className="mt-2 font-display text-sm font-bold text-white leading-snug">
                      {card.taskTitle}
                    </p>

                    {card.note && (
                      <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-amber-300">
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                        <span>{card.note}</span>
                      </p>
                    )}

                    <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] tabular-nums text-slate-200">
                      <MapPin
                        className={`h-3.5 w-3.5 shrink-0 ${
                          isOpen ? 'text-rose-400' : 'text-emerald-400'
                        }`}
                      />
                      <span className="truncate">{card.gps}</span>
                    </p>
                  </div>
                </button>

                {/* Static App-UI Preview Strip + Card Footer */}
                <div className="flex flex-col gap-3 p-4">
                  <div
                    aria-hidden="true"
                    className="flex items-center gap-2.5 rounded-lg border border-slate-800/90 bg-[#0B0F19] px-3 py-2 select-none pointer-events-none"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="inline-flex items-center rounded-md border border-slate-700/90 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-200 whitespace-nowrap">
                      📍 Zum Objekt / Navigation starten
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                    <span className="truncate">{card.category}</span>
                    <button
                      type="button"
                      onClick={() => setActiveCard(card)}
                      className={`font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isOpen
                          ? 'text-rose-400 hover:text-rose-300'
                          : 'text-emerald-400 hover:text-emerald-300'
                      }`}
                    >
                      {isOpen ? 'Status vergrößern →' : 'Nachweis vergrößern →'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Inspection Lightbox Modal */}
      {activeCard && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeCard.taskTitle}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setActiveCard(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-[#111827] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3.5">
              <div>
                <p
                  className={`text-xs font-medium ${
                    activeCard.statusType === 'open' ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {activeCard.category}
                </p>
                <h3 className="font-display text-base font-bold text-white">
                  {activeCard.taskTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveCard(null)}
                aria-label="Vorschau schließen"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-[4/3] w-full bg-slate-900">
              <img
                src={activeCard.imageSrc}
                alt={activeCard.imageAlt}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-[#0B0F19]/90 backdrop-blur-md border-t border-white/15 px-5 py-4">
                {activeCard.statusType === 'open' ? (
                  <span className="inline-flex items-center gap-1.5 rounded bg-rose-600 px-2.5 py-1 text-xs font-extrabold text-white">
                    <span>{activeCard.statusText}</span>
                  </span>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded bg-emerald-500 px-2.5 py-0.5 text-xs font-extrabold text-slate-950">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                      <span>{activeCard.statusText}</span>
                    </span>
                    {activeCard.timestamp && (
                      <span className="font-mono text-xs tabular-nums text-slate-200">
                        {activeCard.timestamp}
                      </span>
                    )}
                  </div>
                )}

                <p className="mt-2 font-display text-base font-bold text-white">
                  {activeCard.taskTitle}
                </p>

                {activeCard.note && (
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-amber-300">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>{activeCard.note}</span>
                  </p>
                )}

                <p
                  className={`mt-1.5 flex items-center gap-1.5 font-mono text-xs tabular-nums ${
                    activeCard.statusType === 'open' ? 'text-rose-300' : 'text-emerald-300'
                  }`}
                >
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{activeCard.gps}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
