import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    FaJs, FaReact, FaPython, FaHtml5, FaCss3Alt, FaJava, FaPhp,
    FaAngular, FaNodeJs, FaDatabase,
} from 'react-icons/fa';
import { SiTypescript, SiDjango, SiMysql, SiMongodb, SiPostgresql, SiExpress, SiPhp, SiGo, SiVite } from 'react-icons/si';

const Skills = () => {
    const { t } = useLanguage();

    const skills = [
        { name: 'JavaScript', icon: <FaJs color="#f7df1e" /> },
        { name: 'TypeScript', icon: <SiTypescript color="#3178c6" /> },
        { name: 'Python', icon: <FaPython color="#3776ab" /> },
        { name: 'HTML', icon: <FaHtml5 color="#e34f26" /> },
        { name: 'CSS', icon: <FaCss3Alt color="#1572b6" /> },
        { name: 'React', icon: <FaReact color="#61dafb" /> },
        { name: 'Angular', icon: <FaAngular color="#dd0031" /> },
        { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
        { name: 'Express.js', icon: <SiExpress color="var(--text-color)" /> },
        { name: 'Django', icon: <SiDjango color="#176849ff" /> },
        { name: 'Java', icon: <FaJava color="#007396" /> },
        { name: 'PHP', icon: <FaPhp color="#777bb4" /> },
        { name: 'SQL', icon: <FaDatabase color="var(--text-color)" /> },
        { name: 'MySQL', icon: <SiMysql color="#4479a1" /> },
        { name: 'PostgreSQL', icon: <SiPostgresql color="#336791" /> },
        { name: 'MongoDB', icon: <SiMongodb color="#47a248" /> },
        { name: 'PHP', icon: <SiPhp color="#007396" /> },
        { name: 'Go', icon: <SiGo color="#007396" /> },
        { name: 'Vite', icon: <SiVite color="#007396" /> },
    ];

    return (
        <section style={{ padding: '4rem 0', overflow: 'hidden' }}>
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', color: 'var(--primary-color)' }}>
                    {t('skills.title')}
                </h2>
            </div>

            <div style={{
                display: 'flex',
                width: 'max-content',
                animation: 'scroll 40s linear infinite'
            }}>
                {[...skills, ...skills].map((skill, index) => (
                    <div key={index} style={{
                        padding: '1.5rem 2.5rem',
                        margin: '0 1.5rem',
                        background: 'var(--card-bg)',
                        borderRadius: '15px',
                        border: 'var(--glass-border)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        minWidth: '100px',
                        boxShadow: 'var(--shadow)'
                    }}>
                        <div style={{ fontSize: '3rem' }}>
                            {skill.icon}
                        </div>
                        <span style={{ fontWeight: 'bold', color: 'var(--text-color)' }}>
                            {skill.name}
                        </span>
                    </div>
                ))}
            </div>

            <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </section>
    );
};

export default Skills;
