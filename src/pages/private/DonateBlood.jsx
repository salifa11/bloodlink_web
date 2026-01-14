import React, { useState } from 'react';
import "../../css/DonateBlood.css"; 
import Footer from "../../components/footer";
import Navbar from "../../components/insidenavbar";

const DonateBlood = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    age: '',
    bloodGroup: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Enter valid phone number';
    }
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 18) {
      newErrors.age = 'Minimum age is 18';
    }
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Select blood group';
    
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log('Donor Data:', formData);
      setShowSuccess(true);
      setFormData({ fullName: '', phone: '', city: '', age: '', bloodGroup: '' });
      setErrors({});
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="donate-container">
      <Navbar />
      
      {/* Animated Background Elements */}
      <div className="bg-circle-1"></div>
      <div className="bg-circle-2"></div>
      
      {/* --- WRAPPER STARTED HERE --- */}
      {/* This wrapper holds the main content and pushes the footer down */}
      <div className="donate-content">
        
        {/* Header */}
        <div className="donate-header">
          <div className="icon-wrapper">
            <svg className="heart-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h1 className="header-title">Become a Donor</h1>
          <p className="header-subtitle">Register as a blood donor and save lives</p>
        </div>

        {/* Form Card */}
        <div className="donate-card">
          <h2 className="card-title">Donor Registration</h2>
          <p className="subtitle">Fill in the details to become a donor</p>

          {showSuccess && (
            <div className="success-alert">
              <svg className="success-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Registration Successful!
            </div>
          )}

          <div className="form-wrapper">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} className={`form-input ${errors.fullName ? 'input-error' : ''}`} />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="tel" name="phone" placeholder="1234567890" value={formData.phone} onChange={handleChange} className={`form-input ${errors.phone ? 'input-error' : ''}`} />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <input type="text" name="city" placeholder="Your City" value={formData.city} onChange={handleChange} className={`form-input ${errors.city ? 'input-error' : ''}`} />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Age</label>
                <input type="number" name="age" placeholder="18" min="18" max="65" value={formData.age} onChange={handleChange} className={`form-input ${errors.age ? 'input-error' : ''}`} />
                {errors.age && <span className="error-text">{errors.age}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Blood Group</label>
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className={`form-input form-select ${errors.bloodGroup ? 'input-error' : ''}`}>
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                {errors.bloodGroup && <span className="error-text">{errors.bloodGroup}</span>}
              </div>
            </div>

            <button onClick={handleSubmit} className="submit-btn">Register as Donor</button>
          </div>

          <div className="info-section">
            <div className="info-item">
              <svg className="info-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <span className="info-text">Eligibility: 18-65 years</span>
            </div>
            <div className="info-item">
              <svg className="info-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <span className="info-text">Donate every 3 months</span>
            </div>
          </div>
        </div>
      </div>
      {/* --- WRAPPER ENDS HERE --- */}

      {/* Footer is now outside the wrapper so it can be full width */}
      <Footer />
    </div>
  );
};

export default DonateBlood;