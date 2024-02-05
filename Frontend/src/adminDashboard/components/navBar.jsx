import {Image, Navbar, Container } from 'react-bootstrap';
import { Link, useLoaderData } from 'react-router-dom';
import logo from '../../assets/FullLogo2.jpg'
import profile from '../../assets/images/user.png'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useInfo } from '../../utils/AuthContext';
import socket from '../../config/socket-client';
const AdminNavBar = () => {
  const [aboutus,setAboutus] = useState(null)
  const [displayedNotifications,setDisplayedNotifications] = useState([])
  const {role} = useInfo()
  // const [notifications,setNotifications] = useState([])

  const handleNotification = async() =>{
    const response = await axios.get('http://localhost:4000/api/notifications')
    setDisplayedNotifications(response.data.notifications)
    console.log('notification displayed from the navbar ');
  }
  
  const handleAboutus = async() =>{
    const response = await axios.get('http://localhost:4000/api/aboutus')
    setAboutus(response.data.aboutus) 
  }
  useEffect(()=>{
    handleAboutus()
    handleNotification()
    socket.on('notification',handleNotification)
    socket.on('connect',()=>{
      console.log('connected from navbar');
    })
  },[])
  
  return(

  <Navbar bg="white" expand='lg' className='border-bottom px-2'>
    <Container className='' fluid>
      {aboutus?<Navbar.Brand href="#home"><Image className='d-none d-md-inline-block' src={`http://localhost:4000/${aboutus.logoImage}`} style={{  height: '80px' }}/>  
      </Navbar.Brand>:<div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>}
    <div className="nav-item d-flex gap-4 me-5">
      {role == 'Super-Admin'?
      <div className="nav-item dropdown">
      <a
    className="nav-link dropdown-toggle"
    href="#"
    id="navbarDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i className="bi bi-bell"></i>
  </a>
  <ul className="dropdown-menu scrollable-menu dropdown-width px-0 py-1 mt-2 " aria-labelledby="navbarDropdown" >
  {displayedNotifications? displayedNotifications.map(n =>{
    let time = new Date(n.time)
    return <li key={n._id} className='border-bottom py-1 px-3 text-black d-block'>
      <p className='fs-7 text-end m-0 p-0'>
      <span >{`${time.getHours()} : ${time.getMinutes()}`}</span>

      </p>
      <p>{n.title}</p>
      <Link className='link-underline link-underline-opacity-0' to={`/admin-dashboard/${n.table}`}>{n.message}</Link>
      </li>
  }):<li className='border-bottom py-1 px-3 text-black d-block'>Empty</li>}
  </ul>

      </div>:null}
      <div className="nav-item dropdown">
  <a
    className="nav-link dropdown-toggle"
    href="#"
    id="navbarDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <img
      src={profile}
      alt="user"
      className="profile-pic me-2"
    />
    Jihad AG
  </a>
  <ul className="dropdown-menu px-0 py-1 mt-2 " aria-labelledby="navbarDropdown" >
  <li className='border-bottom'>
    <Link className='py-1 link px-3 text-black d-block link-underline link-underline-opacity-0' to={`/admin-dashboard/profile`}>
      profile
    </Link>
    </li>
    <li className='' >
      <a className='py-1 px-3 text-black d-block link-underline link-underline-opacity-0'>
      logout
      </a>
    </li>
  </ul>
</div>
      
    </div>
    
   

     
    </Container>
  </Navbar>
)};

export default AdminNavBar