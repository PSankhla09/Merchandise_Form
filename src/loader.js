import React, { useState, useEffect } from "react";
import "./loader.css";
import logo from "./loader.gif";
import Header from "./Header/Header";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling when the loader is active
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
      // Enable scrolling once loading is complete
      document.body.style.overflow = "auto";
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto"; // Ensure scrolling is reset when unmounting
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <img src={logo} alt="loader-video" />
        </div>
      ) : (
        <div className="content">
          <Header />
        </div>
      )}
    </>
  );
};

export default Loader;
