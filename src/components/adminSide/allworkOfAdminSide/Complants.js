import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getComplantDataFromFirebase } from '../../../store/actions/complantAction';
import { AdminNavbar } from '../adminNavbar/AdminNavbar';
import { AdminSideBar } from '../adminSideBar/AdminSideBar';
import { Home } from '../../userSide/home/Home';


export function Complants() {
    const navigate = useNavigate();
    // this code is to show complants record
    const [showComplants, setShowComplants] = useState(true);
    const showComplantsFun = () => {
        setShowComplants(!showComplants);
        navigate("/admin")
    };
    const dispatch = useDispatch();

    const { complantsList, } = useSelector((state) => state.complants)
    useEffect(() => {
        dispatch(getComplantDataFromFirebase())

    }, [])
    const complantsColumns = [
        {
            name: 'Name',
            selector: row => row.userName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Message',
            selector: row => row.message,
            sortable: true,
        },
    ];
    useEffect(() => {
        var complantData = complantsList?.map((complant) => ({

            userName: complant.userName,
            email: complant.email,
            message: complant.message

        }));
        setComplantsRecord(complantData)
    }, [complantsList])

    const [complantsRecord, setComplantsRecord] = useState()
    return (
        <>
            <AdminNavbar />
            <AdminSideBar />
            <Home />
            {/* Modal to Show Complants */}\

            <div>
                <Modal isOpen={showComplants} toggle={showComplantsFun} style={{ maxWidth: '60%', width: '60%' }} >
                    <ModalHeader toggle={showComplantsFun}>
                        <h4>Complants : </h4>
                    </ModalHeader>
                    <ModalBody>
                        <DataTable
                            columns={complantsColumns}
                            data={complantsRecord}
                            fixedHeader
                        />
                    </ModalBody>
                </Modal>
            </div>

        </>
    )
}
