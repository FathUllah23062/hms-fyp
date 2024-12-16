import { addDoc, collection } from "firebase/firestore"
import { db } from "../../Firebase"

export const mealRecord = (day, mealTime, mealType) => async (dispatch) => {
    await addDoc(collection(db, "meal"), {
        day,
        mealTime,
        mealType
    })
}