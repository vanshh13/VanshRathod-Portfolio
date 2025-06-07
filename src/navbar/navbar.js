import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import './navbar.css';

const Navbar = ({ basename }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // This function now handles both navigation and subsequent scrolling
  const handleNavLinkClick = (targetPath, sectionId) => {
    setIsMobileMenuOpen(false); // Close mobile menu

    // Navigate to the target path (e.g., "/VanshRathod-Portfolio/" or "/VanshRathod-Portfolio/art-gallery")
    // and include the sectionId as a hash.
    // This ensures we always land on the correct base route first.
    navigate(`${targetPath}${sectionId}`);

    // Set active section immediately for UI feedback (will be refined by scroll spy)
    setActiveSection(sectionId);
  };

  // Effect to handle scrolling AFTER navigation is complete
  useEffect(() => {
    // This effect runs whenever location.pathname or location.hash changes
    if (location.hash) {
      const targetElement = document.querySelector(location.hash);
      if (targetElement) {
        // Use a slight delay to ensure the page has rendered after navigation
        // before attempting to scroll, especially when navigating between different routes.
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay (e.g., 100ms)
      }
    }
    // Also handle scroll spy for active section highlighting
    const handleScroll = () => {
      // Only run scroll spy if we are on the main portfolio route
      if (location.pathname === basename || location.pathname === `${basename}/`) {
        const sections = ['#home', '#about', '#projects', '#hobbies', '#contact'];
        let currentActive = '#home';

        for (let i = sections.length - 1; i >= 0; i--) {
          const id = sections[i];
          const section = document.querySelector(id);
          if (section) {
            const rect = section.getBoundingClientRect();
            // Adjust the 100px threshold if needed for better UX
            if (rect.top <= 100 && rect.bottom >= 100) {
              currentActive = id;
              break;
            }
          }
        }
        setActiveSection(currentActive);
      } else {
        // If not on the main page, no section should be "active" for scroll spy purposes
        setActiveSection('');
      }

      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount/location change to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, location.hash, basename]); // Dependencies for useEffect

  return (
    <div className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        {/* Logo - links to home section of the main page */}
        <Link to="/" className="logo" onClick={() => handleNavLinkClick('/', '#home')}>
          Vansh
        </Link>
        {/* Navigation Links (Desktop & Mobile Toggle) */}
        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          {/* Main portfolio sections */}
          {['#home', '#about', '#projects', '#contact'].map((sectionId) => (
            <Link
              key={sectionId}
              // Link to the base path with the specific section hash
              to={`${sectionId}`} // Link to "/#home" etc. relative to basename
              onClick={(e) => {
                e.preventDefault(); // Prevent default Link behavior to handle with navigate
                handleNavLinkClick('/', sectionId); // Navigate to base path + hash
              }}
              className={activeSection === sectionId ? 'active' : ''}
            >
              {/* This extracts the name from #home, #about etc. */}
              {sectionId.substring(1).charAt(0).toUpperCase() + sectionId.substring(1).slice(1)}
            </Link>
          ))}
          {/* REMOVED: Art Gallery Link (as per your previous request) */}
        </div>
        {/* Hire Me Button */}
        <a href={`${basename}/Vansh_Rathod-Resume.pdf`} download className="hire-me-btn">
          Hire Me
        </a>
        {/* Mobile Menu Icon */}
        <div
          className={`menu-icon ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
        >
          ☰
        </div>
      </nav>
    </div>
  );
};

export default Navbar;