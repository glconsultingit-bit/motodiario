🏍️ Moto Diario - Quanto ti costa davvero la tua moto?
Open Source | Offline First | 100% Gratis | Fatto in Italia

Moto Diario è l'app che ogni motociclista italiano aspettava. Basta scontrini persi, bolli dimenticati e conti a spanne. Finalmente sai quanto spendi al km e quando devi fare il tagliando.

License: MIT
PWA Ready
Made in Italy

📸 Cosa fa (in 30 secondi)
Garage: Aggiungi le tue moto con foto, marca, km attuali.
Dashboard: 4 numeri che contano:

€/km reale della tua moto
Totale speso nel 2026
Km fatti
Prossima scadenza (bollo, assicurazione...)
Rifornimento Smart: Inserisci km ed euro, l'app calcola automaticamente i km/l e ti dice se stai consumando troppo.

Manutenzione: Traccia tutto: tagliandi, gomme, catena, freni, accessori.

Scadenze: Non dimentichi più bollo, assicurazione e revisione. Notifica a 7 giorni, 1 giorno e il giorno stesso.

Export PDF: Genera il report annuale da dare al commercialista o all'acquirente quando vendi la moto. Vale oro.

🚀 Prova l'app ora (senza installare nulla)
Link Demo: https://moto-diario.vercel.app (dopo il deploy)

Apri da telefono → Condividi → Aggiungi a Home. Diventa un'app vera, funziona anche senza internet.

🛠️ Stack Tecnico - 100% Gratis
Layer	Tecnologia	Costo
Frontend	React 18 + Vite + PWA	Gratis
Storage	LocalStorage (offline) + Supabase (optional cloud)	Gratis
OCR	Tesseract.js (on-device)	Gratis
PDF	jsPDF	Gratis
Hosting	Vercel / Netlify	Gratis
Build App	Capacitor (per Play Store)	Gratis
Zero costi di mappe. Zero API a pagamento.

📦 Installazione in locale (2 minuti)
# 1. Clona / scompatta lo ZIP
npm install
# 2. (Opzionale) Configura Supabase per backup cloud
# Crea file .env con:
VITE_SUPABASE_URL=il_tuo_url_supabase
VITE_SUPABASE_ANON_KEY=la_tua_anon_key
# 3. Lancia
npm run dev
# Apri http://localhost:5173
🔧 Deploy su Vercel (Gratis per sempre)
Carica questo progetto su GitHub
Vai su vercel.com → New Project → Import GitHub Repo
Aggiungi le 2 variabili env di Supabase (opzionali)
Deploy → Hai il tuo link .vercel.app
🗄️ Database Supabase (Opzionale ma consigliato)
Se vuoi backup cloud e notifiche email, esegui questo SQL nel tuo progetto Supabase:

Il file è già pronto: supabase_moto_diario_schema.sql incluso nello ZIP.

Contiene:

Tabelle: motos, spese, scadenze, profiles
RLS: ogni utente vede solo le sue moto
Bucket storage per foto scontrini
Tabella affiliate_links per monetizzazione
🧮 Formule Magiche Usate
// €/km
totale_spese / (km_max - km_min)
// km/l per rifornimento
(km_attuali - km_precedenti) / litri
// Prossima scadenza
scadenze.sort(by data)[0] where data > oggi
💰 Come monetizza (senza infastidire)
Versione attuale: 100% gratis, zero pubblicità.

Idee per futuro (già predisposte nel codice):

Garage Pro (9,99€ una tantum): Moto illimitate + backup cloud + no ads
Affiliazione: Quando scade "Gomme" → link affiliato Amazon/Motostore per la tua moto specifica (conversione altissima)
AdMob Banner leggero: Solo nella schermata Storico, mai durante rifornimento
🗺️ Roadmap
 v1.0 MVP: Garage, Dashboard €/km, Rifornimenti, PDF
 v1.1: OCR automatico scontrini con Tesseract.js + foto
 v1.2: Notifiche push scadenze + email automatiche con Edge Function
 v1.3: Confronto consumi con altri possessori stessa moto (anonimo)
 v2.0: Modulo Curve Finder con OpenStreetMap (server GraphHopper)
🤝 Contribuisci
Sei un motociclista sviluppatore? Pull Request benvenute!

Forka il repo
Crea branch feature/nome-feature
Commit e PR
Idee benvenute: calcolo costo gomme al km, promemoria catena, import da file Excel.

📄 Licenza
MIT License - Usala come vuoi, anche per progetti commerciali. Citazione gradita ma non obbligatoria.

👨‍💻 Autore
Fatto con ❤️ a Cumiana (TO) per i motociclisti italiani che non vogliono più Excel.

Tino Italia - Infrastruttura & Motori

GitHub: @italiatino
Instagram: @italiatino
"Se non sai quanto ti costa, non puoi dire che è una passione."

🙏 Ringraziamenti
Community Motociclisti Italiani su Facebook per i feedback
Supabase per il backend gratis
Vite PWA Team
P.S.: Se l'app ti fa risparmiare anche solo un bollo dimenticato, offrimi un caffè e lascia una stella ⭐ su GitHub!
