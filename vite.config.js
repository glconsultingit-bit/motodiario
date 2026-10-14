
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png', 'icon-180.png', 'screenshot-garage.png', 'screenshot-dashboard.png'],
      manifest: {
        id: '/?source=pwa',
        name: 'Moto Diario - Garage & Costi',
        short_name: 'Moto Diario',
        description: 'Quanto ti costa davvero andare in moto? Traccia rifornimenti, tagliandi e scadenze.',
        theme_color: '#f97316',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/?source=pwa',
        scope: '/',
        categories: ['productivity', 'utilities', 'lifestyle'],
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: '/icon-180.png', sizes: '180x180', type: 'image/png', purpose: 'any' }
        ],
        screenshots: [
          { src: '/screenshot-garage.png', sizes: '540x720', type: 'image/png', form_factor: 'narrow', label: 'Garage con tutte le tue moto e costo €/km' },
          { src: '/screenshot-dashboard.png', sizes: '540x720', type: 'image/png', form_factor: 'narrow', label: 'Dashboard con spese annuali e prossima scadenza' }
        ],
        shortcuts: [
          { name: 'Aggiungi Rifornimento', short_name: 'Rifornimento', description: 'Registra un nuovo rifornimento', url: '/?action=addFuel', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
          { name: 'Garage', short_name: 'Garage', url: '/?view=garage', icons: [{ src: '/icon-192.png', sizes: '192x192' }] }
        ],
        prefer_related_applications: false
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      }
    })
  ]
})
