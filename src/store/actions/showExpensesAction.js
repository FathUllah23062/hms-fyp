import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../Firebase"
import { type } from "@testing-library/user-event/dist/type";

export const getExpensesDataFromFirebase = () => async (dispatch) => {
    onSnapshot(collection(db, "expenses"), (snap) => {
        let expensesData = [];
        snap.forEach((doc) => {
            expensesData.push({ id: doc.id, ...doc.data() })
        })
        dispatch({
            type: "EXPENSES_RECORD",
            payload: expensesData
        })
    })
}