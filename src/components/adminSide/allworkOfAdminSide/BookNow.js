import React, { useEffect, useState } from 'react'
import { AdminNavbar } from '../adminNavbar/AdminNavbar'
import { AdminSideBar } from '../adminSideBar/AdminSideBar'
import { Home } from '../../userSide/home/Home'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getingAvalibalRoomData } from '../../../store/actions/showRoomRecordAction'
import { getingConditonalData } from '../../../store/actions/getConditionalDataAction'
import { getingConditonalId } from '../../../store/actions/getConditionIdAction'
import { addBookNowInFirebase, updateStatusToBook } from '../../../store/actions/addBookNowAction';
import { toast } from 'react-toastify';

export function BookNow() {
    const [bookBedModal, setBookBedModal] = useState(true);
    const [name, setName] = useState();
    const [fName, setFName] = useState();
    const [date, setDate] = useState();
    const [roomNo, setRoomNo] = useState();
    const [bedNo, setBedNo] = useState();
    const [price, setPrice] = useState();
    const { avalibalRooms } = useSelector((state) => state.room);
    // to get conditionalData for showing the bedNo and price 
    const { conditionalData } = useSelector((state) => state.conditionalData);
    // to get conditionalId for update the status form avalibal to book 
    const { conditionalId } = useSelector((state) => state.conditionalId);
    const id = conditionalId;
    const bookStatus = "book";
    const avalibalStatus = "avalibal";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //useEffecf for geting the room record to show in roomNo input
    useEffect(() => {
        dispatch(getingAvalibalRoomData(avalibalStatus))

    }, [])

    // bookModalFun is the function to show the BookNow modal
    const bookBedModalFun = () => {
        setBookBedModal(!bookBedModal);
        navigate('/admin');

    }

    // to get conditional data for roomNo input
    useEffect(() => {
        if (roomNo !== undefined && avalibalStatus) {
            dispatch(getingConditonalData(roomNo, avalibalStatus))
        }
    }, [roomNo, avalibalStatus])
    //to get conditionalId for update the status form avalibal to book
    useEffect(() => {
        if (roomNo !== undefined && bedNo !== undefined && price !== undefined) {
            dispatch(getingConditonalId(roomNo, bedNo, price))

        }
    }, [roomNo, bedNo, price]);

    // to submit the bookNow data to firebase
    const sumbitBookNow = (e) => {
        e.preventDefault();
        dispatch(addBookNowInFirebase(name, fName, roomNo, bedNo, price, date));
        dispatch(updateStatusToBook(id, bookStatus));
        setName('');
        setFName('');
        setRoomNo('');
        setBedNo('');
        setPrice('');
        setDate('');
        toast.success(" The bed is bookd successfuly", {
            position: "top-center"
        });
    }
    return (
        <>
            <AdminNavbar />
            <AdminSideBar />
            <Home />

            {/* Modal to Book Bed  */}
            <div>
                <Modal isOpen={bookBedModal} toggle={bookBedModalFun}>
                    <ModalHeader toggle={bookBedModalFun}>Book a Bed</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={sumbitBookNow}>
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
                                <Label for="roomNo">
                                    Room No
                                </Label>
                                <Input
                                    id="roomNo"
                                    name="roomNo"
                                    type="select"
                                    required
                                    className='shadow'
                                    value={roomNo}
                                    onChange={(e) => setRoomNo(e.target.value)}
                                >
                                    <option value="" selected>Select Room No</option>
                                    {avalibalRooms?.map((room, index) => (
                                        <option key={index} value={room.roomNo}>
                                            {room.roomNo}
                                        </option>

                                    ))}
                                </Input>

                            </FormGroup>
                            <FormGroup>
                                <Label for="bedNo">
                                    Bed No
                                </Label>
                                <Input
                                    id="bedNo"
                                    name="bedNo"
                                    type="select"
                                    required
                                    className='shadow'
                                    value={bedNo}
                                    onChange={(e) => setBedNo(e.target.value)}
                                >
                                    <option value="" selected>Select Bed No</option>
                                    {conditionalData?.map((bed, index) => (
                                        <option key={index} value={bed.bedNo}>
                                            {bed.bedNo}
                                        </option>

                                    ))}
                                </Input>

                            </FormGroup>

                            <FormGroup>
                                <Label for="price">
                                    Price
                                </Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="select"
                                    required
                                    className='shadow'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                    <option value="" selected>Select Price</option>
                                    {conditionalData?.map((price, index) => (
                                        <option key={index} value={price.price}>
                                            {price.price}
                                        </option>

                                    ))}
                                </Input>
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
                                Book Bed
                            </Button>
                            <Button outline block onClick={bookBedModalFun} className='mb-3 shadow'>
                                Cancel
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </div>

        </>
    )
}
