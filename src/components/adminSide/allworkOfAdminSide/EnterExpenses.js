import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { AdminNavbar } from '../adminNavbar/AdminNavbar';
import { AdminSideBar } from '../adminSideBar/AdminSideBar';
import { Home } from '../../userSide/home/Home';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { enterExpenses } from '../../../store/actions/enterExpensesAction';
import { toast } from 'react-toastify';

export function EnterExpenses() {
    const [expenseModal, setExpenseModal] = useState(true);
    const [item, setItem] = useState();
    const [price, setPrice] = useState();
    const [date, setDate] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const expenseModalFun = () => {
        setExpenseModal(!expenseModal);
        navigate('/admin');
    }
    const submitonEnterExpenses = (e) => {
        e.preventDefault();
        dispatch(enterExpenses(item, price, date));
        setItem('');
        setPrice('');
        setDate('');
        navigate('/show-expenses');
        toast.success("Record is add successfully.", {
            position: "top-center"
        });


    }
    return (
        <>
            <AdminNavbar />
            <AdminSideBar />
            <Home />

            {/*  Modal to Enter Expenses */}

            <div>
                <Modal isOpen={expenseModal} toggle={expenseModalFun}>
                    <ModalHeader toggle={expenseModalFun} className='text-center'>Enter Expenses</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={submitonEnterExpenses}>
                            <Label for="item">
                                Item
                            </Label>
                            <FormGroup className='shadow'>
                                <Input
                                    id="item"
                                    name="item"
                                    placeholder="Enter item name"
                                    type="text"
                                    required
                                    value={item}
                                    onChange={(e) => setItem(e.target.value)}
                                />

                            </FormGroup>
                            <FormGroup className='shadow'>
                                <Label for="price">
                                    Price
                                </Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder='Enter item price'
                                    required
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />

                            </FormGroup>
                            <FormGroup className='shadow'>
                                <Label for="date">
                                    Date
                                </Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    placeholder='date'
                                    required
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />

                            </FormGroup>
                            <Button outline block type='submit' className='mb-3 shadow'>
                                Save
                            </Button>
                            <Button outline block onClick={expenseModalFun} className='mb-3 shadow'>
                                Cancel
                            </Button>
                        </Form>

                    </ModalBody>
                </Modal>
            </div>
        </>
    )
}
