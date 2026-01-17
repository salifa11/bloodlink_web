import React, { useState, useRef } from 'react';
import "../../css/AdminEventForm.css";
import AdminNavbar from '../../components/adminnavbar';
import Footer from '../../components/footer';

const AdminEventForm = () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    location: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    capacity: '',
    description: '',
    eventType: 'Blood Donation'
  });

  const [eventImage, setEventImage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEventImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      // Use FormData to correctly package binary files
      const formData = new FormData();
      
      // Append all text fields
      Object.keys(eventData).forEach(key => {
        formData.append(key, eventData[key]);
      });
      
      // Append the image file if selected
      if (eventImage) {
        formData.append("eventImage", eventImage); 
      }

      const response = await fetch("http://localhost:5000/api/events/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
          // CRITICAL: No 'Content-Type' header here
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Server Error (500)");

      setShowSuccess(true);
      setEventData({
        eventName: '', location: '', eventDate: '',
        startTime: '', endTime: '', capacity: '',
        description: '', eventType: 'Blood Donation'
      });
      setEventImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      // Catches the 500 error and displays it
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-event-page">
      <AdminNavbar />
      <div className="event-form-container">
        <div className="event-card">
          <div className="event-card-header">
            <h2>Create New Event</h2>
          </div>

          {showSuccess && <div className="event-success-msg">✓ Event Created Successfully!</div>}
          {error && <div className="event-error-msg" style={{color: 'red', marginBottom: '10px'}}>✗ {error}</div>}

          <form onSubmit={handleSubmit} className="event-grid-form">
            <div className="form-group full-width">
              <label>Event Name</label>
              <input type="text" name="eventName" value={eventData.eventName} onChange={handleChange} required />
            </div>

            <div className="form-group full-width">
              <label>Event Banner Image</label>
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*" 
                onChange={handleFileChange} 
                className="file-input"
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" value={eventData.location} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Event Date</label>
              <input type="date" name="eventDate" value={eventData.eventDate} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Start Time</label>
              <input type="time" name="startTime" value={eventData.startTime} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>End Time</label>
              <input type="time" name="endTime" value={eventData.endTime} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Expected Capacity</label>
              <input type="number" name="capacity" value={eventData.capacity} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Event Category</label>
              <select name="eventType" value={eventData.eventType} onChange={handleChange}>
                <option value="Blood Donation">Blood Donation</option>
                <option value="Awareness Campaign">Awareness Campaign</option>
                <option value="Medical Camp">Medical Camp</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea name="description" rows="4" value={eventData.description} onChange={handleChange} required></textarea>
            </div>

            <button type="submit" className="event-submit-btn" disabled={loading}>
              {loading ? "Publishing..." : "Publish Event"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminEventForm;