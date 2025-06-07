import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./hobbies.css";

const Hobbies = () => {
  const hobbiesRef = useRef(null); // Create a ref to attach to the section

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add 'animate-in' class when the section enters the viewport
            entry.target.classList.add("animate-in");
          } else {
            // Remove 'animate-in' class when the section leaves the viewport
            // This resets the element to its initial hidden state,
            // allowing the animation to replay when it re-enters.
            entry.target.classList.remove("animate-in");
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    if (hobbiesRef.current) {
      observer.observe(hobbiesRef.current);
    }

    // Cleanup function: disconnect the observer when the component unmounts
    return () => {
      if (hobbiesRef.current) {
        observer.unobserve(hobbiesRef.current);
      }
    };
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    // Attach the ref to your section
    <section id="creativeside" className="hobbies-section" ref={hobbiesRef}>
      <div className="hobbies-content-wrapper">
        <p className="intro-text">Beyond the Keyboard</p>
        <h2>My Creative Pursuits</h2>
        <p className="hobby-description">
          While coding is my passion, I also dive into the world of **sketching and anime-inspired art**.
          It's a fantastic way to unwind, ignite fresh ideas, and approach problem-solving from a different angle.
          This creative balance is key to my overall growth and well-being.
        </p>
        <NavLink
          to="/art-gallery"
          className="btn"
        >
          Explore My Gallery
        </NavLink>
      </div>
    </section>
  );
};

export default Hobbies;