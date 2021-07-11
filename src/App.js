import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./helper/ScrollToTop";
import { GlobalStyle } from "./components/common/styles/global.js";
import HomeOne from "./HomeOne";
import HomeTwo from "./HomeTwo";
import About from "./pages/about/About";
import CourseGrid from "./pages/courses/CourseGrid";
import CourseFaculty from "./pages/courses/CourseFaculty";
import CourseList from "./pages/courses/CourseList";
import CourseDetails from "./pages/courses/CourseDetails";
import Instructor from "./pages/instructor/Instructors";
import InstructorDetails from "./pages/instructor/InstructorDetails";
import Gallery from "./pages/gallery/Gallery";
//import Events from "./pages/institution/Events";
import InstitutionDetail from "./pages/institution/institutionDetail";
import Institutions from "./pages/institution/institutions";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
import LoginAgent from "./pages/account/LoginAgent";
import RegisterAgent from "./pages/account/RegisterAgent";
import Contact from "./pages/contact/Contact";
import Faq from "./pages/faq/Faq";
import PageNotFound from "./pages/404/PageNotFound";
import ComingSoon from "./pages/comingsoon/ComingSoon";
import BlogClassic from "./pages/blog/BlogClassic";
import BlogGrid from "./pages/blog/BlogGrid";
import BlogDetails from "./pages/blog/BlogDetails";
import Product from "./pages/shop/Products";
import ProductDetails from "./pages/shop/ProductDetails";
import Cart from "./pages/shop/Cart";
//Import for admin files
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import ProtectedRoute from "./protectedRoute";
import "./admin/scss/style.scss";
import AgentSubmittedApplications from "./admin/containers/agent/agentSubmittedApplications";

import {
  faCheckSquare,
  faCoffee,
  faBriefcase,
  faTools,
  faHandHoldingMedical,
  faPhotoVideo,
  faStethoscope,
  faUserNurse,
  faLaptop,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import Sponsorship from "./admin/containers/sponsorship";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const AgentSponsorship = React.lazy(() =>
  import("./admin/containers/agent/application_forms/sponsorship")
);
library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faBriefcase,
  faTools,
  faHandHoldingMedical,
  faPhotoVideo,
  faStethoscope,
  faUserNurse,
  faLaptop,
  faBrain
);
const TheLayout = React.lazy(() => import("./admin/containers/TheLayout"));
const Profile = React.lazy(() => import("./admin/containers/profile"));
const English = React.lazy(() => import("./admin/containers/english"));
const HighSchool = React.lazy(() => import("./admin/containers/highSchool"));
const Sponsor = React.lazy(() => import("./admin/containers/sponsorship"));
const Application = React.lazy(() => import("./admin/containers/application"));

const Qualification = React.lazy(() =>
  import("./admin/containers/qualification")
);
const VisaHistory = React.lazy(() => import("./admin/containers/visaHistory"));
const Dashboard = React.lazy(() => import("./admin/containers/dashboard"));
const ApplicationDetail = React.lazy(() =>
  import("./admin/containers/admin/applicationDetail")
);

const CourseListForAdmin = React.lazy(() =>
  import("./admin/containers/admin/course/list")
);
const CourseForm = React.lazy(() =>
  import("./admin/containers/admin/course/create")
);
const CourseUpdate = React.lazy(() =>
  import("./admin/containers/admin/course/update")
);

const CoursePhotoList = React.lazy(() =>
  import("./admin/containers/admin/coursePhoto/list")
);
const CoursePhotoUpload = React.lazy(() =>
  import("./admin/containers/admin/coursePhoto/create")
);
const CoursePhotoUpdate = React.lazy(() =>
  import("./admin/containers/admin/coursePhoto/update")
);

const GalleryList = React.lazy(() =>
  import("./admin/containers/admin/gallery/list")
);
const GalleryUpload = React.lazy(() =>
  import("./admin/containers/admin/gallery/create")
);
const GalleryUpdate = React.lazy(() =>
  import("./admin/containers/admin/gallery/update")
);

const InstitutionList = React.lazy(() =>
  import("./admin/containers/admin/institution/list")
);
const InstitutionForm = React.lazy(() =>
  import("./admin/containers/admin/institution/create")
);

const AllAgents = React.lazy(() =>
  import("./admin/containers/admin/allAgents")
);
const InstitutionUpdate = React.lazy(() =>
  import("./admin/containers/admin/institution/update")
);

const AdminDashboard = React.lazy(() =>
  import("./admin/containers/admin/adminDashboard")
);

const AgentDashboard = React.lazy(() =>
  import("./admin/containers/agent/agentDashboard")
);

const AgentUsers = React.lazy(() =>
  import("./admin/containers/agent/agentUsers")
);

const AgentHighestQualification = React.lazy(() =>
  import("./admin/containers/agent/application_forms/highestQualification")
);

const AgentPreviousQualification = React.lazy(() =>
  import("./admin/containers/agent/application_forms/previousQualification")
);

const AgentHighSchool = React.lazy(() =>
  import("./admin/containers/agent/application_forms/highSchool")
);

const AgentEnglish = React.lazy(() =>
  import("./admin/containers/agent/application_forms/english")
);

const AgentApplicationSuccess = React.lazy(() =>
  import("./admin/containers/agent/application_forms/applicationSuccess")
);

const AgentVisaHistory = React.lazy(() =>
  import("./admin/containers/agent/application_forms/visaHistory")
);

const AgentFinalApplication = React.lazy(() =>
  import("./admin/containers/agent/application_forms/application")
);
const ApplicationDetailForAgentUser = React.lazy(() =>
  import("./admin/containers/agent/applicationDetail")
);
const RegisterForUserForAgent = React.lazy(() =>
  import("./admin/containers/agent/register")
);
function App() {
  return (
    <Router>
      <React.Suspense fallback={loading}>
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={HomeOne} />
          <Route
            path={`${process.env.PUBLIC_URL + "/home-two"}`}
            component={HomeTwo}
          />
          <Route path="/about" component={About} />
          <Route path="/courses" component={CourseGrid} />
          <Route path={`/faculty-courses/:id`} component={CourseFaculty} />
          <Route path="/course-list" component={CourseList} />
          <Route path="/course-details/:id" component={CourseDetails} />
          <Route
            path={`${process.env.PUBLIC_URL + "/instructor"}`}
            component={Instructor}
          />
          <Route path={`/institution/:id`} component={InstitutionDetail} />
          <Route path={`/institutions`} component={Institutions} />
          <Route
            path={`${process.env.PUBLIC_URL + "/instructor-details"}`}
            component={InstructorDetails}
          />
          <Route path={"/gallery"} component={Gallery} />
          {/* <Route
          path={`${process.env.PUBLIC_URL + "/events"}`}
          component={Events}
        /> */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/agent-login" component={LoginAgent} />
          <Route path="/agent-registration" component={RegisterAgent} />
          <Route path="/contact" component={Contact} />
          <Route path={`${process.env.PUBLIC_URL + "/faq"}`} component={Faq} />
          <Route
            path={`${process.env.PUBLIC_URL + "/coming-soon"}`}
            component={ComingSoon}
          />
          <Route
            path={`${process.env.PUBLIC_URL + "/blog-classic"}`}
            component={BlogClassic}
          />
          <Route
            path={`${process.env.PUBLIC_URL + "/blog-grid"}`}
            component={BlogGrid}
          />
          <Route
            path={`${process.env.PUBLIC_URL + "/blog-details"}`}
            component={BlogDetails}
          />
          <Route
            path={`${process.env.PUBLIC_URL + "/products"}`}
            component={Product}
          />
          <Route
            path={`${process.env.PUBLIC_URL + "/product-details"}`}
            component={ProductDetails}
          />
          <Route
            path={`${process.env.PUBLIC_URL + "/cart"}`}
            component={Cart}
          />
          {/* Admin related routes */}
          <Route
            path="/institution_list"
            name="Home"
            component={ProtectedRoute(InstitutionList)}
          />
          <Route
            path="/application_detail/:id"
            name="Home"
            component={ProtectedRoute(ApplicationDetail)}
          />
          <Route
            path="/institution_update/:id"
            name="Home"
            component={ProtectedRoute(InstitutionUpdate)}
          />
          <Route
            path="/intitution_save"
            name="Home"
            component={ProtectedRoute(InstitutionForm)}
          />
          <Route
            path="/course_list"
            name="Home"
            component={ProtectedRoute(CourseListForAdmin)}
            // render={(props) => <CourseList {...props} />}
          />
          <Route
            path="/course_update/:id"
            name="Home"
            component={ProtectedRoute(CourseUpdate)}
            //render={(props) => <CourseUpdate {...props} />}
          />
          <Route
            path="/course_save"
            name="Home"
            component={ProtectedRoute(CourseForm)}
          />
          <Route
            path="/allAgents"
            name="Home"
            component={ProtectedRoute(AllAgents)}
            // render={(props) => <CourseList {...props} />}
          />
          <Route
            path="/course_photo_list"
            name="Home"
            component={ProtectedRoute(CoursePhotoList)}
            // render={(props) => <CourseList {...props} />}
          />
          <Route
            path="/course_photo_update/:id"
            name="Home"
            component={ProtectedRoute(CoursePhotoUpdate)}
            //render={(props) => <CourseUpdate {...props} />}
          />
          <Route
            path="/course_photo_upload"
            name="Home"
            component={ProtectedRoute(CoursePhotoUpload)}
          />
          <Route
            path="/gallery_list"
            name="Home"
            component={ProtectedRoute(GalleryList)}
            // render={(props) => <CourseList {...props} />}
          />
          <Route
            path="/gallery_update/:id"
            name="Home"
            component={ProtectedRoute(GalleryUpdate)}
            //render={(props) => <CourseUpdate {...props} />}
          />
          <Route
            path="/gallery_upload"
            name="Home"
            component={ProtectedRoute(GalleryUpload)}
          />
          <Route path="/dashboard" component={ProtectedRoute(Dashboard)} />
          <Route
            path="/admin_dashboard"
            name="Home"
            component={ProtectedRoute(AdminDashboard)}
          />
          <Route
            path="/agent_dashboard"
            name="Home"
            component={ProtectedRoute(AgentDashboard)}
          />
          <Route
            path="/agent_users"
            name="Home"
            component={ProtectedRoute(AgentUsers)}
          />
          <Route
            path="/agent_applicant"
            name="Home"
            component={ProtectedRoute(RegisterForUserForAgent)}
          />
          <Route
            path="/agent_highest_qualification/:userId"
            name="Home"
            component={ProtectedRoute(AgentHighestQualification)}
          />
          <Route
            path="/agent_previous_qualification/:userId"
            name="Home"
            component={ProtectedRoute(AgentPreviousQualification)}
          />
          <Route
            path="/agent_highSchool/:userId"
            name="Home"
            component={ProtectedRoute(AgentHighSchool)}
          />
          <Route
            path="/agent_english/:userId"
            name="Home"
            component={ProtectedRoute(AgentEnglish)}
          />
          <Route
            path="/agent_visaHistory/:userId"
            name="Home"
            component={ProtectedRoute(AgentVisaHistory)}
          />
          <Route
            path="/agent_sponsor/:userId"
            name="Home"
            component={ProtectedRoute(AgentSponsorship)}
          />
          <Route
            path="/agent_final_application/:userId"
            name="Home"
            component={ProtectedRoute(AgentFinalApplication)}
          />
          <Route
            path="/agent_user_application_detail/:id"
            name="Home"
            component={ProtectedRoute(ApplicationDetailForAgentUser)}
          />
          <Route
            path="/agent_submitted_Applications"
            name="Home"
            component={ProtectedRoute(AgentSubmittedApplications)}
          />
          <Route
            path="/profile"
            name="Home"
            component={ProtectedRoute(Profile)}
          />
          <Route
            path="/highSchool"
            name="Home"
            component={ProtectedRoute(HighSchool)}
          />
          <Route
            path="/application"
            name="Home"
            component={ProtectedRoute(Application)}
          />
          <Route
            path="/edu_background"
            name="Home"
            component={ProtectedRoute(Qualification)}
          />
          <Route
            path="/visa_history"
            name="Home"
            component={ProtectedRoute(VisaHistory)}
          />
          <Route
            path="/english_test"
            name="Home"
            component={ProtectedRoute(English)}
          />
          <Route
            path="/sponsorship"
            name="Home"
            component={ProtectedRoute(Sponsor)}
          />
          <Route
            path="/agent_applicationSuccess"
            name="Home"
            component={ProtectedRoute(AgentApplicationSuccess)}
          />
          <Route path="" component={PageNotFound} /> // empty ""
          <Route path="*" component={PageNotFound} /> // star *
          <Route component={PageNotFound} />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
