// src/components/Footer/Footer.tsx
// Подвал сайта

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Показываем кнопку "Наверх" после прокрутки
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Прокрутка наверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Основной контент */}
        <div className="footer-content">
          {/* Логотип и описание */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span>Данил Фаизов</span>
            </Link>
            <p className="footer-description">Frontend-разработчик.</p>
          </div>

          {/* Навигация */}
          <div className="footer-links">
            <h4>Навигация</h4>
            <button onClick={() => scrollToSection("home")}>Главная</button>
            <button onClick={() => scrollToSection("projects")}>Проекты</button>
            <button onClick={() => scrollToSection("skills")}>Навыки</button>
            <button onClick={() => scrollToSection("contact")}>Контакты</button>
          </div>

          {/* Контакты */}
          <div className="footer-contact">
            <h4>Контакты</h4>
            <a href="https://mail.google.com/mail">faizovdanil23@gmail.com</a>
            <a
              href="https://t.me/faizkaD"
              target="_blank"
              rel="noopener noreferrer"
            >
              @faizkaD
            </a>
            <a
              href="https://github.com/DanilFaizov"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>

          {/* Социальные сети */}
          <div className="footer-social">
            <h4>Соцсети</h4>
            <div className="social-icons">
              <a
                href="https://github.com/DanilFaizov"
                target="_blank"
                rel="noopener noreferrer"
                data-tooltip="GitHub"
              >
                <span>GH</span>
              </a>
              <a
                href="https://t.me/faizkaD"
                target="_blank"
                rel="noopener noreferrer"
                data-tooltip="Telegram"
              >
                <span>TG</span>
              </a>
            </div>
          </div>
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
