import axios from "axios";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SINGIN_FAIL,
  USER_SINGIN_REQUEST,
  USER_SINGIN_SUCCESS,
  USER_SINGOUT,
} from "../constants/userConstant";

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email } });
  try {
    const { data } = await axios.post("api/registration", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SINGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const userSigninAction = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SINGIN_REQUEST, payload: { email } });
  try {
    const { data } = await axios.post("api/singin", {
      email,
      password,
    });
    dispatch({ type: USER_SINGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: USER_SINGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const singOut = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_SINGOUT });
  window.location.reload();
};
