import axios from "axios";
import history from "../../../history";

export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    payload: user
  };
};

export const setAuthToken = token => {
  token
    ? (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`)
    : delete axios.defaults.headers.common["Authorization"];
};

export const handleErrors = error => {
  return {
    type: "SERVER_ERROR",
    payload: error
  };
};

export const signUpUser = ({ name, email, section: { password, confPassword } }) => async dispatch => {
  try {
    const response = await axios.post("/api/users", { name, email, password, confPassword });
    dispatch({ type: "SIGNUP_USER", payload: response.data });
  } catch (error) {
    const errors = error.response.data.errors;
    dispatch(handleErrors(errors));
  }
};

export const loginUser = ({ email, password }) => async dispatch => {
  try {
    const response = await axios.post("/api/auth", { email, password });
    localStorage.setItem("jwtToken", response.data.token);
    setAuthToken(response.data.token);
    dispatch({ type: "LOGIN_USER", payload: response.data });
    history.push("/");
  } catch (error) {
    const errors = error.response.data.errors;
    dispatch(handleErrors(errors));
  }
};

export const logoutUser = () => dispatch => {
  localStorage.clear();
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
