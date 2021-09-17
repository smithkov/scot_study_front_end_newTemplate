import React from "react";

export const primaryColor = "blue";

export const contact = {
  email: "info@scotstudy.co.uk",
  email2: "admissions@scotstudy.co.uk",
  phone1: "44(0)758-677-0652",
  phone2: "44(0)742-467-2038",
  address: "121 Giles Street",
  fullAddress: function () {
    return `${this.address}, ${this.city}, ${this.postcode}`;
  },
  postcode: "EH6 6BZ",
  city: "Edinburgh",
};

export const myRoutes = {
  facultyCourses: (id) => `/faculty-courses/${id}`,
  courseDetail: (id) => `/course-details/${id}`,
  courses: () => `/courses`,
  institutions: () => `/institutions`,
  institution: (id) => `/institution/${id}`,
  contact: () => `/contact`,
  about: () => `/about`,
  gallery: () => `/gallery`,
};
export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLocaleLowerCase();
};
export const scrollUp = (id) => document.getElementById(id).scrollIntoView();
export const social = {
  youtube: "https://www.youtube.com/channel/UC9ItAoglSWFBcxHsiJ0QX9g",
  linkedIn: "",
  twitter: "https://twitter.com/scotstudy?lang=en",
  facebook: "https://www.facebook.com/Scot-study-107271957506468",
  instagram: "https://www.instagram.com/scotstudy_/?hl=en-gb",
};
export const tinyApiKey = "so7inpl77uhpaimhqkti3h9dlclq5m0ra8ipnsd7pbxj8xk2";
export const defaultImage =
  "https://scotsudy.s3.eu-west-2.amazonaws.com/default-picture.png";
export const req = <b style={{ color: "red" }}>*</b>;
export const years = () => {
  var d = new Date();
  var currentYear = d.getFullYear();
  const dates = [];
  for (let i = 2000; i <= currentYear; i++) {
    dates.push(i);
  }

  return dates;
};
export const imageStyles = function (
  height,
  width = "100%",
  objectFit = "cover"
) {
  return {
    height: height,
    width,
    objectFit,
    objectPosition: objectFit,
  };
};
export const formatScholarship = (amount) => {
  const firstChar = amount[0];

  if (firstChar == "£") return amount;
  else return `£${amount}`;
};
export const imageOpacityStyles = function (
  height,
  width = "100%",
  objectFit = "cover"
) {
  return {
    height: height,
    width,
    objectFit,
    opacity: 0.8,
    objectPosition: objectFit,
  };
};
