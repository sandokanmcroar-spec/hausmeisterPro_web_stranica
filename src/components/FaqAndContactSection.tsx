import { useState } from 'react';
import { CheckCircle2, ChevronDown, Lock, Send } from 'lucide-react';

interface FormState {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  teamSize: string;
}

export function FaqAndContactSection() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const [form, setForm] = useState<FormState>({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    teamSize: '1–5',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      question: 'Müssen meine Mitarbeiter technisch fit sein?',
      answer:
        'Nein, die App ist so einfach wie WhatsApp – große Buttons, klare Symbole und komplett in der eigenen Muttersprache.',
    },
    {
      question: 'Funktioniert die App im Keller oder in der Tiefgarage ohne Internet?',
      answer:
        'Ja, Fotos, Zählerstände und Aufgaben werden lokal gespeichert und automatisch synchronisiert, sobald wieder Empfang da ist.',
    },
    {
      question: 'Sind die Daten meiner Kunden und Mitarbeiter sicher?',
      answer:
        'Ja, 100 % DSGVO-konform. Alle Daten, PDF-Protokolle und Arbeitszeiten liegen ausschließlich auf verschlüsselten Servern in Deutschland.',
    },
  ];

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Bitte geben Sie Ihren Vor- und Nachnamen ein.';
    }
    if (!form.company.trim()) {
      nextErrors.company = 'Bitte geben Sie Ihren Firmennamen ein.';
    }
    if (!form.phone.trim() || form.phone.replace(/[^0-9+]/g, '').length < 6) {
      nextErrors.phone = 'Bitte geben Sie eine gültige Telefonnummer an.';
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <>
      {/* Section 8: FAQ */}
      <section className="border-b border-slate-800/70 bg-[#0D121F] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
              Praxis-Fragen von Inhabern
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Klare Antworten auf die wichtigsten Fragen aus dem Betriebsalltag.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-xl border border-slate-800 bg-[#111827] overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-bold text-white hover:bg-slate-800/40 transition-colors cursor-pointer sm:px-6 sm:py-5"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-orange-400 transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-800/80 px-5 py-4 text-sm leading-relaxed text-slate-300 sm:px-6 sm:text-base">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 9: Kontakt- & Pilot-Anfrage Formular */}
      <section
        id="kontakt-formular"
        className="border-b border-slate-800/70 bg-[#0B0F19] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-10">
            <div className="max-w-xl">
              <p className="text-sm font-semibold text-emerald-400">
                Unverbindlicher Pilot-Zugang · 30 Tage kostenlos
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
                Starten Sie Ihren kostenlosen 30-Tage-Test
              </h2>
              <p className="mt-2.5 text-sm text-slate-300 sm:text-base">
                Wir richten Ihren Testzugang persönlich ein und melden uns innerhalb eines
                Werktags telefonisch oder per WhatsApp bei Ihnen.
              </p>
            </div>

            {submitted ? (
              <div className="mt-8 rounded-xl border border-emerald-500/40 bg-emerald-950/25 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" />
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      Vielen Dank, {form.fullName}! Ihre Testanfrage ist eingegangen.
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      Wir bereiten den kostenlosen 30-Tage-Pilotzugang für{' '}
                      <strong className="text-white">{form.company}</strong> ({form.teamSize}{' '}
                      Mitarbeiter) vor und kontaktieren Sie kurzfristig unter{' '}
                      <strong className="text-white">{form.phone}</strong> oder{' '}
                      <strong className="text-white">{form.email}</strong>.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <a
                        href={`mailto:kontakt@vision-it-systems.de?subject=${encodeURIComponent(
                          `Pilot-Anfrage Hausmeister Pro – ${form.company}`
                        )}&body=${encodeURIComponent(
                          `Name: ${form.fullName}\nFirma: ${form.company}\nTelefon: ${form.phone}\nE-Mail: ${form.email}\nMitarbeiter: ${form.teamSize}`
                        )}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0B0F19] px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
                      >
                        <span>Kopie per E-Mail-Programm senden</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setForm({
                            fullName: '',
                            company: '',
                            phone: '',
                            email: '',
                            teamSize: '1–5',
                          });
                        }}
                        className="text-xs font-semibold text-orange-400 hover:underline cursor-pointer"
                      >
                        Weitere Anfrage senden
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="pilot-name"
                      className="block text-sm font-medium text-slate-200 mb-1.5"
                    >
                      Vor- und Nachname *
                    </label>
                    <input
                      id="pilot-name"
                      type="text"
                      required
                      placeholder="z. B. Thomas Weber"
                      value={form.fullName}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, fullName: e.target.value }));
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                      className="w-full rounded-lg border border-slate-700 bg-[#0B0F19] px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none min-h-[44px]"
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="pilot-company"
                      className="block text-sm font-medium text-slate-200 mb-1.5"
                    >
                      Firmenname *
                    </label>
                    <input
                      id="pilot-company"
                      type="text"
                      required
                      placeholder="z. B. Weber Hausmeisterservice GmbH"
                      value={form.company}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, company: e.target.value }));
                        if (errors.company) setErrors((prev) => ({ ...prev, company: undefined }));
                      }}
                      className="w-full rounded-lg border border-slate-700 bg-[#0B0F19] px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none min-h-[44px]"
                    />
                    {errors.company && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.company}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="pilot-phone"
                      className="block text-sm font-medium text-slate-200 mb-1.5"
                    >
                      Telefonnummer (für Rückfragen/WhatsApp) *
                    </label>
                    <input
                      id="pilot-phone"
                      type="tel"
                      required
                      placeholder="z. B. 0171 1234567"
                      value={form.phone}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, phone: e.target.value }));
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      className="w-full rounded-lg border border-slate-700 bg-[#0B0F19] px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none min-h-[44px]"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="pilot-email"
                      className="block text-sm font-medium text-slate-200 mb-1.5"
                    >
                      E-Mail-Adresse *
                    </label>
                    <input
                      id="pilot-email"
                      type="email"
                      required
                      placeholder="z. B. info@weber-service.de"
                      value={form.email}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className="w-full rounded-lg border border-slate-700 bg-[#0B0F19] px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none min-h-[44px]"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="pilot-team-size"
                    className="block text-sm font-medium text-slate-200 mb-1.5"
                  >
                    Anzahl der Mitarbeiter
                  </label>
                  <select
                    id="pilot-team-size"
                    value={form.teamSize}
                    onChange={(e) => setForm((prev) => ({ ...prev, teamSize: e.target.value }))}
                    className="w-full rounded-lg border border-slate-700 bg-[#0B0F19] px-3.5 py-3 text-sm text-white focus:border-orange-500 focus:outline-none min-h-[44px] cursor-pointer"
                  >
                    <option value="1–5">1–5 Mitarbeiter</option>
                    <option value="6–15">6–15 Mitarbeiter</option>
                    <option value="16–30">16–30 Mitarbeiter</option>
                    <option value="30+">30+ Mitarbeiter</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-4 text-base font-semibold text-slate-950 hover:bg-orange-400 transition-colors cursor-pointer min-h-[50px]"
                  >
                    <Send className="h-4 w-4 shrink-0" />
                    <span>Kostenlosen Testzugang anfordern</span>
                  </button>

                  <p className="mt-3.5 flex items-start gap-2 text-xs leading-relaxed text-slate-400">
                    <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>
                      DSGVO-Hinweis: Ihre Angaben werden ausschließlich zur Einrichtung Ihres
                      unverbindlichen 30-Tage-Testzugangs und zur persönlichen Kontaktaufnahme
                      verwendet. Keine Weitergabe an Dritte, keine Werbe-Newsletter, Hosting
                      ausschließlich in Deutschland.
                    </span>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
