import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const About = () => {
    const { t } = useLanguage();

    return (
        <section id="about" style={{ padding: '6rem 0' }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--primary-color)' }}
                    >
                        {t('about.title')}
                    </motion.h2>

                    <motion.div
                        className="glass"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
                            padding: '3rem',
                            borderRadius: '20px',
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            color: 'var(--text-color)'
                        }}
                    >
                        <p style={{ marginBottom: '1.5rem' }}>
                            {t('about.description')}
                        </p>
                        <p>
                            {t('about.bio')}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
