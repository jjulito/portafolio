import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes, FaMoon, FaSun, FaGlobe } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import '../index.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = React.useRef(0);
    const { theme, toggleTheme } = useTheme();
    const { language, switchLanguage, t } = useLanguage();
    const isLayoutUpdating = React.useRef(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        isLayoutUpdating.current = true;
        const timer = setTimeout(() => {
            isLayoutUpdating.current = false;
        }, 300);
        return () => clearTimeout(timer);
    }, [language]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (!isLayoutUpdating.current) {
                if (currentScrollY < lastScrollY.current || currentScrollY < 10) {
                    setIsVisible(true);
                }
                else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                    setIsVisible(false);
                }
            }

            lastScrollY.current = currentScrollY;
        };

        const handleMouseMove = (e) => {
            if (e.clientY < 100) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    const navLinks = [
        { id: 'about', label: t('nav.about'), type: 'scroll' },
        { id: 'projects', label: t('nav.projects'), type: 'scroll' },
        { id: 'resume', label: t('nav.resume'), type: 'download', href: `${import.meta.env.BASE_URL}projects/resume.pdf` },
        { id: 'contact', label: t('nav.contact'), type: 'scroll' },
    ];

    return (
        <nav
            className="glass"
            onMouseEnter={() => setIsVisible(true)}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '1rem 2rem',
                transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
                transition: 'transform 0.3s ease-in-out, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                opacity: isVisible ? 1 : 0,
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                    {t('nav.brand')}
                </div>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {navLinks.map((link) => (
                        link.type === 'scroll' ? (
                            <Link
                                key={link.id}
                                to={link.id}
                                smooth={true}
                                duration={500}
                                style={{ cursor: 'pointer', fontWeight: 500 }}
                                activeClass="active"
                                spy={true}
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <a
                                key={link.id}
                                href={link.href}
                                download
                                style={{ cursor: 'pointer', fontWeight: 500 }}
                            >
                                {link.label}
                            </a>
                        )
                    ))}

                    <button onClick={toggleTheme} style={{ fontSize: '1.2rem', color: 'var(--text-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.3s ease' }}>
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>

                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <button
                            onClick={() => switchLanguage(language === 'en' ? 'es' : 'en')}
                            style={{ fontSize: '1.2rem', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s ease' }}
                        >
                            <FaGlobe /> {language.toUpperCase()}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="mobile-toggle" style={{ display: 'none' }}>
                    <button onClick={toggleMenu} style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="glass" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    alignItems: 'center'
                }}>
                    {navLinks.map((link) => (
                        link.type === 'scroll' ? (
                            <Link
                                key={link.id}
                                to={link.id}
                                smooth={true}
                                duration={500}
                                onClick={toggleMenu}
                                style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <a
                                key={link.id}
                                href={link.href}
                                download
                                onClick={toggleMenu}
                                style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                            >
                                {link.label}
                            </a>
                        )
                    ))}
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                        <button onClick={toggleTheme} style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>
                            {theme === 'light' ? <FaMoon /> : <FaSun />}
                        </button>
                        <button onClick={() => switchLanguage(language === 'en' ? 'es' : 'en')} style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>
                            {language.toUpperCase()}
                        </button>
                    </div>
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
