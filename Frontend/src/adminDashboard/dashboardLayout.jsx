import {Col,Row,Container} from 'react-bootstrap'
import AdminNavBar from './components/navBar';
import AdminSideBar from './components/sideBar';
import './admin-style.css'
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
const AdminLayout = () =>{
  

    return(

        <Container fluid className=' p-0 vh-100'>   
    <AdminNavBar />
    <Container fluid className='vh-100 d-flex'>
      <Row className='d-flex flex-grow-1'>
        <Col className='px-0 py-2  border-end' xs={2} id="sidebar-wrapper">
          <AdminSideBar />
        </Col>
        <Col xs={10} id="page-content-wrapper" className='py-4 px-3'>
         <Outlet/>
        </Col>
      </Row>
    </Container>
  </Container>
    );
}

export default AdminLayout