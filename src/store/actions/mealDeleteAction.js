import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";

export const deleteMealFromFirebase = (id) => async (dispatch) => {
    const deleteRef = doc(db, 'meal', id);
    deleteDoc(deleteRef);
}