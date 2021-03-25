import * as constants from "./constants";
const axios = require("axios");

export const formatDate = date => {
  if (date) {
    var dateString =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      " " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2);
    return dateString;
  }
};

export const formatOnlyDate = date => {
  if (date) {
    var dateString =
      date.getUTCFullYear() +
      "-" +
      ("0" + (date.getUTCMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getUTCDate()).slice(-2);
    return dateString;
  }
};

export const callLoginApi = (url, method, data, success, error) => {
  return axios({
    method: method,
    url: `${constants.URL}/${url}`,
    data: data
  })
    .then(function (res) {
      success(res);
    })
    .catch(function (err) {
      error(err);
    });
};

export const callApi = (url, method, data, token, success) => {
  return axios({
    method: method,
    url: `${constants.URL}/${url}`, credentials: 'include',
    headers: {
      Authorization: `${token}`
    },
    data: data
  })
    .then(function (res) {
      success(res);
    })
    .catch(function (err) {
    });
};