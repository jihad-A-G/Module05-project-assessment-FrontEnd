import React,{useState,useContext} from "react";
import axios from "axios";
import "./AdminLogin.css";
import { useNavigate,} from "react-router-dom";
import FullLogo from "../../assets/FullLogo2.jpg";
import { ToastContainer, toast } from "react-toastify";
import { useInfo } from "../../utils/AuthContext";
import { jwtDecode } from "jwt-decode";
const AdminLogin = () => {
 const navigate = useNavigate();
 const {setId,setAuth,setRole} = useInfo();

 const [loginForm, setLoginForm] = useState({
    username:'',
    password:'',
 });

 const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:4000/api/admins/login", loginForm)
        const token = response.data.token;
        document.cookie = `token=${token}; path=/;`;
        const decoded = (jwtDecode(token));
        console.log('decoded role',decoded.roles.name);
        setRole(decoded.roles.name);
        setId(decoded.id);
        setAuth(true);
        navigate("/admin-dashboard");
    }
    catch (err) {
      console.log(err)
      toast.error("Cannot login", err,{
        position: "top-right",
        autoClose: 3000,
      });
    }
 }



  const handleInputChange = (e) => {
    const {name, value } = e.target
    setLoginForm({
      ...loginForm,
      [name]:value,
    })
  }

 
  const handleGoHomeClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="LoginComponent">
        <form onSubmit={handleLogin}>
          <h2>Sign in</h2>
          <span>Use your account</span>
          <input
            className="LoginInput"
            type="text"
            placeholder="Username"
            name="username"
            required
            value={loginForm.username}
            onChange={handleInputChange}
          />
          <input
            className="LoginInput"
            type="password"
            placeholder="Password"
            name="password"
            required
            value={loginForm.password}
            onChange={handleInputChange}
          />
          <a href="#">Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
