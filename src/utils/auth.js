export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const isAuthenticated = () => {
  const user = getUser();
  return user && user.token;
};

export const getUserRole = () => {
  const user = getUser();
  return user?.role;
};