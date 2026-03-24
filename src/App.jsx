import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import LeftNav from './components/LeftNav';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';

const sectionMap = {
    home:           Hero,
    projects:       Projects,
    skills:         Skills,
    certifications: Certifications,
    contact:        Contact,
};

const pageVariants = {
    initial: { opacity: 0, y: 40 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.25, ease: 'easeIn' },
    },
};

const AppContent = () => {
    const { activeSection, navCollapsed } = useNavigation();
    const mainRef = useRef(null);
    const ActiveSection = sectionMap[activeSection];

    useEffect(() => {
        const mainEl = mainRef.current;

        if (!mainEl) {
            return;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        mainEl.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }, [activeSection]);

    return (
        <div className={`app-layout${navCollapsed ? ' nav-collapsed' : ''}`}>
            <LeftNav />
            <main ref={mainRef} className="app-main">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="section-wrapper"
                    >
                        <ActiveSection />
                    </motion.div>
                </AnimatePresence>
                <Footer />
            </main>
        </div>
    );
};

function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <NavigationProvider>
                    <AppContent />
                </NavigationProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
