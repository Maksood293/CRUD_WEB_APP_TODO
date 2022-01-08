import Axios from "axios";
import {
  ADD_TODO_FAILED,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  DELETE_TODO_FAILED,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  EDIT_TODO_FAILED,
  EDIT_TODO_REQUEST,
  EDIT_TODO_SUCCESS,
  GET_TODO_LIST_FAILED,
  GET_TODO_LIST_REQUEST,
  GET_TODO_LIST_SUCCESS,
} from "../constants/todoContant";

export const getTodoAction = () => async (dispatch) => {
  dispatch({ type: GET_TODO_LIST_REQUEST });
  try {
    const { data } = await Axios.get("todo/todos");
    dispatch({ type: GET_TODO_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TODO_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addTodoAction = (title, description) => async (dispatch) => {
  dispatch({ type: ADD_TODO_REQUEST });
  try {
    const { data } = await Axios.post("todo/add", { title, description });
    dispatch({ type: ADD_TODO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_TODO_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTodoAction = (id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_TODO_REQUEST });
  const { userSignin } = getState();
  console.log(userSignin, "userSignin");
  try {
    const { data } = await Axios.delete(`todo/${id}`, {
      headers: { Authorization: `Bearer ${userSignin.userInfo.token}` },
    });

    dispatch({ type: DELETE_TODO_SUCCESS, payload: data });
  } catch (error) {
    console.log("err", error);
    dispatch({
      type: DELETE_TODO_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const editTodoAction =
  (title, description, _id) => async (dispatch, getState) => {
    dispatch({ type: EDIT_TODO_REQUEST, payload: { title, description } });
    console.log("data", { title, description, _id });
    const { userSignin } = getState();
    try {
      const { data } = await Axios.put(
        "todo/edit",
        { title, description, _id },
        {
          headers: { Authorization: `Bearer ${userSignin.userInfo.token}` },
        }
      );
      dispatch({ type: EDIT_TODO_SUCCESS, payload: data });
    } catch (error) {
      console.log(error, "eeror");
      dispatch({
        type: EDIT_TODO_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
