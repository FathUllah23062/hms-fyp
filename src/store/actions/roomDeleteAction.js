import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";

export const deleteRoomFromFirebase = (id) => async (dispatch) => {
    const deleteRef = doc(db, 'room', id);
    deleteDoc(deleteRef);
}