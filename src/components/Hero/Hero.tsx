import { useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import './Hero.css'

function Hero(){
  const [isVisible, SetIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Frontend- разработчик | React | TypeScript';

  useEffect(()=>{
    let index =0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0,index));
        index++;
      }else{
        clearInterval(timer);
      }
    },50);

    return ()=> clearInterval(timer);
  },[]);

  useEffect(() => {
    SetIsVisible(true);
  },[]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth'});
  };

  return(
        <section id="home" className="hero">
      {/* Декоративные элементы */}
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
          {/* Приветствие */}
          <motion.p
            className="hero-greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.2 }}
          >
            👋 Привет, я
          </motion.p>

          {/* Имя */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Алексей <span className="highlight">Петров</span>
          </motion.h1>

          {/* Печатный текст */}
          <motion.div
            className="hero-typed"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.8 }}
          >
            {typedText}
            <span className="cursor">|</span>
          </motion.div>

          {/* Описание */}
          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 1.2 }}
          >
            Создаю современные, быстрые и удобные веб-интерфейсы.
            Специализируюсь на React-экосистеме и люблю превращать
            сложные задачи в элегантные решения.
          </motion.p>

          {/* Кнопки */}
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 1.5 }}
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="btn btn-primary"
            >
              <span>🚀</span> Мои проекты
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn btn-secondary"
            >
              <span>📬</span> Связаться
            </button>
          </motion.div>

          {/* Социальные ссылки */}
          <motion.div
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 1.8 }}
          >
            <a
              href="https://github.com/alexei-petrov"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              GitHub
            </a>
            <a
              href="https://t.me/alexei_petrov"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              Telegram
            </a>
            <a
              href="https://linkedin.com/in/alexei-petrov"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              LinkedIn
            </a>
            <a href="mailto:alexei@example.com" className="social-link">
              Email
            </a>
          </motion.div>
        </motion.div>

        {/* Изображение/Аватар */}
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="avatar-wrapper">
            <div className="avatar-glow"></div>
            <img
              src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alexei"
              alt="Алексей Петров"
              className="avatar"
            />
          </div>
        </motion.div>
      </div>

      {/* Индикатор прокрутки вниз */}
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