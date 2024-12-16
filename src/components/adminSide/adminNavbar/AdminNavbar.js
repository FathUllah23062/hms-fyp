import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../../../assets/logo.jpeg';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

export const AdminNavbar = () => {
    return (
        <Navbar
            expand="md"
            className=' fixed-top'
        >
            <NavbarBrand ><img src={logo} className='logo' /></NavbarBrand>
            <Nav className="ml-auto" navbar>

                <Link to='/enter-expenses' className='me-4 pe-2 ps-2'>
                    <NavLink className='text-danger '>Enter Expenses</NavLink>
                </Link>
                <Link to='/show-expenses' className='me-4 pe-2 ps-2'>
                    <NavLink className='text-danger '>Show Expenses</NavLink>
                </Link>
                <Link to='/show-income' className='me-4 pe-2 ps-2'>
                    <NavLink className='text-success '>Show Incom</NavLink>
                </Link>
                <Link to='/complants' className='me-4 pe-2 ps-2'>
                    <NavLink className='text-white '>Complants</NavLink>
                </Link>
                <Link to='/' className='me-4 pe-2 ps-2'>
                    <NavLink className='text-white '>Logout</NavLink>
                </Link>
            </Nav>
        </Navbar>
    );
};