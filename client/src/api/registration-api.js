import axios from "axios";
import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const create = async (data, id) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/registration/${id}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readUserRegistrations = async () => {
  try {
    const response = await axios.get(`${baseUrl.server}/api/registration/`, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readRegistration = async (data, id) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/registration/read/${id}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const approve = async (id) => {
  try {
    const response = await axios.get(
      `${baseUrl.server}/api/registration/${id}/approve`,
      { headers }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const reject = async (id) => {
  try {
    const response = await axios.get(
      `${baseUrl.server}/api/registration/${id}/reject`,
      { headers }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { create, readUserRegistrations, readRegistration, approve, reject };
