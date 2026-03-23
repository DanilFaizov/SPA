// src/components/Footer/Footer.tsx
// Подвал сайта

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const [currentYear] = useState(new Date().getFullYear());
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Показываем кнопку "Наверх" после прокрутки
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Прокрутка наверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Основной контент */}
        <div className="footer-content">
          {/* Логотип и описание */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span>Алексей Петров</span>
            </Link>
            <p className="footer-description">
              Frontend-разработчик, создающий современные 
              веб-интерфейсы с фокусом на пользовательский опыт.
            </p>
          </div>

          {/* Навигация */}
          <div className="footer-links">
            <h4>Навигация</h4>
            <button onClick={() => scrollToSection('home')}>Главная</button>
            <button onClick={() => scrollToSection('projects')}>Проекты</button>
            <button onClick={() => scrollToSection('skills')}>Навыки</button>
            <button onClick={() => scrollToSection('contact')}>Контакты</button>
          </div>

          {/* Контакты */}
          <div className="footer-contact">
            <h4>Контакты</h4>
            <a href="https://mail.google.com/mail">faizovdanil23@gmail.com</a>
            <a href="https://t.me/alexei_petrov" target="_blank" rel="noopener noreferrer">
              @alexei_petrov
            </a>
            <a href="https://github.com/alexei-petrov" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>

          {/* Социальные сети */}
          <div className="footer-social">
            <h4>Соцсети</h4>
            <div className="social-icons">
              <a href="https://github.com/alexei-petrov" target="_blank" rel="noopener noreferrer">
                GH
              </a>
              <a href="https://linkedin.com/in/alexei-petrov" target="_blank" rel="noopener noreferrer">
                IN
              </a>
              <a href="https://t.me/alexei_petrov" target="_blank" rel="noopener noreferrer">
                TG
              </a>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="footer-bottom">
          <p>© {currentYear} Алексей Петров. Все права защищены.</p>
          <p className="footer-made">
            Сделано с 💚 используя React + TypeScript + Vite
          </p>
        </div>
      </div>

      {/* Кнопка "Наверх" */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="back-to-top"
          aria-label="Наверх"
        >
          ↑
        </button>
      )}
    </footer>
  );
}

export default Footer;