import React, { useState, useEffect } from 'react';
import "../../css/ViewEvents.css";
import Navbar from "../../components/insidenavbar";
import Footer from "../../components/footer";
import { useNavigate } from 'react-router-dom';


const BACKEND_URL = "http://localhost:5000";

const ViewEvents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/events/all`);
      if (!response.ok) throw new Error("Failed to load events");
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Helper function to format 24h time string (HH:mm:ss) to 12h (hh:mm AM/PM)
   */
  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  /**
   * Helper function to format YYYY-MM-DD to a "Pretty" local date
   */
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    // Using slashes instead of dashes prevents timezone shifts in some browsers
    const date = new Date(dateString.replace(/-/g, '\/')); 
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredEvents = events.filter(event =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loader">Loading events...</div>;

  return (
    <div className="view-events-page">
      <Navbar />

      <main className="events-main">
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
          </div>
        </section>

        <section className="events-section">
          <h2 className="section-title">Available Opportunities</h2>
          {error && <p className="error-msg">{error}</p>}
          
          <div className="events-grid">
            {filteredEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="card-image">
                  <img 
                    src={event.eventImage ? `${BACKEND_URL}${event.eventImage}` : "/default-event.jpg"} 
                    alt={event.eventName} 
                  />
                  <span className="status-badge urgent">{event.eventType}</span>
                </div>
                <div className="card-body">
                  <h3 className="event-title">{event.eventName}</h3>
                  
                  {/* Applied Pretty Formatting for Date and Time here */}
                  <p className="event-info">
                    <strong>{formatDate(event.eventDate)}</strong>
                    <br />
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </p>

                  <div className="card-footer">
                    <span className="hospital-tag">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '4px'}}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {event.location}
                    </span>
                    <button className="more-btn" onClick={() => navigate(`/event/${event.id}`)}>
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
          
          {filteredEvents.length === 0 && !loading && (
            <p className="no-events">No events found matching your search.</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ViewEvents;