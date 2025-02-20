import React from "react";

const AlreadySubmitted = () => {
  
  const handleContactClick = () => {
    window.location.href = "mailto:f20240451@pilani.bits-pilani.ac.in";
  };
  return (
    <div className="AS">
      <h1>Form Already Submitted</h1>
      <p>You have already submitted this form.</p>
      <p>Contact this form's owner if you think this is a mistake.</p>
      <button onClick={handleContactClick}>CONTACT</button>
    </div>
  );
};

export default AlreadySubmitted;
