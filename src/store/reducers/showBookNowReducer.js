const initialState = {

    bookNowList: [],
}
export const bookNowReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_BOOK_NOW":
            return { ...state, bookNowList: action.payload };
        default:
            return state;
    }
};
