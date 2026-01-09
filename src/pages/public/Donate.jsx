import React from "react";
import "../../css/Donate.css";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
function Donate() {
  return (
    <>
    <Navbar />
      <section className="donate-landing">
        <h1>Donate Blood, Save Lives</h1>
        <p>
          Your blood can be the reason someone gets a second chance at life.
          BloodLink helps connect donors with hospitals and patients quickly.
        </p>

        <div className="donate-info">
          <div className="info-box">
            <h3>Who Can Donate?</h3>
            <p>Healthy individuals aged 18–65 and weighing over 50kg.</p>
          </div>

          <div className="info-box">
            <h3>Why Donate?</h3>
            <p>One donation can save up to three lives.</p>
          </div>

          <div className="info-box">
            <h3>Safe Process</h3>
            <p>All donations follow strict medical safety guidelines.</p>
          </div>
        </div>

        <button className="cta-btn">
          Login to Donate
        </button>
      </section>
        <Footer />
    </>
  );
}

export default Donate;
