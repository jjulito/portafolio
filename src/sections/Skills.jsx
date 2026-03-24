import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    FaJs, FaReact, FaPython, FaHtml5, FaCss3Alt, FaJava, FaPhp,
    FaAngular, FaNodeJs, FaDatabase,
} from 'react-icons/fa';
import { SiTypescript, SiDjango, SiMysql, SiMongodb, SiPostgresql, SiExpress, SiGo, SiVite } from 'react-icons/si';
import ScrambleText from '../components/ScrambleText';
import CodeBackground from '../components/CodeBackground';

const Skills = () => {
    const { t } = useLanguage();

    const skills = [
        { name: 'JavaScript', icon: <FaJs color="#f7df1e" /> },
        { name: 'TypeScript', icon: <SiTypescript color="#3178c6" /> },
        { name: 'Python',     icon: <FaPython color="#3776ab" /> },
        { name: 'HTML',       icon: <FaHtml5 color="#e34f26" /> },
        { name: 'CSS',        icon: <FaCss3Alt color="#1572b6" /> },
        { name: 'React',      icon: <FaReact color="#61dafb" /> },
        { name: 'Angular',    icon: <FaAngular color="#dd0031" /> },
        { name: 'Node.js',    icon: <FaNodeJs color="#339933" /> },
        { name: 'Express.js', icon: <SiExpress color="var(--text-color)" /> },
        { name: 'Django',     icon: <SiDjango color="#176849ff" /> },
        { name: 'Java',       icon: <FaJava color="#007396" /> },
        { name: 'PHP',        icon: <FaPhp color="#777bb4" /> },
        { name: 'SQL',        icon: <FaDatabase color="var(--text-color)" /> },
        { name: 'MySQL',      icon: <SiMysql color="#4479a1" /> },
        { name: 'PostgreSQL', icon: <SiPostgresql color="#336791" /> },
        { name: 'MongoDB',    icon: <SiMongodb color="#47a248" /> },
        { name: 'Go',         icon: <SiGo color="#00add8" /> },
        { name: 'Vite',       icon: <SiVite color="#646cff" /> },
    ];

    const firstRow  = skills.slice(0, 9);
    const secondRow = skills.slice(9);
    const mobileFirstRow = skills.slice(0, 6);
    const mobileSecondRow = skills.slice(6, 12);
    const mobileThirdRow = skills.slice(12, 18);

    const cardStyle = {
        padding: '1.5rem 2.5rem',
        margin: '0 1rem',
        background: 'var(--card-bg)',
        borderRadius: '8px',
        border: 'var(--glass-border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        minWidth: '100px',
        boxShadow: 'var(--shadow)',
    };

    const renderRow = (items) =>
        [...items, ...items].map((skill, index) => (
            <div key={index} style={cardStyle}>
                <div style={{ fontSize: '3rem' }} aria-hidden="true">
                    {skill.icon}
                </div>
                <span style={{ fontWeight: 'bold', color: 'var(--text-color)', fontSize: '0.85rem' }}>
                    {skill.name}
                </span>
            </div>
        ));

    const mobileCardStyle = {
        padding: '0.95rem 0.7rem',
        background: 'var(--card-bg)',
        borderRadius: '8px',
        border: 'var(--glass-border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.45rem',
        minHeight: '92px',
        boxShadow: 'var(--shadow)',
    };

    const renderMobileRow = (items) =>
        [...items, ...items].map((skill, index) => (
            <div key={`${skill.name}-${index}`} style={mobileCardStyle}>
                <div style={{ fontSize: '1.9rem', lineHeight: 1 }} aria-hidden="true">
                    {skill.icon}
                </div>
                <span style={{ fontWeight: 700, color: 'var(--text-color)', fontSize: '0.72rem', textAlign: 'center' }}>
                    {skill.name}
                </span>
            </div>
        ));

    return (
        <section className="section-padding skills-section section-with-code-bg">
            <CodeBackground intensity="low" />

            <div className="section-content-layer">
                <div className="container">
                    <h2 className="section-title">
                        <ScrambleText text={t('skills.title')} duration={360} steps={10} />
                    </h2>
                </div>

                <div className="skills-carousel skills-desktop-carousel">
                    <div className="skills-row skills-row-left">
                        {renderRow(firstRow)}
                    </div>

                    <div className="skills-row skills-row-right">
                        {renderRow(secondRow)}
                    </div>
                </div>

                <div className="skills-mobile-carousel">
                    <div className="skills-mobile-row-wrap">
                        <div className="skills-mobile-row skills-mobile-row-left">{renderMobileRow(mobileFirstRow)}</div>
                    </div>
                    <div className="skills-mobile-row-wrap">
                        <div className="skills-mobile-row skills-mobile-row-right">{renderMobileRow(mobileSecondRow)}</div>
                    </div>
                    <div className="skills-mobile-row-wrap">
                        <div className="skills-mobile-row skills-mobile-row-left-slow">{renderMobileRow(mobileThirdRow)}</div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scroll-left {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes scroll-right {
                    0%   { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </section>
    );
};

export default Skills;
