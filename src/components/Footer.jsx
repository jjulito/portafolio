import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer" aria-label="Site footer">
            <div className="container">
                <div className="site-footer-separator" aria-hidden="true" />
                <p className="site-footer-text">© {currentYear} {t('nav.rights')}</p>
            </div>
        </footer>
    );
};

export default Footer;
