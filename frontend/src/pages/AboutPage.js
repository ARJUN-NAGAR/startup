// src/pages/AboutPage.js
import React from 'react';
import '../styles/AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About NyayaSaathi</h1>
        <p>An AI-powered legal aid platform for rural and semi-urban India.</p>
      </header>

      <section className="mission-vision">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            Empowering over 900 million underserved Indians by simplifying access to legal aid,
            documents, and justice with technology and voice interfaces.
          </p>
        </div>
        <div className="vision">
          <h2>Our Vision</h2>
          <p>
            To build India’s first inclusive and intelligent digital legal infrastructure that ensures no one
            is denied justice due to complexity or access barriers.
          </p>
        </div>
      </section>

      <section className="team">
        <h2>Founding Team</h2>
        <div className="team-members">
          <div className="member">
            <h3>Aarav Sharma</h3>
            <p>Co-Founder & Product Lead</p>
          </div>
          <div className="member">
            <h3>Sneha Rathi</h3>
            <p>Co-Founder & Legal Strategy</p>
          </div>
          <div className="member">
            <h3>Rahul Verma</h3>
            <p>CTO & AI Engineer</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
