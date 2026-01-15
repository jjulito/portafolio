import React from 'react';
import { FaLinkedin, FaWhatsapp, FaGithub } from 'react-icons/fa';

const Footer = () => {
    const socialLinks = [
        { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/octavio-mosqueda-757395278/', label: 'LinkedIn' },
        { icon: <FaGithub />, href: 'https://github.com/jjulito', label: 'GitHub' },
        { icon: <FaWhatsapp />, href: 'https://wa.me/542915780286', label: 'WhatsApp' },
    ];

    return (
        <footer className="glass" style={{ padding: '2rem 0', marginTop: '4rem', textAlign: 'center' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '2rem', color: 'var(--text-color)', transition: 'color 0.3s' }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-color)'}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                <p style={{ marginTop: '2rem', color: 'var(--secondary-color)', fontSize: '0.9rem' }}>
                    © {new Date().getFullYear()} Julito💻. All rights reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
