import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";

export const loginStart = () => ({ type: "LOGIN_START" });

export const loginSuccess = (user) => ({ type: "LOGIN_SUCCESS", payload: user });

export const loginFailure = (error) => ({ type: "LOGIN_FAILURE", payload: error });

export const SingInToAdmin = (email, password, onSuccess = () => { }) => async (dispatch) => {
  await dispatch({ type: 'LOADER', payload: true })
  dispatch(loginStart());
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(loginSuccess(userCredential.user));
    onSuccess();
    await dispatch({ type: 'LOADER', payload: false })

  } catch (error) {
    dispatch(loginFailure("Incorrect email or password"));
    await dispatch({ type: 'LOADER', payload: false })
  }
};
