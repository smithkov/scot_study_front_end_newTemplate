import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import ReviewForm from "./components/ReviewForm";
import PopularCourse from "./components/PopularCourse";
import CourseTag from "./components/CourseTag";
import Footer from "../../components/Footer";
import { Styles } from "./styles/course.js";
import clientService from "../../services/clientService";

function CourseDetails(props) {
  const courseId = props.match.params.id;

  const [course, setCourse] = useState({});
  useEffect(async () => {
    const result = await clientService.findCourseById(courseId);
    setCourse(result.data.data);
  }, []);

  return (
    <div className="main-wrapper course-details-page">
      {/* Header 2 */}
      <HeaderTwo />

      {/* Breadcroumb */}
      <BreadcrumbBox title="Course Details" />

      <Styles>
        {/* Course Details */}
        <section className="course-details-area">
          <Container>
            <Row>
              <Col lg="9" md="8" sm="12">
                <div className="course-details-top">
                  <div className="heading">
                    <h4>{course.name}</h4>
                  </div>
                  <div className="course-top-overview">
                    <div className="d-flex overviews">
                      <div className="author">
                        <img
                          src={
                            course.Institution ? course.Institution.logo : ""
                          }
                          alt=""
                        />
                        <div className="author-name">
                          <h6>Institution</h6>
                          <p>
                            {course.Institution ? course.Institution.name : ""}
                          </p>
                        </div>
                      </div>
                      <div className="category">
                        <h6>Faculty</h6>
                        <p>{course.Faculty ? course.Faculty.name : ""}</p>
                      </div>
                      <div className="rating">
                        <h6>Rating</h6>
                        <ul className="list-unstyled list-inline">
                          <li className="list-inline-item">
                            <i className="las la-star"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="las la-star"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="las la-star"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="las la-star"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="las la-star-half-alt"></i>
                          </li>
                          <li className="list-inline-item">(4.5)</li>
                        </ul>
                      </div>
                      <div className="price">
                        <h6>Price</h6>
                        <p>{course.fee}</p>
                      </div>
                    </div>
                  </div>
                  <div className="course-details-banner">
                    <img
                      src={course.CoursePhoto ? course.CoursePhoto.url : ""}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="course-tab-list">
                    <Tab.Container defaultActiveKey="overview">
                      <Tab.Content>
                        <Tab.Pane eventKey="overview" className="overview-tab">
                          <div className="course-learn">
                            <h5>Course Requirements</h5>
                            <p>
                              Undergraduate is a post-secondary school
                              education. An undergraduate degree is a bachelor's
                              or associate's degree. Undergraduate degrees are
                              offered at institutions of higher learning and
                              fall below the level of a master's degree. If you
                              are looking to pursue an undergraduate degree,
                              read on to find out more about the differences
                              between associate's and bachelor's degrees and the
                              type of educational requirements you can expect.
                              Requirements for admission into 1st year of
                              university degree and advanced entry (top-up){" "}
                            </p>
                            <br />
                            <br />
                            <p>-Completed application form</p>

                            <p> -Copy of passport data page</p>
                            <p>
                              -High school/diploma/advance diploma
                              certificates/statement of results
                            </p>
                            <p>-2 academic references</p>
                            <p>-CV</p>
                            <p>
                              -Any other relevant academic/vocational
                              qualifications (if any)
                            </p>

                            <br />
                            <p>
                              {" "}
                              IN ADDITION : Write a personal statement detailing
                              your reasons for choosing the proposed course and
                              benefits to be gained on completion.
                            </p>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                </div>
              </Col>
              <Col lg="3" md="4" sm="12">
                <div className="single-details-sidbar">
                  <Row>
                    <Col md="12">
                      <div className="course-details-feature">
                        <h5 className="title">Course Details</h5>
                        <ul className="list-unstyled feature-list">
                          {course.scholarshipAmount ? (
                            <li>
                              <i className="las la-calendar"></i> Start Date:{" "}
                              <span>{course.scholarshipAmount}</span>
                            </li>
                          ) : (
                            ""
                          )}

                          <li>
                            <i className="las la-clock"></i> Duration:{" "}
                            <span>{course.duration}</span>
                          </li>
                          <li>
                            <i className="las la-globe"></i> Language:{" "}
                            <span>English</span>
                          </li>
                          <li>
                            <i className="las la-sort-amount-up"></i> Intake:{" "}
                            <span>{course.intake}</span>
                          </li>
                          <li>
                            <i className="las la-graduation-cap"></i> Degree :{" "}
                            <span>
                              {course.DegreeType ? course.DegreeType.name : ""}
                            </span>
                          </li>
                          {course.isPopular ? (
                            <li>
                              <i className="las la-book"></i> Is Popular:{" "}
                              <span>Yes</span>
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                        <button type="button" className="enroll-btn">
                          Enroll Course
                        </button>
                      </div>
                    </Col>
                    <Col md="12">
                      <PopularCourse />
                    </Col>
                    <Col md="12">
                      <CourseTag />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Styles>

      {/* Footer 2 */}
      <Footer />
    </div>
  );
}

export default CourseDetails;
