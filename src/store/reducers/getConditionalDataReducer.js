const initialState = [
    {
        conditionalData: "",
    }
];


export const CoditionalDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CONDITIONAL_DATA":
            return { ...state, conditionalData: action.payload };
        default:
            return state;
    }
};
