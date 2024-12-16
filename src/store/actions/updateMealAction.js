import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../Firebase"

export const updateMeal = (id, day, mealTime, mealType) => async (dispatch) => {
    const refUpdateId = doc(db, "meal", id)
    updateDoc(refUpdateId, {
        day,
        mealTime,
        mealType
    })
}