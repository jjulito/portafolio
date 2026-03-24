import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';
import { motion } from 'framer-motion';
import ScrambleText from '../components/ScrambleText';
import CodeBackground from '../components/CodeBackground';

const Hero = () => {
    const { t } = useLanguage();
    const { setActiveSection } = useNavigation();

    return (
        <section id="about" className="hero-section section-with-code-bg">
            <CodeBackground intensity="high" />
            <div className="section-content-layer">
                <div className="container hero-about-grid">
                <motion.div
                    className="hero-intro"
                    initial={{ opacity: 0, x: -90 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="hero-greeting">
                        <ScrambleText text={t('hero.greeting')} duration={360} steps={10} />
                    </h2>
                    <h1 className="hero-title">
                        Julián
                    </h1>
                    <h3 className="hero-role">
                        <ScrambleText text={t('hero.role')} duration={360} steps={10} />
                    </h3>
                    <motion.div
                        initial={{ opacity: 0, x: -36, clipPath: 'inset(0 100% 0 0)' }}
                        animate={{ opacity: 1, x: 0, clipPath: 'inset(0 0 0 0)' }}
                        transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <button
                            className="hero-cta"
                            onClick={() => setActiveSection('projects')}
                        >
                            <ScrambleText text={t('hero.cta')} duration={320} steps={9} />
                        </button>
                    </motion.div>
                </motion.div>
                <motion.div
                    className="glass glass-panel about-content"
                    initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
                    transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="section-title">
                        <ScrambleText text={t('about.title')} duration={360} steps={10} />
                    </h2>
                    <div className="about-roles">
                        <span><ScrambleText text={t('about.roles.full_stack')} duration={360} steps={10} /></span>
                        <span><ScrambleText text={t('about.roles.student')} duration={360} steps={10} /></span>
                        <a href="https://thyroidea.me" target="_blank" rel="noopener noreferrer">
                            <ScrambleText text={t('about.roles.founder')} duration={360} steps={10} />
                        </a>
                    </div>
                    <p>
                        <ScrambleText text={t('about.bio')} duration={380} steps={10} />
                    </p>
                </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
