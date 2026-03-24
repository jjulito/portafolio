import React, { createContext, useContext, useEffect, useState } from 'react';

const NavigationContext = createContext();
const VALID_SECTIONS = ['home', 'projects', 'skills', 'certifications', 'contact'];

const getInitialSection = () => {
    if (typeof window === 'undefined') {
        return 'home';
    }

    const savedSection = window.localStorage.getItem('activeSection');
    return VALID_SECTIONS.includes(savedSection) ? savedSection : 'home';
};

export const NavigationProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState(getInitialSection);
    const [navCollapsed, setNavCollapsed] = useState(true);

    useEffect(() => {
        window.localStorage.setItem('activeSection', activeSection);
    }, [activeSection]);

    return (
        <NavigationContext.Provider value={{ activeSection, setActiveSection, navCollapsed, setNavCollapsed }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => useContext(NavigationContext);
