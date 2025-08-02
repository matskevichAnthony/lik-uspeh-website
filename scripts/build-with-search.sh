#!/bin/bash

# Скрипт для сборки сайта с Pagefind индексацией

echo "🏗️  Сборка сайта Hugo..."

# Очистка предыдущей сборки
rm -rf public/

# Сборка Hugo сайта
hugo --minify --gc

if [ $? -eq 0 ]; then
    echo "✅ Hugo сборка завершена успешно"
    
    echo "🔍 Создание Pagefind индекса..."
    
    # Проверяем наличие pagefind
    if command -v pagefind &> /dev/null; then
        # Создаем Pagefind индекс
        pagefind --site public \
                 --output-path public/pagefind \
                 --glob "**/*.html" \
                 --exclude-selectors "nav, footer, .no-index" \
                 --root-selector "main, [data-pagefind-body]" \
                 --verbose
        
        if [ $? -eq 0 ]; then
            echo "✅ Pagefind индекс создан успешно"
            echo "📊 Статистика:"
            find public/pagefind -name "*.js" -o -name "*.json" | wc -l | xargs echo "  - Индексных файлов:"
            du -sh public/pagefind | cut -f1 | xargs echo "  - Размер индекса:"
        else
            echo "❌ Ошибка создания Pagefind индекса"
            exit 1
        fi
    else
        echo "⚠️  Pagefind не найден. Запустите: bash scripts/install-pagefind.sh"
        echo "📁 Сайт собран без поиска"
    fi
    
    echo "🎉 Сборка завершена! Сайт готов в папке public/"
else
    echo "❌ Ошибка сборки Hugo"
    exit 1
fi
