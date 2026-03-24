import React, { useEffect, useRef, useState } from 'react';
import { FaMoon, FaSun, FaGlobe, FaBars, FaTimes, FaLinkedin, FaGithub, FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';
import ScrambleText from './ScrambleText';

const LeftNav = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef(null);
    const collapseBtnRef = useRef(null);
    const { theme, toggleTheme } = useTheme();
    const { language, switchLanguage, t } = useLanguage();
    const { activeSection, setActiveSection, navCollapsed, setNavCollapsed } = useNavigation();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (navCollapsed || mobileOpen) {
                return;
            }

            const navEl = navRef.current;
            const collapseBtnEl = collapseBtnRef.current;
            const target = event.target;

            if (!navEl || !target) {
                return;
            }

            const clickedInsideNav = navEl.contains(target);
            const clickedCollapseButton = collapseBtnEl ? collapseBtnEl.contains(target) : false;

            if (!clickedInsideNav && !clickedCollapseButton) {
                setNavCollapsed(true);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [mobileOpen, navCollapsed, setNavCollapsed]);

    const sections = [
        { id: 'home',           label: t('nav.about') },
        { id: 'projects',       label: t('nav.projects') },
        { id: 'skills',         label: t('nav.skills') },
        { id: 'certifications', label: t('nav.certifications') },
        { id: 'contact',        label: t('nav.contact') },
    ];

    const socialLinks = [
        { icon: <FaLinkedin aria-hidden="true" />, href: 'https://www.linkedin.com/in/octavio-mosqueda-757395278/', label: 'LinkedIn' },
        { icon: <FaGithub   aria-hidden="true" />, href: 'https://github.com/jjulito',                              label: 'GitHub' },
        { icon: <FaWhatsapp aria-hidden="true" />, href: 'https://wa.me/542915780286',                              label: 'WhatsApp' },
    ];

    const handleNav = (id) => {
        setActiveSection(id);
        setMobileOpen(false);
    };

    return (
        <>
            <button
                className="mobile-nav-toggle"
                onClick={() => setMobileOpen(o => !o)}
                aria-label="Toggle navigation"
            >
                {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>

            {mobileOpen && (
                <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)} />
            )}

            <nav ref={navRef} className={`left-nav glass${mobileOpen ? ' open' : ''}`}>
                <div className="left-nav-brand">
                    <ScrambleText className="left-nav-label" text={t('nav.brand')} duration={380} steps={10} />
                </div>

                <ul className="left-nav-links">
                    {sections.map(({ id, label }) => (
                        <li key={id}>
                            <button
                                className={`left-nav-btn${activeSection === id ? ' active' : ''}`}
                                onClick={() => handleNav(id)}
                                title={navCollapsed ? label : undefined}
                            >
                                <span className="left-nav-dot" aria-hidden="true">&gt;</span>
                                <ScrambleText className="left-nav-label" text={label} duration={340} steps={9} />
                            </button>
                        </li>
                    ))}
                    <li>
                        <a
                            href={`${import.meta.env.BASE_URL}projects/resume.pdf`}
                            download
                            className="left-nav-btn"
                            title={navCollapsed ? t('nav.resume') : undefined}
                        >
                            <span className="left-nav-dot" aria-hidden="true">&gt;</span>
                            <ScrambleText className="left-nav-label" text={t('nav.resume')} duration={340} steps={9} />
                        </a>
                    </li>
                </ul>

                <div className="left-nav-social">
                    {socialLinks.map(({ icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="left-nav-social-link"
                        >
                            {icon}
                        </a>
                    ))}
                </div>

                <div className="left-nav-controls">
                    <button onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'light' ? <FaMoon aria-hidden="true" /> : <FaSun aria-hidden="true" />}
                    </button>
                    <button onClick={() => switchLanguage(language === 'en' ? 'es' : 'en')}>
                        <FaGlobe aria-hidden="true" />
                        <span className="left-nav-label">{language.toUpperCase()}</span>
                    </button>
                </div>
            </nav>

            {/* collapse tab outside nav so transform does not break position fixed */}
            <button
                ref={collapseBtnRef}
                className="left-nav-collapse-btn"
                onClick={() => setNavCollapsed(c => !c)}
                aria-label={navCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
                {navCollapsed ? <FaChevronRight aria-hidden="true" /> : <FaChevronLeft aria-hidden="true" />}
            </button>
        </>
    );
};

export default LeftNav;
