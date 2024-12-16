import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UseerSide } from './components/userSide/UserSide';
import { AdminSide } from './components/adminSide/AdminSide';
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from 'react-toastify';
import { ShowMealRecord } from './components/adminSide/allworkOfAdminSide/ShowMealRecord'
import { AddMealRecord } from './components/adminSide/allworkOfAdminSide/AddMealRecord';
import { AddRoomRecord } from './components/adminSide/allworkOfAdminSide/AddRoomRecord';
import { ShowRoomRecord } from './components/adminSide/allworkOfAdminSide/ShowRoomRecord';
import { ShowMealMenue } from './components/userSide/showMealMenue/ShowMealMenue';
import { SignIn } from './components/userSide/signIn/SignIn';
import { AvalibalRooms } from './components/userSide/avalibalRooms/AvalibalRooms';
import { BookNow } from './components/adminSide/allworkOfAdminSide/BookNow';
import { ShowBookNow } from './components/adminSide/allworkOfAdminSide/ShowBookNow';
import { EnterExpenses } from './components/adminSide/allworkOfAdminSide/EnterExpenses';
import { ShowExpenses } from './components/adminSide/allworkOfAdminSide/ShowExpenses';
import { ShowIncome } from './components/adminSide/allworkOfAdminSide/ShowIncome';
import { Complants } from './components/adminSide/allworkOfAdminSide/Complants';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UseerSide />} />
        <Route path="/admin" element={<AdminSide />} />
        <Route path="/add-room" element={<AddRoomRecord />} />
        <Route path="/add-meal" element={<AddMealRecord />} />
        <Route path="/show-room" element={<ShowRoomRecord />} />
        <Route path="/show-meal" element={<ShowMealRecord />} />
        <Route path="/user-meal" element={<ShowMealMenue />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/avalibal-rooms" element={<AvalibalRooms />} />
        <Route path="/book-now" element={<BookNow />} />
        <Route path="/show-book-now" element={<ShowBookNow />} />
        <Route path="/enter-expenses" element={<EnterExpenses />} />
        <Route path="/show-expenses" element={<ShowExpenses />} />
        <Route path="/show-income" element={<ShowIncome />} />
        <Route path="/complants" element={<Complants />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </Provider>

);
reportWebVitals();
