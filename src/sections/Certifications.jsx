import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import certificationsData from '../data/certifications.json';

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
        <section id="resume" style={{ padding: '4rem 0' }}>
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--primary-color)' }}>
                    {t('certifications.title')}
                </h2>

                <div style={{
                    display: 'flex',
                    overflowX: 'auto',
                    gap: '2rem',
                    paddingBottom: '1rem',
                    scrollSnapType: 'x mandatory'
                }}>
                    {certificationsData.map((cert) => (
                        <div key={cert.id} className="glass" style={{
                            minWidth: '300px',
                            padding: '2rem',
                            borderRadius: '15px',
                            textAlign: 'center',
                            scrollSnapAlign: 'start',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <img
                                src={cert.image}
                                alt={cert.title}
                                style={{
                                    width: '100%',
                                    height: '100px',
                                    marginBottom: '1rem',
                                    objectFit: 'cover',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                                onClick={() => handleImageClick(cert.image)}
                            />
                            <h3 style={{ marginBottom: '0.5rem' }}>{cert.title}</h3>
                            <p style={{ color: 'var(--secondary-color)', marginBottom: '0.2rem' }}>
                                {t('certifications.issued_by')} {cert.issuer}
                            </p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-color)', opacity: 0.8 }}>{cert.date}</p>
                            <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    marginTop: '1rem',
                                    color: 'var(--primary-color)',
                                    fontWeight: 'bold'
                                }}
                            >
                                {t('certifications.view_certificate')}
                            </a>
                        </div>
                    ))}
                </div>
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
                                alt="Certificate Full View"
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

export default Certifications;
