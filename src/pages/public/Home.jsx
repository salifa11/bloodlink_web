import React from "react";
import { useNavigate } from "react-router-dom"; //to navigate programmatically
import "../../css/Home.css";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
    <Navbar />
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Donate Blood, Save Lives</h1>
          <p>
            BloodLink connects donors with patients in need.  
            Your one donation can save up to three lives.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleLogin}> Login </button>
            <button className="btn-secondary" onClick={handleRegister}> Register </button>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info">
        <div className="info-card">
          <h3>Why Donate Blood?</h3>
          <p>
            Blood is essential for surgeries, emergencies, and treatments.
            Regular donations ensure hospitals never run out.
          </p>
        </div>

        <div className="info-card">
          <h3>Who Can Donate?</h3>
          <p>
            Healthy individuals aged 18–65 can donate blood.
            The process is safe, quick, and lifesaving.
          </p>
        </div>

        <div className="info-card">
          <h3>Our Mission</h3>
          <p>
            To create a reliable blood donation network that saves lives
            through technology and community support.
          </p>
        </div>
      </section>
      <Footer />
      
    </>
  );
}

export default Home;
