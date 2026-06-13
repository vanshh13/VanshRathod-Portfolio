import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from 'lucide-react';
import "./ArtGallery.css";

// Removed 'alt' and 'description' properties
const drawings = [
  { id: 1, imgSrc: "/images/drawings/webp/drawing1.webp" },
  { id: 2, imgSrc: "/images/drawings/webp/drawing2.webp" },
  { id: 3, imgSrc: "/images/drawings/webp/drawing3.webp" },
  { id: 4, imgSrc: "/images/drawings/webp/drawing4.webp" },
  { id: 5, imgSrc: "/images/drawings/webp/drawing5.webp" },
  { id: 6, imgSrc: "/images/drawings/webp/drawing6.webp" },
  { id: 7, imgSrc: "/images/drawings/webp/drawing7.webp" },
  { id: 8, imgSrc: "/images/drawings/webp/20230414_195640.webp" },
  { id: 9, imgSrc: "/images/drawings/webp/20230414_195646.webp" },
  { id: 10, imgSrc: "/images/drawings/webp/20230414_195651.webp" },
  { id: 11, imgSrc: "/images/drawings/webp/20230414_195657.webp" },
  { id: 12, imgSrc: "/images/drawings/webp/20230414_195702.webp" },
  { id: 13, imgSrc: "/images/drawings/webp/20230414_195706.webp" },
  { id: 14, imgSrc: "/images/drawings/webp/20230414_195719.webp" },
  { id: 15, imgSrc: "/images/drawings/webp/20230414_195724.webp" },
  { id: 16, imgSrc: "/images/drawings/webp/20230414_195733.webp" },
  { id: 17, imgSrc: "/images/drawings/webp/20230414_195736.webp" },
  { id: 18, imgSrc: "/images/drawings/webp/20230414_195740.webp" },
  { id: 19, imgSrc: "/images/drawings/webp/20230414_195745.webp" },
  { id: 20, imgSrc: "/images/drawings/webp/20230414_195749.webp" },
  { id: 21, imgSrc: "/images/drawings/webp/20230414_195753.webp" },
  { id: 22, imgSrc: "/images/drawings/webp/20230414_195807.webp" },
  { id: 23, imgSrc: "/images/drawings/webp/20230414_195813.webp" },
  { id: 24, imgSrc: "/images/drawings/webp/20230414_195822.webp" },
  { id: 25, imgSrc: "/images/drawings/webp/20230414_195827.webp" },
  { id: 26, imgSrc: "/images/drawings/webp/20230414_195834.webp" },
  { id: 27, imgSrc: "/images/drawings/webp/20230430_230754.webp" },
  { id: 28, imgSrc: "/images/drawings/webp/20230510_072927.webp" },
  { id: 29, imgSrc: "/images/drawings/webp/20230510_072951.webp" },
  { id: 30, imgSrc: "/images/drawings/webp/20230510_073002.webp" },
  { id: 31, imgSrc: "/images/drawings/webp/20230902_071924.webp" },
  { id: 32, imgSrc: "/images/drawings/webp/20231114_200737.webp" },
  { id: 33, imgSrc: "/images/drawings/webp/20231213_210700.webp" },
  { id: 34, imgSrc: "/images/drawings/webp/20240827_001050.webp" },
  { id: 35, imgSrc: "/images/drawings/webp/20241130_120407.webp" },
  { id: 36, imgSrc: "/images/drawings/webp/20251223_225806.webp" },
  { id: 37, imgSrc: "/images/drawings/webp/20260309_230740.webp" },
];

const ArtGallery = () => {
  const [shuffledDrawings, setShuffledDrawings] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const gallerySectionRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    // Shuffle images randomly
    const shuffled = [...drawings].sort(() => Math.random() - 0.5);
    setShuffledDrawings(shuffled);

    return () => {
      setMounted(false);
    };
  }, []);

  // Infinite Scroll Observer
  useEffect(() => {
    if (shuffledDrawings.length === 0 || visibleCount >= shuffledDrawings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 12, shuffledDrawings.length));
        }
      },
      {
        rootMargin: "250px", // Trigger early for a seamless infinite scroll experience
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [shuffledDrawings, visibleCount]);

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
            Scroll down to explore the collection.
          </p>
        </div>

        <div className="gallery-grid">
          {shuffledDrawings.slice(0, visibleCount).map((drawing, idx) => (
            <div
              key={drawing.id}
              className="gallery-item"
              onClick={() => handleImageClick(drawing.imgSrc)}
              style={{ animationDelay: `${(idx % 12) * 0.06}s` }}
            >
              <img
                src={process.env.PUBLIC_URL + drawing.imgSrc}
                className="gallery-img"
                loading="lazy"
                alt="Artwork drawing"
              />
            </div>
          ))}
        </div>

        {/* Infinite Scroll Sentinel element */}
        {visibleCount < shuffledDrawings.length && (
          <div ref={sentinelRef} className="infinite-scroll-sentinel">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>

      {selectedImage && mounted && createPortal(
        <div className="lightbox" onClick={handleCloseLightbox}>
          <button className="lightbox-close-btn" onClick={handleCloseLightbox} aria-label="Close image">
            <X size={36} />
          </button>
          <img
            src={process.env.PUBLIC_URL + selectedImage}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
            alt="Artwork drawing zoomed"
          />
        </div>,
        document.body
      )}
    </section>
  );
};

export default ArtGallery;