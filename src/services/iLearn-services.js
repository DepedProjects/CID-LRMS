/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

// const BASE_URL = "http://localhost:5000";
// const BASE_URL = "http://172.16.0.26:8030";
// const BASE_URL = "http://172.16.0.21:8021";
// const customError = new Error("Network error or no response");
const BASE_URL = "https://lrms.depedimuscity.com:8030";

function deleteFile(metadataId, username) {
  return axios
    .delete(`${BASE_URL}/iLeaRN/admin/deleteFile/${parseInt(metadataId, 10)}`, {
      data: { username },
    })
    .then((response) => {
      return response?.data?.message; // Return the success message
    })
    .catch((error) => {
      console.error("Error deleting file:", error);
      throw error;
    });
}

// New function to view file details
function viewFile(metadataId) {
  return axios
    .get(`${BASE_URL}/iLeaRN/admin/viewFile/${metadataId}`)
    .then((response) => {
      const { viewLink } = response?.data; // Extract viewLink from the response

      if (!viewLink) {
        throw new Error("View link is missing from the response");
      }

      // Return an object containing file details and the view URL
      return {
        fileDetails: response?.data,
        viewUrl: viewLink,
      };
    })
    .catch((error) => {
      console.error("Error viewing file details:", error);
      throw error;
    });
}

function getPreviewUrl(fileId) {
  try {
    // Google Drive's preview link format
    const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    return previewUrl;
  } catch (error) {
    console.error("Error generating preview URL:", error);
    throw error;
  }
}

function getAllMetadata() {
  return axios.get(`${BASE_URL}/iLeaRN/getAllMetadata`).then((res) => res.data);
}

function bulkUploadMetadata(formData) {
  // const formData = new FormData();
  // formData.append("file", file); // file should be a File object
  // formData.append("username", username);

  return axios
    .post(`${BASE_URL}/iLeaRN/admin/uploadresourceMetadata`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Axios error:", err);
      throw err;
    });
}

function getAllOffices() {
  return axios.get(`${BASE_URL}/iLeaRN/getAllOffices`).then((res) => res.data);
}

function getAllActivity() {
  return axios
    .get(`${BASE_URL}/iLeaRN/getAllActivityLogs`)
    .then((res) => res.data);
}

function getAllSchools() {
  return axios.get(`${BASE_URL}/iLeaRN/getAllSchools`).then((res) => res.data);
}

function getFilteredMetadata(
  gradeLevel,
  learningArea,
  resourceType,
  component,
  search
) {
  const params = {
    ...(gradeLevel && { gradeLevel }),
    ...(learningArea && { learningArea }),
    ...(resourceType && { resourceType }),
    ...(component && { component }),
    ...(search && { search }),
  };

  return axios
    .get(`${BASE_URL}/iLeaRN/getFilteredMetadata`, { params })
    .then((res) => res.data);
}

function getFilteredMetadataSHS(
  subjectGroup,
  track,
  strand,
  learningArea,
  resourceType
) {
  const params = {
    ...(subjectGroup && { subjectGroup }),
    ...(track && { track }),
    ...(strand && { strand }),
    ...(learningArea && { learningArea }),
    ...(resourceType && { resourceType }),
    
  };

  return axios
    .get(`${BASE_URL}/iLeaRN/getFilteredMetadataForSHS`, { params })
    .then((res) => res.data);
}

// Function to upload files and log metadata
function uploadFile(metadataId, file, username, progressCallback) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("username", username); // Add the username to the form data

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
      return response.data.data; // Return the data object
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
      throw error;
    });
}

function downloadFile(metadataId, title, username) {
  return axios({
    url: `${BASE_URL}/iLeaRN/admin/downloadFile/${metadataId}?username=${username}`,
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
function updateMaterial(metadataId, formData, file, username) {
  const data = new FormData();
  Object.keys(formData).forEach((key) => data.append(key, formData[key]));
  if (file) data.append("file", file);

  data.append("username", username);

  return axios
    .put(`${BASE_URL}/iLearn/admin/update-material/${metadataId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data.data; // Return the data object
    })
    .catch((error) => {
      console.error("Error updating material:", error);
      throw error;
    });
}

export default {
  viewFile,
  deleteFile,
  uploadFile,
  downloadFile,
  getAllMetadata,
  bulkUploadMetadata,
  getFilteredMetadata,
  getAllOffices,
  getAllActivity,
  getAllSchools,
  updateMaterial,
  getPreviewUrl,
  getFilteredMetadataSHS,
};
