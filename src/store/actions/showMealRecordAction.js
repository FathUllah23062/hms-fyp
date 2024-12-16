import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../Firebase"

export const getMealDataFromFirebase = () => async (dispatch) => {
    onSnapshot(collection(db, 'meal'), (snap) => {
        let mealData = []
        snap.forEach((doc) => {
            mealData.push({ id: doc.id, ...doc.data() })
        })
        dispatch({
            type: 'SHOW_MEAL',
            payload: mealData
        })

    })

}