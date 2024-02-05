import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Logo from "../../assets/FullLogo2.jpg";
import "../NewNavbar/NewNav.css";
// import AnyCategoryPage from "../AnyCategoryPage/ProductPageComponent.jsx";
import UserIcon from "../../assets/USERICON.png";
import chevron from "../../assets/chevron.png";
import { IoCartOutline } from "react-icons/io5";
import axios from "axios";

const NewNavbar = () => {
  const initialCartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  const [cartCount, setCartCount] = useState(initialCartCount);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const isLoggedIn = document.cookie.includes("token");

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Update the active link when the location changes
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const isLinkActive = (link) => link === activeLink;

  // Update localStorage when cartCount changes
  useEffect(() => {
    localStorage.setItem("cartCount", cartCount.toString());
  }, [cartCount]);

  const handleClickCart = () => {
    setCartCount(cartCount + 1);
  };

  useEffect(() => {
    setCartCount(0);
  }, []);

  const navigate = useNavigate();
  const [collapse, setCollapsed] = useState(true);
  const executeScroll = () => {
    setTimeout(() => {
      const element = document.getElementById("Contact");
      element.scrollIntoView({ behavior: "smooth" });
      const element2 = document.getElementById("About");
      element2.scrollIntoView({ behavior: "smooth" });
    }, 10);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = async () => {
    try {
      // Make a request to the server to log the user out
      await axios.post("http://localhost:4000/api/users/logout");

      // Clear the token from the client-side by setting an expired cookie
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Navigate to the home page or any other desired location
      navigate("/");

      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="headerNavbar sticky">
      <img
        className="Logo"
        src={Logo}
        alt=""
        onClick={() => {
          navigate("/", { replace: true });
        }}
      />
      <div className="Navbar">
        <div className="header_Links">
          <Link
            to="/"
            className={`N-home ${isLinkActive("/") ? "active" : ""}`}
            onClick={() => {
              scrollToTop;
            }}
          >
            <span>Home</span>
          </Link>

          <Link
            to="AboutUsMain"
            name={"aboutus"}
            onClick={executeScroll}
            className={`N-aboutUsMain ${
              isLinkActive("/AboutUsMain") ? "active" : ""
            }`}
          >
            <span
              onClick={() => {
                navigate("/", { replace: true });
                executeScroll();
              }}
            >
              AboutUs
            </span>
          </Link>
          <Link
            to="contact"
            name={"contactUs"}
            onClick={executeScroll}
            className={`N-Contact ${isLinkActive("contact") ? "active" : ""}`}
          >
            <span
              onClick={() => {
                navigate("/", { replace: true });
                executeScroll();
              }}
            >
              ContactUs
            </span>
          </Link>
          <div className="dropdown">
            <Link to="/categories">
              Categories
              <img src={chevron} alt="Chevron" />
            </Link>
            <div className="menu">
              {categories.map((category) => (
                <Link key={category._id} to={`categories/${category.name.toLowerCase()}`}>
                  {category.name.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>
          <div className="dropdown">
            <Link to="/customer-support">
              Customer Service
              <img src={chevron} alt="Chevron" />
            </Link>
            <div className="menu">
              <Link to="/customer-support">Customer Support</Link>
              <Link to="/shipping-policy">Shipping Policy</Link>
              <Link to="/price-matching-policy">Price Matching Policy</Link>
            </div>
          </div>
        </div>
        <Link to="/CheckOut" className="Cart" onClick={handleClickCart}>
          <IoCartOutline />
          {cartCount > 0 && <span className="cart-counter">{cartCount}</span>}
        </Link>
        <Link to="/Register" className="join-link">
          Login
        </Link>

        {isLoggedIn && (
          <div className="user-icon-container">
            <img
              className="Home-User-Icon"
              src={UserIcon}
              alt="USERICON"
              onClick={toggleUserDropdown}
            />
            {showUserDropdown && (
              <div className="user-dropdown">
                {/* <button onClick={goToProfile}>Go to Profile</button> */}
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}

        <FontAwesomeIcon
          icon={collapse ? faBars : faXmark}
          className="header_icon"
          onClick={() => setCollapsed(!collapse)}
        />
      </div>
      {!collapse ? (
        <nav className="header_mobile_nav">
          <div className="header_mobile_ul">
            <div className="MobileCart" onClick={handleClickCart}>
              <IoCartOutline />
              {cartCount > 0 && (
                <span className="cart-counter">{cartCount}</span>
              )}
            </div>
            <Link className="N-home" to="/">
              Home
            </Link>
            <Link
              to="/#About"
              name={"aboutus"}
              onClick={executeScroll}
              className="N-about"
            >
              <span
                onClick={() => {
                  navigate("/", { replace: true });
                  executeScroll();
                }}
                className="N-about"
              >
                About
              </span>
            </Link>
            <Link
              to="/Contact"
              name={"contactUs"}
              onClick={executeScroll}
              className="N-contact"
            >
              <span
                onClick={() => {
                  navigate("/", { replace: true });
                  executeScroll();
                }}
                className="N-contact"
              >
                ContactUs
              </span>
            </Link>
            <div className="Mobiledropdown">
              <Link to="/Category">
                Categories
                <img src={chevron} alt="Chevron" />
              </Link>
              <div className="Mobilemenu">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/${category.name.toLowerCase()}`}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="Mobiledropdown">
              <Link>
                Customer Service
                <img src={chevron} alt="Chevron" />
              </Link>
              <div className="Mobilemenu">
                <Link to="/customer-support">Customer Support</Link>
                <Link to="/shipping-policy">Shipping Policy</Link>
                <Link to="/price-matching-policy">Price Matching Policy</Link>
              </div>
            </div>
          </div>
          <Link to="/Register" className="Mobile-join-link">
            Register
          </Link>
        </nav>
      ) : null}
    </header>
  );
};

export default NewNavbar;
