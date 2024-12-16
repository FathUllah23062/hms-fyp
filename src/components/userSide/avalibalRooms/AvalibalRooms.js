import React, { useEffect, useState } from 'react'
import { Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from '../home/Home';
import { UserSideBar } from '../userSideBar/UserSideBar';
import { NavigationBar } from '../navbar/NavigationBar';
import { getingAvalibalRoomData } from '../../../store/actions/showRoomRecordAction';

export function AvalibalRooms() {
    // this code is to show room record
    const [showRoom, setShowRoom] = useState(true);
    const avalibalStatus = 'avalibal';
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const showRoomFun = () => {
        setShowRoom(!showRoom);
        navigate('/');


    }

    const { avalibalRooms } = useSelector((state) => state.room);
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

    ];
    useEffect(() => {
        var roomData = avalibalRooms?.map((room) => ({

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

                roomNo: room.roomNo,
                bedNo: room.bedNo,
                price: room.price,
                status: room.status,
            })));
        }
    };
    return (
        <>
            <NavigationBar />
            <UserSideBar />
            <Home />
            {/* Modal to Show room record */}

            <div>
                <Modal isOpen={showRoom} toggle={showRoomFun} style={{ maxWidth: '60%', width: '60%' }}>
                    <ModalHeader toggle={showRoomFun}>

                        <Input
                            placeholder='Search'
                            type='text'
                            onChange={roomHandelFilter}

                        />


                    </ModalHeader>
                    <ModalBody>
                        <DataTable
                            columns={roomColumns}
                            data={roomRecords}
                            fixedHeader
                        />
                    </ModalBody>
                </Modal>
            </div>
        </>
    )
}


