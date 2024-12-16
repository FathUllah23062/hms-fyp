import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../../../assets/logo.jpeg';
import './NavigationBar.css'
import 'bootstrap/dist/css/bootstrap.css';

export const NavigationBar = () => {
  return (
    <Navbar
      light
      expand="md"
      className=' fixed-top'
    >
      <NavbarBrand href="#"><img src={logo} className='logo' /></NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem className='me-4 pe-2 ps-2'>
          <NavLink href="#home" className='text-white'>Home</NavLink>
        </NavItem>
        <NavItem className='me-4 pe-2 ps-2'>
          <NavLink href="#facilites" className='text-white '>Facilities</NavLink>
        </NavItem>
        <NavItem className='me-4 pe-2 ps-2'>
          <NavLink href="#contact" className='text-white '>Contact </NavLink>
        </NavItem>
        <NavItem className='me-4 pe-2 ps-2'>
          <NavLink href="#location" className='text-white '>Location</NavLink>
        </NavItem>
        <NavItem className='me-4 pe-2 ps-2'>
          <NavLink href="#team" className='text-white '>Our Team</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};