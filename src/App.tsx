
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  // Состояние темы
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Проверяем localStorage при первой загрузке
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    // Проверяем системные настройки
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Применяем тему к документу
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Переключение темы
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <Router  basename="/SPA">
      <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
        <Routes>
          <Route
            path="/"
            element={<HomePage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;