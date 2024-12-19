import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { getMealDataFromFirebase } from '../../../store/actions/showMealRecordAction'
import { useDispatch, useSelector } from 'react-redux';
import { AdminSideBar } from '../adminSideBar/AdminSideBar';
import { Home } from '../../userSide/home/Home';
import { useNavigate } from 'react-router';
import { deleteMealFromFirebase } from '../../../store/actions/mealDeleteAction';
import { AdminNavbar } from '../adminNavbar/AdminNavbar';
import { updateMeal } from '../../../store/actions/updateMealAction';
import { toast } from 'react-toastify';

export function ShowMealRecord() {
    const navigate = useNavigate();
    // this code is to show meal record
    const [showMeal, setShowMeal] = useState(true);
    const showMealFun = () => {
        setShowMeal(!showMeal);
        navigate("/admin")
    };
    const dispatch = useDispatch();

    const { mealList, } = useSelector((state) => state.meal)
    useEffect(() => {
        dispatch(getMealDataFromFirebase())

    }, [])
    const mealColumns = [
        {
            name: 'Day',
            selector: row => row.day,
            sortable: true,
        },
        {
            name: 'Meal Time',
            selector: row => row.mealTime,
            sortable: true,
        },
        {
            name: 'Meal Type',
            selector: row => row.mealType,
            sortable: true,
        },
        {
            name: 'Update',
            cell: (row) => (
                <div>
                    <Button
                        outline
                        onClick={() => { updateModalFun(row.id, row.day, row.mealTime, row.mealType) }}
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
                        onClick={() => showDeleteModalFun(row.id)}
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
        var mealData = mealList?.map((meal) => ({
            id: meal.id,
            day: meal.day,
            mealTime: meal.mealTime,
            mealType: meal.mealType

        }));
        setmealRecords(mealData)
    }, [mealList])

    const [mealRecords, setmealRecords] = useState()



    const mealHandelFilter = (e) => {
        const mealSearchValue = e.target.value.toLowerCase();

        // If the search bar is empty, show all records
        if (mealSearchValue === '') {
            setmealRecords(mealList?.map((meal) => ({
                id: meal.id,
                day: meal.day,
                mealTime: meal.mealTime,
                mealType: meal.mealType
            })));
        } else {
            // Filter the records based on the search value across all columns
            const mealSearch = mealList?.filter((row) =>
                Object.values(row).some((value) =>
                    value.toString().toLowerCase().includes(mealSearchValue)
                )
            );

            setmealRecords(mealSearch.map((meal) => ({
                id: meal.id,
                day: meal.day,
                mealTime: meal.mealTime,
                mealType: meal.mealType
            })));
        }
    };
    //   this code is for to delete the meal record
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentRoomId, setCurrentRoomId] = useState(null);

    const showDeleteModalFun = (id) => {
        setShowDeleteModal(!showDeleteModal);
        setCurrentRoomId(id);
    }

    const handelMealDelete = () => {
        if (currentRoomId) {
            dispatch(deleteMealFromFirebase(currentRoomId));
            setShowDeleteModal(!showDeleteModal);
        }
    }
    // this code is for to update the meal menue
    const [updateModal, setUpdateModal] = useState(false);
    const [id, setId] = useState('');
    const [day, setDay] = useState('');
    const [mealTime, setMealTime] = useState('');
    const [mealType, setMealType] = useState('');

    const updateModalFun = (id, day, mealTime, mealType) => {
        setId(id);
        setDay(day);
        setMealTime(mealTime);
        setMealType(mealType);
        setUpdateModal(!updateModal);

    }

    const handelUpdate = (e) => {
        e.preventDefault();
        dispatch(updateMeal(id, day, mealTime, mealType))
        toast.success(" Meal Record is Updated successfully!", {
            position: "top-center"
        });
        setUpdateModal(!updateModal);

    }
    return (
        <>
            <AdminNavbar />
            <AdminSideBar />
            <Home />
            {/* Modal to Show meal record */}\

            <div>
                <Modal isOpen={showMeal} toggle={showMealFun} style={{ maxWidth: '75%', width: '75%' }} >
                    {/* this is the Modal header */}
                    <div className="modal-header">
                        <div>
                            <Input
                                placeholder='Search'
                                type='text'
                                onChange={mealHandelFilter}

                            />
                        </div>
                        <div>
                            <Button outline className="me-2" onClick={() => navigate('/add-meal')}>Add New Record</Button>
                            <button type="button" className="btn-close" aria-label="Close" onClick={showMealFun}></button>
                        </div>
                    </div>
                    <ModalBody>
                        <DataTable
                            columns={mealColumns}
                            data={mealRecords}
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
                            <Button onClick={handelMealDelete} color='danger' outline>Delete</Button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
            {/* Modal to Update meal record */}
            <div>
                <Modal isOpen={updateModal} toggle={updateModalFun}>
                    <ModalHeader toggle={updateModalFun}>Add Food Record</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handelUpdate}>
                            <FormGroup>
                                <Label for="day">
                                    Day
                                </Label>
                                <Input
                                    id="day"
                                    type="select"
                                    className='shadow'
                                    required
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}

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


