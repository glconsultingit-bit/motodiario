
# Moto Diario PWA - 100% Gratis

## Cos'è
PWA (Progressive Web App) pronta all'uso. Funziona offline con localStorage, opzionale Supabase per backup cloud.

## Come lanciarla gratis in 5 minuti

### Opzione 1: Vercel (consigliata, gratis)
1. Vai su vercel.com -> Add New Project -> Importa questo ZIP (carica su GitHub prima)
2. Aggiungi env variables (opzionali):
   VITE_SUPABASE_URL=tuo_url
   VITE_SUPABASE_ANON_KEY=tuo_key
3. Deploy -> hai link tipo moto-diario.vercel.app
4. Apri su telefono -> Aggiungi a Home -> diventa un'app vera!

### Opzione 2: Lovable.dev
1. Vai su lovable.dev -> New Project
2. Trascina tutta la cartella src
3. Scrivi prompt: "Migliora questa PWA Moto Diario aggiungendo OCR scontrini con Tesseract.js"
4. Lui lo fa.

### Opzione 3: Locale (per dev)
npm install
npm run dev

### Funzioni già pronte
- Garage moto multiple
- Dashboard con €/km automatico
- Rifornimenti con calcolo km/l
- Tagliandi, gomme, bollo, assicurazione
- Export PDF
- PWA installabile
- Offline first

### Prossimi step da aggiungere (v2)
- OCR automatico: aggiungi tesseract.js -> npm install tesseract.js
- Notifiche push scadenze: usa Supabase Edge Functions (codice già nel file SQL precedente)
- Affiliazione Amazon: aggiungi tabella affiliate_links

Creato per Tino - Cumiana, 14 Ott 2026
