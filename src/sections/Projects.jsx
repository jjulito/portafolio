import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import projectsData from '../data/projects.json';

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
        <section id="projects" className="section-padding">
            <div className="container">
                <h2 className="section-title">
                    {t('projects.title')}
                </h2>

                <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-color)', opacity: 0.8, fontStyle: 'italic' }}>
                    {t('projects.disclaimer')}
                </p>

                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto 3rem auto',
                    padding: '1.5rem',
                    borderRadius: '10px',
                    border: '1px solid var(--primary-color)',
                    background: 'rgba(0, 0, 0, 0.2)', // Using a safe dark transparent background as fallback
                    textAlign: 'center',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                    <h4 style={{
                        color: 'var(--primary-color)',
                        marginBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '1.2rem'
                    }}>
                        <FaExclamationTriangle /> {t('projects.important_note_title')}
                    </h4>
                    <p style={{ color: 'var(--text-color)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {t('projects.important_note_body')}
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {projectsData.slice(0, visibleProjects).map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="glass"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            style={{
                                borderRadius: '15px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ height: '200px', overflow: 'hidden' }}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                                    onClick={() => handleImageClick(project.image)}
                                />
                            </div>
                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>{t(`projects.items.${project.id}.title`)}</h3>
                                <p style={{ color: 'var(--secondary-color)', marginBottom: '1rem', flex: 1 }}>
                                    {t(`projects.items.${project.id}.description`)}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                    {project.tech.map((tech) => (
                                        <span key={tech} style={{
                                            fontSize: '0.8rem',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '12px',
                                            background: 'var(--bg-color)',
                                            border: '1px solid var(--border-color)'
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)' }}>
                                        <FaGithub /> {t('projects.view_code')}
                                    </a>
                                    {project.live && (
                                        <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)' }}>
                                            <FaExternalLinkAlt /> {t('projects.view_live')}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {visibleProjects < projectsData.length && (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <button
                            onClick={showMore}
                            style={{
                                padding: '0.8rem 2rem',
                                background: 'var(--primary-color)',
                                color: 'white',
                                borderRadius: '25px',
                                fontSize: '1rem'
                            }}
                        >
                            {t('projects.show_more')}
                        </button>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            padding: '2rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}
                        >
                            <button
                                onClick={closeModal}
                                style={{
                                    position: 'absolute',
                                    top: '-40px',
                                    right: '-40px',
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '2rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <FaTimes />
                            </button>
                            <img
                                src={selectedImage}
                                alt="Project Full View"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '85vh',
                                    borderRadius: '10px',
                                    boxShadow: '0 0 20px rgba(0,0,0,0.3)'
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
