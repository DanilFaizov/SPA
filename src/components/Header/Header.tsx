import {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

interface HeaderProps{
  isDarkMode: boolean;
  toggleTheme: () => void;
}

function Header({isDarkMode, toggleTheme}: HeaderProps){
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(()=>{
    const handleScroll = ()=>{
      setIsScrolled(window.scrollY > 50);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
  
    window.addEventListener('scroll',handleScroll);
    return ()=> window.removeEventListener('scroll', handleScroll);
  },[]);

  useEffect(()=>{
    setIsMenuOpen(false);
  },[location]);

  const scrollToSection = (sectionId: string) =>{
    const element = document.getElementById(sectionId);
    if (element){
      element.scrollIntoView({behavior:'smooth'});
    }
  };
  return(
    <>
      {/* Прогресс-бар чтения страницы */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Логотип */}
          <Link to="/" className="logo" onClick={() => scrollToSection('home')}>
            <span className="logo-icon">🌿</span>
            <span className="logo-text">Алексей Петров</span>
          </Link>

          {/* Кнопка мобильного меню */}
          <button
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Открыть меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Навигация */}
          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <button onClick={() => scrollToSection('home')} className="nav-link">
              Главная
            </button>
            <button onClick={() => scrollToSection('projects')} className="nav-link">
              Проекты
            </button>
            <button onClick={() => scrollToSection('skills')} className="nav-link">
              Навыки
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">
              Контакты
            </button>

            {/* Переключатель темы */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Переключить тему"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header