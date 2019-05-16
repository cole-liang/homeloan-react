import { loginError } from "../../services/userService";
import { registerUser, loginUser, logoutUser } from "../../actions/userAction";

import testUsers from "../fixture/users";
import * as types from "../../actions/actionTypes";

describe("userActions", () => {
  const testUser = testUsers[0];
  const storedUsers = require("../../services/fakeUsers.json");
  const storedUser = storedUsers[0];

  it("loginUser should create a LOGIN_USER action WITHOUT ERROR", () => {
    const data = { email: storedUser.email, password: storedUser.password };

    const expectedAction = {
      type: types.LOGIN_USER,
      user: storedUser
    };

    const action = loginUser(data);
    expect(action).toEqual(expectedAction);
  });

  it("loginUser should create a LOGIN_USER action WITH ERROR", () => {
    const data = { email: testUser.email, password: testUser.password };

    const expectedAction = {
      type: types.LOGIN_USER,
      error: loginError
    };

    const action = loginUser(data);
    expect(action).toEqual(expectedAction);
  });

  it("logoutUser should create a LOGOUT_USER action", () => {
    const expectedAction = { type: types.LOGOUT_USER };

    const action = logoutUser();
    expect(action).toEqual(expectedAction);
  });

  //User registration should be tested after login test.
  it("registerUser should create a REGISTER_USER action", () => {
    const data = {
      ...testUser,
      passwordConfirm: testUser.password,
      terms: true
    };

    const expectedAction = {
      type: types.REGISTER_USER,
      user: testUser
    };

    const action = registerUser(data);
    expect(action).toEqual(expectedAction);
  });
});
