import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case types.REGISTER_USER:
      return { ...action.user };

    case types.LOGIN_USER:
      return action.error ? { error: action.error } : { ...action.user };

    case types.LOGOUT_USER:
      return null;

    default:
      return state;
  }
};

export default userReducer;
