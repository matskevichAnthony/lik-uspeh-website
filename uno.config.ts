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
      border: {
        DEFAULT: '#e2e8f0',
        light: '#edf2f7'
      }
    },
    font: {
      serif: ['Crimson Text', 'Times New Roman', 'serif'],
      sans: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif'
      ],
      heading: ['Playfair Display', 'Times New Roman', 'serif'],
      mono: [
        'JetBrains Mono',
        '"Fira Code"',
        '"SF Mono"',
        'Monaco',
        '"Cascadia Code"',
        '"Roboto Mono"',
        'Consolas',
        '"Courier New"',
        'monospace'
      ]
    },
    spacing: {
      '18': '4.5rem',
      '88': '22rem',
      '128': '32rem'
    },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in-out',
      'slide-up': 'slideUp 0.5s ease-out',
      'scale-in': 'scaleIn 0.3s ease-out'
    }
  },
  shortcuts: [
    // Кнопки
    ['btn', 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'],
    ['btn-primary', 'btn bg-primary text-white hover:bg-primary-dark focus:ring-primary'],
    ['btn-secondary', 'btn bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary'],
    ['btn-outline', 'btn border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary'],
    ['btn-ghost', 'btn text-text hover:bg-background-grey focus:ring-primary/20'],
    
    // Карточки
    ['card', 'bg-white rounded-lg shadow-sm border border-border overflow-hidden transition-shadow duration-200 hover:shadow-md'],
    ['card-header', 'px-6 py-4 border-b border-border bg-background-light'],
    ['card-body', 'px-6 py-4'],
    ['card-footer', 'px-6 py-4 border-t border-border bg-background-light'],
    
    // Навигация
    ['nav-link', 'text-text-secondary hover:text-primary transition-colors duration-200 font-medium'],
    ['nav-link-active', 'text-primary'],
    
    // Хлебные крошки
    ['breadcrumb', 'flex items-center space-x-2 text-sm text-text-light'],
    ['breadcrumb-item', 'hover:text-primary transition-colors duration-200'],
    ['breadcrumb-separator', 'text-text-light mx-2'],
    
    // Блог посты
    ['blog-post-card', 'card hover:shadow-lg transition-all duration-300'],
    ['blog-post-meta', 'flex items-center space-x-4 text-sm text-text-light'],
    ['blog-post-date', 'flex items-center space-x-1'],
    ['blog-post-category', 'bg-accent/10 text-accent-dark px-2 py-1 rounded-full text-xs font-medium'],
    
    // Заголовки секций
    ['section-title', 'text-3xl md:text-4xl font-heading font-bold text-primary mb-4'],
    ['section-subtitle', 'text-lg text-text-secondary mb-8 max-w-2xl'],
    
    // Hero секция
    ['hero-title', 'text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary leading-tight'],
    ['hero-subtitle', 'text-lg md:text-xl text-text-secondary max-w-2xl mx-auto'],
    
    // Контейнеры
    ['container-custom', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'],
    ['container-narrow', 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'],
    ['container-text', 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'],
    
    // Образовательные элементы
    ['education-badge', 'bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium'],
    ['legal-text', 'text-xs text-text-light leading-relaxed'],
    ['official-seal', 'w-16 h-16 object-contain'],
    
    // Таблицы с данными об организации
    ['data-table', 'w-full border-collapse border border-border'],
    ['data-table-th', 'bg-background-grey px-4 py-2 text-left font-medium border border-border'],
    ['data-table-td', 'px-4 py-2 border border-border'],
    ['data-table-row-even', 'bg-background-light'],
  ],
  rules: [
    // Кастомные анимации
    ['fade-in', { animation: 'fadeIn 0.5s ease-in-out' }],
    ['slide-up', { animation: 'slideUp 0.5s ease-out' }],
    ['scale-in', { animation: 'scaleIn 0.3s ease-out' }],
    
    // Кастомные утилиты
    ['text-balance', { 'text-wrap': 'balance' }],
    ['scroll-smooth', { 'scroll-behavior': 'smooth' }],
  ],
  safelist: [
    // Гарантируем, что основные классы всегда включены
    'btn', 'btn-primary', 'btn-secondary', 'btn-outline', 'btn-ghost',
    'card', 'card-header', 'card-body', 'card-footer',
    'nav-link', 'nav-link-active',
    'section-title', 'section-subtitle',
    'hero-title', 'hero-subtitle',
    'container-custom', 'container-narrow', 'container-text',
    'education-badge', 'legal-text', 'official-seal',
    'data-table', 'data-table-th', 'data-table-td', 'data-table-row-even'
  ]
})
