import React, { useEffect, useState } from 'react';
import { AdminNavbar } from '../adminNavbar/AdminNavbar';
import { AdminSideBar } from '../adminSideBar/AdminSideBar';
import { Home } from '../../userSide/home/Home';
import { getBookNowData } from '../../../store/actions/showBookNowAction';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export function ShowIncome() {
  const [showIncome, setShowIncome] = useState(true);
  const showIncomeFun = () => {
    setShowIncome(!showIncome);
    navigate('/admin');
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookNowList } = useSelector((state) => state.bookNow);
  let totalIncome = 0;
  bookNowList.forEach(element => {
    totalIncome += parseInt(element.price);
  });
  useEffect(() => {
    dispatch(getBookNowData())

  }, []);

  return (
    <>
      <AdminNavbar />
      <AdminSideBar />
      <Home />
      {/* Modal to Show Total Income */}\

      <div>
        <Modal isOpen={showIncome} toggle={showIncomeFun} >
          <ModalHeader toggle={showIncomeFun}>
          </ModalHeader>
          <ModalBody>
            <h3 className='text-center text-success'> INCOME :{totalIncome} </h3>
          </ModalBody>

        </Modal>
      </div>

    </>
  )
}
