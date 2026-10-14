
# FIX per Errore 404 su Vercel - Fai così:

Hai avuto: "This page doesn't exist - 404 NOT_FOUND"

SOLUZIONE in 2 minuti:

1. Su Vercel -> Vai al tuo progetto motodiario
2. Settings -> General -> Framework Preset -> seleziona VITE
3. Settings -> General -> Build & Development Settings:
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
4. Salva -> Deployments -> ... sui 3 puntini -> Redeploy

OPPURE più semplice:

1. Cancella il progetto su Vercel
2. Vai su vercel.com -> Add New -> Project
3. Importa da GitHub (NON drag & drop dello ZIP)
   - Carica prima lo ZIP su GitHub: github.com/new -> carica file
4. Vercel riconoscerà automaticamente Vite e farà tutto da solo

Se usi il file vercel.json che ho appena aggiunto, il fix è automatico.

Per testare in locale prima:
npm install
npm run build
npm run preview -> apri http://localhost:4173 -> se funziona lì, funzionerà su Vercel.

