/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const BASE_URL = "http://localhost:5000";
// const BASE_URL = "http://172.16.0.21:8021";
// const customError = new Error("Network error or no response");
// // const BASE_URL = "https://synergy.depedimuscity.com:8021";

function getAllMetadata() {
  return axios.get(`${BASE_URL}/iLeaRN/getAllMetadata`).then((res) => res.data);
}

function bulkUploadMetadata(data) {
  return axios
    .post(`${BASE_URL}/iLearn/admin/uploadresourceMetadata`, data)
    .then((res) => res.data);
}

function getAllOffices() {
  return axios.get(`${BASE_URL}/iLeaRN/getAllOffices`).then((res) => res.data);
}

function getAllSchools() {
  return axios.get(`${BASE_URL}/iLeaRN/getAllSchools`).then((res) => res.data);
}

function getFilteredMetadata(gradeLevel, learningArea, resourceType, search) {
  const params = new URLSearchParams();
  if (gradeLevel) params.append("gradeLevel", gradeLevel);
  if (learningArea) params.append("learningArea", learningArea);
  if (resourceType) params.append("resourceType", resourceType);
  if (search) params.append("search", search);

  return axios
    .get(`${BASE_URL}/iLeaRN/getFilteredMetadata`, { params })
    .then((res) => res.data);
}

export default {
  getAllMetadata,
  bulkUploadMetadata,
  getFilteredMetadata,
  getAllOffices,
  getAllSchools,
};
