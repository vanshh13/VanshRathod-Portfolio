import React from 'react';
import './home.css';
const Home = () => {
  return (
    <section id="home" className="home">
      <div className="home-content">
        <h1>Hi, I'm Vansh Rathod</h1>
        <h2>Full-Stack Developer | Tech Enthusiast</h2>
        <p>
          I build modern web applications with clean and efficient code. Passionate about creating seamless user experiences and solving real-world problems with technology.
        </p>
        <a href="#projects" className="btn">View My Work</a>
      </div>
      <div className="home-image">
      <img src="./images/self_picture.jpg" alt="Profile" />
      </div>
    </section>
  );
};

export default Home;
