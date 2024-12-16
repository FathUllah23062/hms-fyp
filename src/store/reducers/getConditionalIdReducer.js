const initialState = {

    conditionalId: {},
}

export const CoditionalIdReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CONDITIONAL_ID":
            return { ...state, conditionalId: action.payload };
        default:
            return state;
    }
};