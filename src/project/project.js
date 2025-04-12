import React from 'react';
import './project.css';

const Projects = () => {
  const projectData = [
    {
      title: 'GreenCart',
      description: 'An online platform for selling organic products with real-time order tracking and secure payments.',
      techStack: 'React, Node.js, MongoDB',
      demoLink: '#',
      codeLink: 'https://github.com/vanshh13/GreenCart',
      image: './images/projects/GreenCart.png'
    },
    {
      title: 'Doctor Appointment System',
      description: 'A web app for managing and sharing cooking recipes with features like favorites and categories.',
      techStack: 'React, Express.js, MongoDB',
      demoLink: '#',
      codeLink: 'https://github.com/vanshh13/Doctor_Appointment_System',
      image: './images/projects/Doctor_Appointment_System.png'
    },
    {
      title: 'Doctor Appointment System | RestAPI',
      description: 'This system allows patients to book and manage doctor appointments online.',
      techStack: 'Java',
      demoLink: '#',
      codeLink: 'https://github.com/vanshh13/AppointmentSystem',
      image: './images/projects/Doctor_Appointment_System_RestAPI.png'
    }
    ,    
    {
      title: 'OnlineBookShop',
      description: ' It includes all the functionalities of an intuitive and user-friendly online bookstore, providing customers with a seamless browsing experience, personalized recommendations, and a secure e-commerce platform for purchasing both physical.',
      techStack: 'Python, Django, MySQL',
      demoLink: '#',
      codeLink: 'https://github.com/vanshh13/Online-BookShop/tree/devlop-branch',
      image: './images/projects/Online_BookShop.png'
    }
  ];

  return (
    <section id="projects" className="projects">
      <h2>My Projects</h2>
      <div className="project-container">
        {projectData.map((project, index) => (
          <div className="project-card" key={index}>
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Tech Stack:</strong> {project.techStack}</p>
            <div className="project-links">
             {/* <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn">Live Demo</a> */}
              <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="btn">Source Code</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
