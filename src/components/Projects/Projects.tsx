// src/components/Projects/Projects.tsx
// Секция с проектами

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Project } from '../../types/index.ts';
import './Projects.css';

// Данные проектов (ЗАМЕНИ НА СВОИ!)
const projectsData: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Полноценный интернет-магазин с корзиной, фильтрацией товаров, оплатой и личным кабинетом. Адаптивный дизайн и оптимизированная производительность.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    repoUrl: "https://github.com/alexei-petrov/ecommerce",
    demoUrl: "https://alexei-shop.vercel.app",
    tags: ["React", "TypeScript", "Redux", "Node.js"]
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Приложение для управления задачами с drag-and-drop, категориями, приоритетами и синхронизацией в реальном времени.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
    repoUrl: "https://github.com/alexei-petrov/task-manager",
    demoUrl: "https://alexei-tasks.vercel.app",
    tags: ["React", "TypeScript", "Firebase", "DnD"]
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Погодное приложение с использованием OpenWeather API. Показывает текущую погоду, прогноз на 5 дней и историю запросов.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop",
    repoUrl: "https://github.com/alexei-petrov/weather-app",
    demoUrl: "https://alexei-weather.vercel.app",
    tags: ["React", "API", "CSS3", "Geolocation"]
  },
  {
    id: 4,
    title: "Social Media Dashboard",
    description: "Панель управления для социальных сетей с аналитикой, планировщиком публикаций и интеграцией с популярными платформами.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    repoUrl: "https://github.com/alexei-petrov/social-dashboard",
    demoUrl: "https://alexei-social.vercel.app",
    tags: ["React", "TypeScript", "Chart.js", "REST API"]
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Личный сайт-портфолио с тёмной темой, анимациями, адаптивным дизайном и оптимизацией для поисковых систем.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=400&fit=crop",
    repoUrl: "https://github.com/alexei-petrov/portfolio",
    demoUrl: "https://alexei-portfolio.vercel.app",
    tags: ["React", "TypeScript", "Vite", "Framer Motion"]
  }
];

function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        {/* Заголовок секции */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">💼 Портфолио</span>
          <h2 className="section-title">Мои проекты</h2>
          <p className="section-subtitle">
            Здесь собраны мои последние работы и пет-проекты.
            Каждый проект — это новый вызов и возможность научиться чему-то новому.
          </p>
        </motion.div>

        {/* Сетка проектов */}
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Карточка проекта
interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

function ProjectCard({ project, index, isVisible }: ProjectCardProps) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 50
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1
      }}
      whileHover={{ y: -10 }}
    >
      {/* Изображение */}
      <div className="project-image-wrapper">
        <img src={project.image} alt={project.title} className="project-image" />
        <div className="project-overlay">
          <div className="project-actions">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn"
                title="Исходный код"
              >
                🔗 Код
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn primary"
                title="Демо версия"
              >
                👁️ Демо
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Информация */}
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        {/* Теги */}
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default Projects;