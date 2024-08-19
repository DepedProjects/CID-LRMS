/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

// const BASE_URL = "http://localhost:5000";
const BASE_URL = "http://172.16.0.26:8030";
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
  const params = {
    ...(gradeLevel && { gradeLevel }),
    ...(learningArea && { learningArea }),
    ...(resourceType && { resourceType }),
    ...(search && { search }),
  };

  console.log(params);
  return axios
    .get(`${BASE_URL}/iLeaRN/getFilteredMetadata`, { params })
    .then((res) => res.data);
}

// New function to upload files and log metadata
function uploadFile(metadataId, file, progressCallback) {
  const formData = new FormData();
  formData.append("file", file);

  return axios
    .post(`${BASE_URL}/iLearn/admin/uploadFile/${metadataId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (progressCallback) {
          progressCallback(progressEvent);
        }
      },
    })
    .then((response) => {
      console.log("File uploaded successfully:", response.data.data); // Log the 'data' object
      return response.data.data; // Return the data object
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
      throw error;
    });
}

function downloadFile(metadataId, title) {
  console.log("Title:", title); // Debugging: check if title is passed correctly
  return axios({
    url: `${BASE_URL}/iLeaRN/admin/downloadFile/${metadataId}`,
    method: "GET",
    responseType: "blob", // Important for handling binary data
  })
    .then((response) => {
      const filename = title ? `${title}.pdf` : "downloaded-file.pdf"; // Use title for the filename

      // Create a link element, use it to create a download link and simulate a click to trigger the download
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: response.headers["content-type"] })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
      throw error;
    });
}

// New function to update material details and handle file upload
function updateMaterial(metadataId, formData, file) {
  const data = new FormData();
  Object.keys(formData).forEach((key) => data.append(key, formData[key]));
  if (file) data.append("file", file);

  return axios
    .put(`${BASE_URL}/iLearn/admin/update-material/${metadataId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Material updated successfully:", response.data.data); // Log the 'data' object
      return response.data.data; // Return the data object
    })
    .catch((error) => {
      console.error("Error updating material:", error);
      throw error;
    });
}

export default {
  uploadFile,
  downloadFile,
  getAllMetadata,
  bulkUploadMetadata,
  getFilteredMetadata,
  getAllOffices,
  getAllSchools,
  updateMaterial,
};
