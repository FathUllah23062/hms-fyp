import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Firebase";

export const getingConditonalData = (roomNo, avalibalStatus) => async (dispatch) => {

    const collectionsRef = collection(db, 'room');
    const querySnap = query(
        collectionsRef,
        where('roomNo', '==', roomNo),  // Filter by roomNo
        where('status', '==', avalibalStatus),  // Filter by roomNo
    );
    onSnapshot(querySnap, (items) => {
        let conditionalData = []
        items.forEach((doc) => {
            conditionalData.push({ id: doc.id, ...doc.data() })
        })

        dispatch({
            type: 'CONDITIONAL_DATA',
            payload: conditionalData
        })
    })

}
