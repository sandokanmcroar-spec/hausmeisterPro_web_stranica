import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0B0F19]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, 'top')}
          className="font-display text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 sm:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-sm"
        >
          Vision IT Systems <span className="text-slate-500 font-normal">|</span>{' '}
          <span className="text-orange-400">Hausmeister Pro</span>
        </a>

        {/* Zone 2: 4 single-line Navigation Links */}
        <nav
          aria-label="Hauptnavigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
        >
          <a
            href="#funktionen"
            onClick={(e) => handleLinkClick(e, 'funktionen')}
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-orange-500/70"
          >
            Funktionen
          </a>
          <a
            href="#live-demo"
            onClick={(e) => handleLinkClick(e, 'live-demo')}
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-orange-500/70"
          >
            Live-Demo
          </a>
          <a
            href="#pilot-programm"
            onClick={(e) => handleLinkClick(e, 'pilot-programm')}
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-orange-500/70"
          >
            Pilot-Programm
          </a>
          <a
            href="#kontakt-formular"
            onClick={(e) => handleLinkClick(e, 'kontakt-formular')}
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-orange-500/70"
          >
            Kontakt
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('kontakt-formular')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-orange-400 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
          >
            60 Tage kostenlos testen
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            className="inline-flex md:hidden items-center justify-center rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-200 hover:bg-slate-800 min-h-[44px] min-w-[44px]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-800 bg-[#0F1524] px-4 py-4 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            <a
              href="#funktionen"
              onClick={(e) => handleLinkClick(e, 'funktionen')}
              className="rounded-lg px-3 py-3 text-base font-medium text-slate-200 hover:bg-slate-800/70 min-h-[44px] flex items-center"
            >
              Funktionen
            </a>
            <a
              href="#live-demo"
              onClick={(e) => handleLinkClick(e, 'live-demo')}
              className="rounded-lg px-3 py-3 text-base font-medium text-slate-200 hover:bg-slate-800/70 min-h-[44px] flex items-center"
            >
              Live-Demo
            </a>
            <a
              href="#pilot-programm"
              onClick={(e) => handleLinkClick(e, 'pilot-programm')}
              className="rounded-lg px-3 py-3 text-base font-medium text-slate-200 hover:bg-slate-800/70 min-h-[44px] flex items-center"
            >
              Pilot-Programm
            </a>
            <a
              href="#kontakt-formular"
              onClick={(e) => handleLinkClick(e, 'kontakt-formular')}
              className="rounded-lg px-3 py-3 text-base font-medium text-slate-200 hover:bg-slate-800/70 min-h-[44px] flex items-center"
            >
              Kontakt
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('kontakt-formular');
              }}
              className="mt-2 w-full rounded-lg bg-orange-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-orange-400 transition-colors min-h-[44px]"
            >
              60 Tage kostenlos testen
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
