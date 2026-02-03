import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminnavbar';
import Footer from '../../components/footer';
import '../../css/AdminEventList.css';

const AdminEventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // Fetch all events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events/");
      const data = await response.json();
      
      if (!response.ok) throw new Error("Failed to fetch events");
      
      setEvents(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Delete event handler
  const handleDelete = async (eventId, eventName) => {
    // Confirmation dialog
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${eventName}"?\n\nThis action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete event");
      }

      // Show success message
      setSuccessMsg(`Event "${eventName}" deleted successfully!`);
      setTimeout(() => setSuccessMsg(""), 3000);

      // Remove event from UI without refetching
      setEvents(events.filter(event => event.id !== eventId));

    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  if (loading) {
    return (
      <div className="admin-event-page">
        <AdminNavbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading events...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="admin-event-page">
      <AdminNavbar />
      
      <div className="admin-event-list-container">
        <div className="list-header">
          <h2>Manage Events</h2>

        </div>

        {successMsg && (
          <div className="success-message">
            <span>✓</span> {successMsg}
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <span>✗</span> {error}
          </div>
        )}

        {events.length === 0 ? (
          <div className="no-events">
            <p>📅 No events found.</p>
            <button 
              className="create-first-btn"
              onClick={() => navigate('/admin/create-event')}
            >
              Create Your First Event
            </button>
          </div>
        ) : (
          <div className="events-table-wrapper">
            <table className="events-table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Capacity</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td data-label="Event Name">{event.eventName}</td>
                    <td data-label="Location">{event.location}</td>
                    <td data-label="Date">
                      {new Date(event.eventDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td data-label="Time">
                      {event.startTime} - {event.endTime}
                    </td>
                    <td data-label="Capacity">{event.capacity}</td>
                    <td data-label="Type">
                      <span className="event-type-badge">{event.eventType}</span>
                    </td>
                    <td data-label="Actions">
                      <div className="action-buttons">
                        <button 
                          className="view-btn"
                          onClick={() => navigate(`/events/${event.id}`)}
                          title="View event details"
                        >
                          👁️ View
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(event.id, event.eventName)}
                          title="Delete event"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminEventList;