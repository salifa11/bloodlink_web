import React, { useState, useEffect, useRef } from "react";
import "../../css/profile.css";
import Footer from "../../components/footer";
import Navbar from "../../components/insidenavbar";

const API_BASE = "http://localhost:5000/api/auth/profile";
const BACKEND_URL = "http://localhost:5000"; 

const Profile = () => {
  const [profileData, setProfileData] = useState({
    userName: "",
    memberSince: "",
    userEmail: "",
    phone: "",
    location: "",
    age: "",
    bloodGroup: "",        // Changed to camelCase
    totalDonations: 0,     // Changed to camelCase
    lastDonation: "",      // Changed to camelCase
    image: "" 
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); 
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const fileInputRef = useRef(null); 

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(API_BASE, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) throw new Error("Failed to fetch profile");
      const userData = await response.json();

      console.log("Profile data received:", userData); // Debug log

      // Using camelCase to match backend response
      setProfileData({
        userName: userData.userName || "",
        memberSince: userData.createdAt ? new Date(userData.createdAt).getFullYear().toString() : new Date().getFullYear().toString(),
        userEmail: userData.userEmail || "",
        phone: userData.phone || "",
        location: userData.location || "",
        age: userData.age || "",
        bloodGroup: userData.bloodGroup || "",           // camelCase
        totalDonations: userData.totalDonations || 0,    // camelCase
        lastDonation: userData.lastDonation || "",       // camelCase
        image: userData.image || "" 
      });
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError("Failed to load profile data.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file); 

    try {
      setUploading(true);
      setError("");
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/auth/upload-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData 
      });

      if (!response.ok) throw new Error("Image upload failed");
      
      const data = await response.json();
      setProfileData(prev => ({ ...prev, image: data.imageUrl }));
      setSuccessMessage("Profile picture updated!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
    setError("");
    setSuccessMessage("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      // Remove display-only fields before sending update
      const { memberSince, image, totalDonations, lastDonation, ...dataToUpdate } = editData;

      console.log("Sending update:", dataToUpdate); // Debug log

      const response = await fetch(`http://localhost:5000/api/auth/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToUpdate) 
      });
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Update failed");
      }

      const updatedData = await response.json();
      console.log("Update response:", updatedData); // Debug log
      
      // Refresh profile data from server
      await fetchProfile();
      
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete account? This cannot be undone.")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/delete`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Delete failed");
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-header skeleton" style={{ height: "280px" }}></div>
            <div className="contact-section skeleton" style={{ height: "450px" }}></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-content">
          {successMessage && <div className="success-box">✓ {successMessage}</div>}
          {error && <div className="error-box">✗ {error}</div>}

          <div className="profile-header">
            <div 
              className="profile-avatar" 
              style={{ 
                backgroundImage: profileData.image ? `url(${BACKEND_URL}${profileData.image})` : "none",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#ddd',
                position: 'relative',
                cursor: 'pointer'
              }}
              onClick={() => fileInputRef.current.click()}
            >
               {uploading && <div className="avatar-loader">...</div>}
               {!profileData.image && !uploading && <span>+</span>}
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={handleImageUpload} 
            />

            {isEditing ? (
              <input
                type="text"
                name="userName"
                value={editData.userName}
                onChange={handleInputChange}
                className="edit-input name-input"
              />
            ) : (
              <h1 className="profile-name">{profileData.userName || "N/A"}</h1>
            )}
            <p className="profile-member-since">Member since {profileData.memberSince}</p>
          </div>

          <div className="contact-section">
            <h2 className="contact-title">Account Details</h2>
            
            {[
              { label: "Full Name", name: "userName", value: profileData.userName, type: "text" },
              { label: "Email Address", name: "userEmail", value: profileData.userEmail, type: "email" },
              { label: "Phone Number", name: "phone", value: profileData.phone, type: "tel" },
              { label: "Location", name: "location", value: profileData.location, type: "text" },
              { label: "Age", name: "age", value: profileData.age, type: "number" }
            ].map((item, index) => (
              <div className="contact-item" key={index} data-label={item.label}>
                {isEditing ? (
                  <input
                    type={item.type}
                    name={item.name}
                    value={editData[item.name]}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span className="contact-text">{item.value || "Not set"}</span>
                )}
              </div>
            ))}

            <div className="contact-item" data-label="Blood Group">
              {isEditing ? (
                <select 
                  name="bloodGroup" 
                  value={editData.bloodGroup} 
                  onChange={handleInputChange} 
                  className="edit-input"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option><option value="A-">A-</option>
                  <option value="B+">B+</option><option value="B-">B-</option>
                  <option value="AB+">AB+</option><option value="AB-">AB-</option>
                  <option value="O+">O+</option><option value="O-">O-</option>
                </select>
              ) : (
                <span className="contact-text">{profileData.bloodGroup || "Not set"}</span>
              )}
            </div>
          </div>

          <div className="stats-container">
            <div className="stat-card">
              <p className="stat-label">Total Donations</p>
              <p className="stat-value">{profileData.totalDonations || 0}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Last Donation</p>
              <p className="stat-value">
                {profileData.lastDonation 
                  ? new Date(profileData.lastDonation).toLocaleDateString() 
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="action-buttons">
            {isEditing ? (
              <>
                <button className="btn btn-save" onClick={handleSave}>Save Changes</button>
                <button className="btn btn-logout" onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <button className="btn btn-edit" onClick={handleEdit}>Edit Profile</button>
                <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
                <button className="btn btn-delete" onClick={handleDelete}>Delete Account</button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;