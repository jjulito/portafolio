import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const About = () => {
    const { t } = useLanguage();

    return (
        <section id="about" className="section-padding">
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
                        className="section-title"
                    >
                        {t('about.title')}
                    </motion.h2>

                    <motion.div
                        className="glass glass-panel"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
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
