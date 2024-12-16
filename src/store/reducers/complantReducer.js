const initialState = {
    complantsList: [],
}
export const compantReducer = (state = initialState, action) => {
    switch (action.type) {
        case "COMPLANTS":
            return { ...state, complantsList: action.payload };
        default:
            return state;
    }

}