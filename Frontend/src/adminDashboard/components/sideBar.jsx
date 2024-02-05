import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const AdminSideBar = () => {
  const hoverLinks = {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'gray',
      color:'white'
    },
 };

  return(
  <Nav defaultActiveKey="/home" className="flex-column sidebar-text-color">
     {/* <Nav.Link>Products</Nav.Link> */}
    <Nav.Link style={{hoverLinks}} data-bs-toggle="collapse" href="#productCollapse" className='sidebar-text-color toggle' role="button">Products</Nav.Link>
    <div className="collapse sidebar-bg" id='productCollapse'>
    <NavLink className='nav-link  sidebar-text-color sidebar-hover' style={{hoverLinks}} to='products'>Published</NavLink>
    <NavLink className='nav-link  sidebar-text-color sidebar-hover' style={{hoverLinks}} to="products">Pending</NavLink>
    </div>
    <NavLink className={'nav-link  sidebar-text-color sidebar-hover'} style={hoverLinks} to={'orders'}>Orders</NavLink>
    <NavLink className={'nav-link  sidebar-text-color sidebar-hover'} to={'/admin-dashboard/aboutus'} style={hoverLinks}>About us</NavLink>
    <NavLink className={'nav-link  sidebar-text-color sidebar-hover'} to={'/admin-dashboard/categories'} style={hoverLinks}>Categories</NavLink>
    {/* Add more Nav.Link as needed */}
  </Nav>
  );
  };

export default AdminSideBar