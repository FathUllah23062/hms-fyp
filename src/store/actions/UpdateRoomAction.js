import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../Firebase"

export const updateRoom = (id, roomNo, bedNo, price) => async (dispatch) => {
    const refUpdateId = doc(db, "room", id)
    updateDoc(refUpdateId, {
        roomNo,
        bedNo, price
    })
}