import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../Firebase"

export const updateBookNow = (id, name, fName, date) => async (dispatch) => {
    const refUpdateId = doc(db, "book-now", id)
    updateDoc(refUpdateId, {
        name,
        fName,
        date
    })
}
