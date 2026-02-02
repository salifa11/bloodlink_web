import React, { useState, useEffect } from 'react';
import "../../css/DonateBlood.css"; 
import Footer from "../../components/footer";
import Navbar from "../../components/insidenavbar";
import { registerAsDonor, getProfile } from "../../../utils/api";

const DonateBlood = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    age: '',
    bloodGroup: '',
    preferredHospital: '' 
  });
  
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user data to pre-fill the form
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await getProfile(token);
          const user = response.user;
          setFormData(prev => ({
            ...prev,
            fullName: user.userName || '',
            phone: user.phone || '',
            city: user.location || '',
            age: user.age || '',
            bloodGroup: user.bloodGroup || ''
          }));
        }
      } catch (err) {
        console.error("Error loading user profile:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Enter valid 10-digit phone number';
    }

    if (!formData.city || !formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 18) {
      newErrors.age = 'Minimum age is 18';
    } else if (parseInt(formData.age) > 65) {
      newErrors.age = 'Maximum age is 65';
    }

    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Select blood group';
    }
    
    if (!formData.preferredHospital) {
      newErrors.preferredHospital = 'Please select a hospital';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); 

    // Clear previous errors
    setErrors({});
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrors({ submit: "User not authenticated. Please login again." });
          return;
        }

        // Backend expects these exact field names
        const donorPayload = {
          phone: formData.phone,
          city: formData.city,
          age: parseInt(formData.age, 10),
          bloodGroup: formData.bloodGroup,
          hospital: formData.preferredHospital
        };

        console.log("Sending donor registration:", donorPayload);

        const response = await registerAsDonor(donorPayload, token);
        
        console.log("Registration response:", response);
        
        setShowSuccess(true);
        setErrors({});
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
        
      } catch (err) {
        console.error("Registration error:", err);
        
        // Handle different error formats
        const errorMessage = 
          err.response?.data?.message || 
          err.message || 
          "Registration failed. Please try again.";
        
        setErrors({ submit: errorMessage });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (loading) {
    return (
      <div className="donate-container">
        <Navbar />
        <div className="admin-loader">Loading profile...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="donate-container">
      <Navbar />
      <div className="bg-circle-1"></div>
      <div className="bg-circle-2"></div>
      
      <div className="donate-content">
        <div className="donate-header">
          <div className="icon-wrapper">
            <svg className="heart-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h1 className="header-title">Become a Donor</h1>
          <p className="header-subtitle">Your blood can give someone a second chance at life.</p>
        </div>

        <div className="donate-card">
          <h2 className="card-title">Donor Registration</h2>
          <p className="subtitle">Please confirm the details below to register.</p>

          {showSuccess && (
            <div className="success-alert">
              ✓ Registration Successful! Thank you for becoming a donor.
            </div>
          )}
          
          {errors.submit && (
            <div className="error-box" style={{
              color: '#d32f2f',
              backgroundColor: '#ffebee',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '20px',
              border: '1px solid #ef9a9a'
            }}>
              ✗ {errors.submit}
            </div>
          )}

          <form className="form-wrapper" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
                placeholder="98********"
                maxLength="10"
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">City / Location</label>
              <input 
                type="text" 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                className={`form-input ${errors.city ? 'input-error' : ''}`}
                placeholder="e.g. Kathmandu"
              />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Select Hospital</label>
              <select 
                name="preferredHospital" 
                value={formData.preferredHospital} 
                onChange={handleChange} 
                className={`form-input form-select ${errors.preferredHospital ? 'input-error' : ''}`}
              >
                <option value="">Select Hospital</option>
                <option value="Patan Hospital">Patan Hospital</option>
                <option value="KIST Hospital">KIST Hospital</option>
                <option value="Nepal Cancer Hospital">Nepal Cancer Hospital</option>
                <option value="Teaching Hospital">Teaching Hospital</option>
              </select>
              {errors.preferredHospital && <span className="error-text">{errors.preferredHospital}</span>}
            </div>

            <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Age</label>
                <input 
                  type="number" 
                  name="age" 
                  value={formData.age} 
                  onChange={handleChange} 
                  className={`form-input ${errors.age ? 'input-error' : ''}`}
                  placeholder="18-65"
                  min="18"
                  max="65"
                />
                {errors.age && <span className="error-text">{errors.age}</span>}
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Blood Group</label>
                <select 
                  name="bloodGroup" 
                  value={formData.bloodGroup} 
                  onChange={handleChange} 
                  className={`form-input form-select ${errors.bloodGroup ? 'input-error' : ''}`}
                >
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
                {errors.bloodGroup && <span className="error-text">{errors.bloodGroup}</span>}
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Register as Donor
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonateBlood;