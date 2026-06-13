import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./hobbies.css";

const allDrawings = [
  "/images/drawings/drawing1.jpg",
  "/images/drawings/drawing2.jpg",
  "/images/drawings/drawing3.jpg",
  "/images/drawings/drawing4.jpg",
  "/images/drawings/drawing5.jpg",
  "/images/drawings/drawing6.jpg",
  "/images/drawings/drawing7.jpg",
  "/images/drawings/20230414_195640.jpeg",
  "/images/drawings/20230414_195646.jpeg",
  "/images/drawings/20230414_195651.jpeg",
  "/images/drawings/20230414_195657.jpeg",
  "/images/drawings/20230414_195702.jpeg",
  "/images/drawings/20230414_195706.jpeg",
  "/images/drawings/20230414_195719.jpeg",
  "/images/drawings/20230414_195724.jpeg",
  "/images/drawings/20230414_195733.jpeg",
  "/images/drawings/20230414_195736.jpeg",
  "/images/drawings/20230414_195740.jpeg",
  "/images/drawings/20230414_195745.jpeg",
  "/images/drawings/20230414_195749.jpeg",
  "/images/drawings/20230414_195753.jpeg",
  "/images/drawings/20230414_195807.jpeg",
  "/images/drawings/20230414_195813.jpeg",
  "/images/drawings/20230414_195822.jpeg",
  "/images/drawings/20230414_195827.jpeg",
  "/images/drawings/20230414_195834.jpeg",
  "/images/drawings/20230430_230754.jpeg",
  "/images/drawings/20230510_072927.jpeg",
  "/images/drawings/20230510_072951.jpeg",
  "/images/drawings/20230510_073002..jpeg",
  "/images/drawings/20230902_071924.jpeg",
  "/images/drawings/20231114_200737.jpeg",
  "/images/drawings/20231213_210700.jpeg",
  "/images/drawings/20240827_001050.jpeg",
  "/images/drawings/20241130_120407.jpeg",
  "/images/drawings/20251223_225806.jpeg",
  "/images/drawings/20260309_230740.jpeg",
];

const Hobbies = () => {
  const hobbiesRef = useRef(null);
  const [randomPreviews, setRandomPreviews] = useState([]);

  useEffect(() => {
    // Pick 3 random unique drawings on component mount
    const shuffled = [...allDrawings].sort(() => Math.random() - 0.5);
    setRandomPreviews(shuffled.slice(0, 3));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          } else {
            entry.target.classList.remove("animate-in");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    const currentRef = hobbiesRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="creativeside" className="hobbies-section" ref={hobbiesRef}>
      <div className="hobbies-content-wrapper">
        <p className="intro-text">Beyond the Keyboard</p>
        <h2>My Creative Pursuits</h2>
        <p className="hobby-description">
          While coding is my passion, I also dive into the world of <b>sketching and anime-inspired art</b>.
          It's a fantastic way to unwind, ignite fresh ideas, and approach problem-solving from a different angle.
          This creative balance is key to my overall growth and well-being.
        </p>

        {/* Fanned card preview - whole group links to the gallery */}
        <NavLink to="/art-gallery" className="hobbies-preview-fan">
          <div className="fan-backlight"></div>
          {randomPreviews.map((imgSrc, idx) => (
            <div key={idx} className={`fan-card card-${idx + 1}`}>
              <img src={process.env.PUBLIC_URL + imgSrc} alt={`Preview ${idx + 1}`} />
            </div>
          ))}
          <span className="fan-overlay">View Full Gallery</span>
        </NavLink>
      </div>
    </section>
  );
};

export default Hobbies;