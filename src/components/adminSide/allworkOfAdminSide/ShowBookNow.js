import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { AdminSideBar } from '../adminSideBar/AdminSideBar';
import { Home } from '../../userSide/home/Home';
import { useNavigate } from 'react-router';
import { AdminNavbar } from '../adminNavbar/AdminNavbar';
import { toast } from 'react-toastify';
import { getBookNowData } from '../../../store/actions/showBookNowAction';
import { updateBookNow } from '../../../store/actions/updateBookNowAction';
import { deleteBookNow, updateStateToAvalibale } from '../../../store/actions/deleteBookNowAction';
import { getIdOnRoomNoAndBedNo } from '../../../store/actions/getIdOnRoomNoAndBedNoAction';

export function ShowBookNow() {
    const navigate = useNavigate();
    // this code is to show meal record
    const [showBookNow, setShowBookNo] = useState(true);
    const ShowBookNowFun = () => {
        setShowBookNo(!showBookNow);
        navigate("/admin")
    };
    const dispatch = useDispatch();

    const { bookNowList } = useSelector((state) => state.bookNow);
    const { getingId } = useSelector((state) => state.getingId);
    const getedId = getingId;

    useEffect(() => {
        dispatch(getBookNowData())

    }, [])
    const bookNowColumns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Father Name',
            selector: row => row.fName,
            sortable: true,
        },
        {
            name: 'Room No',
            selector: row => row.roomNo,
            sortable: true,
        },
        {
            name: 'Bed No',
            selector: row => row.bedNo,
            sortable: true,
        },
        {
            name: 'Bookin Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Update',
            cell: (row) => (
                <div>
                    <Button
                        outline
                        onClick={() => { updateModalFun(row.id, row.name, row.fName, row.date) }}
                    >Update</Button>

                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Delete',
            cell: (row) => (
                <div>
                    <Button
                        outline
                        color='danger'
                        className=" ml-2"
                        onClick={() => showDeleteModalFun(row.id, row.roomNo, row.bedNo, row.price)}
                    >
                        Delete
                    </Button>

                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];
    useEffect(() => {
        var bookNowData = bookNowList?.map((bookNow) => ({
            id: bookNow.id,
            name: bookNow.name,
            fName: bookNow.fName,
            roomNo: bookNow.roomNo,
            bedNo: bookNow.bedNo,
            date: bookNow.date,
            price: bookNow.price

        }));
        setBookNowRecord(bookNowData)
    }, [bookNowList])

    const [bookNowRecord, setBookNowRecord] = useState()



    const bookNowHandelFilter = (e) => {
        const bookSearchValue = e.target.value.toLowerCase();

        // If the search bar is empty, show all records
        if (bookSearchValue === '') {
            setBookNowRecord(bookNowList?.map((bookNow) => ({
                id: bookNow.id,
                name: bookNow.name,
                fName: bookNow.fName,
                roomNo: bookNow.roomNo,
                bedNo: bookNow.bedNo,
                date: bookNow.date,
                price: bookNow.price
            })));
        } else {
            // Filter the records based on the search value across all columns
            const bookSearch = bookNowList?.filter((row) =>
                Object.values(row).some((value) =>
                    value.toString().toLowerCase().includes(bookSearchValue)
                )
            );

            setBookNowRecord(bookSearch.map((bookNow) => ({
                id: bookNow.id,
                name: bookNow.name,
                fName: bookNow.fName,
                roomNo: bookNow.roomNo,
                bedNo: bookNow.bedNo,
                date: bookNow.date,
                price: bookNow.price
            })));
        }
    };
    //   this code is for to delete the Book Now record
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currnetRecordId, setCurrnetRecordId] = useState();
    const [roomNo, setRoomNo] = useState();
    const [bedNo, setBedNo] = useState();
    const [price, setPrice] = useState();
    const avalibalStatus = 'avalibal';

    const showDeleteModalFun = (id, giRoomNo, giBedNo, giPrice) => {
        setCurrnetRecordId(id);
        console.log(giRoomNo, giBedNo, giPrice);
        setShowDeleteModal(!showDeleteModal);
        setRoomNo(giRoomNo);
        setBedNo(giBedNo);
        setPrice(giPrice);
    }

    useEffect(() => {
        //this is for to update the status form book to avalibal on delete the record form book-now
        if (roomNo !== undefined && bedNo !== undefined && price !== undefined) {
            dispatch(getIdOnRoomNoAndBedNo(roomNo, bedNo, price))
        }
    }, [roomNo, bedNo, price])

    const handelBookNowDelete = () => {
        if (currnetRecordId) {
            dispatch(deleteBookNow(currnetRecordId));
            dispatch(updateStateToAvalibale(getedId, avalibalStatus))
            setShowDeleteModal(!showDeleteModal);

        }
    }
    // this code is for to update the Book Now 
    const [updateModal, setUpdateModal] = useState(false);
    const [updateId, setUpdateId] = useState('');
    const [name, setName] = useState('');
    const [fName, setFName] = useState('');
    const [date, setDate] = useState('');

    const updateModalFun = (id, name, fName, date) => {
        setUpdateId(id);
        setName(name);
        setFName(fName);
        setDate(date);
        setUpdateModal(!updateModal);

    }

    const handelUpdate = (e) => {
        e.preventDefault();
        dispatch(updateBookNow(updateId, name, fName, date))
        toast.success("  Record is Updated successfully!", {
            position: "top-center"
        });
        setUpdateModal(!updateModal);

    }
    return (
        <>
            <AdminNavbar />
            <AdminSideBar />
            <Home />
            {/* Modal to Show Book Now record */}

            <div>
                <Modal isOpen={showBookNow} toggle={ShowBookNowFun} style={{ maxWidth: '60%', width: '60%' }} >
                    {/* this is the Modal header */}
                    <div className="modal-header">
                        <div>
                            <Input
                                placeholder='Search'
                                type='text'
                                onChange={bookNowHandelFilter}

                            />
                        </div>
                        <div>
                            <Button outline className="me-2" onClick={() => navigate('/book-now')}>Book Bed</Button>
                            <button type="button" className="btn-close" aria-label="Close" onClick={ShowBookNowFun}></button>
                        </div>
                    </div>
                    <ModalBody>
                        <DataTable
                            columns={bookNowColumns}
                            data={bookNowRecord}
                            fixedHeader
                        />
                    </ModalBody>
                </Modal>
            </div>

            {/* Modal to Show Delete Conformation */}

            <div>
                <Modal isOpen={showDeleteModal} toggle={showDeleteModalFun} style={{ maxWidth: '20%', width: '20%' }}>
                    <ModalHeader toggle={showDeleteModalFun}>
                        <h6>Delete selected item?</h6>
                    </ModalHeader>
                    <ModalBody>
                        <div className="d-flex justify-content-evenly">
                            <Button onClick={showDeleteModalFun} outline >Cancel</Button>
                            <Button onClick={handelBookNowDelete} color='danger' outline>Delete</Button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
            {/* Modal to Update book now record */}
            <div>
                <Modal isOpen={updateModal} toggle={updateModalFun}>
                    <ModalHeader toggle={updateModalFun}>Add Food Record</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handelUpdate}>
                            <FormGroup>
                                <Label for="name">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    type="text"
                                    className='shadow'
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}

                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">
                                    Father Name
                                </Label>
                                <Input
                                    id="f-name"
                                    name="f-name"
                                    placeholder="Enter your father name"
                                    type="text"
                                    className='shadow'
                                    required
                                    value={fName}
                                    onChange={e => setFName(e.target.value)}

                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="date">
                                    Date
                                </Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    required
                                    className='shadow'
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                            </FormGroup>
                            <Button outline block type='submit' className='mb-3 shadow'>
                                Update Record
                            </Button>
                            <Button outline block onClick={updateModalFun} className='mb-3 shadow'>
                                Cancel
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>

        </>
    )
}


