import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  addTodoReducer,
  deleteTodoReducer,
  editTodoReducer,
  getTodoReducer,
} from "./reduces/todoReducer";
import { userRegisterReducer, userSigninReducer } from "./reduces/userReducer";

const initailState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  getTodo: getTodoReducer,
  addTodo: addTodoReducer,
  deleteTodo: deleteTodoReducer,
  editTodo: editTodoReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initailState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
