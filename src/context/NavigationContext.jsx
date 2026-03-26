import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();
const VALID_SECTIONS = ['home', 'projects', 'skills', 'certifications', 'contact'];

const getInitialSection = () => {
    if (typeof window === 'undefined') {
        return 'home';
    }

    const hashSection = window.location.hash.replace('#', '').trim();
    return VALID_SECTIONS.includes(hashSection) ? hashSection : 'home';
};

export const NavigationProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState(getInitialSection);
    const [navCollapsed, setNavCollapsed] = useState(true);

    React.useEffect(() => {
        const currentHash = window.location.hash.replace('#', '').trim();

        if (currentHash !== activeSection) {
            window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${activeSection}`);
        }
    }, [activeSection]);

    React.useEffect(() => {
        const handleHashChange = () => {
            const hashSection = window.location.hash.replace('#', '').trim();

            if (VALID_SECTIONS.includes(hashSection) && hashSection !== activeSection) {
                setActiveSection(hashSection);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [activeSection]);

    return (
        <NavigationContext.Provider value={{ activeSection, setActiveSection, navCollapsed, setNavCollapsed }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => useContext(NavigationContext);
