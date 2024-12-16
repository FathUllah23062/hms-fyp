
import { Nav, NavLink } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBed, FaUtensils } from 'react-icons/fa';
import { RiAdminFill } from "react-icons/ri";
import './UserSideBar.css';
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

export const UserSideBar = () => {
  return (
    <>
      <div className='sideBar'>
        <div className='to-center-items'>
          <Nav vertical>
            <Link to='/sign-in' className='mb-4 '>
              <NavLink className="text-white" >
                <RiAdminFill className="me-3  text-white" />
                Admin side
              </NavLink>
            </Link>
            <Link to='/avalibal-rooms' className='mb-4 '>
              <NavLink className="text-white" >
                <FaBed className="me-3  text-white" />
                Avalibal Beds
              </NavLink>
            </Link>
            <Link to="/user-meal" className='mb-4' >
              <NavLink className="text-white">
                <FaUtensils className="me-3 text-white" />
                Meal Menu
              </NavLink>
            </Link>
          </Nav>
        </div>
      </div>

    </>
  );
};


