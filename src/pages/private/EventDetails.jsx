import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../../components/insidenavbar";
import Footer from "../../components/footer";
import { getProfile } from "../../../utils/api";
import "../../css/EventDetails.css";

const BACKEND_URL = "http://localhost:5000";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const eventRes = await fetch(`${BACKEND_URL}/api/events/${id}`);
        if (!eventRes.ok) throw new Error("Event not found");
        const eventData = await eventRes.json();
        setEvent(eventData);

        if (token) {
          const profileRes = await getProfile(token);
          setUser(profileRes.user);
        }
      } catch (err) {
        console.error("Error fetching event details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleApply = async (role) => {
    if (!user) {
      alert("Please log in to apply");
      return navigate("/login");
    }

    const payload = { eventId: id, userId: user.id, applicationType: role };

    try {
      const response = await fetch(`${BACKEND_URL}/api/applications/apply`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Successfully applied as a ${role}!`);
      } else {
        alert(data.message || "Application failed.");
      }
    } catch (err) {
      alert("Server error. Please try again later.");
    }
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (!event) return <div className="error">Event not found.</div>;

  return (
    <div className="event-details-page">
      <Navbar />
      
      {/* 1. PHYSICAL SPACER TO PREVENT NAVBAR OVERLAP */}
      <div className="navbar-spacer"></div>
      
      <main className="details-wrapper">
        <header className="event-hero-header">
          <h1 className="event-main-title">{event.eventName}</h1>
          <div className="event-loc-badge">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginRight: '10px'}}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {event.location}
          </div>
        </header>

        <div className="meta-info-grid">
          <div className="meta-item">
            <span className="meta-label">EVENT DATE</span>
            <span className="meta-value">{new Date(event.eventDate).toLocaleDateString()}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">TIME</span>
            <span className="meta-value">{event.startTime} - {event.endTime}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">EXPECTED CAPACITY</span>
            <span className="meta-value">{event.capacity} People</span>
          </div>
        </div>

        <article className="description-card">
          <h3 className="card-sub-title">ABOUT THIS OPPORTUNITY</h3>
          <p className="description-text">{event.description}</p>
        </article>

        <section className="ready-to-join-box">
          <h3 className="ready-title">Ready to Join?</h3>
          <p className="logged-in-notice">
            Since you are logged in as <span className="user-highlight">{user?.userName || 'User'}</span>, 
            your verified details will be automatically sent to the organizers.
          </p>
          <div className="apply-btn-group">
            <button className="btn-apply donor" onClick={() => handleApply('donor')}>
              Apply as Donor
            </button>
            <button className="btn-apply volunteer" onClick={() => handleApply('volunteer')}>
              Apply as Volunteer
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetails;