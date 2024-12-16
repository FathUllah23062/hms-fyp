const initialState = {

    avalibalRooms: [],
}
export const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CONDITIONAL_ROOM_DATA":
            return { ...state, avalibalRooms: action.payload };
        default:
            return state;
    }
};
