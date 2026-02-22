import React from "react";
import "../css/ambulance-hospitals.css";

export default function AmbulanceHospitals({ isOpen, onClose }) {
  const hospitals = [
    {
      id: 1,
      name: "KIST Medical College",
      phone: "+977-1-4262206"
    },
    {
      id: 2,
      name: "Patan Academy of Health Sciences",
      phone: "+977-1-5521199"
    },
    {
      id: 3,
      name: "Nepal Cancer Hospital & Research Center",
      phone: "+977-1-5913535"
    },
    {
      id: 4,
      name: "Teaching Hospital",
      phone: "+977-1-4412303"
    }
  ];

  if (!isOpen) return null;

  const handlePhoneCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`;
  };

  return (
    <div className="ambulance-modal-overlay" onClick={onClose}>
      <div className="ambulance-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ambulance-modal-header">
          <div className="ambulance-header-content">
            <div className="ambulance-icon">🚑</div>
            <h2>Emergency Ambulance Services</h2>
          </div>
          <button className="ambulance-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Hospital List */}
        <div className="ambulance-modal-body">
          <p className="ambulance-info-text">Contact any of these hospitals for emergency ambulance services:</p>
          
          <div className="hospitals-list">
            {hospitals.map((hospital) => (
              <div key={hospital.id} className="hospital-card">
                <div className="hospital-info">
                  <h3 className="hospital-name">{hospital.name}</h3>
                  <p className="hospital-phone">{hospital.phone}</p>
                </div>
                <button 
                  className="call-btn"
                  onClick={() => handlePhoneCall(hospital.phone)}
                  title={`Call ${hospital.name}`}
                >
                  <span>📞</span> Call
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="ambulance-modal-footer">
          <p className="emergency-note">⚠️ For life-threatening emergencies, call 112 (Emergency) or 101 (Ambulance)</p>
          <button className="close-modal-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
