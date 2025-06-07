import React, { useState, useEffect } from 'react';
import './ProjectDetailModal.css'; // Create this CSS file

const ProjectDetailModal = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  if (!project) return null; // Don't render if no project is passed

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % project.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + project.images.length) % project.images.length
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside from closing modal */}
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="modal-header">
          <h2>{project.title}</h2>
        </div>

        <div className="modal-body">
          <div className="carousel-container">
            {project.images.length > 1 && ( // Only show buttons if multiple images
              <>
                <button className="carousel-nav-btn prev" onClick={prevImage}>
                  &#10094; {/* Left arrow */}
                </button>
                <button className="carousel-nav-btn next" onClick={nextImage}>
                  &#10095; {/* Right arrow */}
                </button>
              </>
            )}
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
              className="carousel-image"
            />
          </div>

          <p className="modal-full-description">{project.fullDescription || project.description}</p> {/* Use fullDescription if available */}

          <div className="modal-tech-stack">
            <h3>Technologies Used:</h3>
            <div className="tech-stack-container">
              {project.techStack.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="modal-links">
            {project.demoLink && project.demoLink !== '#' && (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn project-btn">Live Demo</a>
            )}
            <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="btn project-btn">Source Code</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;