let users = require("./fakeUsers.json");

const loginError = "Oops, please check your email or password";

export const registerUser = user => {
  console.log("userService", users);
  users.push(user);
  return user;
};

export const loginUser = userInfo => {
  console.log("userService", userInfo);
  const user = users.find(u => {
    return u.email === userInfo.email;
  });
  console.log("userService", user);
  if (user && user.password === userInfo.password) return user;
  else throw loginError;
};
