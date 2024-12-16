const initialState = {

    getingId: {},
}

export const getingIdReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETING_ID":
            return { ...state, getingId: action.payload };
        default:
            return state;
    }
};