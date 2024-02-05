import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { IoCartOutline } from "react-icons/io5";
import Logo from "../../assets/FullLogo2.jpg";
import "./nav.css";






const CustomNavbar = () => {
  const initialCartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  const [cartCount, setCartCount] = useState(initialCartCount);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchProduct = async (categories) => {
      try {
        const response = await axios.get(`http://localhost:4000/api/categories`);
        setCategories(response.data.name);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchProduct(categories);
  }
  ); 


  
  useEffect(() => {
    localStorage.setItem("cartCount", cartCount.toString());
  }, [cartCount]);

  const handleClickCart = () => {
    setCartCount(cartCount + 1);
  };

  useEffect(() => {
    setCartCount(0);
  }, []);

  return (
    <Navbar bg="white" expand="lg" className="navbar">
      <Container>
        {/* Logo on the far left */}
        <Navbar.Brand className="logo-container">
          <img
            src={Logo}
            alt="Logo"
            width="180"
            height="95"
            className="d-inline-block align-top logo"
          />
        </Navbar.Brand>

        {/* Toggle button for the collapsed menu */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation bar */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {/* Centered navigation links */}
          <Nav className="me-auto centered-nav">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact Us
            </Nav.Link>

      {/* Dropdown for Categories */}
      {/* <NavDropdown title="Categories" id="basic-nav-dropdown">
        {categories.map((category, index) => (
          <NavDropdown.Item key={index} as={Link} to={`/?${category}`}>
            {category}.toLowerCase
          </NavDropdown.Item>
        ))}
      </NavDropdown> */}

            {/* Dropdown for Customer Service */}
            <NavDropdown title="Customer Service" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/Customer-Support">
                Customer Support
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/shipping-policy">
                Shipping Policy
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Price-Matching-Policy">
                Price Matching Policy
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Cart and Register button on the top right */}
          <Nav className="ms-auto">
            {/* <Nav.Link className="Cart" onClick={handleClickCart}>
              <IoCartOutline style={{ fontSize: "24px" }} />
              {cartCount > 0 && <span className="cart-counter">{cartCount}</span>}
            </Nav.Link> */}

            <Nav.Link as={Link} to="/Register" className="join-link">
              Log In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
