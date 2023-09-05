import axios from "axios";
import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const multipartHeaders = {
  "Content-Type": "Multipart/form-data",
};

const create = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/events/create`,
      data,
      {
        multipartHeaders,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

const readAll = async () => {
  try {
    const response = await axios.get(`${baseUrl.server}/api/events/read-all`, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readByCategory = async (cat) => {
  try {
    const response = await axios.get(`${baseUrl.server}/api/events/${cat}`, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readByUserId = async (id) => {
  try {
    const response = await axios.get(
      `${baseUrl.server}/api/events/user/${id}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readById = async (id) => {
  try {
    const response = await axios.get(
      `${baseUrl.server}/api/events/event/${id}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const remove = async (id) => {
  try {
    const response = await axios.delete(
      `${baseUrl.server}/api/events/event/${id}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { create, readAll, readByCategory, readById, readByUserId, remove };
