import React,{useEffect} from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer.jsx";
import NewNavbar from "./Components/NewNavbar/NewNav.jsx";
import "./App.css";
const App = () => {
  return (
    <div>
      <NewNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;

