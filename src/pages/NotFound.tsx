import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <motion.div
        className="not-found-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Страница не найдена</h2>
        <p className="error-description">
          Похоже, вы заблудились. Вернитесь на главную страницу.
        </p>
        <Link to="/" className="back-home-btn">
          🏠 Вернуться домой
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;