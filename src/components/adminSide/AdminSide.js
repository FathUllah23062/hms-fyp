import React from 'react'
import { AdminSideBar } from './adminSideBar/AdminSideBar';
import { Home } from '../userSide/home/Home'
import { AdminNavbar } from './adminNavbar/AdminNavbar';

export const AdminSide = () => {
  return (
    <>
      <AdminNavbar />
      <AdminSideBar />
      <Home />
    </>
  )
}


