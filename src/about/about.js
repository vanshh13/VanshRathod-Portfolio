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
          I'm <b>Vansh</b>, a results-oriented <b>Full-Stack Developer</b> with a strong foundation in building scalable, responsive web applications using
          <b> React</b>, <b>Node.js</b>, <b>Spring Boot</b>, and <b>MongoDB</b>. I focus on writing clean, efficient, and maintainable code that transforms real-world business requirements into impactful digital solutions.
        </p>

        <p>
          I've successfully delivered diverse projects including e-commerce platforms, portfolio websites, and full-stack applications, showcasing both
          technical expertise and a user-focused mindset. I’m passionate about solving complex problems, staying current with industry trends, and
          contributing to teams that value innovation and quality.
        </p>
        <div className="about-buttons">
          <a href="#projects" className="btn">See My Projects</a>
          <a href="/Vansh_Rathod-Resume.pdf" download className="btn">
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;