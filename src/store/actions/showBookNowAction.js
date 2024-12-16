import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../Firebase"

export const getBookNowData = () => async (dispatch) => {
    onSnapshot(collection(db, 'book-now'), (snap) => {
        let bookNowData = []
        snap.forEach((doc) => {
            bookNowData.push({ id: doc.id, ...doc.data() })
        })
        dispatch({
            type: 'SHOW_BOOK_NOW',
            payload: bookNowData
        })

    })

}