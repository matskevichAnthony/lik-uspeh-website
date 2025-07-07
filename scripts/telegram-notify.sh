#!/bin/bash

# =============================================================================
# Скрипт для уведомления в Telegram о новых постах
# =============================================================================

# Проверяем наличие переменных окружения
if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
    echo "Ошибка: Не заданы переменные окружения TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID"
    exit 1
fi

# Получаем последний пост из JSON
LATEST_POST=$(jq -r '.[0] | select(.section == "blog")' public/index.json 2>/dev/null)

if [ -z "$LATEST_POST" ] || [ "$LATEST_POST" = "null" ]; then
    echo "Новых постов не найдено"
    exit 0
fi

# Извлекаем данные поста
TITLE=$(echo "$LATEST_POST" | jq -r '.title')
PERMALINK=$(echo "$LATEST_POST" | jq -r '.permalink')
SUMMARY=$(echo "$LATEST_POST" | jq -r '.summary' | cut -c1-200)
DATE=$(echo "$LATEST_POST" | jq -r '.date')

# Проверяем, был ли уже отправлен этот пост
CACHE_FILE=".telegram_cache"
POST_HASH=$(echo "$TITLE$DATE" | md5sum | cut -d' ' -f1)

if [ -f "$CACHE_FILE" ] && grep -q "$POST_HASH" "$CACHE_FILE"; then
    echo "Пост уже был отправлен в Telegram"
    exit 0
fi

# Формируем сообщение для Telegram
MESSAGE="🎓 *Новость от гимназии «ЛИК-Успех»*

*$TITLE*

$SUMMARY...

📅 $DATE

[Читать полностью]($PERMALINK)

#ЛикУспех #Гимназия #Новости"

# Отправляем сообщение в Telegram
RESPONSE=$(curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
    -H "Content-Type: application/json" \
    -d "{
        \"chat_id\": \"$TELEGRAM_CHAT_ID\",
        \"text\": \"$MESSAGE\",
        \"parse_mode\": \"Markdown\",
        \"disable_web_page_preview\": false
    }")

# Проверяем успешность отправки
if echo "$RESPONSE" | jq -r '.ok' | grep -q "true"; then
    echo "Сообщение успешно отправлено в Telegram"
    echo "$POST_HASH" >> "$CACHE_FILE"
else
    echo "Ошибка при отправке сообщения в Telegram:"
    echo "$RESPONSE" | jq -r '.description'
    exit 1
fi
