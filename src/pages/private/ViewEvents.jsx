import React, { useState } from 'react';
import "../../css/ViewEvents.css";
import Navbar from "../../components/insidenavbar";
import Footer from "../../components/footer";

const ViewEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const events = [
    { id: 1, title: "Blood Drive at Community Center", date: "Sun, Jun 15", time: "9:00 - 3:00", hospital: "City Hospital", type: "Urgent", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400" },
    { id: 2, title: "Weekend Medical Awareness", date: "Sat, Jun 21", time: "10:00 - 1:00", hospital: "Noble Care", type: "Upcoming", image: "https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&q=80&w=400" },
    { id: 3, title: "River Cleaning Campaign", date: "Sun, Jun 22", time: "8:00 - 11:00", hospital: "Green Earth", type: "Urgent", image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <div className="view-events-page">
      <Navbar />

      <main className="events-main">
        {/* Search and Filter Section */}
        <section className="search-section">
          <div className="search-bar-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search events, locations..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-chips">
              <button className="chip active">All</button>
              <button className="chip">Blood Donation</button>
              <button className="chip">Awareness</button>
            </div>
          </div>
        </section>

        {/* Featured Events Section */}
        <section className="events-section">
          <h2 className="section-title">Featured Events</h2>
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <div className="card-image">
                  <img src={event.image} alt={event.title} />
                  <span className={`status-badge ${event.type.toLowerCase()}`}>{event.type}</span>
                </div>
                <div className="card-body">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-info">{event.date} | {event.time}</p>
                  <div className="card-footer">
                    <span className="hospital-tag">{event.hospital}</span>
                    <button className="more-btn">
                      More 
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* View Events (All Opportunities) Section */}
        <section className="events-section">
          <h2 className="section-title">View Events</h2>
          <div className="events-grid">
            {/* Reusing the same data for demo purposes */}
            {[...events].reverse().map(event => (
              <div key={`all-${event.id}`} className="event-card">
                <div className="card-image">
                  <img src={event.image} alt={event.title} />
                  <span className={`status-badge ${event.type.toLowerCase()}`}>{event.type}</span>
                </div>
                <div className="card-body">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-info">{event.date} | {event.time}</p>
                  <div className="card-footer">
                    <span className="hospital-tag">{event.hospital}</span>
                    <button className="more-btn">More 
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ViewEvents;