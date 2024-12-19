import React, { useEffect, useState } from 'react'
import { AdminSideBar } from '../adminSideBar/AdminSideBar';
import { Home } from '../../userSide/home/Home';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getingAvalibalRoomData } from '../../../store/actions/showRoomRecordAction';
import { useNavigate } from 'react-router';
import { deleteRoomFromFirebase } from '../../../store/actions/roomDeleteAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateRoom } from '../../../store/actions/UpdateRoomAction';
import { toast } from 'react-toastify';
import { AdminNavbar } from '../adminNavbar/AdminNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Modal.css';

export function ShowRoomRecord() {
    // this code is to show room record
    const [showRoom, setShowRoom] = useState(true);
    const navigate = useNavigate();
    const avalibalStatus = 'avalibal';

    const dispatch = useDispatch();
    const showRoomFun = () => {
        setShowRoom(!showRoom);
        navigate('/admin');

    }

    const { avalibalRooms, } = useSelector((state) => state.room);
    useEffect(() => {
        dispatch(getingAvalibalRoomData(avalibalStatus))

    }, [])
    const roomColumns = [
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
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Update',
            cell: (row) => (
                <div><Button
                    outline
                    onClick={() => { updateModalFun(row.id, row.roomNo, row.bedNo, row.price) }}
                >Update </Button></div>
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
                        color='danger'
                        outline
                        className=" ml-2"
                        onClick={() => { showDeleteModalFun(row.id) }}

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
        var roomData = avalibalRooms?.map((room) => ({
            id: room.id,
            roomNo: room.roomNo,
            bedNo: room.bedNo,
            price: room.price,
            status: room.status,


        }));
        setRoomRecords(roomData)
    }, [avalibalRooms])

    const [roomRecords, setRoomRecords] = useState()



    const roomHandelFilter = (e) => {
        const searchValue = e.target.value.toLowerCase();

        // If the search bar is empty, show all records
        if (searchValue === '') {
            setRoomRecords(avalibalRooms?.map((room) => ({
                id: room.id,
                roomNo: room.roomNo,
                bedNo: room.bedNo,
                price: room.price,
                status: room.status,
            })));
        } else {

            // Filter the records based on the search value across all columns

            const newData = avalibalRooms?.filter((row) =>
                Object.values(row).some((value) =>
                    value.toString().toLowerCase().includes(searchValue)
                )
            );

            setRoomRecords(newData.map((room) => ({
                id: room.id,
                roomNo: room.roomNo,
                bedNo: room.bedNo,
                price: room.price,
                status: room.status,
            })));
        }
    };



    //   this code is for to delete the room record
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentRoomId, setCurrentRoomId] = useState(null);

    const showDeleteModalFun = (id) => {
        setShowDeleteModal(!showDeleteModal);
        setCurrentRoomId(id);
    }

    const handelRoomDelete = () => {
        if (currentRoomId) {
            dispatch(deleteRoomFromFirebase(currentRoomId));
            setShowDeleteModal(!showDeleteModal);
        }
    }
    //this code is for update the room record
    const [updateModal, setUpdateModal] = useState(false);
    const [id, setId] = useState('');
    const [roomNo, setRoomNo] = useState('');
    const [bedNo, setBedNo] = useState('');
    const [price, setPrice] = useState('');

    const updateModalFun = (id, roomNo, bedNo, price) => {
        setId(id);
        setRoomNo(roomNo);
        setBedNo(bedNo);
        setPrice(price);
        setUpdateModal(!updateModal);

    }

    const handelUpdate = (e) => {
        e.preventDefault();
        dispatch(updateRoom(id, roomNo, bedNo, price))
        toast.success(" Room Record is Updated successfully!", {
            position: "top-center"
        });
        setUpdateModal(!updateModal);

    }
    return (
        <>
            <AdminNavbar />
            <AdminSideBar />
            <Home />
            {/* Modal to Show room record */}

            <div>
                <Modal isOpen={showRoom} toggle={showRoomFun} style={{ maxWidth: '75%', width: '75%' }}>

                    {/* this is the Modal header */}
                    <div className="modal-header">
                        <div>
                            <Input
                                placeholder="Search"
                                type="search"
                                onChange={roomHandelFilter}
                            />
                        </div>
                        <div>
                            <Button outline className="me-2" onClick={() => navigate('/add-room')}>Add New Record</Button>
                            <button type="button" className="btn-close" aria-label="Close" onClick={showRoomFun}></button>
                        </div>
                    </div>
                    <ModalBody>
                        <DataTable
                            columns={roomColumns}
                            data={roomRecords}
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
                            <Button onClick={handelRoomDelete} color='danger' outline>Delete</Button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>

            {/* Modal to Update Room Record */}
            <div>
                <Modal isOpen={updateModal} toggle={updateModalFun}>
                    <ModalHeader toggle={updateModalFun}>Add Room Record</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handelUpdate}>
                            <FormGroup>
                                <Label for="roomNo">
                                    Room No
                                </Label>
                                <Input
                                    id="roomNo"
                                    name="roomNo"
                                    placeholder="Enter room no"
                                    type="number"
                                    className='shadow'
                                    required
                                    value={roomNo}
                                    onChange={(e) => setRoomNo(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup >
                                <Label for="beds">
                                    Bed No
                                </Label>
                                <Input
                                    id="beds"
                                    name="beds"
                                    type="number"
                                    placeholder='Enter total beds'
                                    required
                                    className='shadow'
                                    value={bedNo}
                                    onChange={(e) => setBedNo(e.target.value)}

                                />

                            </FormGroup>
                            <FormGroup>
                                <Label for="prince">
                                    Price
                                </Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder='Enter total price'
                                    required
                                    className='shadow'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />

                            </FormGroup>
                            <Button outline block type='submit' className='mb-3 shadow'>
                                Update
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


