import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { mealRecord } from '../../../store/actions/addMealRecordAction';
import { toast } from 'react-toastify';
import { AdminSideBar } from '../adminSideBar/AdminSideBar';
import { Home } from '../../userSide/home/Home';
import { useNavigate } from 'react-router';
import { AdminNavbar } from '../adminNavbar/AdminNavbar';


export function AddMealRecord() {
    // this code is for adding the food record
    const [modalForFood, setModalForFood] = useState(true);
    const [mealDay, setMealDay] = useState("");
    const [mealTime, setMealTime] = useState("");
    const [mealType, setMealType] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const foodModal = () => {
        setModalForFood(!modalForFood);
        navigate('/admin');
    }


    const submitFoodRecord = (e) => {
        e.preventDefault();
        dispatch(mealRecord(mealDay, mealTime, mealType))
        setMealDay("");
        setMealTime("");
        setMealType("");
        navigate('/show-meal')
        toast.success(" Meal Record is add successfully!", {
            position: "top-center"
        });
    }

    return (
        <div>
            <AdminNavbar />
            <AdminSideBar />
            <Home />
            {/* Modal to add food record */}
            <div>
                <Modal isOpen={modalForFood} toggle={foodModal}>
                    <ModalHeader toggle={foodModal}>Add Food Record</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={submitFoodRecord}>
                            <FormGroup>
                                <Label for="day">
                                    Day
                                </Label>
                                <Input
                                    id="day"
                                    type="select"
                                    className='shadow'
                                    required
                                    value={mealDay}
                                    onChange={(e) => setMealDay(e.target.value)}

                                >
                                    <option value="">Select Day</option>
                                    <option value="monday">Monday</option>
                                    <option value="tuseday">Tuseday</option>
                                    <option value="wednesday">Wednesday</option>
                                    <option value="thursday">Thursday</option>
                                    <option value="friday">Friday</option>
                                    <option value="saturday">Saturday</option>
                                    <option value="sunday">Sunday</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="lunch">
                                    Meal Time
                                </Label>
                                <Input
                                    id="lunch"
                                    type="select"
                                    className='shadow'
                                    required
                                    value={mealTime}
                                    onChange={(e) => setMealTime(e.target.value)}
                                >
                                    <option value="">Select meal time</option>
                                    <option value="breakfast">Beakfast</option>
                                    <option value="lunch">Lunch</option>
                                    <option value="dinner">Dinner</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="meal">
                                    Meal Type
                                </Label>
                                <Input
                                    id="meal"
                                    type="select"
                                    className='shadow'
                                    required
                                    value={mealType}
                                    onChange={(e) => setMealType(e.target.value)}
                                >
                                    <option value="">Select meal type</option>
                                    <option value="بریانی">بریانی</option>
                                    <option value="لوبیا">لوبیا</option>
                                    <option value="دال ماش">دال ماش</option>
                                    <option value="مرغی">مرغی</option>
                                    <option value="چاۓ پراٹھا + چنہ">چاۓ پراٹھا + چنہ</option>
                                    <option value="چاۓ +بریڈ">چاۓ +بریڈ</option>
                                    <option value="چاول">چاول</option>
                                    <option value="سبزی">سبزی</option>
                                    <option value="کچھ نہیں">کچھ نہیں</option>
                                </Input>
                            </FormGroup>
                            <Button outline block type='submit' className='mb-3 shadow'>
                                Save Record
                            </Button>
                            <Button outline block onClick={foodModal} className='mb-3 shadow'>
                                Cancel
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>

        </div>
    )
}


