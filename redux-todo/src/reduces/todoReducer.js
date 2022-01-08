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

export const getTodoReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case GET_TODO_LIST_REQUEST:
      return { loading: true };
    case GET_TODO_LIST_SUCCESS:
      return { loading: false, success: true, todos: action.payload };
    case GET_TODO_LIST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addTodoReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ADD_TODO_REQUEST:
      return { loading: true };
    case ADD_TODO_SUCCESS:
      return { loading: false, success: true };
    case ADD_TODO_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteTodoReducer = (
  state = { loading: true, successDelete: false },
  action
) => {
  switch (action.type) {
    case DELETE_TODO_REQUEST:
      return { loading: true };
    case DELETE_TODO_SUCCESS:
      return { loading: false, successDelete: true, data: action.payload };
    case DELETE_TODO_FAILED:
      return { loading: false, errorDelete: action.payload };
    default:
      return state;
  }
};

export const editTodoReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case EDIT_TODO_REQUEST:
      return { loading: true };
    case EDIT_TODO_SUCCESS:
      return { loading: false, successEdit: true, editedTodo: action.payload };
    case EDIT_TODO_FAILED:
      return { loading: false, errorEdit: action.payload };
    default:
      return state;
  }
};
