import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Firebase";

export const getIdOnRoomNoAndBedNo = (roomNo, bedNo, price) => async (dispatch) => {
    const collectionsRefId = collection(db, 'room');
    const querySnapId = query(
        collectionsRefId,
        where('roomNo', '==', roomNo),  // Filter by roomNo
        where('bedNo', '==', bedNo),  // Filter by bedNo
        where('price', '==', price)   // Filter by price

    );

    onSnapshot(querySnapId, (itemsId) => {
        let conditionalId = null; // Initialize as null
        itemsId.forEach((doc) => {
            conditionalId = doc.id; // Assign the ID (assuming only one match is expected)
        });
        dispatch({
            type: 'GETING_ID',
            payload: conditionalId // Dispatch only the ID
        });
    });
};