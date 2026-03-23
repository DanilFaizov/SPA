import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Skill } from '../../types';
import './Skills.css';

const skillsData: Skill[] = [
  { name: "React", level: "advanced", category: "frontend", icon: "⚛️" },
  { name: "TypeScript", level: "advanced", category: "frontend", icon: "📘" },
  { name: "JavaScript", level: "advanced", category: "frontend", icon: "📜" },
  { name: "HTML5", level: "advanced", category: "frontend", icon: "🌐" },
  { name: "CSS3/SASS", level: "advanced", category: "frontend", icon: "🎨" },
  { name: "Node.js", level: "intermediate", category: "backend", icon: "🟢" },
  { name: "Express", level: "intermediate", category: "backend", icon: "🚂" },
  { name: "PostgreSQL", level: "intermediate", category: "backend", icon: "🐘" },
  { name: "Git", level: "advanced", category: "tools", icon: "📦" },
  { name: "Docker", level: "beginner", category: "tools", icon: "🐳" },
  { name: "Figma", level: "intermediate", category: "tools", icon: "🎭" },
  { name: "VS Code", level: "advanced", category: "tools", icon: "💻" }
];

// Уровни навыков
const levelColors = {
  beginner: { from: '#fbbf24', to: '#f59e0b', label: 'Начальный' },
  intermediate: { from: '#3b82f6', to: '#2563eb', label: 'Средний' },
  advanced: { from: '#22c55e', to: '#16a34a', label: 'Продвинутый' }
};

function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  // Фильтрация по категории
  const filteredSkills = activeCategory === 'all'
    ? skillsData
    : skillsData.filter(skill => skill.category === activeCategory);

  // Категории для фильтра
  const categories = [
    { id: 'all', name: 'Все', icon: '📊' },
    { id: 'frontend', name: 'Frontend', icon: '🎨' },
    { id: 'backend', name: 'Backend', icon: '⚙️' },
    { id: 'tools', name: 'Инструменты', icon: '🛠️' }
  ];

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        {/* Заголовок */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">🎯 Компетенции</span>
          <h2 className="section-title">Мои навыки</h2>
          <p className="section-subtitle">
            Технологии и инструменты, которыми я владею.
            Постоянно учусь и развиваюсь в новых направлениях.
          </p>
        </motion.div>

        {/* Фильтры категорий */}
        <motion.div
          className="skills-filter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Сетка навыков */}
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Статистика */}
        <motion.div
          className="skills-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="stat-item">
            <span className="stat-number">12+</span>
            <span className="stat-label">Технологий</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5+</span>
            <span className="stat-label">Проектов</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2+</span>
            <span className="stat-label">Года опыта</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Отдачи</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Карточка навыка
interface SkillCardProps {
  skill: Skill;
  index: number;
  isVisible: boolean;
}

function SkillCard({ skill, index, isVisible }: SkillCardProps) {
  const colors = levelColors[skill.level];

  return (
    <motion.div
      className="skill-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05
      }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="skill-icon">{skill.icon}</div>
      <h3 className="skill-name">{skill.name}</h3>
      
      {/* Индикатор уровня */}
      <div className="skill-level">
        <div
          className="skill-bar"
          style={{
            background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`,
            width: skill.level === 'advanced' ? '100%' : skill.level === 'intermediate' ? '70%' : '40%'
          }}
        />
      </div>
      
      <span className="skill-label" style={{ color: colors.from }}>
        {colors.label}
      </span>
    </motion.div>
  );
}

export default Skills;