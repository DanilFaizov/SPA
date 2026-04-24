import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Hero.css";
//import Avatar from "../../../dist/assets/Avatar-D2D6vQqu.jpg";

function Hero() {
  const [isVisible, SetIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Frontend- разработчик";
  const Avatar = '/Avatar-D2D6vQqu.jpg'

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    SetIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="hero-greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.2 }}
          >
            Привет, я
          </motion.p>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Данил <span className="highlight">Фаизов</span>
          </motion.h1>
          <motion.div
            className="hero-typed"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.8 }}
          >
            {typedText}
            <span className="cursor">|</span>
          </motion.div>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 1.2 }}
          >
            Создаю современные, быстрые и удобные веб-интерфейсы.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 1.5 }}
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="btn btn-primary"
            >
              Мои проекты
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="btn btn-secondary"
            >
               Связаться
            </button>
          </motion.div>
          <motion.div
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 1.8 }}
          >
            <a
              href="https://github.com/DanilFaizov"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              GitHub
            </a>
            <a
              href="https://t.me/faizkaD"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              Telegram
            </a>
            <a href="mailto:faizovdanil23@gmail.com" className="social-link">
              Email
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="avatar-wrapper">
            <div className="avatar-glow"></div>
            <img
              src={Avatar}
              alt="Данил Фаизов"
              className="avatar"
            />
          </div>
        </motion.div>
      </div>
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span>↓</span>
        <p>Листайте вниз</p>
      </motion.div>
    </section>
  );
}

export default Hero;
