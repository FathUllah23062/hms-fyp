import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { roomRecord } from '../../../store/actions/addRoomRecordAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AdminSideBar } from '../adminSideBar/AdminSideBar';
import { Home } from '../../userSide/home/Home';
import { AdminNavbar } from '../adminNavbar/AdminNavbar';


export function AddRoomRecord() {
    // this code is for adding the room record
    const [modalForRoom, setModalForRoom] = useState(true);
    const [roomNo, setRoomNo] = useState("");
    const [bedNo, setBeds] = useState("");
    const [price, setPrice] = useState("");
    const status = "avalibal";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roomModal = () => {
        setModalForRoom(!modalForRoom);
        navigate("/admin")
    }

    const submitRoomRecord = (e) => {
        e.preventDefault();
        dispatch(roomRecord(roomNo, bedNo, price, status));
        setRoomNo("");
        setBeds("");
        setPrice("");
        navigate('/show-room')
        toast.success(" Room Record is add successfully!", {
            position: "top-center"
        });
    }
    return (
        <div>
            <AdminNavbar />
            <AdminSideBar />
            <Home />
            {/* Modal to add room record */}
            <div>
                <Modal isOpen={modalForRoom} toggle={roomModal}>
                    <ModalHeader toggle={roomModal}>Add Room Record</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={submitRoomRecord}>
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
                                    onChange={(e) => setBeds(e.target.value)}

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
                            <FormGroup  >
                                <Label for='status'>Status</Label>
                                <Input
                                    id="status"
                                    name="status"
                                    required
                                    type="text"
                                    className='shadow'
                                    value={status}
                                    disabled
                                >

                                </Input>
                            </FormGroup>
                            <Button outline block type='submit' className='mb-3 shadow'>
                                Save Record
                            </Button>
                            <Button outline block onClick={roomModal} className='mb-3 shadow'>
                                Cancel
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </div>

        </div>
    )
}

