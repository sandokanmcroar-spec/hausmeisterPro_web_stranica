import { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileText,
  Globe,
  KeyRound,
  ListChecks,
  Lock,
  LogOut,
  Map as MapIcon,
  MapPin,
  Play,
  Pause,
  QrCode,
  Square,
  Wifi,
  WifiOff,
  ChevronLeft,
} from 'lucide-react';
import {
  DEMO_TRANSLATIONS,
  LANGUAGES,
  type DemoTab,
  type LanguageCode,
} from '../data/demoTranslations';

interface PhoneTask {
  id: string;
  objectName: string;
  address: string;
  dueTime: string;
  status: 'overdue' | 'open' | 'done';
  completedAt?: string;
  gpsCoords?: string;
  queuedOffline?: boolean;
  coords: { x: number; y: number };
}

const INITIAL_TASKS: PhoneTask[] = [
  {
    id: 't1',
    objectName: 'Wohnanlage Nord',
    address: 'Hauptstraße 14',
    dueTime: '07:30',
    status: 'overdue',
    coords: { x: 26, y: 30 },
  },
  {
    id: 't2',
    objectName: 'Stadthaus Mitte',
    address: 'Parkweg 8',
    dueTime: '10:00',
    status: 'open',
    coords: { x: 64, y: 24 },
  },
  {
    id: 't3',
    objectName: 'Seniorenresidenz',
    address: 'Lindenallee 3',
    dueTime: '13:30',
    status: 'open',
    coords: { x: 42, y: 66 },
  },
  {
    id: 't4',
    objectName: 'Gewerbehof West',
    address: 'Industriestraße 22',
    dueTime: '06:30',
    status: 'done',
    completedAt: '06:24 Uhr',
    gpsCoords: '51.4512° N, 7.0041° E',
    coords: { x: 76, y: 72 },
  },
];

interface PhoneAppSimulatorProps {
  activeTab: DemoTab;
  onTabChange: (tab: DemoTab) => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  isFullscreen?: boolean;
}

export function PhoneAppSimulator({
  activeTab,
  onTabChange,
  language,
  onLanguageChange,
  isFullscreen = false,
}: PhoneAppSimulatorProps) {
  const t = DEMO_TRANSLATIONS[language];

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginEmail, setLoginEmail] = useState('demo@vision-it.de');
  const [loginPass, setLoginPass] = useState('12345678');
  const [loginError, setLoginError] = useState('');

  const [isOffline, setIsOffline] = useState(false);
  const [tasks, setTasks] = useState<PhoneTask[]>(INITIAL_TASKS);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedMapPinId, setSelectedMapPinId] = useState<string>('t1');

  // Handover state
  const [handoverChecks, setHandoverChecks] = useState({
    walls: true,
    floors: true,
    windows: true,
    keys: true,
  });
  const [handoverPdfGenerated, setHandoverPdfGenerated] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  // Meter & Time state
  const [subTool, setSubTool] = useState<'meter' | 'time'>('meter');
  const [qrScanned, setQrScanned] = useState(false);
  const [meterReading, setMeterReading] = useState('42815');
  const [meterSaved, setMeterSaved] = useState(false);

  const [workState, setWorkState] = useState<'idle' | 'working' | 'paused'>('working');
  const [elapsedSeconds, setElapsedSeconds] = useState(14825); // 04:07:05
  const [timesheetExported, setTimesheetExported] = useState(false);

  useEffect(() => {
    if (workState !== 'working') return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [workState]);

  // Auto-sync queued offline tasks when going back online
  useEffect(() => {
    if (!isOffline) {
      setTasks((prev) =>
        prev.map((task) => (task.queuedOffline ? { ...task, queuedOffline: false } : task))
      );
    }
  }, [isOffline]);

  const formatTimer = (sec: number) => {
    const h = Math.floor(sec / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((sec % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleCompleteWithPhoto = (taskId: string) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')} Uhr`;
    setTasks((prev) =>
      prev.map((item) =>
        item.id === taskId
          ? {
              ...item,
              status: 'done',
              completedAt: timeStr,
              gpsCoords: '51.4556° N, 7.0116° E',
              queuedOffline: isOffline,
            }
          : item
      )
    );
  };

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.trim() === 'demo@vision-it.de' && loginPass === '12345678') {
      setLoginError('');
      setIsLoggedIn(true);
    } else {
      setLoginError('Bitte demo@vision-it.de / 12345678 verwenden.');
    }
  };

  // Signature Pad Drawing
  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    ctx.strokeStyle = '#F8FAFC';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
    isDrawingRef.current = true;
    setHasSigned(true);
    setHandoverPdfGenerated(false);
  };

  const moveDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    ctx.lineTo((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
    ctx.stroke();
  };

  const endDraw = () => {
    isDrawingRef.current = false;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
    setHandoverPdfGenerated(false);
  };

  const selectedTask = tasks.find((tk) => tk.id === selectedTaskId) || null;
  const selectedMapTask = tasks.find((tk) => tk.id === selectedMapPinId) || tasks[0];
  const queuedCount = tasks.filter((tk) => tk.queuedOffline).length;

  const statusBadge = (status: PhoneTask['status']) => {
    if (status === 'overdue') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400">
          <AlertTriangle className="h-3 w-3 shrink-0" />
          <span>{t.status.overdue}</span>
        </span>
      );
    }
    if (status === 'open') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-400">
          <Clock className="h-3 w-3 shrink-0" />
          <span>{t.status.open}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
        <CheckCircle2 className="h-3 w-3 shrink-0" />
        <span>{t.status.done}</span>
      </span>
    );
  };

  return (
    <div
      className={`mx-auto flex flex-col overflow-hidden rounded-[36px] border-[6px] border-slate-800 bg-[#0B0F19] shadow-2xl ${
        isFullscreen ? 'h-[680px] max-w-[400px] w-full' : 'h-[620px] max-w-[356px] w-full'
      }`}
    >
      {/* Phone Status Bar */}
      <div className="flex items-center justify-between bg-[#0E1422] px-5 pt-3 pb-2 text-[11px] font-medium text-slate-300 border-b border-slate-800/80">
        <span className="font-mono tabular-nums">08:42</span>
        <div className="h-3.5 w-16 rounded-full bg-slate-900 border border-slate-800" aria-hidden="true" />
        <button
          type="button"
          onClick={() => setIsOffline((prev) => !prev)}
          title="Offline-Modus für Keller/Tiefgarage umschalten"
          className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold transition-colors cursor-pointer ${
            isOffline
              ? 'bg-amber-500/20 text-amber-300'
              : 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25'
          }`}
        >
          {isOffline ? <WifiOff className="h-3 w-3" /> : <Wifi className="h-3 w-3" />}
          <span>{isOffline ? 'Offline' : 'LTE'}</span>
        </button>
      </div>

      {/* App Header */}
      {isLoggedIn && (
        <div className="flex items-center justify-between gap-2 bg-[#111827] px-4 py-2.5 border-b border-slate-800">
          <div className="min-w-0">
            <p className="font-display text-xs font-bold text-white truncate">Hausmeister Pro</p>
            <p className="text-[11px] text-slate-400 truncate">{t.appSubtitle}</p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <label htmlFor="phone-lang-select" className="sr-only">
              Sprache wählen
            </label>
            <div className="relative flex items-center">
              <Globe className="pointer-events-none absolute left-2 h-3 w-3 text-orange-400" />
              <select
                id="phone-lang-select"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                className="rounded-md border border-slate-700 bg-[#0B0F19] py-1 pl-6 pr-2 text-xs font-semibold text-white focus:border-orange-500 focus:outline-none cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label} · {l.nativeName}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setIsLoggedIn(false)}
              title="Abmelden (Test-Login prüfen)"
              className="rounded-md border border-slate-700 bg-[#0B0F19] p-1.5 text-slate-400 hover:text-white cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Offline / Sync Banner */}
      {isLoggedIn && (isOffline || queuedCount > 0) && (
        <div
          className={`px-4 py-1.5 text-[11px] font-medium flex items-center justify-between gap-2 ${
            isOffline ? 'bg-amber-950/60 text-amber-200 border-b border-amber-500/30' : 'bg-emerald-950/60 text-emerald-200'
          }`}
        >
          <span className="truncate">
            {isOffline ? `${t.offlineOn}: ${t.queuedNotice}` : t.syncedNotice}
          </span>
        </div>
      )}

      {/* Main App Viewport */}
      <div className="demo-scroll flex-1 overflow-y-auto bg-[#0B0F19] p-3.5">
        {!isLoggedIn ? (
          <div className="flex h-full flex-col justify-center px-2">
            <div className="rounded-xl border border-slate-800 bg-[#111827] p-5">
              <div className="mb-4 flex items-center gap-2 text-orange-400">
                <Lock className="h-5 w-5" />
                <span className="font-display text-sm font-bold text-white">
                  Mitarbeiter-Anmeldung
                </span>
              </div>
              <form onSubmit={handleDemoLogin} className="space-y-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">E-Mail</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-[#0B0F19] px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Passwort</label>
                  <input
                    type="password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-[#0B0F19] px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
                {loginError && <p className="text-[11px] text-rose-400">{loginError}</p>}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-orange-500 py-2.5 text-xs font-semibold text-slate-950 hover:bg-orange-400 transition-colors cursor-pointer"
                >
                  Anmelden
                </button>
              </form>
            </div>
          </div>
        ) : activeTab === 'tasks' ? (
          selectedTask ? (
            /* Task Detail + 1-Click Photo Proof */
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setSelectedTaskId(null)}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white cursor-pointer py-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>{t.actions.back}</span>
              </button>

              <div className="rounded-xl border border-slate-800 bg-[#111827] p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium text-slate-400">
                    {t.tasks[selectedTask.id].category}
                  </span>
                  {statusBadge(selectedTask.status)}
                </div>

                <div>
                  <h4 className="font-display text-sm font-bold text-white">
                    {selectedTask.objectName} · {selectedTask.address}
                  </h4>
                  <p className="mt-1 text-xs font-medium text-orange-300">
                    {t.tasks[selectedTask.id].title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                    {t.tasks[selectedTask.id].instruction}
                  </p>
                </div>

                {/* Simulated Photo Verification Box */}
                {selectedTask.status === 'done' ? (
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/25 p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{t.labels.photoCaptured}</span>
                      </span>
                      <span className="font-mono text-[11px] tabular-nums">
                        {selectedTask.completedAt}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono tabular-nums">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-emerald-400" />
                        {selectedTask.gpsCoords}
                      </span>
                      <span>{selectedTask.queuedOffline ? 'Lokal (Offline)' : 'Synchronisiert'}</span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleCompleteWithPhoto(selectedTask.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer min-h-[44px]"
                  >
                    <Camera className="h-4 w-4 shrink-0" />
                    <span>{t.actions.photoDone}</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Task List */
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-0.5">
                <h4 className="text-xs font-semibold text-slate-300">{t.labels.todayTasks}</h4>
                <span className="font-mono text-[11px] tabular-nums text-slate-400">
                  {tasks.filter((x) => x.status === 'done').length}/{tasks.length}
                </span>
              </div>

              {tasks.map((task) => {
                const tr = t.tasks[task.id];
                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => setSelectedTaskId(task.id)}
                    className="w-full text-left rounded-xl border border-slate-800 bg-[#111827] p-3 hover:border-slate-700 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-medium text-slate-400 truncate">
                        {task.address} · <span className="font-mono tabular-nums">{task.dueTime}</span>
                      </span>
                      {statusBadge(task.status)}
                    </div>
                    <p className="mt-1 text-xs font-semibold text-white leading-snug">
                      {tr.title}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">{tr.category}</span>
                      <span className="font-semibold text-orange-400">
                        {task.status === 'done' ? t.labels.gpsVerified : `${t.actions.openTask} →`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )
        ) : activeTab === 'map' ? (
          /* Interactive Property Map */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-slate-300">{t.labels.mapOverview}</h4>
              <span className="text-[11px] text-slate-400">
                {isOffline ? 'Offline-Karten aktiv' : 'Live-Status'}
              </span>
            </div>

            {/* Interactive SVG Street Grid Map */}
            <div className="relative h-56 w-full overflow-hidden rounded-xl border border-slate-800 bg-[#0F172A]">
              <svg
                viewBox="0 0 300 200"
                className="h-full w-full"
                aria-label="Objektkarte"
              >
                <rect width="300" height="200" fill="#0F172A" />
                {/* Subtle street grid */}
                <path
                  d="M0 50 H300 M0 115 H300 M0 165 H300 M65 0 V200 M155 0 V200 M235 0 V200"
                  stroke="#1E293B"
                  strokeWidth="3"
                />
                <path
                  d="M20 190 Q140 105 290 25"
                  stroke="#334155"
                  strokeWidth="5"
                  fill="none"
                />
                {/* Park zone */}
                <rect x="165" y="122" width="60" height="35" rx="4" fill="#064E3B" opacity="0.45" />
              </svg>

              {/* Interactive Object Pins */}
              {tasks.map((pin) => {
                const isSelected = selectedMapPinId === pin.id;
                const pinBg =
                  pin.status === 'overdue'
                    ? 'bg-rose-500 text-white'
                    : pin.status === 'open'
                    ? 'bg-orange-500 text-slate-950'
                    : 'bg-emerald-500 text-slate-950';
                return (
                  <button
                    key={pin.id}
                    type="button"
                    onClick={() => setSelectedMapPinId(pin.id)}
                    style={{ left: `${pin.coords.x}%`, top: `${pin.coords.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold shadow-lg transition-transform cursor-pointer ${pinBg} ${
                      isSelected ? 'scale-110 ring-2 ring-white' : 'hover:scale-105'
                    }`}
                  >
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="max-w-[70px] truncate">{pin.address.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="flex items-center justify-between text-[11px] text-slate-300 px-1">
              <span className="inline-flex items-center gap-1 text-rose-400">
                <AlertTriangle className="h-3 w-3" /> {t.status.overdue}
              </span>
              <span className="inline-flex items-center gap-1 text-orange-400">
                <Clock className="h-3 w-3" /> {t.status.open}
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="h-3 w-3" /> {t.status.done}
              </span>
            </div>

            {/* Selected Pin Details */}
            <div className="rounded-xl border border-slate-800 bg-[#111827] p-3">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs font-bold text-white">
                  {selectedMapTask.objectName} · {selectedMapTask.address}
                </span>
                {statusBadge(selectedMapTask.status)}
              </div>
              <p className="mt-1 text-xs text-slate-300">
                {t.tasks[selectedMapTask.id].title}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedTaskId(selectedMapTask.id);
                  onTabChange('tasks');
                }}
                className="mt-2.5 w-full rounded-lg bg-slate-800 py-2 text-xs font-semibold text-orange-400 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {t.actions.openTask} →
              </button>
            </div>
          </div>
        ) : activeTab === 'handover' ? (
          /* Digital Handover & Signature Pad */
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300">{t.labels.handoverTitle}</h4>

            <div className="rounded-xl border border-slate-800 bg-[#111827] p-3 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Parkweg 8 · Whg. 2. OG rechts</span>
                <span className="font-mono text-[11px] text-slate-400">Protokoll #408</span>
              </div>

              {/* Checklist */}
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                {[
                  { key: 'walls', label: 'Wände & Decken i.O.' },
                  { key: 'floors', label: 'Böden geprüft' },
                  { key: 'windows', label: 'Fenster dicht' },
                  { key: 'keys', label: 'Schlüssel gezählt' },
                ].map((item) => {
                  const k = item.key as keyof typeof handoverChecks;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() =>
                        setHandoverChecks((prev) => ({ ...prev, [k]: !prev[k] }))
                      }
                      className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-left transition-colors cursor-pointer ${
                        handoverChecks[k]
                          ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200'
                          : 'border-slate-700 bg-[#0B0F19] text-slate-400'
                      }`}
                    >
                      <Check className="h-3 w-3 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-[#0B0F19] px-2.5 py-2 text-[11px] text-slate-300 border border-slate-800">
                <KeyRound className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                <span className="truncate">{t.labels.keysLabel}</span>
              </div>

              {/* Digital Signature Canvas */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-slate-400">
                    {t.labels.signatureLabel}
                  </span>
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="text-[11px] text-orange-400 hover:underline cursor-pointer"
                  >
                    {t.actions.clearSig}
                  </button>
                </div>
                <div className="relative rounded-lg border border-dashed border-slate-600 bg-[#0B0F19]">
                  <canvas
                    ref={canvasRef}
                    width={280}
                    height={84}
                    onPointerDown={startDraw}
                    onPointerMove={moveDraw}
                    onPointerUp={endDraw}
                    onPointerLeave={endDraw}
                    className="h-[84px] w-full touch-none cursor-crosshair"
                  />
                  {!hasSigned && (
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] text-slate-500">
                      {t.actions.signHere}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setHandoverPdfGenerated(true)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-orange-400 transition-colors cursor-pointer"
              >
                <FileText className="h-4 w-4 shrink-0" />
                <span>{t.actions.createPdf}</span>
              </button>

              {handoverPdfGenerated && (
                <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/30 p-2.5 text-[11px] text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{t.actions.pdfReady}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* QR Meter Reading & Time Tracking */
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 rounded-lg bg-[#111827] p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setSubTool('meter')}
                className={`rounded-md py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  subTool === 'meter'
                    ? 'bg-orange-500 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                QR-Zähler
              </button>
              <button
                type="button"
                onClick={() => setSubTool('time')}
                className={`rounded-md py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  subTool === 'time'
                    ? 'bg-orange-500 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Arbeitszeit
              </button>
            </div>

            {subTool === 'meter' ? (
              <div className="rounded-xl border border-slate-800 bg-[#111827] p-3.5 space-y-3">
                <h4 className="text-xs font-semibold text-white">{t.labels.meterTitle}</h4>

                {!qrScanned ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQrScanned(true);
                      setMeterSaved(false);
                    }}
                    className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-orange-500/50 bg-[#0B0F19] py-6 text-xs font-semibold text-orange-300 hover:bg-slate-900 transition-colors cursor-pointer"
                  >
                    <QrCode className="h-9 w-9 text-orange-400" />
                    <span>{t.actions.scanQr}</span>
                  </button>
                ) : (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between rounded-lg bg-[#0B0F19] px-3 py-2 border border-emerald-500/30 text-[11px]">
                      <span className="font-mono text-emerald-300">Zähler #SZ-409281</span>
                      <span className="text-slate-400">Hauptstr. 14 · Keller</span>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        {t.labels.currentReading}
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={meterReading}
                        onChange={(e) => {
                          setMeterReading(e.target.value);
                          setMeterSaved(false);
                        }}
                        className="w-full rounded-lg border border-slate-700 bg-[#0B0F19] px-3 py-2 font-mono text-sm font-semibold tabular-nums text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setMeterSaved(true)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
                    >
                      <Camera className="h-4 w-4 shrink-0" />
                      <span>{t.actions.saveReading}</span>
                    </button>

                    {meterSaved && (
                      <p className="text-[11px] font-medium text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        <span>Stand {meterReading} kWh gespeichert.</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-800 bg-[#111827] p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-white">{t.labels.timeTitle}</h4>
                  <span
                    className={`text-[11px] font-semibold ${
                      workState === 'working'
                        ? 'text-emerald-400'
                        : workState === 'paused'
                        ? 'text-amber-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {workState === 'working'
                      ? t.labels.workStatusWorking
                      : workState === 'paused'
                      ? t.labels.workStatusPaused
                      : t.labels.workStatusIdle}
                  </span>
                </div>

                <div className="rounded-xl bg-[#0B0F19] border border-slate-800 py-4 text-center">
                  <p className="font-mono text-2xl font-bold tabular-nums text-white">
                    {formatTimer(elapsedSeconds)}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">Heute · Max Mustermann</p>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setWorkState('working');
                      setTimesheetExported(false);
                    }}
                    className={`flex flex-col items-center justify-center gap-1 rounded-lg py-2 text-[11px] font-semibold cursor-pointer transition-colors ${
                      workState === 'working'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-[#0B0F19] text-slate-200 border border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span className="truncate max-w-full px-1">{t.actions.startWork}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWorkState('paused')}
                    className={`flex flex-col items-center justify-center gap-1 rounded-lg py-2 text-[11px] font-semibold cursor-pointer transition-colors ${
                      workState === 'paused'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-[#0B0F19] text-slate-200 border border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <Pause className="h-3.5 w-3.5" />
                    <span className="truncate max-w-full px-1">{t.actions.pauseWork}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWorkState('idle')}
                    className={`flex flex-col items-center justify-center gap-1 rounded-lg py-2 text-[11px] font-semibold cursor-pointer transition-colors ${
                      workState === 'idle'
                        ? 'bg-rose-500 text-white'
                        : 'bg-[#0B0F19] text-slate-200 border border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <Square className="h-3.5 w-3.5" />
                    <span className="truncate max-w-full px-1">{t.actions.endWork}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setTimesheetExported(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-[#0B0F19] py-2 text-xs font-semibold text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5 text-orange-400" />
                  <span>{t.actions.exportTimesheet}</span>
                </button>

                {timesheetExported && (
                  <p className="text-[11px] text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>Monats-Stundenzettel (PDF) bereitgestellt.</span>
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Tab Navigation */}
      {isLoggedIn && (
        <nav
          aria-label="App-Navigation"
          className="grid grid-cols-4 border-t border-slate-800 bg-[#111827] px-1 py-1.5"
        >
          {[
            { id: 'tasks' as DemoTab, label: t.tabs.tasks, icon: ListChecks },
            { id: 'map' as DemoTab, label: t.tabs.map, icon: MapIcon },
            { id: 'handover' as DemoTab, label: t.tabs.handover, icon: ClipboardCheck },
            { id: 'meter_time' as DemoTab, label: t.tabs.meter_time, icon: QrCode },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSelectedTaskId(null);
                  onTabChange(tab.id);
                }}
                className={`flex flex-col items-center justify-center gap-0.5 rounded-lg py-1.5 text-[10px] font-semibold transition-colors cursor-pointer ${
                  active ? 'text-orange-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate max-w-[74px] px-0.5">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
