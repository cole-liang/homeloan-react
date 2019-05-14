import * as types from "./actionTypes";
import * as userAPI from "../services/userService";

export const registerUser = userInfo => {
  const user = userAPI.registerUser(userInfo);

  return {
    type: types.REGISTER_USER,
    user
  };
};

export const loginUser = userInfo => {
  try {
    const user = userAPI.loginUser(userInfo);
    return {
      type: types.LOGIN_USER,
      user
    };
  } catch (error) {
    return {
      type: types.LOGIN_USER,
      error
    };
  }
};

export const logoutUser = () => ({ type: types.LOGOUT_USER });
