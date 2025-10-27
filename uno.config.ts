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
        DEFAULT: '#34af8f',
        light: '#41c696',
        dark: '#2a8d73'
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
      green: {
        50: '#f0fdf8',
        100: '#d1fae5',
        200: '#a7f3d0'
      },
      white: '#ffffff',
      black: '#000000',
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
        DEFAULT: '#f1f5f9',
        light: '#f8fafc'
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
      // Removed animations for cleaner look
    }
  },
  shortcuts: [
    // Кнопки
    ['btn', 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2'],
    ['btn-primary', 'btn bg-primary text-white focus:ring-primary'],
    ['btn-secondary', 'btn bg-secondary text-white focus:ring-secondary'],
    ['btn-outline', 'btn border border-primary text-primary focus:ring-primary'],
    ['btn-ghost', 'btn text-text focus:ring-primary/20'],
    ['btn-sm', 'px-3 py-1.5 text-xs'],
    
    // Карточки
    ['card', 'bg-white rounded-lg shadow-sm border border-border/30 overflow-hidden'],
    ['card-header', 'px-6 py-4 border-b border-border bg-background-light'],
    ['card-body', 'px-6 py-4'],
    ['card-footer', 'px-6 py-4 border-t border-border bg-background-light'],
    
    // Навигация
    ['nav-link', 'text-text-secondary font-medium'],
    ['nav-link-active', 'text-primary'],
    
    // Хлебные крошки
    ['breadcrumb', 'flex items-center space-x-2 text-sm text-text-light'],
    ['breadcrumb-item', 'text-primary'],
    ['breadcrumb-separator', 'text-text-light mx-2'],
    
    // Блог посты
    ['blog-post-card', 'card shadow-lg'],
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
    ['container-content', 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'],
    ['container-custom', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'],
    ['container-narrow', 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'],
    ['container-text', 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'],
    
    // Образовательные элементы
    ['education-badge', 'bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium'],
    ['legal-text', 'text-xs text-text-light leading-relaxed'],
    ['official-seal', 'w-16 h-16 object-contain'],
    
    // Badge shortcuts
    ['badge', 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium'],
    ['badge-blue', 'badge bg-blue-100 text-blue-800'],
    ['badge-green', 'badge bg-green-100 text-green-800'],
    ['badge-orange', 'badge bg-orange-100 text-orange-800'],
    ['badge-purple', 'badge bg-purple-100 text-purple-800'],
    
    // Таблицы с данными об организации
    ['data-table', 'w-full border-collapse border border-border'],
    ['data-table-th', 'bg-background-grey px-4 py-2 text-left font-medium border border-border'],
    ['data-table-td', 'px-4 py-2 border border-border'],
    ['data-table-row-even', 'bg-background-light'],
  ],
  rules: [
    // Кастомные утилиты
    ['text-balance', { 'text-wrap': 'balance' }],
    ['scroll-smooth', { 'scroll-behavior': 'smooth' }],
  ],
  safelist: [
    // Гарантируем, что основные классы всегда включены
    'btn', 'btn-primary', 'btn-secondary', 'btn-outline', 'btn-ghost', 'btn-sm',
    'card', 'card-header', 'card-body', 'card-footer',
    'nav-link', 'nav-link-active',
    'section-title', 'section-subtitle',
    'hero-title', 'hero-subtitle',
    'container-content', 'container-custom', 'container-narrow', 'container-text',
    'education-badge', 'legal-text', 'official-seal',
    'data-table', 'data-table-th', 'data-table-td', 'data-table-row-even',
    // Badge classes for admission pages
    'badge', 'badge-blue', 'badge-green', 'badge-orange', 'badge-purple',
    // Additional admission-specific classes
    'prose', 'prose-lg', 'prose-sm', 'max-w-none',
    // Color classes for header
    'bg-primary', 'bg-primary-light', 'bg-primary-dark', 'text-primary', 'text-white',
    'hover:bg-primary', 'hover:bg-primary-light', 'hover:text-primary', 'hover:text-green-200',
    'bg-green-50', 'bg-green-100', 'bg-green-200', 'text-green-200',
    // Accordion classes
    'accordion-wrapper', 'accordion-item', 'accordion-trigger', 'accordion-content', 'accordion-icon',
    // Step classes
    'steps-container'
  ]
})
