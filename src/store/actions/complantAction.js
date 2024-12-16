import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../Firebase"

export const getComplantDataFromFirebase = () => async (dispatch) => {
    onSnapshot(collection(db, "contact"), (snap) => {
        let complantData = [];
        snap.forEach(doc => {
            complantData.push({ id: doc.id, ...doc.data() })
        });
        dispatch({
            type: "COMPLANTS",
            payload: complantData
        })
    })
}