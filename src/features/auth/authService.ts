import axios from "axios";

//api route that i want to call
const API_URL = `${process.env.REACT_APP_BASE_URL}/api/user/`;

//register user
const register = async (userData: object) => {
  const response = await axios.post(API_URL, userData);

  //if we get data in response we will save it to localstorage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//login user
const login = async (userData: object) => {
  const response = await axios.post(API_URL + "login", userData);
  //if we get data in response we will save it to localstorage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//login with google
const loginWithGoogle = async (userData: object) => {
  const response = await axios.post(API_URL + "loginWithGoogle", userData);
  //if we get data in response we will save it to localstorage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//update account
const updateAccount = async (userData: object, token: string) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  //post new user dat
  const response = await axios.put(API_URL, userData, config);
  //retrun response
  return response.data;
};
//logout user
const logout = () => {
  localStorage.removeItem("user");
};

//export all these functions

const authService = {
  register,
  login,
  logout,
  loginWithGoogle,
  updateAccount,
};

export default authService;
