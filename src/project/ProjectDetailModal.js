import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './ProjectDetailModal.css'; // Create this CSS file

const ProjectDetailModal = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  // Auto-play slideshow: change image every 2 seconds
  useEffect(() => {
    if (!project || !mounted || project.images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % project.images.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [currentImageIndex, project, mounted]);

  if (!project || !mounted) return null; // Don't render if no project or not mounted

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

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside from closing modal */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2>{project.title}</h2>
        </div>

        <div className="modal-body-fullscreen">
          <div className="modal-left-column">
            <div className="carousel-container">
              {project.images.length > 1 && ( // Only show buttons if multiple images
                <>
                  <button className="carousel-nav-btn prev" onClick={prevImage} aria-label="Previous image">
                    <ChevronLeft size={24} />
                  </button>
                  <button className="carousel-nav-btn next" onClick={nextImage} aria-label="Next image">
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              <img
                src={process.env.PUBLIC_URL + project.images[currentImageIndex]}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                className="carousel-image"
              />
            </div>
          </div>

          <div className="modal-right-column">
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
              {project.codeLinks ? (
                project.codeLinks.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="btn project-btn">{link.label}</a>
                ))
              ) : (
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="btn project-btn">Source Code</a>
              )}
              {project.demoLink && project.demoLink !== '#' && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn project-btn">Live Demo</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectDetailModal;