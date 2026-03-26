import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import projectsData from '../data/projects.json';
import ScrambleText from '../components/ScrambleText';
import CodeBackground from '../components/CodeBackground';

const Projects = () => {
    const { t } = useLanguage();
    const [visibleProjects, setVisibleProjects] = useState(6);
    const [selectedImage, setSelectedImage] = useState(null);
    const [expandedFeatured, setExpandedFeatured] = useState({});
    const [featuredImageIndexes, setFeaturedImageIndexes] = useState({});
    const [featuredImageDirections, setFeaturedImageDirections] = useState({});
    const otherProjects = projectsData.filter((project) => project.id !== 4);

    const featuredImageVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 24 : -24,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction > 0 ? -24 : 24,
            opacity: 0
        })
    };

    const featuredProjects = [
        {
            key: 'thyroidea',
            images: ['projects/1.png', 'projects/2.png', 'projects/3.png'],
            live: 'https://thyroidea.me',
            title: t('projects.featured.thyroidea.title'),
            description: t('projects.featured.thyroidea.description'),
            why: t('projects.featured.thyroidea.why'),
            how: t('projects.featured.thyroidea.how'),
            highlights: t('projects.featured.thyroidea.highlights'),
            tools: t('projects.featured.thyroidea.tools')
        },
        {
            key: 'go_concurrency_booking',
            images: ['projects/project4.png'],
            github: 'https://github.com/jjulito/go-concurrency-booking',
            title: t('projects.featured.go_concurrency_booking.title'),
            description: t('projects.featured.go_concurrency_booking.description'),
            why: t('projects.featured.go_concurrency_booking.why'),
            how: t('projects.featured.go_concurrency_booking.how'),
            highlights: t('projects.featured.go_concurrency_booking.highlights'),
            tools: t('projects.featured.go_concurrency_booking.tools')
        }
    ];

    const showMore = () => {
        setVisibleProjects((prev) => prev + 3);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const toggleFeaturedDetails = (projectKey) => {
        setExpandedFeatured((prev) => ({
            ...prev,
            [projectKey]: !prev[projectKey]
        }));
    };

    const getFeaturedImageIndex = (projectKey) => featuredImageIndexes[projectKey] ?? 0;
    const getFeaturedImageDirection = (projectKey) => featuredImageDirections[projectKey] ?? 1;

    const changeFeaturedImage = (projectKey, direction, totalImages) => {
        setFeaturedImageDirections((prev) => ({
            ...prev,
            [projectKey]: direction
        }));

        setFeaturedImageIndexes((prev) => {
            const currentIndex = prev[projectKey] ?? 0;
            const nextIndex = (currentIndex + direction + totalImages) % totalImages;

            return {
                ...prev,
                [projectKey]: nextIndex
            };
        });
    };

    return (
        <section id="projects" className="section-padding section-with-code-bg">
            <CodeBackground intensity="low" />

            <div className="section-content-layer">
                <div className="container">
                    <h2 className="section-title">
                        <ScrambleText text={t('projects.title')} duration={360} steps={10} />
                    </h2>

                    <h3 className="featured-projects-title">
                        <ScrambleText text={t('projects.featured_subtitle')} duration={300} steps={8} />
                    </h3>

                    <div className="featured-projects-stack">
                        {featuredProjects.map((project, index) => {
                            const isExpanded = Boolean(expandedFeatured[project.key]);
                            const currentImageIndex = getFeaturedImageIndex(project.key);
                            const currentImageDirection = getFeaturedImageDirection(project.key);
                            const currentImage = project.images[currentImageIndex];
                            const hasMultipleImages = project.images.length > 1;
                            const isCenterTarget = project.key === 'thyroidea' || project.key === 'go_concurrency_booking';

                            return (
                            <motion.article
                                key={project.key}
                                className={`glass featured-project-card ${index % 2 !== 0 ? 'featured-project-card-reverse' : ''} ${isExpanded ? 'is-expanded' : ''}`}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, delay: index * 0.12 }}
                                viewport={{ once: true, margin: '-70px' }}
                            >
                                <div className={`featured-project-media ${isCenterTarget ? 'featured-project-media-centered' : ''}`}>
                                    {hasMultipleImages && (
                                        <button
                                            type="button"
                                            className="featured-carousel-btn featured-carousel-btn-prev"
                                            onClick={() => changeFeaturedImage(project.key, -1, project.images.length)}
                                            aria-label={t('projects.previous_image')}
                                        >
                                            <FaChevronLeft aria-hidden="true" />
                                        </button>
                                    )}

                                    <div className="featured-carousel-image-stage">
                                        <AnimatePresence initial={false} mode="wait" custom={currentImageDirection}>
                                            <motion.img
                                                key={currentImage}
                                                className={`featured-carousel-image ${isCenterTarget ? 'featured-carousel-image-centered' : ''}`}
                                                src={currentImage}
                                                alt={project.title}
                                                loading="lazy"
                                                custom={currentImageDirection}
                                                variants={featuredImageVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{ duration: 0.34, ease: [0.22, 0.61, 0.36, 1] }}
                                                onClick={() => handleImageClick(currentImage)}
                                            />
                                        </AnimatePresence>
                                    </div>

                                    {hasMultipleImages && (
                                        <>
                                            <button
                                                type="button"
                                                className="featured-carousel-btn featured-carousel-btn-next"
                                                onClick={() => changeFeaturedImage(project.key, 1, project.images.length)}
                                                aria-label={t('projects.next_image')}
                                            >
                                                <FaChevronRight aria-hidden="true" />
                                            </button>

                                            <span className="featured-carousel-counter" aria-hidden="true">
                                                {currentImageIndex + 1} / {project.images.length}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <div className="featured-project-content">
                                    <p className="featured-project-eyebrow"><ScrambleText text={t('projects.featured_label')} duration={300} steps={8} /></p>
                                    <h3 className="featured-project-title"><ScrambleText text={project.title} duration={340} steps={9} /></h3>
                                    <p className="featured-project-description"><ScrambleText text={project.description} duration={380} steps={10} /></p>

                                    <div className="project-links">
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                                                <FaGithub /> <ScrambleText text={t('projects.view_code')} duration={300} steps={8} />
                                            </a>
                                        )}
                                        {project.live && (
                                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                                                <FaExternalLinkAlt /> <ScrambleText text={project.key === 'thyroidea' ? t('projects.visit_site') : t('projects.view_live')} duration={300} steps={8} />
                                            </a>
                                        )}

                                        <button
                                            type="button"
                                            className="featured-toggle-btn"
                                            onClick={() => toggleFeaturedDetails(project.key)}
                                        >
                                            <ScrambleText text={isExpanded ? t('projects.toggle_summary') : t('projects.toggle_details')} duration={300} steps={8} />
                                        </button>
                                    </div>
                                </div>

                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            className="featured-project-extra"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.28, ease: 'easeInOut' }}
                                        >
                                            <div className="featured-project-detail-block">
                                                <h4><ScrambleText text={t('projects.tools_label')} duration={300} steps={8} /></h4>
                                                <div className="project-tech-tags featured-tech-tags">
                                                    {project.tools.map((tool) => (
                                                        <span key={tool} className="project-tech-tag">{tool}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="featured-project-detail-block">
                                                <h4><ScrambleText text={t('projects.why_label')} duration={300} steps={8} /></h4>
                                                <p>{project.why}</p>
                                            </div>

                                            <div className="featured-project-detail-block">
                                                <h4><ScrambleText text={t('projects.how_label')} duration={300} steps={8} /></h4>
                                                <p>{project.how}</p>
                                            </div>

                                            <div className="featured-project-detail-block">
                                                <h4><ScrambleText text={t('projects.timeline_label')} duration={300} steps={8} /></h4>
                                                <div className="featured-project-timeline">
                                                    {project.highlights.map((highlight, stepIndex) => (
                                                        <div key={highlight} className="featured-project-step">
                                                            <span className="featured-project-step-index">{stepIndex + 1}</span>
                                                            <p><ScrambleText text={highlight} duration={340} steps={9} /></p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.article>
                            );
                        })}
                    </div>

                    <h3 className="other-projects-title">
                        <ScrambleText text={t('projects.other_projects_title')} duration={320} steps={9} />
                    </h3>

                    <p className="projects-disclaimer">
                        <ScrambleText text={t('projects.disclaimer')} duration={340} steps={9} />
                    </p>

                    <div className="projects-grid">
                        {otherProjects.slice(0, visibleProjects).map((project, index) => (
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

                    {visibleProjects < otherProjects.length && (
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
