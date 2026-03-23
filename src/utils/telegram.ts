import type { ContactFormData } from '../types';

// Конфигурация (вынеси в .env файл!)
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

// Список услуг с ценами
export const services = [
  { id: 'landing', name: 'Лендинг', price: 25000, description: 'Одностраничный сайт' },
  { id: 'corporate', name: 'Корпоративный сайт', price: 50000, description: 'Многостраничный сайт' },
  { id: 'shop', name: 'Интернет-магазин', price: 80000, description: 'Полноценный магазин' },
  { id: 'webapp', name: 'Веб-приложение', price: 100000, description: 'SPA приложение' },
  { id: 'consult', name: 'Консультация', price: 5000, description: 'Час консультации' },
];

// Форматируем цену
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
};

// Формируем сообщение для Telegram
const createMessage = (data: ContactFormData): string => {
  const service = services.find(s => s.id === data.service);
  const now = new Date();
  const dateTime = now.toLocaleString('ru-RU');

  // Контактные данные
  let contactInfo = '';
  if (data.contactMethod === 'telegram' && data.telegram) {
    contactInfo = `💬 Telegram: ${data.telegram}`;
  } else if (data.contactMethod === 'phone' && data.phone) {
    contactInfo = `📱 Телефон: ${data.phone}`;
  } else {
    contactInfo = `📧 Email: ${data.email}`;
  }

  return `
📬 *Новая заявка с сайта!*

👤 *Имя:* ${data.name}
📧 *Email:* ${data.email}
${contactInfo}

🛠️ *Услуга:* ${service?.name || data.service}
💰 *Стоимость:* ${formatPrice(service?.price || 0)}

✉️ *Сообщение:*
${data.message}

🕐 *Время:* ${dateTime}
  `.trim();
};

// Отправляем сообщение в Telegram
export const sendToTelegram = async (data: ContactFormData): Promise<boolean> => {
  const message = createMessage(data);
  
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown', // Для форматирования текста
      }),
    });

    if (response.ok) {
      console.log('✅ Сообщение отправлено в Telegram');
      return true;
    } else {
      console.error('❌ Ошибка отправки:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('❌ Ошибка сети:', error);
    return false;
  }
};