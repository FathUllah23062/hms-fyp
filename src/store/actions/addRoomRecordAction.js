import { addDoc, collection } from "firebase/firestore"
import { db } from "../../Firebase"

export const roomRecord = (roomNo, bedNo, price, status) => async (dispatch) => {
    await addDoc(collection(db, "room"), {

        roomNo,
        bedNo,
        price,
        status
    })
}