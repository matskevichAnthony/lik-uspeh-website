# Сайт гимназии «ЛИК-Успех»

Современный статический сайт для гимназии «ЛИК-Успех», построенный на Hugo.

## 🚀 Особенности

- **Быстрая загрузка** - статические файлы загружаются мгновенно
- **SEO-оптимизация** - структурированные данные, метатеги, sitemap
- **Адаптивный дизайн** - отлично выглядит на всех устройствах
- **Автоматическая интеграция с Telegram** - уведомления о новых постах
- **Система управления документами** - простая загрузка PDF файлов
- **Современная архитектура** - SCSS, JavaScript ES6+, Hugo Pipes

## 📁 Структура проекта

```
├── content/                 # Контент сайта
│   ├── blog/               # Новости и статьи блога
│   ├── about/              # О гимназии
│   ├── admissions/         # Поступление
│   ├── organization/       # Сведения об организации
│   ├── contacts/           # Контакты
│   └── ...
├── layouts/                # Шаблоны Hugo
│   ├── _default/           # Базовые шаблоны
│   ├── blog/               # Шаблоны для блога
│   └── index.html          # Главная страница
├── assets/                 # Исходники стилей и скриптов
│   ├── scss/               # SCSS файлы
│   └── js/                 # JavaScript файлы
├── static/                 # Статические файлы
├── scripts/                # Скрипты для автоматизации
├── .github/workflows/      # GitHub Actions
└── hugo.toml              # Конфигурация Hugo
```

## 🛠️ Локальная разработка

### Требования

- [Hugo Extended](https://gohugo.io/installation/) (v0.100+)
- [Node.js](https://nodejs.org/) (v16+) - для скриптов Telegram
- [Git](https://git-scm.com/)

### Установка и запуск

1. **Клонирование репозитория:**
   ```bash
   git clone https://github.com/your-username/lik-uspeh-website.git
   cd lik-uspeh-website
   ```

2. **Запуск сервера разработки:**
   ```bash
   hugo server --buildDrafts --watch
   ```

3. **Открыть в браузере:** http://localhost:1313

### Полезные команды

```bash
# Создать новый пост в блоге
hugo new content blog/2025-01-15-news-title.md

# Создать новую страницу
hugo new content section/page-name.md

# Собрать сайт для production
hugo --minify

# Проверить конфигурацию
hugo config

# Показать версию Hugo
hugo version
```

## 📝 Добавление контента

### Создание новости

1. Создайте файл в папке `content/blog/`:
   ```bash
   hugo new content blog/2025-01-15-title.md
   ```

2. Отредактируйте front matter:
   ```yaml
   ---
   title: "Заголовок новости"
   description: "Краткое описание для SEO"
   date: 2025-01-15T10:00:00+03:00
   draft: false
   featured_image: "/images/blog/image.jpg"
   author: "Автор"
   categories: ["Категория"]
   tags: ["тег1", "тег2"]
   ---
   ```

3. Напишите содержимое в Markdown

### Добавление документов

1. Создайте папку с документами:
   ```
   content/organization/documents/
   ├── index.md
   └── document.pdf
   ```

2. В `index.md` документы отобразятся автоматически

### Настройка меню

Меню настраивается в файле `hugo.toml` в секции `[menus]`.

## 🤖 Telegram интеграция

### Настройка

1. Создайте Telegram бота через [@BotFather](https://t.me/BotFather)
2. Получите токен бота
3. Создайте канал/группу и добавьте бота как администратора
4. Получите ID канала/группы

### Переменные окружения

```bash
export TELEGRAM_BOT_TOKEN="your_bot_token"
export TELEGRAM_CHAT_ID="your_chat_id"
export SITE_URL="https://lik-uspeh.ru"
```

### Запуск уведомлений

```bash
# Bash версия
./scripts/telegram-notify.sh

# Node.js версия
node scripts/telegram-notify.js
```

## 🚀 Деплой

### Netlify (рекомендуется)

1. Подключите репозиторий к Netlify
2. Настройки сборки уже в файле `netlify.toml`
3. Добавьте переменные окружения в Netlify

### Vercel

1. Подключите репозиторий к Vercel
2. Команда сборки: `hugo --minify`
3. Папка вывода: `public`

### GitHub Pages

Используйте GitHub Actions из `.github/workflows/deploy.yml`

## 🔧 Настройка

### Основные настройки

Отредактируйте `hugo.toml`:

- `baseURL` - адрес сайта
- `title` - название сайта
- `params` - контактная информация
- `menus` - структура меню

### Стили

Стили находятся в `assets/scss/main.scss`. Используются CSS переменные для легкой кастомизации цветов и размеров.

### Скрипты

JavaScript код в `assets/js/main.js` включает:
- Мобильное меню
- Плавную прокрутку
- Валидацию форм
- Ленивую загрузку изображений

## 📊 SEO и аналитика

### Встроенные SEO функции

- Метатеги Open Graph и Twitter Card
- Структурированные данные JSON-LD
- Автоматический sitemap.xml
- RSS фид
- Хлебные крошки

### Добавление Google Analytics

Добавьте в `hugo.toml`:
```toml
[services.googleAnalytics]
  ID = "G-XXXXXXXXXX"
```

### Добавление Yandex.Metrica

Добавьте код счетчика в `layouts/partials/analytics.html`

## 🔒 Безопасность

- HTTPS принудительно
- Security headers в Netlify
- Защита от XSS
- CSP заголовки

## 📱 Производительность

- Минификация CSS/JS
- Оптимизация изображений
- Ленивая загрузка
- CDN через Netlify/Vercel
- Кеширование статических ресурсов

## 🤝 Участие в разработке

1. Форкните репозиторий
2. Создайте ветку для функции: `git checkout -b feature/new-feature`
3. Закоммитьте изменения: `git commit -am 'Add new feature'`
4. Запушьте в ветку: `git push origin feature/new-feature`
5. Создайте Pull Request

## 📄 Лицензия

MIT License - смотрите файл [LICENSE](LICENSE) для деталей.

## 📞 Поддержка

- Email: [info@lik-uspeh.ru](mailto:info@lik-uspeh.ru)
- Telegram: [@lik_uspeh](https://t.me/lik_uspeh)
- Создайте Issue в GitHub

---

*Сделано с ❤️ для гимназии «ЛИК-Успех»*
