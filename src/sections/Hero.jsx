import React from 'react';
import { Link } from 'react-scroll';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section id="about" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: '80px'
        }}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-color)' }}
                >
                    {t('hero.greeting')}
                </motion.h2>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ fontSize: '4rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                    Julián
                </motion.h1>
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--secondary-color)' }}
                >
                    {t('hero.role')}
                </motion.h3>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Link
                        to="projects"
                        smooth={true}
                        duration={500}
                        style={{
                            padding: '1rem 2rem',
                            fontSize: '1.2rem',
                            background: 'var(--primary-color)',
                            color: 'white',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                        }}
                    >
                        {t('hero.cta')}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
