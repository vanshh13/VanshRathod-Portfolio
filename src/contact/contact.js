import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Thank you for reaching out! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <h2>Contact Me</h2>
      <p>Have a question or want to work together? Fill out the form below or reach me through social media.</p>

      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
          <button type="submit" className="btn">Send Message</button>
        </form>

        <div className="social-links">
          <h3>Connect with me</h3>
          <a href="https://github.com/vanshh13" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:vanshrathod1055@gmail.com">Email Me</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
