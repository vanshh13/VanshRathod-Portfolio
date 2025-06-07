import React, { useState, useEffect, useRef } from 'react';
import './home.css'; // Keep importing CSS here

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State for visibility
  const homeRef = useRef(null); // Ref to observe the home section
  const hasAnimated = useRef(false); // New ref to track if it has animated at least once

  const texts = ['Full-Stack Developer', 'Tech Enthusiast', 'Problem Solver'];

  useEffect(() => {
    const currentText = texts[currentIndex];
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBeforeDelete = 2000;
    const pauseBeforeNext = 800;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          setTimeout(() => {}, pauseBeforeNext);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts]);

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            hasAnimated.current = true;
          } else if (hasAnimated.current) {
            setIsVisible(false);
          }
        });
      },
      {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    if (homeRef.current) {
      observer.observe(homeRef.current);
    }

    return () => {
      if (homeRef.current) {
        observer.unobserve(homeRef.current);
      }
    };
  }, []); // Run once on component mount

  return (
    <section id="home" className={`home ${isVisible ? 'animate-in' : ''}`} ref={homeRef}>
      {/* Particle Background - Remains static and always visible */}
      <div className="particle-background">
        {Array.from({ length: 50 }).map((_, i) => (
          <span key={i} className="particle"></span>
        ))}
      </div>

      <div className="home-content-wrapper"> {/* THIS DIV WILL NOW HAVE THE MAIN ANIMATION */}
        <div className="home-content">
          <p className="intro-text">Hello, I'm</p>
          <h1>Vansh Rathod</h1>
          <h2>
            <span className="typing-text">
              {displayText}
              <span className="cursor">|</span>
            </span>
          </h2>
          <p className="description-text">
            I'm a final-year Computer Engineering student and a passionate <b>Full-Stack Developer</b>. I build both web and mobile applications, constantly exploring new tools and technologies to refine my craft. My drive is to solve real-world problems through practical, scalable, and impactful solutions.
          </p>
          <a href="#projects" className="btn">View My Work</a>
        </div>

        <div className="home-image">
          <img
            className="w-60 h-60 rounded-full object-cover shadow-lg"
            src="/images/self_picture.jpg"
            alt="Profile"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://img.freepik.com/premium-photo/profile-icon-white-background_941097-162260.jpg?w=2000";
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;