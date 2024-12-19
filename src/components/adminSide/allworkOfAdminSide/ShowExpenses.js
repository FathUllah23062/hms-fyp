import React, { useEffect, useState } from 'react'
import { AdminNavbar } from '../adminNavbar/AdminNavbar'
import { AdminSideBar } from '../adminSideBar/AdminSideBar'
import { Home } from '../../userSide/home/Home'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { getExpensesDataFromFirebase } from '../../../store/actions/showExpensesAction';
import { deleteExpensesFromFirebase } from '../../../store/actions/deleteExpensesAction';
import { updateExpenses } from '../../../store/actions/updateExpensesAction';
import { toast } from 'react-toastify';

export function ShowExpenses() {
    const navigate = useNavigate();
    // this code is to show meal record
    const [showExpenses, setShowExpenses] = useState(true);
    const showExpensesFun = () => {
        setShowExpenses(!setShowExpenses);
        navigate("/admin")
    };
    const dispatch = useDispatch();
    const { expensesList } = useSelector((state) => state.expenses);
    let totalExpenses = 0;
    expensesList.forEach(element => {
        totalExpenses += parseInt(element.price);
    });
    useEffect(() => {
        dispatch(getExpensesDataFromFirebase())

    }, [])
    const expensesColumns = [
        {
            name: 'Item',
            selector: row => row.item,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Update',
            cell: (row) => (
                <div>
                    <Button
                        outline
                        onClick={() => { updateModalFun(row.id, row.item, row.price, row.date) }}
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
        var expensesData = expensesList?.map((expenses) => ({
            id: expenses.id,
            item: expenses.item,
            price: expenses.price,
            date: expenses.date,


        }));
        setExpensesRecord(expensesData)
    }, [expensesList])

    const [expensesRecord, setExpensesRecord] = useState()



    const expensesHandelFilter = (e) => {
        const expensesSearchValue = e.target.value.toLowerCase();

        // If the search bar is empty, show all records
        if (expensesSearchValue === '') {
            setExpensesRecord(expensesList?.map((expenses) => ({
                id: expenses.id,
                item: expenses.item,
                price: expenses.price,
                date: expenses.date,
            })));
        } else {
            // Filter the records based on the search value across all columns
            const expensesSearch = expensesList?.filter((row) =>
                Object.values(row).some((value) =>
                    value.toString().toLowerCase().includes(expensesSearchValue)
                )
            );

            setExpensesRecord(expensesSearch.map((expenses) => ({
                id: expenses.id,
                item: expenses.item,
                price: expenses.price,
                date: expenses.date,
            })));
        }
    };
    //   this code is for to delete the show expenses record
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentRoomId, setCurrentRoomId] = useState(null);

    const showDeleteModalFun = (id) => {
        setShowDeleteModal(!showDeleteModal);
        setCurrentRoomId(id);
    }

    const handelExpansesDelete = () => {
        if (currentRoomId) {
            dispatch(deleteExpensesFromFirebase(currentRoomId));
            setShowDeleteModal(!showDeleteModal);
        }
    }

    // this code is for to update the expenses 
    const [updateModal, setUpdateModal] = useState(false);
    const [id, setId] = useState('');
    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');

    const updateModalFun = (id, item, price, date) => {
        setId(id);
        setItem(item);
        setPrice(price);
        setDate(date);
        setUpdateModal(!updateModal);

    }

    const handelUpdate = (e) => {
        e.preventDefault();
        dispatch(updateExpenses(id, item, price, date))
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
            {/* Modal to Show Expenses */}
            <div>
                <Modal isOpen={showExpenses} toggle={showExpensesFun} style={{ maxWidth: '75%', width: '75%' }} >
                    {/* this is the Modal header */}
                    <div className="modal-header">
                        <div>
                            <h3 className='text-danger'>Total Expenses : {totalExpenses}</h3>
                            <Input
                                placeholder='Search'
                                type='text'
                                onChange={expensesHandelFilter}

                            />
                        </div>
                        <div>
                            <Button outline className="me-2" onClick={() => navigate('/enter-expenses')}>Add New Record</Button>
                            <button type="button" className="btn-close" aria-label="Close" onClick={showExpensesFun}></button>
                        </div>
                    </div>
                    <ModalBody>
                        <DataTable
                            columns={expensesColumns}
                            data={expensesRecord}
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
                            <Button onClick={handelExpansesDelete} color='danger' outline>Delete</Button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>

            {/* Modal to update  Expenses */}
            <div>
                <Modal isOpen={updateModal} toggle={updateModalFun}>
                    <ModalHeader toggle={updateModalFun} className='text-center'>Enter Expenses</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handelUpdate}>
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
