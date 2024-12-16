import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../Firebase"

export const deleteExpensesFromFirebase = (id) => async (dispatch) => {
    const deleteRef = doc(db, "expenses", id);
    deleteDoc(deleteRef)

}