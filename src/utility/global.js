//export const ENDPOINT = "http://localhost:8000/";
export const ENDPOINT = "https://scotstudy.foodengo.com/";
export const SERVER_URL = `${ENDPOINT}api`;
export const TOKEN = "tk-cookie";
export const USER = "tk-user";
export const roles = { admin: "Admin", user: "User", agent: "Agent" };
export const PENDING = "Pending";
const paymentKey = "recklessKey";
export const asyncLocalStorage = {
  setItem: function (key, value) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },

  setPaymentKey: function (value) {
    return Promise.resolve().then(function () {
      localStorage.setItem(paymentKey, value);
    });
  },

  deletePaymentKey: function (value) {
    return Promise.resolve().then(function () {
      localStorage.removeItem(paymentKey);
    });
  },

  logout: function (value) {
    return Promise.resolve().then(function () {
      localStorage.removeItem(TOKEN);
    });
  },

  getPaymentKey: function () {
    return Promise.resolve().then(function () {
      return localStorage.getItem(paymentKey);
    });
  },
  getItem: function (key) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  },

  getUser: function () {
    return Promise.resolve().then(function () {
      return JSON.parse(localStorage.getItem(USER));
    });
  },

  getRole: function () {
    return Promise.resolve().then(function () {
      return JSON.parse(localStorage.getItem(USER)).Role.name;
    });
  },
  setCourse: function (value) {
    return Promise.resolve().then(function () {
      localStorage.setItem("courseId", value);
    });
  },

  getCourse: function () {
    return Promise.resolve().then(function () {
      return localStorage.getItem("courseId");
    });
  },
  removeCourse: function (value) {
    return Promise.resolve().then(function () {
      localStorage.removeItem("courseId");
    });
  },
};
