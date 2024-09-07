// components/Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Custom CSS for styling

const Homepage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Manage Your Fleet Maintenance from Start to Finish</h1>
            <p>Fleet4U reduces the risk of unplanned breakdowns by building custom preventive maintenance plans and speeding up the service process with automated workflows.</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleButtonClick}>Learn More</button>
              <button className="btn-secondary" onClick={() => navigate('/dashboard')}>Get Started</button>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://www.fleetsenterprises.com/images/products/fie-fleet-management-software.png" alt="Fleet Maintenance" />
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="feature-section">
        <h1>One Place to Manage and Maintain Your Fleet</h1>
        <p>Manage inspections, work orders, PM schedules, parts inventory, and more in a single dashboard. 
          Fleet4U turns your everyday operations data into powerful insights, so you can drive your fleet forward with confidence.</p>
        <div className="feature-buttons">
          <button className="feature-btn-primary" onClick={handleButtonClick}>Let's Go</button>
          <button className="feature-btn-secondary" onClick={() => navigate('/register')}>Become a Member</button>
        </div>
        <img src="https://bsmart.global/wp-content/uploads/2024/02/Generator-gif2.gif" alt="Example" className="feature-image" />
      </section>

      {/* Why Fleet4U Section */}
      <section className="cards-section">
        <h1>Why Fleet4U?</h1>
        <div className="card-container">
          <div className="card">
            <h3>87%</h3>
            <p>Reduced time spent on inspections.</p>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27I_-5AIzoiKG-Ko0mFIZre-GKejVIYpOBg&s" alt="Benefit" />
          </div>
          <div className="card">
            <h3>48%</h3>
            <p>Saved on maintenance costs.</p>
            <img src="https://nova-hata.com/image/cache/catalog/Ithem/NH_0615/bmw-logo-machine-embroidery-design-615-750x750.jpg" alt="Benefit" />
          </div>
          <div className="card">
            <h3>10x</h3>
            <p>Reduced time spent on fleet reports.</p>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1CUo1Piu8ZPn5lUnTwATarrMQW_BPj64KLw&s" alt="Benefit" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <span className="footer-text">Fleet4U GmbH Copyright © 2024</span>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><img src="https://cdn-icons-png.flaticon.com/128/733/733579.png" alt="Facebook" /></a>
            <a href="#" aria-label="Twitter"><img src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png" alt="Twitter" /></a>
            <a href="#" aria-label="Instagram"><img src="https://cdn-icons-png.flaticon.com/128/6033/6033716.png" alt="Instagram" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
