import React, { useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import ScrambleText from '../components/ScrambleText';
import CodeBackground from '../components/CodeBackground';

const Contact = () => {
    const { t } = useLanguage();
    const [state, handleSubmit] = useForm("xldkklap");
    const messageRef = useRef(null);

    const autoResizeTextarea = () => {
        const textarea = messageRef.current;
        if (!textarea) {
            return;
        }

        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 360)}px`;
    };

    if (state.succeeded) {
        return (
            <section id="contact" className="section-with-code-bg" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <CodeBackground intensity="low" />
                <div className="section-content-layer">
                    <div className="container">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--primary-color)' }}>
                            <ScrambleText text={t('contact.title')} duration={360} steps={10} />
                        </h2>
                        <div className="glass" style={{ padding: '3rem', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
                            <p style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>
                                <ScrambleText text={t('contact.success')} duration={360} steps={10} />
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="section-padding section-with-code-bg" style={{ textAlign: 'center' }}>
            <CodeBackground intensity="low" />
            <div className="section-content-layer">
                <div className="container">
                    <h2 className="section-title">
                        <ScrambleText text={t('contact.title')} duration={360} steps={10} />
                    </h2>

                    <motion.div
                        className="glass glass-panel"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            width: '100%',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}
                    >
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ textAlign: 'left' }}>
                                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-color)' }}>
                                    <ScrambleText text={t('contact.email')} duration={300} steps={8} />
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-color)',
                                        color: 'var(--text-color)',
                                        fontSize: '1rem',
                                        boxSizing: 'border-box'
                                    }}
                                />
                                <ValidationError prefix="Email" field="email" errors={state.errors} />
                            </div>

                            <div style={{ textAlign: 'left' }}>
                                <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-color)' }}>
                                    <ScrambleText text={t('contact.message')} duration={300} steps={8} />
                                </label>
                                <textarea
                                    ref={messageRef}
                                    id="message"
                                    name="message"
                                    required
                                    rows="4"
                                    onInput={autoResizeTextarea}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-color)',
                                        color: 'var(--text-color)',
                                        fontSize: '1rem',
                                        resize: 'none',
                                        minHeight: '120px',
                                        overflow: 'hidden',
                                        boxSizing: 'border-box'
                                    }}
                                />
                                <ValidationError prefix="Message" field="message" errors={state.errors} />
                            </div>

                            <button
                                type="submit"
                                disabled={state.submitting}
                                style={{
                                    padding: '1rem 2rem',
                                    background: 'var(--primary-color)',
                                    color: 'var(--bg-color)',
                                    borderRadius: '4px',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    marginTop: '1rem',
                                    opacity: state.submitting ? 0.7 : 1
                                }}
                            >
                                <ScrambleText text={t('contact.send')} duration={300} steps={8} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
