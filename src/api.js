import axios from "axios";
// Replace with your actual alert slice path
import {store} from "./store/store"; // Import your Redux store
import { setAlert } from "./store/features/appGlobalSlice";

export const baseUrl = 'https://assignerbackend-production.up.railway.app/';

// export const url = "https://assignerbackend-production.up.railway.app/api";
export const url = "http://localhost:3000/api";

export const getAuthInfo = () => {
  try {
    const authInfo = JSON.parse(localStorage.getItem("auth_info"));
    return authInfo ? authInfo : false;
  } catch {
    return false;
  }
};

const handleError = (error) => {
  const { dispatch } = store; // Access dispatch from the store
  console.log("Handling the error")
  console.log(error.status)
  if (error?.status === 500) {
    console.log("Dispatch shoudl run now")
    dispatch(setAlert({alert:true, message: "Our servers are temporarily down. Please try again later.", type: "danger" }));
  }
  console.error("Error:", error.message);
  throw error;
};

export const fetchData = async (endpoint, params = {}) => {
  try {
    const authInfo = getAuthInfo();
    if (!authInfo || !authInfo.token) {
      throw new Error("Authentication token is missing");
    }

    const config = {
      headers: {
        Authorization: `${authInfo.token}`,
      },
      params, // Pass query parameters here
    };

    const response = await axios.get(url + endpoint, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const postData = async (endpoint, data) => {
  try {
    const request = await axios.post(url + endpoint, data, {
      headers: {
        Authorization: getAuthInfo().token,
      },
    });
    return request;
  } catch (error) {
    return handleError(error);
  }
};

export const updateData = async (endpoint, data) => {
  try {
    const request = await axios.patch(url + endpoint, data, {
      headers: {
        Authorization: getAuthInfo().token,
      },
    });
    return request;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteData = async (endpoint) => {
  try {
    const request = await axios.delete(url + endpoint, {
      headers: {
        Authorization: getAuthInfo().token,
      },
    });
    return request;
  } catch (error) {
    return handleError(error);
  }
};
