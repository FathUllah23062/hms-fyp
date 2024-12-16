const initialState = [
    {
        mealList: "",
    }
];


export const mealReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_MEAL":
            return { ...state, mealList: action.payload };
        default:
            return state;
    }
};
