import instance from "./RestClient";

const auth = (emailInput, passwordInput) => {
  const login = instance.post("users/login", {
    email: emailInput,
    password: passwordInput,
  });

  return login;
};
export const signup = (emailIp, usernameIp, passwordIp) => {
  const signupUser = instance.post("users/signup", {
    email: emailIp,
    username: usernameIp,
    password: passwordIp,
  });
  return signupUser;
};

export const logOut = () => {
  const config = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  const logoutUser = instance.delete("users/logout", config);
  return logoutUser;
};
export default auth;
