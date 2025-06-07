import React, { useState, useEffect, useRef } from 'react';
import './project.css';
import ProjectDetailModal from './ProjectDetailModal'; // Import the new modal component

const Projects = () => {
  const allProjectData = [ // Renamed to allProjectData to clarify it's the full list
    {
      title: 'GreenCart',
      description: 'An online platform for selling organic products with real-time order tracking and secure payments. Features product Browse, shopping cart, and authenticated user experience.',
      fullDescription: 'GreenCart is a comprehensive e-commerce solution built for organic produce. It provides features like user authentication, shopping cart management, real-time order tracking, and secure payment gateway integration. The intuitive admin panel allows for easy product, order, and user management.', // Added full description
      techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Stripe API'], // Array for easier mapping to tags
      demoLink: 'https://greencart.netlify.app/', // Example live demo link
      codeLink: 'https://github.com/vanshh13/GreenCart',
      images: ['./images/projects/GreenCart/GreenCart.png', './images/projects/GreenCart/ProductList.png', './images/projects/GreenCart/ShoppingCart_step1.png','./images/projects/GreenCart/AdminDashboard.png','./images/projects/GreenCart/OrderManagment.png'] // Array of images
    },
    {
      title: 'Doctor Appointment System',
      description: 'A web application for patients to book and manage appointments with doctors. Includes features for doctor profiles, availability, and scheduling.',
      fullDescription: 'This system streamlines the process of booking and managing doctor appointments online. It features a patient portal for scheduling, viewing history, and receiving reminders, alongside a doctor dashboard for managing availability, confirming appointments, and viewing patient details.',
      techStack: ['React', 'Express.js', 'MongoDB', 'Socket.IO'],
      demoLink: '#',
      codeLink: 'https://github.com/vanshh13/Doctor_Appointment_System',
      images: ['./images/projects/Doctor_Appointment_System/AdminDB.png', './images/projects/Doctor_Appointment_System/PatientDB.png','./images/projects/Doctor_Appointment_System/DoctorDB.png','./images/projects/Doctor_Appointment_System/ReceptionistDB.png','./images/projects/Doctor_Appointment_System/HosptilList.png']
    },
    {
      title: 'Cakes-Pies-Delight',
      description: 'An online shop built using ASP.NET Core where users can browse, order, and enjoy a variety of cakes and pies.',
      fullDescription: 'Cakes-Pies-Delight is a robust e-commerce application demonstrating a full shopping experience built with ASP.NET Core. It includes user authentication, product catalog Browse, a shopping cart with quantity management, and a secure checkout process. Admin functionalities for product and order management are also integrated.',
      techStack: ['ASP.NET Core', 'C#', 'Entity Framework Core', 'SQL Server', 'Razor Pages'],
      demoLink: '#',
      codeLink: 'https://github.com/vanshh13/Cakes-Pies-Delight',
      images: ['./images/projects/Cakes-Pies-Delight/Cakes-pie-delights.png', './images/projects/Cakes-Pies-Delight/product-page.png','./images/projects/Cakes-Pies-Delight/shopping-cart.png']
    },
    {
      title: 'Online BookShop',
      description: 'An intuitive and user-friendly online bookstore providing customers with a seamless Browse experience and personalized recommendations.',
      fullDescription: 'This comprehensive online bookstore offers a seamless user experience for Browse, searching, and purchasing books. Key features include user profiles, personalized recommendations based on Browse history, a robust search engine, shopping cart, and order processing. The backend is powered by Django for efficient data management.',
      techStack: ['Python', 'Django', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      demoLink: '#',
      codeLink: 'https://github.com/vanshh13/Online-BookShop/tree/devlop-branch',
      images: ['./images/projects/Online_BookShop/Online_BookShop.png', './images/projects/Online_BookShop/Book_Catalog.png','./images/projects/Online_BookShop/Shopping_Cart.png','./images/projects/Online_BookShop/Profile.png','./images/projects/Online_BookShop/Admin_DB.png','./images/projects/Online_BookShop/Manage_Book.png']
    },
    {
      title: 'Doctor Appointment System | RestAPI',
      description: 'The backend RESTful API for the Doctor Appointment System, handling data management, authentication, and business logic for appointments.',
      fullDescription: 'This is the robust backend service for the Doctor Appointment System, built with Java Spring Boot. It provides a RESTful API for all client-side interactions, including user authentication (JWT), managing doctor and patient profiles, appointment scheduling, and data persistence with MySQL. Designed for high performance and scalability.',
      techStack: ['Java', 'Spring Boot', 'MySQL', 'REST API', 'JWT', 'Maven'],
      demoLink: '#',
      codeLink: 'https://github.com/vanshh13/AppointmentSystem',
      images: ['./images/projects/Doctor_Appointment_System_RestAPI.png']
    },
    {
      title: 'Agentic-AI-Hiring-Assistant',
      description: 'An intelligent platform streamlining the hiring process with AI-driven candidate screening and management.',
      fullDescription: 'This comprehensive web application revolutionizes recruitment by leveraging an Agentic AI system to analyze job applications and provide insightful matching scores. The **Python** backend orchestrates the AI scripts, while **Node.js** handles robust API services. The frontend, built with **React.js** and **Vite**, delivers a fast and interactive user experience, styled meticulously with **Tailwind CSS**. It empowers HR professionals to efficiently manage job postings, track applications, and identify top talent through intelligent automation.',
      techStack: ['Python', 'Node.js', 'React.js', 'Vite', 'Tailwind CSS', 'MongoDB', 'AI/ML (for agentic capabilities)'], // Added database and AI/ML explicitly
      demoLink: '#',
      codeLink: 'https://github.com/vanshh13/Agentic-AI-Hiring-Assistant',
      images: ['./images/projects/Agentic-AI-Hiring-Assistant/Agentic-AI-Hiring-Assistant.png','./images/projects/Agentic-AI-Hiring-Assistant/cadiadate_DB.png','./images/projects/Agentic-AI-Hiring-Assistant/Hr_DB.png','./images/projects/Agentic-AI-Hiring-Assistant/All_job_application.png','./images/projects/Agentic-AI-Hiring-Assistant/browse_job.png'] 
    },
  ];

  // Animation logic
  const [isVisible, setIsVisible] = useState(false);
  const projectsRef = useRef(null);
  const hasAnimated = useRef(false);

  // Project visibility logic
  const INITIAL_PROJECT_COUNT = 6;
  const [displayedProjects, setDisplayedProjects] = useState(INITIAL_PROJECT_COUNT);
  const showAll = displayedProjects === allProjectData.length;

  const toggleProjectsVisibility = () => {
    if (showAll) {
      setDisplayedProjects(INITIAL_PROJECT_COUNT);
    } else {
      setDisplayedProjects(allProjectData.length);
    }
  };

  // Modal logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = ''; // Re-enable scrolling
  };

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
            // Optionally, reset visible projects to initial count when section leaves view
            // setDisplayedProjects(INITIAL_PROJECT_COUNT);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  return (
    <section
      id="projects"
      className={`projects ${isVisible ? 'animate-in' : ''}`}
      ref={projectsRef}
    >
      <div className="projects-content-wrapper">
        <p className="intro-text">My Recent Work</p>
        <h2>Projects</h2>
        <div className="project-grid">
          {allProjectData.slice(0, displayedProjects).map((project, index) => (
            <div className="project-card" key={index}>
              <div
                className="project-image-container"
                onClick={() => openModal(project)} // Open modal on image click
              >
                <img
                  src={project.images[0]} // Always display the first image in the grid view
                  alt={project.title}
                  className="project-main-image"
                />
                <div className="project-hover-overlay">
                  <span className="overlay-text">View Details</span>
                </div>
              </div>

              <h3>{project.title}</h3>
              <p className="description">{project.description}</p>
              <div className="tech-stack-container">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.demoLink && project.demoLink !== '#' && (
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn project-btn">Live Demo</a>
                )}
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="btn project-btn">Source Code</a>
              </div>
            </div>
          ))}
        </div>

        {allProjectData.length > INITIAL_PROJECT_COUNT && ( // Only show button if there are more projects than initial count
          <button onClick={toggleProjectsVisibility} className="btn view-toggle-btn">
            {showAll ? 'See Less Projects' : 'See More Projects'}
          </button>
        )}
      </div>

      {isModalOpen && (
        <ProjectDetailModal project={selectedProject} onClose={closeModal} />
      )}
    </section>
  );
};

export default Projects;