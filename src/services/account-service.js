/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const BASE_URL = "http://localhost:5000";
// const BASE_URL = "http://172.16.0.21:8021";
const customError = new Error("Network error or no response");
// const BASE_URL = "https://synergy.depedimuscity.com:8021";

function authenticate(account) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/user/login`, account, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => resolve(res.data))
      .catch((err) => {
        if (err.response) {
          reject(err);
        }
        reject(customError);
      });
  });
}

function register(newAccount) {
  return axios
    .post(`${BASE_URL}/user/register`, newAccount)
    .then((res) => res.data);
}

function getUserById(uid) {
  return axios.get(`${BASE_URL}/user/getUser/${uid}`).then((res) => res.data);
}

function getAllUsers() {
  return axios.get(`${BASE_URL}/user/getUsers`).then((res) => res.data);
}

function updateUser(id, data) {
  console.log("Sending data:", data); // Check the data structure
  return axios
    .put(`${BASE_URL}/user/update/${id}`, data)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error updating user:", error); // Log errors
      throw error;
    });
}

function deleteUser(id, data) {
  return axios
    .delete(`${BASE_URL}/user/delete/${id}`, data)
    .then((res) => res.data);
}

export default {
  authenticate,
  register,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
