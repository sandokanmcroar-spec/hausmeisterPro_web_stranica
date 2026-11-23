export type LanguageCode = 'de' | 'pl' | 'hr' | 'tr' | 'ru' | 'sq' | 'en';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'de', label: 'DE', nativeName: 'Deutsch' },
  { code: 'pl', label: 'PL', nativeName: 'Polski' },
  { code: 'hr', label: 'HR', nativeName: 'Hrvatski' },
  { code: 'tr', label: 'TR', nativeName: 'Türkçe' },
  { code: 'ru', label: 'RU', nativeName: 'Русский' },
  { code: 'sq', label: 'SQ', nativeName: 'Shqip' },
  { code: 'en', label: 'EN', nativeName: 'English' },
];

export type DemoTab = 'tasks' | 'map' | 'handover' | 'meter_time';

export interface TaskTranslation {
  title: string;
  instruction: string;
  category: string;
}

export interface DemoTranslationBundle {
  appSubtitle: string;
  offlineOn: string;
  offlineOff: string;
  queuedNotice: string;
  syncedNotice: string;
  tabs: {
    tasks: string;
    map: string;
    handover: string;
    meter_time: string;
  };
  status: {
    overdue: string;
    open: string;
    done: string;
  };
  actions: {
    photoDone: string;
    openTask: string;
    back: string;
    signHere: string;
    clearSig: string;
    createPdf: string;
    pdfReady: string;
    scanQr: string;
    saveReading: string;
    startWork: string;
    pauseWork: string;
    endWork: string;
    exportTimesheet: string;
  };
  labels: {
    todayTasks: string;
    gpsVerified: string;
    photoCaptured: string;
    mapOverview: string;
    handoverTitle: string;
    keysLabel: string;
    meterTitle: string;
    timeTitle: string;
    currentReading: string;
    signatureLabel: string;
    workStatusWorking: string;
    workStatusPaused: string;
    workStatusIdle: string;
  };
  tasks: Record<string, TaskTranslation>;
}

export const DEMO_TRANSLATIONS: Record<LanguageCode, DemoTranslationBundle> = {
  de: {
    appSubtitle: 'Heutige Tour · Team Nord',
    offlineOn: 'Offline-Modus (Keller)',
    offlineOff: 'Online verbunden',
    queuedNotice: 'Lokal gespeichert – wird bei Empfang automatisch gesendet.',
    syncedNotice: 'Alle Nachweise an das Büro übertragen.',
    tabs: {
      tasks: 'Aufgaben',
      map: 'Karte',
      handover: 'Übergabe',
      meter_time: 'Zähler & Zeit',
    },
    status: {
      overdue: 'Überfällig',
      open: 'Offen',
      done: 'Erledigt',
    },
    actions: {
      photoDone: 'Foto senden & erledigt',
      openTask: 'Aufgabe öffnen',
      back: 'Zurück',
      signHere: 'Hier unterschreiben (Finger / Maus)',
      clearSig: 'Löschen',
      createPdf: 'PDF-Protokoll erstellen',
      pdfReady: 'PDF-Übergabeprotokoll erstellt & versandbereit',
      scanQr: 'QR-Code am Zähler scannen',
      saveReading: 'Zählerstand mit Foto speichern',
      startWork: 'Arbeitsbeginn',
      pauseWork: 'Pause',
      endWork: 'Feierabend',
      exportTimesheet: 'PDF-Stundennachweis laden',
    },
    labels: {
      todayTasks: 'Offene Aufgaben heute',
      gpsVerified: 'GPS & Zeitstempel erfasst',
      photoCaptured: 'Vor-Ort-Foto gespeichert',
      mapOverview: 'Objekte auf der Karte',
      handoverTitle: 'Wohnungs- & Schlüsselübergabe',
      keysLabel: '3x Haustür, 2x Keller, 1x Briefkasten',
      meterTitle: 'Zählerablesung per QR-Code',
      timeTitle: 'Arbeitszeiterfassung',
      currentReading: 'Aktueller Zählerstand (kWh)',
      signatureLabel: 'Digitale Unterschrift',
      workStatusWorking: 'Arbeitszeit läuft',
      workStatusPaused: 'In Pause',
      workStatusIdle: 'Nicht eingestempelt',
    },
    tasks: {
      t1: {
        title: 'Mülltonnen rausstellen (Restmüll & Papier)',
        instruction: 'Bitte bis 07:30 Uhr an die Straße stellen und Stellplatz kurz fegen.',
        category: 'Mülltonnendienst',
      },
      t2: {
        title: 'Treppenhausreinigung EG bis 3. OG',
        instruction: 'Eingangsbereich, Handläufe und Briefkastenanlage feucht wischen.',
        category: 'Gebäudereinigung',
      },
      t3: {
        title: 'Hecke schneiden & Laub entfernen (Innenhof)',
        instruction: 'Grünschnitt komplett aufnehmen und Vorher-/Nachher-Foto senden.',
        category: 'Gartenpflege',
      },
      t4: {
        title: 'Winterdienst: Gehweg streuen',
        instruction: 'Eingang Nord und Zufahrt Tiefgarage kontrollieren und abstreuen.',
        category: 'Winterdienst',
      },
    },
  },
  pl: {
    appSubtitle: 'Dzisiejsza trasa · Zespół Północ',
    offlineOn: 'Tryb offline (Piwnica)',
    offlineOff: 'Połączono online',
    queuedNotice: 'Zapisano lokalnie – wyśle się automatycznie po odzyskaniu zasięgu.',
    syncedNotice: 'Wszystkie potwierdzenia wysłane do biura.',
    tabs: {
      tasks: 'Zadania',
      map: 'Mapa',
      handover: 'Protokół',
      meter_time: 'Licznik i czas',
    },
    status: {
      overdue: 'Po terminie',
      open: 'Otwarte',
      done: 'Wykonane',
    },
    actions: {
      photoDone: 'Wyślij zdjęcie i zakończ',
      openTask: 'Otwórz zadanie',
      back: 'Wstecz',
      signHere: 'Podpisz tutaj (palec / mysz)',
      clearSig: 'Wyczyść',
      createPdf: 'Utwórz protokół PDF',
      pdfReady: 'Protokół PDF utworzony i gotowy do wysyłki',
      scanQr: 'Skanuj kod QR na liczniku',
      saveReading: 'Zapisz stan licznika ze zdjęciem',
      startWork: 'Start pracy',
      pauseWork: 'Przerwa',
      endWork: 'Koniec pracy',
      exportTimesheet: 'Pobierz kartę czasu PDF',
    },
    labels: {
      todayTasks: 'Dzisiejsze zadania',
      gpsVerified: 'Zapisano GPS i znacznik czasu',
      photoCaptured: 'Zdjęcie z obiektu zapisane',
      mapOverview: 'Obiekty na mapie',
      handoverTitle: 'Przekazanie mieszkania i kluczy',
      keysLabel: '3x wejście, 2x piwnica, 1x skrzynka',
      meterTitle: 'Odczyt licznika kodem QR',
      timeTitle: 'Rejestracja czasu pracy',
      currentReading: 'Aktualny stan licznika (kWh)',
      signatureLabel: 'Podpis cyfrowy',
      workStatusWorking: 'Czas pracy trwa',
      workStatusPaused: 'Przerwa',
      workStatusIdle: 'Niezalogowany',
    },
    tasks: {
      t1: {
        title: 'Wystawić pojemniki na śmieci (zmieszane i papier)',
        instruction: 'Wystawić przed posesję do 07:30 i zamieść miejsce postojowe.',
        category: 'Wywóz śmieci',
      },
      t2: {
        title: 'Sprzątanie klatki schodowej (parter – 3. piętro)',
        instruction: 'Umyć na mokro wejście, poręcze oraz skrzynki pocztowe.',
        category: 'Sprzątanie',
      },
      t3: {
        title: 'Przycinanie żywopłotu i usuwanie liści (dziedziniec)',
        instruction: 'Zebrać odpady zielone i wysłać zdjęcie przed i po.',
        category: 'Ogród',
      },
      t4: {
        title: 'Serwis zimowy: posypać chodnik',
        instruction: 'Sprawdzić wejście północne oraz wjazd do garażu podziemnego.',
        category: 'Serwis zimowy',
      },
    },
  },
  hr: {
    appSubtitle: 'Današnja ruta · Tim Sjever',
    offlineOn: 'Offline način (Podrum)',
    offlineOff: 'Online povezano',
    queuedNotice: 'Spremljeno lokalno – automatski se šalje kad bude signala.',
    syncedNotice: 'Svi dokazi poslani u ured.',
    tabs: {
      tasks: 'Zadaci',
      map: 'Karta',
      handover: 'Primopredaja',
      meter_time: 'Brojilo i vrijeme',
    },
    status: {
      overdue: 'Zakašnjelo',
      open: 'Otvoreno',
      done: 'Obavljeno',
    },
    actions: {
      photoDone: 'Pošalji sliku i završi',
      openTask: 'Otvori zadatak',
      back: 'Natrag',
      signHere: 'Potpišite ovdje (prst / miš)',
      clearSig: 'Obriši',
      createPdf: 'Izradi PDF zapisnik',
      pdfReady: 'PDF zapisnik izrađen i spreman za slanje',
      scanQr: 'Skeniraj QR kod na brojilu',
      saveReading: 'Spremi stanje brojila sa slikom',
      startWork: 'Početak rada',
      pauseWork: 'Pauza',
      endWork: 'Kraj rada',
      exportTimesheet: 'Preuzmi PDF sate rada',
    },
    labels: {
      todayTasks: 'Današnji zadaci',
      gpsVerified: 'GPS i vrijeme zabilježeni',
      photoCaptured: 'Fotografija s terena spremljena',
      mapOverview: 'Objekti na karti',
      handoverTitle: 'Primopredaja stana i ključeva',
      keysLabel: '3x ulazna vrata, 2x podrum, 1x sandučić',
      meterTitle: 'Očitanje brojila putem QR koda',
      timeTitle: 'Evidencija radnog vremena',
      currentReading: 'Trenutno stanje brojila (kWh)',
      signatureLabel: 'Digitalni potpis',
      workStatusWorking: 'Radno vrijeme teče',
      workStatusPaused: 'Na pauzi',
      workStatusIdle: 'Nije prijavljen',
    },
    tasks: {
      t1: {
        title: 'Izvući kante za smeće (miješani otpad i papir)',
        instruction: 'Postaviti uz ulicu do 07:30 i kratko pomesti prostor za kante.',
        category: 'Odvoz otpada',
      },
      t2: {
        title: 'Čišćenje stubišta od prizemlja do 3. kata',
        instruction: 'Vlažno prebrisati ulaz, rukohvate i poštanske sandučiće.',
        category: 'Čišćenje',
      },
      t3: {
        title: 'Orezivanje živice i uklanjanje lišća (dvorište)',
        instruction: 'Pokupiti sav zeleni otpad i poslati sliku prije i poslije.',
        category: 'Održavanje vrta',
      },
      t4: {
        title: 'Zimska služba: posipati nogostup',
        instruction: 'Provjeriti sjeverni ulaz i prilaz podzemnoj garaži.',
        category: 'Zimska služba',
      },
    },
  },
  tr: {
    appSubtitle: 'Bugünkü Tur · Kuzey Ekibi',
    offlineOn: 'Çevrimdışı Mod (Bodrum)',
    offlineOff: 'Çevrimiçi bağlı',
    queuedNotice: 'Cihaza kaydedildi – internet gelince otomatik gönderilir.',
    syncedNotice: 'Tüm kanıtlar ofise iletildi.',
    tabs: {
      tasks: 'Görevler',
      map: 'Harita',
      handover: 'Teslimat',
      meter_time: 'Sayaç & Süre',
    },
    status: {
      overdue: 'Gecikmiş',
      open: 'Açık',
      done: 'Tamamlandı',
    },
    actions: {
      photoDone: 'Fotoğraf gönder & tamamla',
      openTask: 'Görevi aç',
      back: 'Geri',
      signHere: 'Buraya imzalayın (parmak / fare)',
      clearSig: 'Temizle',
      createPdf: 'PDF Tutanağı Oluştur',
      pdfReady: 'PDF teslim tutanağı oluşturuldu ve gönderime hazır',
      scanQr: 'Sayaçtaki QR kodu okut',
      saveReading: 'Sayaç değerini fotoğrafla kaydet',
      startWork: 'İşe Başla',
      pauseWork: 'Mola',
      endWork: 'Paydos',
      exportTimesheet: 'PDF Çalışma Çizelgesi İndir',
    },
    labels: {
      todayTasks: 'Bugünkü görevler',
      gpsVerified: 'GPS ve saat damgası eklendi',
      photoCaptured: 'Saha fotoğrafı kaydedildi',
      mapOverview: 'Haritadaki binalar',
      handoverTitle: 'Daire & Anahtar Teslim Tutanağı',
      keysLabel: '3x Bina Kapısı, 2x Bodrum, 1x Posta Kutusu',
      meterTitle: 'QR Kod ile Sayaç Okuma',
      timeTitle: 'Çalışma Süresi Takibi',
      currentReading: 'Güncel sayaç değeri (kWh)',
      signatureLabel: 'Dijital İmza',
      workStatusWorking: 'Çalışma süresi işliyor',
      workStatusPaused: 'Molada',
      workStatusIdle: 'Giriş yapılmadı',
    },
    tasks: {
      t1: {
        title: 'Çöp konteynerlerini dışarı çıkar (Evsel & Kağıt)',
        instruction: 'Saat 07:30’a kadar cadde kenarına çıkarın ve alanı süpürün.',
        category: 'Çöp Hizmeti',
      },
      t2: {
        title: 'Merdiven temizliği (Zemin – 3. Kat)',
        instruction: 'Giriş alanı, tırabzanlar ve posta kutularını nemli bezle silin.',
        category: 'Bina Temizliği',
      },
      t3: {
        title: 'Çit budama & yaprak temizliği (İç avlu)',
        instruction: 'Yeşil atıkları toplayın, öncesi ve sonrası fotoğrafı gönderin.',
        category: 'Bahçe Bakımı',
      },
      t4: {
        title: 'Kış hizmeti: Yaya yolunu tuzla',
        instruction: 'Kuzey girişini ve yeraltı garaj rampasını kontrol edip tuzlayın.',
        category: 'Kış Hizmeti',
      },
    },
  },
  ru: {
    appSubtitle: 'Маршрут на сегодня · Команда Север',
    offlineOn: 'Офлайн-режим (Подвал)',
    offlineOff: 'Подключено онлайн',
    queuedNotice: 'Сохранено локально — отправится автоматически при появлении сети.',
    syncedNotice: 'Все фотоотчеты переданы в офис.',
    tabs: {
      tasks: 'Задачи',
      map: 'Карта',
      handover: 'Приёмка',
      meter_time: 'Счётчик и время',
    },
    status: {
      overdue: 'Просрочено',
      open: 'Открыто',
      done: 'Выполнено',
    },
    actions: {
      photoDone: 'Отправить фото и завершить',
      openTask: 'Открыть задачу',
      back: 'Назад',
      signHere: 'Подпишите здесь (палец / мышь)',
      clearSig: 'Очистить',
      createPdf: 'Создать PDF-протокол',
      pdfReady: 'PDF-протокол сформирован и готов к отправке',
      scanQr: 'Сканировать QR-код счётчика',
      saveReading: 'Сохранить показания с фото',
      startWork: 'Начало смены',
      pauseWork: 'Перерыв',
      endWork: 'Конец смены',
      exportTimesheet: 'Скачать табель PDF',
    },
    labels: {
      todayTasks: 'Задачи на сегодня',
      gpsVerified: 'GPS и время зафиксированы',
      photoCaptured: 'Фото с объекта сохранено',
      mapOverview: 'Объекты на карте',
      handoverTitle: 'Передача квартиры и ключей',
      keysLabel: '3x входная, 2x подвал, 1x почтовый ящик',
      meterTitle: 'Снятие показаний по QR-коду',
      timeTitle: 'Учёт рабочего времени',
      currentReading: 'Текущие показания (кВт·ч)',
      signatureLabel: 'Цифровая подпись',
      workStatusWorking: 'Идёт рабочее время',
      workStatusPaused: 'Перерыв',
      workStatusIdle: 'Смена не начата',
    },
    tasks: {
      t1: {
        title: 'Выкатить мусорные баки (бытовой и бумага)',
        instruction: 'Выставить к дороге до 07:30 и подмести площадку.',
        category: 'Вывоз мусора',
      },
      t2: {
        title: 'Уборка подъезда (1–4 этаж)',
        instruction: 'Протереть влажной тряпкой вход, перила и почтовые ящики.',
        category: 'Уборка',
      },
      t3: {
        title: 'Стрижка живой изгороди и уборка листвы (двор)',
        instruction: 'Собрать ветки и листья, отправить фото «до» и «после».',
        category: 'Уход за садом',
      },
      t4: {
        title: 'Зимняя служба: посыпать тротуар',
        instruction: 'Проверить северный вход и въезд в подземный паркинг.',
        category: 'Зимняя уборка',
      },
    },
  },
  sq: {
    appSubtitle: 'Turi i sotëm · Ekipi Veri',
    offlineOn: 'Modaliteti Offline (Bodrum)',
    offlineOff: 'Lidhur online',
    queuedNotice: 'Ruajtur lokalisht – dërgohet automatikisht sapo të ketë sinjal.',
    syncedNotice: 'Të gjitha provat u dërguan në zyrë.',
    tabs: {
      tasks: 'Detyrat',
      map: 'Harta',
      handover: 'Dorëzimi',
      meter_time: 'Matësi & Koha',
    },
    status: {
      overdue: 'Me vonesë',
      open: 'Hapur',
      done: 'Përfunduar',
    },
    actions: {
      photoDone: 'Dërgo foton & përfundo',
      openTask: 'Hap detyrën',
      back: 'Kthehu',
      signHere: 'Nënshkruaj këtu (gisht / maus)',
      clearSig: 'Fshij',
      createPdf: 'Krijo protokollin PDF',
      pdfReady: 'Protokolli PDF u krijua dhe është gati për dërgim',
      scanQr: 'Skano kodin QR në matës',
      saveReading: 'Ruaj matjen me foto',
      startWork: 'Fillimi i punës',
      pauseWork: 'Pushim',
      endWork: 'Fundi i punës',
      exportTimesheet: 'Shkarko orët e punës PDF',
    },
    labels: {
      todayTasks: 'Detyrat e sotme',
      gpsVerified: 'GPS dhe ora u regjistruan',
      photoCaptured: 'Fotoja në terren u ruajt',
      mapOverview: 'Objektet në hartë',
      handoverTitle: 'Dorëzimi i banesës dhe çelësave',
      keysLabel: '3x dera kryesore, 2x bodrum, 1x kuti postare',
      meterTitle: 'Leximi i matësit me QR-Code',
      timeTitle: 'Regjistrimi i orarit të punës',
      currentReading: 'Gjendja aktuale e matësit (kWh)',
      signatureLabel: 'Nënshkrimi digjital',
      workStatusWorking: 'Koha e punës po ecën',
      workStatusPaused: 'Në pushim',
      workStatusIdle: 'Nuk ka filluar',
    },
    tasks: {
      t1: {
        title: 'Nxirrni koshat e mbeturinave (mbetje & letër)',
        instruction: 'Vendosini në rrugë deri në 07:30 dhe fshini shkurt vendin.',
        category: 'Shërbimi i mbeturinave',
      },
      t2: {
        title: 'Pastrimi i shkallëve (kati përdhes – kati 3)',
        instruction: 'Fshini me leckë të lagur hyrjen, parmakët dhe kutitë postare.',
        category: 'Pastrim objekti',
      },
      t3: {
        title: 'Krasitja e gardhit & pastrimi i gjetheve (oborr)',
        instruction: 'Mblidhni mbetjet e gjelbra dhe dërgoni foto para/pas.',
        category: 'Mirëmbajtje kopshti',
      },
      t4: {
        title: 'Shërbimi dimëror: hidhni kripë në trotuar',
        instruction: 'Kontrolloni hyrjen veriore dhe hyrjen e garazhit nëntokësor.',
        category: 'Shërbim dimëror',
      },
    },
  },
  en: {
    appSubtitle: 'Today’s Route · North Team',
    offlineOn: 'Offline Mode (Basement)',
    offlineOff: 'Connected Online',
    queuedNotice: 'Saved locally – syncs automatically once reception returns.',
    syncedNotice: 'All proof photos synced with office.',
    tabs: {
      tasks: 'Tasks',
      map: 'Map',
      handover: 'Handover',
      meter_time: 'Meter & Time',
    },
    status: {
      overdue: 'Overdue',
      open: 'Open',
      done: 'Done',
    },
    actions: {
      photoDone: 'Send photo & mark done',
      openTask: 'Open task',
      back: 'Back',
      signHere: 'Sign here (finger / mouse)',
      clearSig: 'Clear',
      createPdf: 'Generate PDF Protocol',
      pdfReady: 'PDF handover protocol created & ready to send',
      scanQr: 'Scan QR code on meter',
      saveReading: 'Save reading with photo',
      startWork: 'Clock In',
      pauseWork: 'Break',
      endWork: 'Clock Out',
      exportTimesheet: 'Download PDF Timesheet',
    },
    labels: {
      todayTasks: 'Today’s Tasks',
      gpsVerified: 'GPS & timestamp captured',
      photoCaptured: 'On-site photo saved',
      mapOverview: 'Properties on Map',
      handoverTitle: 'Apartment & Key Handover',
      keysLabel: '3x Front Door, 2x Basement, 1x Mailbox',
      meterTitle: 'QR Code Meter Reading',
      timeTitle: 'Time Tracking',
      currentReading: 'Current meter reading (kWh)',
      signatureLabel: 'Digital Signature',
      workStatusWorking: 'Shift active',
      workStatusPaused: 'On break',
      workStatusIdle: 'Not clocked in',
    },
    tasks: {
      t1: {
        title: 'Move waste bins to curb (Residual & Paper)',
        instruction: 'Place curbside before 07:30 and sweep bin storage area.',
        category: 'Waste Service',
      },
      t2: {
        title: 'Stairwell cleaning (Ground to 3rd Floor)',
        instruction: 'Damp-wipe entrance, handrails, and mailbox panel.',
        category: 'Building Cleaning',
      },
      t3: {
        title: 'Trim hedge & clear leaves (Courtyard)',
        instruction: 'Bag all green waste and send before & after photo.',
        category: 'Garden Care',
      },
      t4: {
        title: 'Winter service: grit sidewalk',
        instruction: 'Check north entrance and underground garage ramp.',
        category: 'Winter Service',
      },
    },
  },
};
