import React, { useState, useEffect, useRef } from 'react';
import './about.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);
  const hasAnimated = useRef(false);

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
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      className={`about ${isVisible ? 'animate-in' : ''}`}
      ref={aboutRef}
    >
      <div className="about-content"> {/* This div will now have the main animation */}
        <p className="intro-text">Get to Know Me</p>
        <h2>About Me</h2>
        <p>
          I'm <b>Vansh Rathod</b>, a Computer Engineering graduate and <b>Software Developer</b> with hands-on experience building web applications and full-stack solutions. During my internship, I contributed to the development of a real-world ERP application, gaining practical experience in software development, API integration, database management, and collaborative development workflows.
        </p>

        <p>
          I enjoy turning ideas into functional software by working across both frontend and backend development. Through professional, academic, and personal projects, I have developed a strong understanding of modern web technologies and software engineering practices, with a focus on writing clean, maintainable, and efficient code.
        </p>

        <p>
          I'm passionate about problem-solving, continuous learning, and exploring emerging technologies, particularly in software development and Artificial Intelligence.
        </p>
        <div className="about-buttons">
          <a href="#projects" className="btn">See My Projects</a>
          <a
            href="https://drive.google.com/file/d/14S2X-MucaFTqoFEHI5fc7J94vqG2aN4L/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;