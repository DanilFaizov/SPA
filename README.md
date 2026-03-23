# Портфолио разработчика | Danil Faizov

Современный одностраничный сайт-портфолио, созданный с использованием React 19, TypeScript и Vite.

## 🚀 Демо

[🌐 Посмотреть сайт]([https://твой-username.github.io/portfolio](https://danilfaizov.github.io/SPA/))

## ✨ Особенности

- 🎨 Адаптивный дизайн под все устройства
- 🌓 Тёмная/светлая тема с сохранением выбора
- 🎬 Плавные анимации с Framer Motion
- 📬 Отправка заявок в Telegram и на Email
- ✅ Валидация форм в реальном времени
- ♿ Доступность (ARIA-атрибуты, семантика)
- ⚡ Мгновенная загрузка благодаря Vite

## 🛠️ Технологии

| Категория | Инструменты |
|-----------|------------|
| **Frontend** | React 19, TypeScript, React Router |
| **Сборка** | Vite, SWC |
| **Анимации** | Framer Motion |
| **Стили** | CSS Modules, CSS Variables |
| **API** | Telegram Bot API, Formspree |
| **Деплой** | GitHub Pages |


## Архитектура проекта 
```
src/
│
├── components/          # Переиспользуемые UI-компоненты
│   ├── Header/          # Фиксированная шапка с навигацией и темой
│   ├── Hero/            # Главный экран с презентацией
│   ├── Projects/        # Сетка карточек проектов
│   ├── Skills/          # Навыки с фильтрацией по категориям
│   ├── Contact/         # Форма связи с валидацией
│   └── Footer/          # Подвал с контактами и ссылками
│
├── pages/               # Страницы приложения
│   ├── HomePage.tsx     # Основная страница портфолио
│   └── NotFound.tsx     # Страница 404
│
├── types/               # TypeScript интерфейсы и типы
│   └── index.ts         # Централизованное объявление типов
│
├── utils/               # Вспомогательные функции
│   └── telegram.ts      # Логика отправки в Telegram
│
├── hooks/               # Кастомные React-хуки
│   └── useTheme.ts      # Управление темой (опционально)
│
├── App.tsx              # Корневой компонент с роутингом
├── main.tsx             # Точка входа приложения
└── index.css            # Глобальные стили и сброс
```
## Контакты 

-[Мой GitHub](https://github.com/DanilFaizov)
-[Написать на Email](mailto:faizovdanil23@gmail.com)
-[Telegram](https://t.me/@faizkaD)
