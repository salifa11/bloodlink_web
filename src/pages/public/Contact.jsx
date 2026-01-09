import React from "react";
import "../../css/Contact.css";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

function Contact() {
  return (
    <>
    <Navbar />
      <section className="contact-landing">
        <h1>Contact BloodLink</h1>
        <p>
          Need urgent blood or have questions?  
          Reach out to us anytime — we’re here to help.
        </p>

        <div className="contact-cards">
          <div className="contact-card">
            <h3>📍 Address</h3>
            <p>City Hospital Road, Health District</p>
          </div>

          <div className="contact-card">
            <h3>📞 Phone</h3>
            <p>+91 98765 43210</p>
          </div>

          <div className="contact-card">
            <h3>✉️ Email</h3>
            <p>support@bloodlink.com</p>
          </div>
        </div>

        <button className="cta-btn">
          Login to Send Message
        </button>
      </section>
        <Footer />
    </>
  );
}

export default Contact;
