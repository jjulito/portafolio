import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import projectsData from '../data/projects.json';
import ScrambleText from '../components/ScrambleText';
import CodeBackground from '../components/CodeBackground';

const Projects = () => {
    const { t } = useLanguage();
    const [visibleProjects, setVisibleProjects] = useState(6);
    const [selectedImage, setSelectedImage] = useState(null);

    const showMore = () => {
        setVisibleProjects((prev) => prev + 3);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <section id="projects" className="section-padding section-with-code-bg">
            <CodeBackground intensity="low" />

            <div className="section-content-layer">
                <div className="container">
                    <h2 className="section-title">
                        <ScrambleText text={t('projects.title')} duration={360} steps={10} />
                    </h2>

                    <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-color)', opacity: 0.8, fontStyle: 'italic' }}>
                        <ScrambleText text={t('projects.disclaimer')} duration={340} steps={9} />
                    </p>

                    <div className="projects-grid">
                        {projectsData.slice(0, visibleProjects).map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="glass project-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="project-card-image">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        onClick={() => handleImageClick(project.image)}
                                    />
                                </div>
                                <div className="project-card-body">
                                    <h3 style={{ marginBottom: '0.5rem' }}>
                                        <ScrambleText text={t(`projects.items.${project.id}.title`)} duration={320} steps={9} />
                                    </h3>
                                    <p className="project-card-description">
                                        <ScrambleText text={t(`projects.items.${project.id}.description`)} duration={380} steps={10} />
                                    </p>
                                    <div className="project-tech-tags">
                                        {project.tech.map((tech) => (
                                            <span key={tech} className="project-tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                    <div className="project-links">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                                            <FaGithub /> <ScrambleText text={t('projects.view_code')} duration={300} steps={8} />
                                        </a>
                                        {project.live && (
                                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                                                <FaExternalLinkAlt /> <ScrambleText text={t('projects.view_live')} duration={300} steps={8} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {visibleProjects < projectsData.length && (
                        <div className="show-more-wrapper">
                            <button onClick={showMore} className="btn-primary">
                                <ScrambleText text={t('projects.show_more')} duration={300} steps={8} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={closeModal} aria-label="Close">
                                <FaTimes aria-hidden="true" />
                            </button>
                            <img
                                className="modal-image"
                                src={selectedImage}
                                alt="Project Full View"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
