import React, { useState, useEffect } from 'react';
import './navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = (section) => {
    setIsMobileMenuOpen(false);
    setActiveSection(section);
  };

  // // Highlight active section on scroll
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sections = ['#home', '#about', '#projects', '#hobbies', '#contact'];
  //     sections.forEach((id) => {
  //       const section = document.querySelector(id);
  //       if (section) {
  //         const rect = section.getBoundingClientRect();
  //         if (rect.top <= 100 && rect.bottom >= 100) {
  //           setActiveSection(id);
  //         }
  //       }
  //     });
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['#home', '#about', '#projects', '#hobbies', '#contact'];
  
      sections.forEach((id, index) => {
        const section = document.querySelector(id);
        if (section) {
          const rect = section.getBoundingClientRect();
  
          // For all sections except the last one
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
          }
  
          // Special case for the last section (Contact)
          if (
            index === sections.length - 1 && // Check if it's the last section
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 50
          ) {
            setActiveSection(id);
          }
        }
      });
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
    
  return (
    <nav className="navbar">
      <div className="logo">Vansh</div>

      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-menu' : ''}`}>
        <a
          href="#home"
          onClick={() => closeMobileMenu('#home')}
          className={activeSection === '#home' ? 'active' : ''}
        >
          Home
        </a>
        <a
          href="#about"
          onClick={() => closeMobileMenu('#about')}
          className={activeSection === '#about' ? 'active' : ''}
        >
          About
        </a>
        <a
          href="#projects"
          onClick={() => closeMobileMenu('#projects')}
          className={activeSection === '#projects' ? 'active' : ''}
        >
          Projects
        </a>
        <a
          href="#hobbies"
          onClick={() => closeMobileMenu('#hobbies')}
          className={activeSection === '#hobbies' ? 'active' : ''}
        >
          Hobbies
        </a>
        <a
          href="#contact"
          onClick={() => closeMobileMenu('#contact')}
          className={activeSection === '#contact' ? 'active' : ''}
        >
          Contact
        </a>
      </div>

      <div
        className={`menu-icon ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={toggleMobileMenu}
      >
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
