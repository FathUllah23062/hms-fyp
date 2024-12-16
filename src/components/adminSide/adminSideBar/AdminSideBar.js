
import { Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdAdd } from "react-icons/md";
import { BiSolidShow } from "react-icons/bi";
import { FaHotel } from 'react-icons/fa';
import './AdminSideBar.css'
import { Link } from 'react-router-dom';

export const AdminSideBar = () => {

  return (
    <>
      {/* the admin sidbar */}
      <div className='sideBar'>
        <div className='to-center-items'>
          <Nav vertical>
            <Link to="/add-room" className='mb-4'>
              <NavLink className="text-white"  >
                <MdAdd className="me-3  text-white" />
                Add Room Record
              </NavLink>
            </Link>
            <Link to="/show-room" className='mb-4'>
              <NavLink className="text-white" >
                <BiSolidShow className="me-3  text-white" />
                Show Room Record
              </NavLink>
            </Link>
            <Link to="/add-meal" className='mb-4'>
              <NavLink className="text-white" >
                <MdAdd className="me-3 text-white" />
                Add Meal Menue
              </NavLink>
            </Link>
            <Link to="/show-meal" className='mb-4' >
              <NavLink className="text-white" >
                <BiSolidShow className="me-3 text-white" />
                Show Meal Menue
              </NavLink>
            </Link>
            <Link to="/book-now" className='mb-4' >
              <NavLink className="text-white" >
                <FaHotel className="me-3 text-white" />
                Book Now
              </NavLink>
            </Link>
            <Link to="/show-book-now" className='mb-4' >
              <NavLink className="text-white" >
                <BiSolidShow className="me-3 text-white" />
                Show Book Beds
              </NavLink>
            </Link>
          </Nav>
        </div>
      </div>
    </>
  );
};


