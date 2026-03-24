import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import certificationsData from '../data/certifications.json';
import ScrambleText from '../components/ScrambleText';
import CodeBackground from '../components/CodeBackground';

const Certifications = () => {
    const { t } = useLanguage();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <section id="resume" className="section-padding section-with-code-bg">
            <CodeBackground intensity="low" />

            <div className="section-content-layer">
                <div className="container">
                    <h2 className="section-title">
                        <ScrambleText text={t('certifications.title')} duration={360} steps={10} />
                    </h2>

                    <div className="cert-grid">
                        {certificationsData.map((cert) => (
                            <div key={cert.id} className="glass cert-card">
                                <img
                                    className="cert-card-image"
                                    src={cert.image}
                                    alt={cert.title}
                                    loading="lazy"
                                    onClick={() => handleImageClick(cert.image)}
                                />
                                <h3 style={{ marginBottom: '0.5rem' }}>{cert.title}</h3>
                                <p className="cert-card-issuer">
                                    <ScrambleText text={t('certifications.issued_by')} duration={300} steps={8} /> {cert.issuer}
                                </p>
                                <p className="cert-card-date">{cert.date}</p>
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cert-card-link"
                                >
                                    <ScrambleText text={t('certifications.view_certificate')} duration={300} steps={8} />
                                </a>
                            </div>
                        ))}
                    </div>
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
                                alt="Certificate Full View"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certifications;
