import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";

export const deleteBookNow = (id) => async (dispatch) => {
    const deleteRef = doc(db, 'book-now', id);
    deleteDoc(deleteRef);
}
export const updateStateToAvalibale = (id, status) => async (dispatch) => {
    const refUpdateId = doc(db, "room", id)
    updateDoc(refUpdateId, {
        status: status,
    })
}