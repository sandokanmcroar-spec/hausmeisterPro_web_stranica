import { useState } from 'react';
import { ArrowUpRight, Mail, X } from 'lucide-react';

export function Footer() {
  const [legalModal, setLegalModal] = useState<'impressum' | 'datenschutz' | null>(null);

  return (
    <footer className="bg-[#080B13] py-12 text-sm text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div>
            <p className="font-display text-base font-bold text-white">
              Vision IT Systems – Hausmeister Pro
            </p>
            <a
              href="mailto:kontakt@vision-it-systems.de"
              className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-orange-400 transition-colors"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span>kontakt@vision-it-systems.de</span>
            </a>
          </div>

          {/* Legal & Back Links */}
          <nav
            aria-label="Rechtliche Hinweise und Navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
          >
            <button
              type="button"
              onClick={() => setLegalModal('impressum')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Impressum
            </button>
            <span className="text-slate-700" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => setLegalModal('datenschutz')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Datenschutz (DSGVO)
            </button>
            <span className="text-slate-700" aria-hidden="true">
              |
            </span>
            <a
              href="https://vision-it-systems.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-orange-400 transition-colors"
            >
              <span>Zurück zur Hauptseite</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
            </a>
          </nav>
        </div>

        <div className="mt-8 border-t border-slate-800/80 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Vision IT Systems. Alle Rechte vorbehalten.</p>
          <p>Serverstandort Deutschland · 100 % DSGVO-konform</p>
        </div>
      </div>

      {/* Legal Modal */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={legalModal === 'impressum' ? 'Impressum' : 'Datenschutz (DSGVO)'}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#111827] p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-display text-lg font-bold text-white">
                {legalModal === 'impressum' ? 'Impressum' : 'Datenschutz (DSGVO)'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                aria-label="Fenster schließen"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300 max-h-[65vh] overflow-y-auto pr-1">
              {legalModal === 'impressum' ? (
                <>
                  <p>
                    <strong className="text-white">Vision IT Systems</strong>
                    <br />
                    Produktbereich: Hausmeister Pro
                  </p>
                  <p>
                    Kontakt:
                    <br />
                    E-Mail: kontakt@vision-it-systems.de
                    <br />
                    Internet: vision-it-systems.de
                  </p>
                  <p className="text-xs text-slate-400">
                    Hinweis: Ausführliche Unternehmensangaben und Handelsregisterdaten finden Sie
                    auf unserer Hauptseite unter vision-it-systems.de.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Der Schutz Ihrer betrieblichen Daten und der Daten Ihrer Mitarbeiter hat für
                    uns höchste Priorität. Wir verarbeiten personenbezogene Daten streng nach den
                    Vorgaben der Datenschutz-Grundverordnung (DSGVO).
                  </p>
                  <p>
                    <strong className="text-white">Serverstandort Deutschland:</strong> Alle
                    Objektdaten, Foto-Nachweise, PDF-Übergabeprotokolle und Arbeitszeiten werden
                    ausschließlich auf verschlüsselten Servern in Deutschland gespeichert und
                    gesichert.
                  </p>
                  <p>
                    <strong className="text-white">Kontaktanfragen:</strong> Die im
                    Testzugangs-Formular eingegebenen Daten verwenden wir ausschließlich zur
                    Einrichtung Ihres 60-Tage-Pilotzugangs und für persönliche Rückfragen.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end border-t border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 cursor-pointer"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
