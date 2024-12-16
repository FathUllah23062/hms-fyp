import { addDoc, collection, } from "firebase/firestore"
import { db } from "../../Firebase"


export const enterExpenses = (item, price, date) => async (dispatch) => {
    await addDoc(collection(db, "expenses"), {
        item,
        price,
        date
    })
}
