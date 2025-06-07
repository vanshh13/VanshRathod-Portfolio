import React, { useState, useRef, useEffect } from 'react';
// Make sure Instagram and Youtube are imported here
import { Github, Linkedin, Mail, Send, User, MessageSquare, CheckCircle, Instagram, Youtube } from 'lucide-react';
import './contact.css';

const Contact = () => {
  const form = useRef();
  const contactSectionRef = useRef(null);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const EMAILJS_SERVICE_ID = 'service_ae8i1o4';
  const EMAILJS_TEMPLATE_ID = 'template_jqo4n7h';
  const EMAILJS_PUBLIC_KEY = 'qQdF2s_zMjDPzYKqt';

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Name is required';
    }

    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      newErrors.user_email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }

    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitError('');

    try {
      const emailjs = await import('emailjs-com');

      const templateParams = {
        user_name: formData.user_name,
        user_email: formData.user_email,
        message: formData.message,
        to_name: 'Vansh',
        reply_to: formData.user_email
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);
      setSubmitted(true);
      setFormData({ user_name: '', user_email: '', message: '' });

      setTimeout(() => setSubmitted(false), 5000);

    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitError('Failed to send message. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section" ref={contactSectionRef}>
      <div className="container">
        <div className="contact-header">
          <p className="intro-text">Get In Touch</p>
          <h2>Send Me a Message</h2>
          <p className="contact-description">I'd love to hear from you. Send me a message and I'll respond as soon as possible.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <Mail size={24} />
              </div>
              <div className="info-text">
                <h4 className="info-title">Email</h4>
                <p className="info-description">vanshrathod1055@gmail.com</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <User size={24} />
              </div>
              <div className="info-text">
                <h4 className="info-title">Let's Connect</h4>
                <p className="info-description">Always open to discussing new opportunities</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form ref={form} onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    value={formData.user_name}
                    onChange={handleChange}
                    className={`form-input ${errors.user_name ? 'input-error' : ''}`}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = errors.user_name ? '#ef4444' : '#222'}
                  />
                </div>
                {errors.user_name && <span className="error-text">{errors.user_name}</span>}
              </div>

              <div className="form-group">
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    value={formData.user_email}
                    onChange={handleChange}
                    className={`form-input ${errors.user_email ? 'input-error' : ''}`}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = errors.user_email ? '#ef4444' : '#222'}
                  />
                </div>
                {errors.user_email && <span className="error-text">{errors.user_email}</span>}
              </div>

              <div className="form-group">
                <div className="input-wrapper">
                  <MessageSquare className="input-icon textarea-icon" size={20} />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = errors.message ? '#ef4444' : '#222'}
                  ></textarea>
                </div>
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              {submitError && (
                <div className="submit-error">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`contact-btn ${isSubmitting ? 'contact-btn-loading' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

              {submitted && (
                <div className="success-message">
                  <CheckCircle size={24} className="success-icon" />
                  <p>Thank you for your message! I'll get back to you soon.</p>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="social-section">
          <h3 className="social-title">Connect with Me</h3>
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
              <Instagram size={28} /> {/* Using Lucide Instagram component */}
            </a>
            <a
              href="https://www.youtube.com/@vanshrathod13" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-link youtube" 
              aria-label="YouTube"
            >
              <Youtube size={28} /> {/* Using Lucide Youtube component */}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;