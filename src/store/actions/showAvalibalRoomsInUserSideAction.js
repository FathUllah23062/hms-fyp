import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Firebase";

export const getingConditonalRoomData = (avalibalStatus) => async (dispatch) => {

    const collectionsRef = collection(db, 'room');
    const querySnap = query(
        collectionsRef,
        where('status', '==', avalibalStatus),  // Filter by avalibal status
    );
    onSnapshot(querySnap, (items) => {
        let conditionalRoomData = []
        items.forEach((doc) => {
            conditionalRoomData.push({ id: doc.id, ...doc.data() })
        })

        dispatch({
            type: 'CONDITIONAL_ROOM_DATA',
            payload: conditionalRoomData
        })
    })

}