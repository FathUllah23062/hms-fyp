import { addDoc, collection } from "firebase/firestore"
import { db } from "../../Firebase"

export const addContact = (email, userName, message) => async (dispatch) => {
    addDoc(collection(db, "contact"), {
        email,
        userName,
        message
    })
}