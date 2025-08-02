import { defineConfig } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
import presetIcons from '@unocss/preset-icons'
import presetTypography from '@unocss/preset-typography'

export default defineConfig({
  content: {
    filesystem: [
      './layouts/**/*.html',
      './content/**/*.md',
      './static/**/*.js',
      './assets/**/*.js'
    ],
  },
  presets: [
    presetWind4(),
    presetIcons({
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        heroicons: () => import('@iconify-json/heroicons/icons.json').then(i => i.default),
        tabler: () => import('@iconify-json/tabler/icons.json').then(i => i.default),
      }
    }),
    presetTypography(),
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#1a2b47',
        light: '#2d4a6b',
        dark: '#0f1a2e'
      },
      secondary: {
        DEFAULT: '#8b0000',
        light: '#a31717',
        dark: '#6b0000'
      },
      accent: {
        DEFAULT: '#c9a96e',
        light: '#d4b881',
        dark: '#b8955b'
      },
      'lik-primary': '#667eea',
      'lik-secondary': '#764ba2',
      'lik-accent': '#f093fb',
      text: {
        DEFAULT: '#1a1a1a',
        secondary: '#4a5568',
        light: '#718096'
      },
      background: {
        DEFAULT: '#ffffff',
        light: '#fafafa',
        grey: '#f7f7f7'
      },
    }
  },
  shortcuts: [
    // Cards
    ['card', 'bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300'],
    ['card-hover', 'hover:(-translate-y-1 shadow-xl)'],
    
    // Buttons
    ['btn', 'px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-all duration-200'],
    ['btn-primary', 'btn bg-lik-primary text-white hover:bg-lik-primary/90'],
    ['btn-secondary', 'btn bg-gray-100 text-gray-700 hover:bg-gray-200'],
    ['btn-ghost', 'btn hover:bg-gray-100'],
    
    // Forms
    ['input-base', 'w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-lik-primary focus:ring-2 focus:ring-lik-primary/20 outline-none transition-all'],
    
    // Badges
    ['badge', 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium'],
    ['badge-blue', 'badge bg-blue-100 text-blue-700'],
    ['badge-green', 'badge bg-emerald-100 text-emerald-700'],
    ['badge-purple', 'badge bg-purple-100 text-purple-700'],
    ['badge-amber', 'badge bg-amber-100 text-amber-700'],
    ['badge-rose', 'badge bg-rose-100 text-rose-700'],
    ['badge-yellow', 'badge bg-yellow-100 text-yellow-700'],
    ['badge-emerald', 'badge bg-emerald-100 text-emerald-700'],
    ['badge-violet', 'badge bg-violet-100 text-violet-700'],
    
    // Layout
    ['container-content', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'],
    ['container-narrow', 'max-w-3xl mx-auto px-4 sm:px-6'],
    
    // Animations
    ['animate-fade-in', 'animate-[fadeIn_0.5s_ease-in-out]'],
    ['animate-fade-in-up', 'animate-[fadeInUp_0.6s_ease-out]'],
  ],
  safelist: [
    'i-heroicons-newspaper',
    'i-heroicons-document-text',
    'i-heroicons-megaphone',
    'i-heroicons-book-open',
    'i-heroicons-calendar-days',
    'i-heroicons-trophy',
    'i-heroicons-academic-cap',
    'i-heroicons-user-group',
    'i-heroicons-briefcase',
    'i-heroicons-clipboard-document-check',
    'i-heroicons-funnel',
    'i-heroicons-squares-2x2',
    'i-heroicons-list-bullet',
    'i-heroicons-star',
    'i-heroicons-clock',
    'i-heroicons-calendar',
    'i-heroicons-signal',
    'i-heroicons-hashtag',
    'i-heroicons-share',
    'i-heroicons-eye',
    'i-heroicons-arrow-right',
    'i-heroicons-arrow-down-circle',
  ],
  rules: [
    ['line-clamp-2', { 'display': '-webkit-box', '-webkit-line-clamp': '2', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' }],
    ['line-clamp-3', { 'display': '-webkit-box', '-webkit-line-clamp': '3', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' }],
  ]
})
