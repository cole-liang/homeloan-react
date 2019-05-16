import * as types from "./actionTypes";
import * as userAPI from "../services/userService";

export const registerUser = userInfo => {
  const { firstName, lastName, email, password, mobileNum, dob } = userInfo;
  const user = userAPI.registerUser({
    firstName,
    lastName,
    email,
    password,
    mobileNum,
    dob
  });

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
