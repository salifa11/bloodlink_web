import React, { useState } from 'react';
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

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, we just simulate a successful save
    console.log("Event Data Captured:", eventData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="admin-event-page">
      <AdminNavbar />
      
      <div className="event-form-container">
        <div className="event-card">
          <div className="event-card-header">
            <h2>Create New Event</h2>
            <p>Schedule blood drives or awareness programs</p>
          </div>

          {showSuccess && (
            <div className="event-success-msg">
              <svg className="check-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Event Created Successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="event-grid-form">
            <div className="form-group full-width">
              <label>Event Name</label>
              <input 
                type="text" name="eventName" placeholder="e.g. City Hospital Blood Drive" 
                onChange={handleChange} required 
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input 
                type="text" name="location" placeholder="Street, City, State" 
                onChange={handleChange} required 
              />
            </div>

            <div className="form-group">
              <label>Event Date</label>
              <input 
                type="date" name="eventDate" 
                onChange={handleChange} required 
              />
            </div>

            <div className="form-group">
              <label>Start Time</label>
              <input 
                type="time" name="startTime" 
                onChange={handleChange} required 
              />
            </div>

            <div className="form-group">
              <label>End Time</label>
              <input 
                type="time" name="endTime" 
                onChange={handleChange} required 
              />
            </div>

            <div className="form-group">
              <label>Expected Capacity</label>
              <input 
                type="number" name="capacity" placeholder="e.g. 100" 
                onChange={handleChange} required 
              />
            </div>

            <div className="form-group">
              <label>Event Category</label>
              <select name="eventType" onChange={handleChange}>
                <option value="Blood Donation">Blood Donation</option>
                <option value="Awareness Campaign">Awareness Campaign</option>
                <option value="Medical Camp">Medical Camp</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea 
                name="description" rows="4" 
                placeholder="Describe the event details, requirements, etc."
                onChange={handleChange} required
              ></textarea>
            </div>

            <button type="submit" className="event-submit-btn">
              Publish Event
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminEventForm;