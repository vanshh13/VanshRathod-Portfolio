import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "./hobbies.css";

const Hobbies = () => {
  const sliderRef = useRef();

  const drawings = [
    { id: 1, imgSrc: "/images/drawings/drawing1.jpg", alt: "Drawing 1", description: "" },
    { id: 2, imgSrc: "/images/drawings/drawing2.jpg", alt: "Drawing 2", description: "" },
    { id: 3, imgSrc: "/images/drawings/drawing3.jpg", alt: "Drawing 3", description: "" },
    { id: 4, imgSrc: "/images/drawings/drawing4.jpg", alt: "Drawing 4", description: "" },
    { id: 5, imgSrc: "/images/drawings/drawing5.jpg", alt: "Drawing 5", description: "" },
    { id: 6, imgSrc: "/images/drawings/drawing6.jpg", alt: "Drawing 6", description: "" },
    { id: 7, imgSrc: "/images/drawings/drawing7.jpg", alt: "Drawing 7", description: ""},
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        sliderRef.current.slickPrev();
      } else if (event.key === "ArrowRight") {
        sliderRef.current.slickNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section id="hobbies" className="hobbies-section">
      <h2>My Drawing Skills</h2>
      <Slider {...settings} ref={sliderRef}>
        {drawings.map((drawing) => (
          <div key={drawing.id} className="drawing-container">
            <img src={drawing.imgSrc} alt={drawing.alt} className="drawing-img" />
            <p className="drawing-description">{drawing.description}</p>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hobbies;
