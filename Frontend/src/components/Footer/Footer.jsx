import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Logo from "../../assets/Logo3.jpg";
import Facebook from "../../assets/facebook.svg";
import Twitter from "../../assets/twitter.svg";
import Instagram from "../../assets/instagram.svg";
import Linkedin from "../../assets/linkedin.svg";

const Footer = () => {
  return (
    <section className="FooterSection">
      <div className="line"></div>
      <footer className="top">
        <img className="FooterFullLogo" src={Logo} alt="Logo" />
        <div className="links">
          <div className="links-column">
            <h2>NAVIGATE</h2>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/contact">ContactUs</Link>
            <Link to="/about">AboutUs</Link>
            <Link to="/Register">Register</Link>
          </div>
          <div className="links-column">
            <h2>CATEGORIES</h2>
            <Link to="/categories/deals">DEALS</Link>
            <Link to="categories/laptops">LAPTOPS</Link>
            <Link to="categories/phones">PHONES</Link>
            <Link to="categories/accessories">Accessories</Link>
            <Link to="categories/pc">PC</Link>
          </div>
          <div className="links-column socials-column">
            <h2>Social Media</h2>
            <p>
              Follow us on social media to find out the latest updates on our
              progress.
            </p>
            <div className="socials">
              <a className="facebook" href="https://www.facebook.com">
                <img className="img" src={Facebook} alt="" />
              </a>
              <a className="instagram" href="https://www.instagram.com">
                <img className="img" src={Instagram} alt="" />
              </a>
              <a className="linkedin" href="https://www.linkedin.com">
                <img className="img" src={Linkedin} alt="" />
              </a>
              <a className="Twitter" href="https://www.twitter.com">
                <img className="img" src={Twitter} alt="" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <footer className="bottom">
        <p className="copyright">© 2023 All rights reserved</p>
        <div className="legal">
          <Link to="/license">License</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </footer>
      <div className="Mobile-socials">
              <a className="facebook" href="https://www.facebook.com">
                <img className="img" src={Facebook} alt="" />
              </a>
              <a className="instagram" href="https://www.instagram.com">
                <img className="img" src={Instagram} alt="" />
              </a>
              <a className="linkedin" href="https://www.linkedin.com">
                <img className="img" src={Linkedin} alt="" />
              </a>
              <a className="Twitter" href="https://www.twitter.com">
                <img className="img" src={Twitter} alt="" />
              </a>
            </div>
    </section>
  );
};

export default Footer;
