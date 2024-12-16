import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { db } from "../../Firebase"


export const addBookNowInFirebase = (name, fName, roomNo, bedNo, price, date) => async (dispatch) => {
    await addDoc(collection(db, "book-now"), {
        name,
        fName,
        roomNo,
        bedNo,
        price,
        date
    })
}

export const updateStatusToBook = (id, status) => async (dispatch) => {
    const refUpdateId = doc(db, "room", id)
    updateDoc(refUpdateId, {
        status: status,
    })
}