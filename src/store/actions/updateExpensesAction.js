import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../Firebase"

export const updateExpenses = (id, item, price, date) => async (dispatch) => {
    const updateRef = doc(db, "expenses", id);
    updateDoc(updateRef, {
        item,
        price,
        date
    })
}