const initialState = {

    roomsInUserList: [],
}
export const roomsInUserSide = (state = initialState, action) => {
    switch (action.type) {
        case "CONDITIONAL_ROOM_DATA":
            return { ...state, roomsInUserList: action.payload };
        default:
            return state;
    }
};