export interface Project {
  id: number;                    // Уникальный ID
  title: string;                 // Название проекта
  description: string;           // Краткое описание
  image: string;                 // URL изображения
  repoUrl?: string;              // Ссылка на репозиторий (опционально)
  demoUrl?: string;              // Ссылка на демо (опционально)
  tags: string[];                // Массив технологий
}

export interface Skill{
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'frontend' | 'backend' | 'tools' | 'other'
  icon?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  contactMethod: 'telegram' | 'email' | 'phone'; // Как связаться
  telegram?: string;      // Telegram username
  phone?: string;         // Телефон
  service: string;        // Выбранная услуга
  message: string;
}

export interface FormErrors{
  name?:string;
  email?: string;
  message?: string;
  telegram?: string;    // ← Добавлено
  phone?: string;       // ← Добавлено
  service?: string;     // ← Опционально
  contactMethod?: string;
}

export interface SocialLink {
  name: string;
  url:string;
  icon:string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
}