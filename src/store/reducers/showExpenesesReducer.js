const initialState = {
    expensesList: [],
}
export const expensesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "EXPENSES_RECORD":
            return { ...state, expensesList: action.payload };
        default:
            return state;
    }
}