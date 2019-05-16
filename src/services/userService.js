let users = require("./fakeUsers.json");

export const loginError = "Oops, please check your email or password";

export const registerUser = user => {
  users.push(user);
  return user;
};

export const loginUser = userInfo => {
  const user = users.find(u => {
    return u.email === userInfo.email;
  });
  if (user && user.password === userInfo.password) return user;
  else throw loginError;
};
