import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import chevron from "../../assets/chevron.png";
import { IoCartOutline } from "react-icons/io5";
import axios from 'axios';

const Navbar = () => {
  // Retrieve the cart count from localStorage or default to 0
  const initialCartCount = parseInt(localStorage.getItem('cartCount')) || 0;
  const [cartCount, setCartCount] = useState(initialCartCount);
  const [aboutus,setAboutus] = useState({})

  // Update localStorage when cartCount changes
  useEffect(() => {
    localStorage.setItem('cartCount', cartCount.toString());
  }, [cartCount]);
  const handleNavbarData = async() =>{
    const response = await axios.get('http://localhost:4000/api/aboutus/info')
    console.log(response.data.aboutus);
    setAboutus(response.data.aboutus)    
  }
  console.log(aboutus);
  useEffect(()=>{
    handleNavbarData()
  },[])

  const handleClickCart = () => {
    // Increment the cart count
    setCartCount(cartCount + 1);
  };

  // Reset the cart count to 0 only on the initial page load
  useEffect(() => {
    setCartCount(0);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
       {aboutus? <img src={`http://localhost:4000/${aboutus.logoImage}`} alt="Logo" />:<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>}
      </div>
      <div className="links">
        
        <Link to="/">Home</Link>
        <Link to="/about">AboutUs</Link>
        <Link to="/contact">ContactUs</Link>
        <div className="dropdown">
          <Link to="/categories">
            Categories
            <img src={chevron} alt="Chevron" />
          </Link>
          <div className="menu">
            <Link to="/phones">Phones</Link>
            <Link to="/laptops">Laptops</Link>
            <Link to="/pc">PC</Link>
            <Link to="/accessories">Accessories</Link>
          </div>
        </div>
        <div className="dropdown">
          <Link>
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
      <div className='Cart' onClick={handleClickCart}>
        <IoCartOutline />
        {cartCount > 0 && <span className="cart-counter">{cartCount}</span>}
      </div>
      <Link to="/Register" className="join-link">Register</Link>
    </nav>
  );
};

export default Navbar;
