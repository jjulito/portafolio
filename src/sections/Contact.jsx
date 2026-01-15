import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const Contact = () => {
    const { t } = useLanguage();
    const [state, handleSubmit] = useForm("xldkklap");

    if (state.succeeded) {
        return (
            <section id="contact" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--primary-color)' }}>
                        {t('contact.title')}
                    </h2>
                    <div className="glass" style={{ padding: '3rem', borderRadius: '20px', maxWidth: '600px', margin: '0 auto' }}>
                        <p style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>{t('contact.success')}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" style={{ padding: '4rem 0', textAlign: 'center' }}>
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--primary-color)' }}>
                    {t('contact.title')}
                </h2>

                <motion.div
                    className="glass"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        padding: '3rem',
                        borderRadius: '20px'
                    }}
                >
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-color)' }}>{t('contact.email')}</label>
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
                                    background: 'rgba(255,255,255,0.1)',
                                    color: 'var(--text-color)',
                                    fontSize: '1rem'
                                }}
                            />
                            <ValidationError prefix="Email" field="email" errors={state.errors} />
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-color)' }}>{t('contact.message')}</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows="5"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-color)',
                                    background: 'rgba(255,255,255,0.1)',
                                    color: 'var(--text-color)',
                                    fontSize: '1rem',
                                    resize: 'vertical'
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
                                color: 'white',
                                borderRadius: '50px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                marginTop: '1rem',
                                opacity: state.submitting ? 0.7 : 1
                            }}
                        >
                            {t('contact.send')}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
