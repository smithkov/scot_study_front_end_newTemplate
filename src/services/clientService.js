import http from "axios";

import { SERVER_URL, asyncLocalStorage, TOKEN } from "../utility/global";
function header(token) {
  if (token) {
    return {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ` + token,
      },
    };
  } else {
    return {
      headers: {
        "Content-type": "application/json",
      },
    };
  }
}
class ClientService {
  hasAuth = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);

    return http.get(`${SERVER_URL}/isLogin`, header(token));
  };
  faculties = async () => {
    return http.post(`${SERVER_URL}/faculties`);
  };

  facultiesLight = async () => {
    return http.post(`${SERVER_URL}/facultiesLight`);
  };

  facultiesSuperLight = async () => {
    return http.post(`${SERVER_URL}/facultiesSuperLight`);
  };

  institutions = async () => {
    return http.post(`${SERVER_URL}/institutions`);
  };

  signIn = async (data) => {
    return http.post(`${SERVER_URL}/signIn`, data);
  };
  signUp = async (data) => {
    return http.post(`${SERVER_URL}/signUp`, data);
  };

  findAllUsersByAgent = async (data) => {
    return http.post(`${SERVER_URL}/findAllUsersByAgent`, data);
  };

  coursesForHome = async () => {
    return http.post(`${SERVER_URL}/coursesForHome`);
  };
  createAgentUser = async (data) => {
    return http.post(`${SERVER_URL}/createAgentUser`, data);
  };

  agentSignIn = async (data) => {
    return http.post(`${SERVER_URL}/agentSignIn`, data);
  };

  agentSignUp = async (data) => {
    return http.post(`${SERVER_URL}/agentSignUp`, data);
  };

  searchCourse = async (data) => {
    return http.post(`${SERVER_URL}/searchCourse`, data);
  };

  qualificationTypes = async () => {
    return http.post(`${SERVER_URL}/qualificationTypes`);
  };

  saveQualification = async (data) => {
    return http.post(`${SERVER_URL}/qualification`, data);
  };

  saveEnglishTest = async (data) => {
    return http.post(`${SERVER_URL}/englishTest`, data);
  };

  savePreviousQualification = async (data) => {
    return http.post(`${SERVER_URL}/previousQualification`, data);
  };

  saveSponsor = async (data) => {
    return http.post(`${SERVER_URL}/sponsorship`, data);
  };

  countries = async () => {
    return http.post(`${SERVER_URL}/countries`);
  };

  saveVisa = async (data) => {
    return http.post(`${SERVER_URL}/visaHistory`, data);
  };

  findSponsor = async (data) => {
    return http.post(`${SERVER_URL}/findSponsorshipByUser`, data);
  };

  findVisa = async (data) => {
    return http.post(`${SERVER_URL}/findVisaHistoryByUser`, data);
  };

  findAgentApplications = async (data) => {
    return http.post(`${SERVER_URL}/findAgentApplications`, data);
  };

  findHighestQualification = async (data) => {
    return http.post(`${SERVER_URL}/findHighestQualificationByUser`, data);
  };

  findEnglish = async (data) => {
    return http.post(`${SERVER_URL}/findEnglishByUser`, data);
  };
  saveHighSchool = async (data) => {
    return http.post(`${SERVER_URL}/highSchool`, data);
  };
  findHighSchool = async (data) => {
    return http.post(`${SERVER_URL}/findHighSchoolByUser`, data);
  };

  findPreviousQualification = async (data) => {
    return http.post(`${SERVER_URL}/findPreviousQualificationByUser`, data);
  };

  popularCourses = async (data) => {
    return http.post(`${SERVER_URL}/popularCourses`, data);
  };

  findUserById = async (data) => {
    return http.post(`${SERVER_URL}/userById`, data);
  };

  updateUserInfo = async (data, userId) => {
    return http.patch(`${SERVER_URL}/user/${userId}`, data);
  };

  applicationDecisionUpdate = async (data, id) => {
    return http.patch(`${SERVER_URL}/decisionUpdate/${id}`, data);
  };

  deleteCourse = async (id) => {
    return http.delete(`${SERVER_URL}/course/${id}`);
  };

  updateCourse = async (data, courseId) => {
    return http.patch(`${SERVER_URL}/updateCourse/${courseId}`, data);
  };

  saveCourse = async (data) => {
    return http.post(`${SERVER_URL}/saveCourse`, data);
  };

  decisions = async () => {
    return http.post(`${SERVER_URL}/decisions`);
  };

  relatedCourses = async (data) => {
    return http.post(`${SERVER_URL}/findCoursesByFaculty`, data);
  };
  saveInstitution = async (data) => {
    return http.post(`${SERVER_URL}/saveInstitution`, data);
  };

  allInstitutions = async () => {
    return http.post(`${SERVER_URL}/allInstitutions`);
  };
  allApplications = async (data) => {
    return http.post(`${SERVER_URL}/allApplications`, data);
  };

  allApplicationsForDash = async () => {
    return http.post(`${SERVER_URL}/findAllForDashboard`);
  };

  cities = async () => {
    return http.post(`${SERVER_URL}/allCities`);
  };

  findAllAgents = async (data) => {
    return http.post(`${SERVER_URL}/findAllAgents`, data);
  };
  findAllCoursesPhotos = async () => {
    return http.post(`${SERVER_URL}/coursePhotos`);
  };

  findAllGalleries = async () => {
    return http.post(`${SERVER_URL}/galleries`);
  };

  allUsers = async (data) => {
    return http.post(`${SERVER_URL}/allUsers`, data);
  };

  uploadDocument = async (file, userId, name, onUploadProgress) => {
    let formData = new FormData();

    formData.append("docs", file);
    formData.append("userId", userId);
    formData.append("name", name);
    return http.post(`${SERVER_URL}/uploadDocument`, formData, {
      onUploadProgress,
    });
  };

  findUserDocuments = async (data) => {
    return http.post(`${SERVER_URL}/findUserDocuments`, data);
  };

  allUsersForDash = async () => {
    return http.post(`${SERVER_URL}/findAllUserForDash`);
  };

  saveApplication = async (data) => {
    return http.post(`${SERVER_URL}/saveApplication`, data);
  };

  saveBanner = async (data) => {
    return http.post(`${SERVER_URL}/banner`, data);
  };

  banners = async () => {
    return http.post(`${SERVER_URL}/banners`);
  };

  uploadCoursePhoto = async (data) => {
    return http.post(`${SERVER_URL}/uploadCoursePhoto`, data);
  };

  uploadGallery = async (data) => {
    return http.post(`${SERVER_URL}/uploadGallery`, data);
  };

  //Below router reassigns course photos
  autoRunCoursePhotoUpdate = async () => {
    return http.post(`${SERVER_URL}/autoCoursePhotoUpdate`);
  };

  findCoursePhotoById = async (data) => {
    return http.post(`${SERVER_URL}/findCoursePhotoById`, data);
  };

  findGalleryById = async (data) => {
    return http.post(`${SERVER_URL}/findGalleryById`, data);
  };

  findApplicationsByUser = async (data) => {
    return http.post(`${SERVER_URL}/findApplicationsByUser`, data);
  };

  findOneApplicationByUser = async (data) => {
    return http.post(`${SERVER_URL}/findOneApplicationByUser`, data);
  };

  degreeTypes = async (data) => {
    return http.post(`${SERVER_URL}/degreeTypes`, data);
  };

  currencyConverter = async (data) => {
    return http.get(
      `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_EXCHANGE_KEY}/pair/GBP/${data.target}/${data.amount}`,
      data
    );
  };

  supportedCodes = async (data) => {
    return http.get(
      `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_EXCHANGE_KEY}/codes`,
      data
    );
  };

  findAllPaymentPurpose = async () => {
    return http.post(`${SERVER_URL}/findAllPaymentPurpose`);
  };
  allCoursesSearch = async (data) => {
    return http.post(`${SERVER_URL}/allCoursesSearch`, data);
  };

  compare = async (data) => {
    return http.post(`${SERVER_URL}/compare`, data);
  };

  relatedCourses = async (data) => {
    return http.post(`${SERVER_URL}/relatedCourses`, data);
  };

  findCourseByInstitution = async (data) => {
    return http.post(`${SERVER_URL}/findCourseByInstitution`, data);
  };

  findCourseById = async (id) => {
    return http.get(`${SERVER_URL}/course/${id}`);
  };

  courseByParams = async (data) => {
    return http.post(`${SERVER_URL}/courseByParams`, data);
  };

  findCourseByInstitutionForReg = async (data) => {
    return http.post(`${SERVER_URL}/findCourseByInstitutionForReg`, data);
  };

  institutionsLighter = async () => {
    return http.post(`${SERVER_URL}/institutionsLighter`);
  };
  visaApplyStatuses = async () => {
    return http.post(`${SERVER_URL}/visaApplyStatuses`);
  };

  institutionsForMenu = async () => {
    return http.post(`${SERVER_URL}/institutionsForMenu`);
  };

  findInstitutionById = async (data) => {
    return http.post(`${SERVER_URL}/findInstitutionById`, data);
  };

  saveTestimonial = async (data) => {
    return http.post(`${SERVER_URL}/testimonial`, data);
  };

  findAllTestimonial = async () => {
    return http.post(`${SERVER_URL}/testimonials`);
  };

  findTestimonialById = async (data) => {
    return http.post(`${SERVER_URL}/findTestimonialById`, data);
  };

  deleteTestimonial = async (id) => {
    return http.delete(`${SERVER_URL}/testimonial/${id}`);
  };

  savePhdApplication = async (data) => {
    return http.post(`${SERVER_URL}/savePhdApplication`, data);
  };

  findAllPhdApplications = async () => {
    return http.post(`${SERVER_URL}/findPhdApplications`);
  };

  findAllPayments = async () => {
    return http.post(`${SERVER_URL}/findAllPayments`);
  };

  findUserPayments = async (data) => {
    return http.post(`${SERVER_URL}/findUserPayments`, data);
  };

  updatePayment = async (data) => {
    return http.post(`${SERVER_URL}/updatePayment`, data);
  };

  stripeSessionStatus = async (data) => {
    return http.post(`${SERVER_URL}/stripeSessionStatus`, data);
  };

  findAllPhdById = async (data) => {
    return http.post(`${SERVER_URL}/findPhdApplicationById`, data);
  };

  findPhdQualifications = async () => {
    return http.post(`${SERVER_URL}/findPhdQualifications`);
  };

  makePayment = async (data) => {
    return http.post(`${SERVER_URL}/make_payment`, data);
  };

  forgotPassword = async (data) => {
    return http.post(`${SERVER_URL}/forgotPassword`, data);
  };

  resetPassword = async (data) => {
    return http.post(`${SERVER_URL}/resetPassword`, data);
  };

  resetPasswordPost = async (data) => {
    return http.post(`${SERVER_URL}/resetPasswordPost`, data);
  };

  contact = async (data) => {
    return http.post(`${SERVER_URL}/contact`, data);
  };

  allContacts = async () => {
    return http.post(`${SERVER_URL}/allContacts`);
  };

  findContactById = async (id) => {
    return http.get(`${SERVER_URL}/findContactById/${id}`);
  };

  newsletter = async (data) => {
    return http.post(`${SERVER_URL}/newsletter`, data);
  };

  allNewsletter = async () => {
    return http.post(`${SERVER_URL}/allNewsletter`);
  };

  findNewsLetterById = async (id) => {
    return http.get(`${SERVER_URL}/findNewsLetterById/${id}`);
  };
}
export default new ClientService();
