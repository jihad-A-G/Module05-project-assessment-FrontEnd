import React from "react";
import "./NotFound.css"
import { useNavigate } from "react-router-dom"; // Import useNavigate
const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHomeClick = () => {
    navigate("/");
  };
  return (
     <div className="NotFoundPage">
      <header className="top-header"></header>

      {/* Dust particles */}
      <div>
        <div className="starsec"></div>
        <div className="starthird"></div>
        <div className="starfourth"></div>
        <div className="starfifth"></div>
      </div>
      {/* Dust particles end */}
      <section className="error">
        <div className="error__content">
          <div className="error__message message">
            <h1 className="message__title">Page Not Found</h1>
            <p className="message__text">
              We're sorry, the page you were looking for isn't found here. The
              link you followed may either be broken or no longer exists. Please
              try again, or take a look at our.
            </p>
          </div>
          <div className="error__nav e-nav">
          <button onClick={handleGoHomeClick} className="e-nav__link">
        
            </button>
          </div>
        </div>
      </section>
    
    </div> 
  );
};

export default NotFound;
