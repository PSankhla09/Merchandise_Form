import React from "react";
import "./AS.css";

const AS = () => {
  const handleContactClick = () => {
    window.location.href = "mailto:f20240451@pilani.bits-pilani.ac.in";
  };

  return (
    <div className="AS">
      <h1>Form submitted successfully!</h1>
      <br />
      <p>Contact this form's owner if you think this is a mistake.</p>
      <button onClick={handleContactClick}>CONTACT</button>
    </div>
  );
};

export default AS;
