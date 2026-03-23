// src/components/Contact/Contact.tsx
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { ContactFormData, FormErrors } from '../../types';
import { services, sendToTelegram } from '../../utils/telegram';
import './Contact.css';

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    contactMethod: 'telegram', // По умолчанию Telegram
    telegram: '',
    phone: '',
    service: 'landing', // По умолчанию лендинг
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  // Получаем цену выбранной услуги
  const selectedService = services.find(s => s.id === formData.service);
  const servicePrice = selectedService?.price || 0;

  // Валидация
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Минимум 2 символа';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }

    // Валидация в зависимости от способа связи
    if (formData.contactMethod === 'telegram' && !formData.telegram?.trim()) {
      newErrors.telegram = 'Введите Telegram';
    }
    
    if (formData.contactMethod === 'phone' && !formData.phone?.trim()) {
      newErrors.phone = 'Введите телефон';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Введите сообщение';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Минимум 10 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработка ввода
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Очищаем ошибку при вводе
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Отправляем в Telegram
      const success = await sendToTelegram(formData);
      
      if (success) {
        setSubmitStatus('success');
        // Сбрасываем форму
        setFormData({
          name: '',
          email: '',
          contactMethod: 'telegram',
          telegram: '',
          phone: '',
          service: 'landing',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        {/* Заголовок */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">📬 Связь</span>
          <h2 className="section-title">Обсудим проект?</h2>
          <p className="section-subtitle">
            Заполните форму, и я свяжусь с вами в течение 24 часов
          </p>
        </motion.div>

        <div className="contact-wrapper">
          {/* Информация */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Почему стоит работать со мной?</h3>
            
            <div className="info-items">
              <div className="info-item">
                <span className="info-icon">⚡</span>
                <div>
                  <strong>Быстрая работа</strong>
                  <p>Соблюдаю дедлайны</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="info-icon">💎</span>
                <div>
                  <strong>Качество</strong>
                  <p>Современный код и дизайн</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="info-icon">🤝</span>
                <div>
                  <strong>Поддержка</strong>
                  <p>Помощь после сдачи проекта</p>
                </div>
              </div>
            </div>

            {/* Прайс */}
            <div className="price-preview">
              <h4>📋 Услуги и цены</h4>
              <ul className="price-list">
                {services.map(service => (
                  <li key={service.id} className="price-item">
                    <span className="price-name">{service.name}</span>
                    <span className="price-value">
                      {new Intl.NumberFormat('ru-RU').format(service.price)} ₽
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Форма */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {/* Имя */}
              <div className="form-group">
                <label htmlFor="name">Ваше имя *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Иван Иванов"
                  className={errors.name ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ivan@example.com"
                  className={errors.email ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Способ связи */}
              <div className="form-group">
                <label>Как с вами связаться? *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="telegram"
                      checked={formData.contactMethod === 'telegram'}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <span>💬 Telegram</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={formData.contactMethod === 'email'}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <span>📧 Email</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={formData.contactMethod === 'phone'}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <span>📱 Телефон</span>
                  </label>
                </div>
              </div>

              {/* Telegram или Телефон (в зависимости от выбора) */}
              {formData.contactMethod === 'telegram' && (
                <div className="form-group">
                  <label htmlFor="telegram">Ваш Telegram *</label>
                  <input
                    type="text"
                    id="telegram"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleChange}
                    placeholder="@username"
                    className={errors.telegram ? 'error' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.telegram && <span className="error-message">{errors.telegram}</span>}
                </div>
              )}

              {formData.contactMethod === 'phone' && (
                <div className="form-group">
                  <label htmlFor="phone">Ваш телефон *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (999) 123-45-67"
                    className={errors.phone ? 'error' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              )}

              {/* Выбор услуги */}
              <div className="form-group">
                <label htmlFor="service">Выберите услугу *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="service-select"
                  disabled={isSubmitting}
                >
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} — {new Intl.NumberFormat('ru-RU').format(service.price)} ₽
                    </option>
                  ))}
                </select>
                
                {/* Показываем цену */}
                {selectedService && (
                  <div className="service-info">
                    <p className="service-description">{selectedService.description}</p>
                    <p className="service-price">💰 {new Intl.NumberFormat('ru-RU').format(selectedService.price)} ₽</p>
                  </div>
                )}
              </div>

              {/* Сообщение */}
              <div className="form-group">
                <label htmlFor="message">Расскажите о проекте *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Опишите вашу задачу, сроки, пожелания..."
                  rows={5}
                  className={errors.message ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              {/* Кнопка */}
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loader"></span>
                    Отправка...
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    Отправить заявку
                  </>
                )}
              </button>

              {/* Статус */}
              {submitStatus === 'success' && (
                <div className="success-message">
                  ✅ <strong>Заявка отправлена!</strong><br />
                  Я получил ваше сообщение и скоро свяжусь с вами.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="error-message-box">
                  ❌ <strong>Ошибка отправки</strong><br />
                  Попробуйте написать мне напрямую в Telegram или Email.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;