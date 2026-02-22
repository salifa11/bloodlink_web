import { useState, useEffect, useRef } from "react";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error("Failed to fetch notifications");
    }
  };

  const markAllRead = async () => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/api/notifications/mark-read", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` }
    });
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Poll every 30 seconds for new notifications
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleOpen = () => {
    setOpen(!open);
    if (!open && unreadCount > 0) markAllRead();
  };

  const formatTime = (dateString) => {
    const diff = Math.floor((Date.now() - new Date(dateString)) / 60000);
    if (diff < 1) return "just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const sanitizeMessage = (msg) => {
    if (!msg) return "";
    return msg.replace(/\s*\bin your area\b/gi, "").trim();
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      {/* Bell Button */}
      <button
        onClick={handleOpen}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1.5rem",
          position: "relative",
          padding: "0.3rem"
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: "absolute",
            top: "-4px",
            right: "-4px",
            background: "#e03957",
            color: "white",
            borderRadius: "50%",
            fontSize: "0.65rem",
            fontWeight: "bold",
            width: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "2.5rem",
          width: "320px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          zIndex: 1000,
          maxHeight: "400px",
          overflowY: "auto"
        }}>
          <div style={{
            padding: "1rem",
            borderBottom: "1px solid #eee",
            fontWeight: "bold",
            fontSize: "0.95rem",
            color: "#333"
          }}>
            🔔 Notifications
          </div>

          {notifications.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", color: "#888" }}>
              No notifications yet
            </div>
          ) : (
            notifications.map(n => (
              <div key={n.id} style={{
                padding: "0.9rem 1rem",
                borderBottom: "1px solid #f5f5f5",
                background: n.isRead ? "white" : "#fff8f8",
                fontSize: "0.85rem"
              }}>
                <p style={{ margin: 0, color: "#000000" }}>{sanitizeMessage(n.message)}</p>
                <span style={{ color: "#120000", fontSize: "0.75rem" }}>
                  {formatTime(n.createdAt)}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}