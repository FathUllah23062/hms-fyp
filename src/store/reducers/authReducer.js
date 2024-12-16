const initialState = {
  user: "",
  error: "",
  loader: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload };
    case "LOGIN_FAILURE":
      return { ...state, error: action.payload };
    case "LOADER":
      return { ...state, loader: action.payload, }
    default:
      return state;
  }
};

