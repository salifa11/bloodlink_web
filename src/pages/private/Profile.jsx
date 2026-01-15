import React, { useState, useEffect } from "react";
import "../../css/profile.css";
import Footer from "../../components/footer";
import Navbar from "../../components/insidenavbar";

const API_BASE = "http://localhost:5000/api/profile";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    userName: "",
    memberSince: "",
    userEmail: "",
    phone: "",
    location: "",
    age: "",
    bloodGroup: "",
    totalDonations: 0,
    lastDonation: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      const data = await response.json();
      const userData = data.user;

      setProfileData({
        userName: userData.userName || "",
        memberSince: new Date(userData.createdAt).getFullYear().toString(),
        userEmail: userData.userEmail || "",
        phone: userData.phone || "",
        location: userData.location || "",
        age: userData.age || "",
        bloodGroup: userData.bloodGroup || "",
        totalDonations: userData.totalDonations || 0,
        lastDonation: userData.lastDonation || ""
      });
    } catch (err) {
      setError("Failed to load profile data.");
    } finally {
      setLoading(false);
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
      const response = await fetch(`${API_BASE}/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editData)
      });
      if (!response.ok) throw new Error("Failed to update profile");
      setProfileData(editData);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
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
            <div className="profile-avatar"></div>
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
                <select name="bloodGroup" value={editData.bloodGroup} onChange={handleInputChange} className="edit-input">
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
              <p className="stat-value">{profileData.totalDonations}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Last Donation</p>
              <p className="stat-value">{profileData.lastDonation || "N/A"}</p>
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