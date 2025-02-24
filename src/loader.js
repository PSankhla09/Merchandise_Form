import React, { useState, useEffect } from "react";
import "./loader.css";
import logo from "./loader.gif";
import Header from "./Header/Header";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);

      document.body.style.overflow = "auto";
    }, 5000);

    return () => {
      clearTimeout(timer);
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
