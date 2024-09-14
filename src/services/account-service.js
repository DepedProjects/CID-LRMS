/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

// const BASE_URL = "http://localhost:5000";
// const BASE_URL = "http://172.16.0.26:8030";
// const BASE_URL = "http://172.16.0.21:8021";
const customError = new Error("Network error or no response");
const BASE_URL = "https://lrms.depedimuscity.com:8030";

async function logout(uid, username) {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/logout`,
      { uid, username },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      throw err;
    }
    throw customError;
  }
}

async function resetPassword(uid, username) {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/reset-password/${uid}`,
      { username },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      throw err;
    }
    throw customError;
  }
}

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

function getAllLogs() {
  return axios.get(`${BASE_URL}/user/getLogs`).then((res) => res.data);
}

export default {
  resetPassword,
  authenticate,
  register,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllLogs,
  logout,
};
