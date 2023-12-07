import React from "react";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Link from "next/link";

const Navigation = () => {
  // Styles for the navigation bar

  const navStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#ffffff",
  };

  const logoStyles = {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  };

  const logoTextStyles = {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "1.5rem",
  };

  const subTextStyle = {
    fontSize: "0.8rem",
    margin: "0",
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
    fontStyle: "italic",
  };

  const signInStyles = {
    marginRight: "15px",
  };

  const buttonStyles = {
    padding: "8px 34px",
    backgroundColor: "transparent",
    color: "#006400",
    border: "2px solid #006400",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: "bold",
  };

  const landingButton = {
    backgroundColor: "transparent",
    color: "#006400",
    cursor: "pointer",
    fontSize: "1rem",
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: "bold",
  };

  const handleAirQualityCLick = () => {
    // Handle the action when 'AIR QUALITY' button is clicked
    // For example, you can navigate to a different page or perform an action
    console.log("AIR QUALITY button clicked!");
  };

  return (
    <nav style={navStyles}>
      <div style={logoStyles} onClick={handleAirQualityCLick}>
        <button style={landingButton}>
          <span style={logoTextStyles}>OMEGA INITIATIVE</span>
        </button>
        <p style={subTextStyle}>Air quality data, Ontario</p>
      </div>
      <div style={signInStyles}>
        <button style={buttonStyles}>SIGN IN</button>
      </div>
    </nav>
  );
};

export default Navigation;
