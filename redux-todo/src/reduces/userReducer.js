import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SINGIN_FAIL,
  USER_SINGIN_REQUEST,
  USER_SINGIN_SUCCESS,
  USER_SINGOUT,
} from "../constants/userConstant";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SINGIN_REQUEST:
      return { loading: true };
    case USER_SINGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_SINGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SINGOUT:
      return {};
    default:
      return state;
  }
};
