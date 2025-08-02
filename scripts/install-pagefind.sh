#!/bin/bash

# Скрипт для установки и настройки Pagefind

echo "🔍 Установка Pagefind для поиска по сайту..."

# Создаем директорию для Pagefind если её нет
mkdir -p static/pagefind

# Загружаем и устанавливаем Pagefind
if command -v npm &> /dev/null; then
    echo "📦 Установка через npm..."
    npm install -g pagefind
elif command -v curl &> /dev/null; then
    echo "📦 Загрузка через curl..."
    # Определяем архитектуру
    ARCH=$(uname -m)
    OS=$(uname -s)
    
    if [[ "$OS" == "Linux" ]]; then
        if [[ "$ARCH" == "x86_64" ]]; then
            PAGEFIND_URL="https://github.com/CloudCannon/pagefind/releases/latest/download/pagefind-x86_64-unknown-linux-musl.tar.gz"
        elif [[ "$ARCH" == "aarch64" ]]; then
            PAGEFIND_URL="https://github.com/CloudCannon/pagefind/releases/latest/download/pagefind-aarch64-unknown-linux-musl.tar.gz"
        fi
    elif [[ "$OS" == "Darwin" ]]; then
        PAGEFIND_URL="https://github.com/CloudCannon/pagefind/releases/latest/download/pagefind-x86_64-apple-darwin.tar.gz"
    fi
    
    if [[ ! -z "$PAGEFIND_URL" ]]; then
        cd /tmp
        curl -L "$PAGEFIND_URL" -o pagefind.tar.gz
        tar -xzf pagefind.tar.gz
        chmod +x pagefind
        sudo mv pagefind /usr/local/bin/
        echo "✅ Pagefind установлен в /usr/local/bin/pagefind"
    else
        echo "❌ Неподдерживаемая архитектура: $OS $ARCH"
        exit 1
    fi
else
    echo "❌ Необходим npm или curl для установки"
    exit 1
fi

echo "🎉 Pagefind успешно установлен!"
echo "💡 Теперь запустите 'npm run build' для индексации сайта"
