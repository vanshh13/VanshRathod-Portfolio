import React, { useState, useRef, useEffect } from "react";
import { X } from 'lucide-react'; // Import X icon for the lightbox close
import "./ArtGallery.css";

const ArtGallery = () => {
  const [shuffledDrawings, setShuffledDrawings] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const gallerySectionRef = useRef(null); // Ref for the section for animation

  // Removed 'alt' and 'description' properties
  const drawings = [
    { id: 1, imgSrc: "./images/drawings/drawing1.jpg" },
    { id: 2, imgSrc: "./images/drawings/drawing2.jpg" },
    { id: 3, imgSrc: "./images/drawings/drawing3.jpg" },
    { id: 4, imgSrc: "./images/drawings/drawing4.jpg" },
    { id: 5, imgSrc: "./images/drawings/drawing5.jpg" },
    { id: 6, imgSrc: "./images/drawings/drawing6.jpg" },
    { id: 7, imgSrc: "./images/drawings/drawing7.jpg" },
    { id: 8, imgSrc: "./images/drawings/drawing8.jpg" },
    { id: 9, imgSrc: "./images/drawings/drawing9.jpg" },
    { id: 10, imgSrc: "./images/drawings/drawing10.jpg" },
  ];

  useEffect(() => {
    // Shuffle images randomly
    const shuffled = [...drawings].sort(() => Math.random() - 0.5);
    setShuffledDrawings(shuffled);

    // Intersection Observer for section animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            entry.target.classList.remove('animate-in');
          }
        });
      },
      {
        threshold: 0.2, // Trigger animation when 20% of the section is visible
      }
    );

    if (gallerySectionRef.current) {
      observer.observe(gallerySectionRef.current);
    }

    return () => {
      if (gallerySectionRef.current) {
        observer.unobserve(gallerySectionRef.current);
      }
    };
  }, []);

  const handleImageClick = (imgSrc) => {
    setSelectedImage(imgSrc);
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
    // Restore scrolling when lightbox is closed
    document.body.style.overflow = 'auto';
  };


  return (
    <section id="art-gallery" className="art-gallery-section" ref={gallerySectionRef}>
      <div className="container">
        <div className="gallery-header">
          <p className="intro-text">My Creative Side</p>
          <h2>My Drawing Skills</h2>
          <p className="gallery-description">
            Here's a collection of my drawings, showcasing my passion for art and creativity.
            Click on any image to view it in full detail.
          </p>
        </div>

        <div className="gallery-grid">
          {shuffledDrawings.map((drawing) => (
            <div
              key={drawing.id}
              className="gallery-item"
              onClick={() => handleImageClick(drawing.imgSrc)}
            >
              {/* Removed alt attribute here as it's no longer in the data */}
              <img src={drawing.imgSrc} className="gallery-img" />
              {/* Removed overlay as description is no longer available */}
              {/* <div className="overlay">
                <span className="overlay-text">{drawing.description || drawing.alt}</span>
              </div> */}
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={handleCloseLightbox}>
          <button className="lightbox-close-btn" onClick={handleCloseLightbox} aria-label="Close image">
            <X size={36} />
          </button>
          {/* Removed alt attribute here */}
          <img src={selectedImage} className="lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
};

export default ArtGallery;