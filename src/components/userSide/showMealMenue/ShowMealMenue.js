import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { getMealDataFromFirebase } from '../../../store/actions/showMealRecordAction'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { UserSideBar } from '../userSideBar/UserSideBar';
import { Home } from '../home/Home';
import { NavigationBar } from '../navbar/NavigationBar'

export function ShowMealMenue() {
    const navigate = useNavigate();
    // this code is to show meal record
    const [showMeal, setShowMeal] = useState(true);
    const showMealFun = () => {
        setShowMeal(!showMeal);
        navigate("/");
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
    ];
    useEffect(() => {
        var mealData = mealList?.map((meal) => ({

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

                day: meal.day,
                mealTime: meal.mealTime,
                mealType: meal.mealType
            })));
        }
    };

    return (
        <>
            <NavigationBar />
            <UserSideBar />
            <Home />
            {/* Modal to Show meal record */}\

            <div>
                <Modal isOpen={showMeal} toggle={showMealFun} style={{ maxWidth: '60%', width: '60%' }} >
                    <ModalHeader toggle={showMealFun}>

                        <Input
                            placeholder='Search'
                            type='text'
                            onChange={mealHandelFilter}

                        />


                    </ModalHeader>
                    <ModalBody>
                        <DataTable
                            columns={mealColumns}
                            data={mealRecords}
                            fixedHeader
                        />
                    </ModalBody>
                </Modal>
            </div>

        </>
    )
}


