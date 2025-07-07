/**
 * Скрипт для автоматического уведомления в Telegram о новых постах
 */

const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

// Конфигурация
const CONFIG = {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
    jsonFile: path.join(__dirname, '../public/index.json'),
    cacheFile: path.join(__dirname, '../.telegram_cache'),
    baseUrl: process.env.SITE_URL || 'https://lik-uspeh.ru'
};

/**
 * Отправляет сообщение в Telegram
 */
async function sendTelegramMessage(message) {
    const url = `https://api.telegram.org/bot${CONFIG.botToken}/sendMessage`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: CONFIG.chatId,
            text: message,
            parse_mode: 'Markdown',
            disable_web_page_preview: false
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Telegram API Error: ${error.description}`);
    }

    return response.json();
}

/**
 * Получает последний пост из блога
 */
async function getLatestBlogPost() {
    try {
        const jsonContent = await fs.readFile(CONFIG.jsonFile, 'utf8');
        const posts = JSON.parse(jsonContent);
        
        // Находим последний пост из блога
        const blogPosts = posts.filter(post => post.section === 'blog');
        return blogPosts.length > 0 ? blogPosts[0] : null;
    } catch (error) {
        console.error('Ошибка при чтении JSON файла:', error);
        return null;
    }
}

/**
 * Проверяет, был ли пост уже отправлен
 */
async function isPostAlreadySent(post) {
    try {
        const postHash = crypto
            .createHash('md5')
            .update(post.title + post.date)
            .digest('hex');

        try {
            const cacheContent = await fs.readFile(CONFIG.cacheFile, 'utf8');
            return cacheContent.includes(postHash);
        } catch (error) {
            // Файл кеша не существует
            return false;
        }
    } catch (error) {
        console.error('Ошибка при проверке кеша:', error);
        return false;
    }
}

/**
 * Сохраняет хеш поста в кеш
 */
async function markPostAsSent(post) {
    try {
        const postHash = crypto
            .createHash('md5')
            .update(post.title + post.date)
            .digest('hex');

        await fs.appendFile(CONFIG.cacheFile, postHash + '\n');
    } catch (error) {
        console.error('Ошибка при сохранении в кеш:', error);
    }
}

/**
 * Форматирует сообщение для Telegram
 */
function formatTelegramMessage(post) {
    const summary = post.summary.length > 200 
        ? post.summary.substring(0, 200) + '...'
        : post.summary;

    return `🎓 *Новость от гимназии «ЛИК-Успех»*

*${post.title}*

${summary}

📅 ${new Date(post.date).toLocaleDateString('ru-RU')}

[Читать полностью](${post.permalink})

#ЛикУспех #Гимназия #Новости`;
}

/**
 * Основная функция
 */
async function main() {
    try {
        // Проверяем наличие необходимых переменных окружения
        if (!CONFIG.botToken || !CONFIG.chatId) {
            console.error('Ошибка: Не заданы переменные окружения TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID');
            process.exit(1);
        }

        // Получаем последний пост
        const latestPost = await getLatestBlogPost();
        if (!latestPost) {
            console.log('Новых постов не найдено');
            return;
        }

        // Проверяем, был ли пост уже отправлен
        if (await isPostAlreadySent(latestPost)) {
            console.log('Пост уже был отправлен в Telegram');
            return;
        }

        // Форматируем и отправляем сообщение
        const message = formatTelegramMessage(latestPost);
        await sendTelegramMessage(message);

        // Сохраняем в кеш
        await markPostAsSent(latestPost);

        console.log('✅ Сообщение успешно отправлено в Telegram');
    } catch (error) {
        console.error('❌ Ошибка:', error.message);
        process.exit(1);
    }
}

// Запуск скрипта
if (require.main === module) {
    main();
}

module.exports = {
    sendTelegramMessage,
    getLatestBlogPost,
    formatTelegramMessage
};
