import React from 'react';
import './about.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-content">
        <h2>About Me</h2>
        <p>
          I'm <strong>Vansh</strong>, a passionate Full-Stack Developer with experience in building dynamic and responsive web applications.  
          I specialize in technologies like <strong>React</strong>, <strong>Node.js</strong>, and <strong>MongoDB</strong>.  
          I enjoy solving complex problems and continuously learning new technologies to improve my skills.
        </p>

        <p>
          I’ve worked on various projects, including e-commerce platforms, portfolio websites, and full-stack applications.  
          Currently, I'm exploring <strong>Angular</strong> and diving deeper into <strong>Spring Boot</strong> for backend development.
        </p>

        <a href="#projects" className="btn">See My Projects</a>
      </div>

      <div className="about-image">
        <img src="/images/self_picture.jpg" alt="Vansh Profile" />
      </div>
    </section>
  );
};

export default About;
