import React, { useRef, useEffect } from 'react';
import { Github, Linkedin, Mail, Instagram, Youtube } from 'lucide-react';
import './contact.css';

const Contact = () => {
  const contactSectionRef = useRef(null);

  useEffect(() => {
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
        threshold: 0.2,
      }
    );

    if (contactSectionRef.current) {
      observer.observe(contactSectionRef.current);
    }

    return () => {
      if (contactSectionRef.current) {
        observer.unobserve(contactSectionRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="contact-section" ref={contactSectionRef}>
      <div className="container">
        <div className="contact-header">
          <p className="intro-text">Get In Touch</p>
          <h2>Connect with Me</h2>
          <p className="contact-description">
            I'm always open to discussing new opportunities, collaborations, or just having a chat. Feel free to connect!
          </p>
        </div>

        <div className="contact-content-centered">
          <a href="mailto:vanshrathod1055@gmail.com" className="info-card-link">
            <div className="info-card">
              <div className="info-icon">
                <Mail size={24} />
              </div>
              <div className="info-text">
                <h4 className="info-title">Email</h4>
                <p className="info-description">vanshrathod1055@gmail.com</p>
              </div>
            </div>
          </a>

          <a href="https://linkedin.com/in/vansh-rathod-8746b2259" target="_blank" rel="noopener noreferrer" className="info-card-link">
            <div className="info-card">
              <div className="info-icon">
                <Linkedin size={24} />
              </div>
              <div className="info-text">
                <h4 className="info-title">LinkedIn</h4>
                <p className="info-description">linkedin.com/in/vansh-rathod</p>
              </div>
            </div>
          </a>

          <a href="https://github.com/vanshh13" target="_blank" rel="noopener noreferrer" className="info-card-link">
            <div className="info-card">
              <div className="info-icon">
                <Github size={24} />
              </div>
              <div className="info-text">
                <h4 className="info-title">GitHub</h4>
                <p className="info-description">github.com/vanshh13</p>
              </div>
            </div>
          </a>
        </div>

        <div className="social-section">
          <h3 className="social-title">Social Networks</h3>
          <div className="social-links">
            <a
              href="https://github.com/vanshh13"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github" 
              aria-label="GitHub"
            >
              <Github size={28} />
            </a>
            <a
              href="https://linkedin.com/in/vansh-rathod-8746b2259"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin" 
              aria-label="LinkedIn"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="https://www.instagram.com/vanshh.13?igsh=dDB2Y3ViZ2JoZnpn"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link instagram" 
              aria-label="Instagram"
            >
              <Instagram size={28} />
            </a>
            <a
              href="https://www.youtube.com/@vanshrathod13" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-link youtube" 
              aria-label="YouTube"
            >
              <Youtube size={28} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;