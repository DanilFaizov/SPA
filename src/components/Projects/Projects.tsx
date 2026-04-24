import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Project } from '../../types/index.ts';
import './Projects.css';
import SPA from "../../../dist/assets/SPA-B4aqPg7R.png";
import BinGo from "../../../dist/assets/BinGo-CvGc-fTe.png";
import WinFormsHotel from "../../../dist/assets/WinFormsHotel-B3-HxhaG.jpg";
import Gitpod from "../../../dist/assets/Gitpod-BSqwH5T3.png";


const projectsData: Project[] = [
  {
    id: 1,
    title: "SPA",
    description: "Мой сайт портфолио.",
    image: SPA,
    repoUrl: "https://github.com/DanilFaizov/SPA",
    demoUrl: "https://alexei-shop.vercel.app",
    tags: ["React", "TypeScript", "Vue"]
  },
  {
    id: 2,
    title: "BinGo",
    description: "мобильное приложение, которое позволяет изучать искусство с помощью тестов в виде карточек. Студенты, школьники и преподаватели могут использовать уже готовые шаблоны или создавать свои для усвоения материала. Игра в угадай художника – показывают картину/произведение искусства и надо написать автора. Чем выше сложность, тем не популярнее художник и сложнее угадать в карточках.",
    image: BinGo,
    repoUrl: "https://github.com/DanilFaizov/BinGo",
    demoUrl: "https://vk.com/app53321903",
    tags: ["React"]
  },
  {
    id: 3,
    title: "АСУ «Гостиница»",
    description: "Данное приложение — учебный проект по автоматизации работы небольшой гостиницы. Разработано в рамках курсовой работы по направлению Прикладная информатика (профиль: Разработка веб- и мобильных приложений).",
    image: WinFormsHotel,
    repoUrl: "https://github.com/DanilFaizov/WinFormsHotel",
    demoUrl: "https://github.com/DanilFaizov/WinFormsHotel",
    tags: ["C#","SQL"]
  },
  {
    id: 4,
    title: "Gitpod",
    description: "Учебнйы проект.",
    image: Gitpod,
    repoUrl: "https://github.com/DanilFaizov/Gitpod",
    demoUrl: "https://danilfaizov.github.io/Gitpod/",
    tags: ["HTML","css"]
  },
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
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag"> Портфолио</span>
          <h2 className="section-title">Мои проекты</h2>
        </motion.div>

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
                 Код
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
                 Демо
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

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