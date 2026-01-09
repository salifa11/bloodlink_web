import "../../css/aboutus.css";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

function About() {
  return (
    <>
    <Navbar />
      <div className="about-container">
        <section className="about-hero">
          <h1>About <span>BloodLink</span></h1>
          <p>Connecting heroes with those in need, one drop at a time.</p>
        </section>

        <section className="about-content">
          <div className="about-card">
            <h3>Our Mission</h3>
            <p>
              To bridge the gap between blood donors and patients in urgent need. 
              We aim to make blood donation accessible, transparent, and efficient 
              through technology.
            </p>
          </div>

          <div className="about-card">
            <h3>Why Choose Us?</h3>
            <ul>
              <li>🚀 Quick donor matching</li>
              <li>📍 Real-time location tracking</li>
              <li>📱 Links to hospitals</li>
              <li>🤝 Community-driven support</li>
            </ul>
          </div>
        </section>

        <section className="about-stats">
          <div className="stat-item">
            <h2>10k+</h2>
            <p>Donors</p>
          </div>
          <div className="stat-item">
            <h2>5k+</h2>
            <p>Lives Saved</p>
          </div>
          <div className="stat-item">
            <h2>50+</h2>
            <p>Hospitals</p>
          </div>
        </section>
      </div>

      {/* Footer OUTSIDE container */}
      <Footer />
    </>
  );
}

export default About;
