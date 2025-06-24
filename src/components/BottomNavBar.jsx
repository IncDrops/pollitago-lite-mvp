import React from "react";
import { Link } from "react-router-dom";

const BottomNavBar = () => {
  const navStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTop: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-around",
    padding: "0.75rem 0",
    zIndex: 999,
  };

  const buttonStyle = {
    textDecoration: "none",
    color: "#333",
    fontSize: "1.25rem",
    fontWeight: "bold",
  };

  return (
    <div style={navStyle}>
      <Link to="/" style={buttonStyle}>🏠</Link>
      <Link to="/search" style={buttonStyle}>🔍</Link>
      <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={buttonStyle}>➕</Link>
      <Link to="/messages" style={buttonStyle}>💬</Link>
      <Link to="/second-opinion/0" style={buttonStyle}>👍²</Link>
    </div>
  );
};

export default BottomNavBar;
