import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Skill } from '../../types';
import './Skills.css';

const skillsData: Skill[] = [
  { name: "React", level: "intermediate", category: "frontend", icon: "⚛️" },
  { name: "TypeScript", level: "intermediate", category: "frontend", icon: "📘" },
  { name: "JavaScript", level: "intermediate", category: "frontend", icon: "📜" },
  { name: "HTML5", level: "advanced", category: "frontend", icon: "🌐" },
  { name: "CSS3", level: "advanced", category: "frontend", icon: "🎨" },
  { name: "PostgreSQL", level: "beginner", category: "backend", icon: "🐘" },
  { name: "Git", level: "beginner", category: "tools", icon: "📦" },
  { name: "Docker", level: "beginner", category: "tools", icon: "🐳" },
  { name: "Figma", level: "beginner", category: "tools", icon: "🎭" },
];
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

  const filteredSkills = activeCategory === 'all'
    ? skillsData
    : skillsData.filter(skill => skill.category === activeCategory);

  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'frontend', name: 'Frontend'},
    { id: 'backend', name: 'Backend' },
    { id: 'tools', name: 'Инструменты' }
  ];

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Мои навыки</span>
          <p className="section-subtitle">
            Технологии и инструменты, которыми я владею.
          </p>
        </motion.div>

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
              {cat.name}
            </button>
          ))}
        </motion.div>

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
      </div>
    </section>
  );
}

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