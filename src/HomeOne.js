import React, { Component } from "react";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import IconBox from "./components/IconBox";
import AboutUs from "./components/AboutUs";
import CourseSlider from "./components/CourseSlider";
import TestimonialSlider from "./components/TestimonialSlider";
import FaqEvent from "./components/FaqEvent";
import TeamSlider from "./components/TeamSlider";
import HelpArea from "./components/HelpArea";
import HomeBlog from "./components/HomeBlog";
import CampusTour from "./components/CampusTour";
import NewsletterForm from "./components/NewsletterForm";
import Footer from "./components/Footer";
import Datas from "./data/event/events.json";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Styles } from "./styles/event.js";

export default class HomeOne extends Component {
  render() {
    return (
      <div className="main-wrapper">
        {/* Header */}
        <Header />

        {/* Hero Slider */}
        <HeroSlider />

        {/* Icon Box */}
        <IconBox />

        {/* About Area */}
        <AboutUs />

        {/* Course Filter */}
        {/* <CourseFilter /> */}

        <Styles>
          <div
            style={{ backgroundColor: "#3c4b64" }}
            className="main-wrapper event-page"
          >
            <section className="event-page-area">
              <Container>
                <Row>
                  <Col lg="12" md="12">
                    <div className="event-box">
                      <Row>
                        <Col xl="3" lg="4" md="0">
                          <div className="event-img">
                            <Link to={"#"}>
                              <img
                                src="https://scotsudy.s3.eu-west-2.amazonaws.com/scot_study_phd.png"
                                alt=""
                                className="img-fluid"
                              />
                            </Link>
                          </div>
                        </Col>
                        <Col xl="9" lg="8" md="12">
                          <div className="event-content">
                            <div className="content-box">
                              <Row>
                                <Col md="9">
                                  <div className="event-title">
                                    <h6>
                                      <Link to="/phd_application">
                                        <h4>APPLY FOR PhD</h4>
                                      </Link>
                                    </h6>
                                  </div>
                                  <div className="event-time-location">
                                    <ul className="list-unstyled list-inline">
                                      <li className="list-inline-item">
                                        <i className="las la-clock"></i>{" "}
                                        {`All year round`}
                                      </li>
                                      <li className="list-inline-item">
                                        <i className="las la-map-marker"></i>{" "}
                                        {`Scotland`}
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="event-desc">
                                    <p>
                                      There are many sources of financial
                                      support including postgraduate loans and
                                      additional study funding that is offered
                                      by Universities and Charities.
                                      Universities offer postgraduate funding to
                                      support students looking to continue their
                                      studies at a specialist level. These
                                      degrees can offer qualifications such as
                                      MA, MSc, MRes, MBA, MPhill and PhD.
                                      Postgraduate degrees are expensive and
                                      many students looking to study in the UK
                                      will look to additional funding sources in
                                      order to provide extra support.
                                    </p>
                                  </div>
                                </Col>
                                <Col md="3" className="text-center">
                                  <div className="event-date">
                                    {/* <p>{data.eventDate}</p> */}
                                  </div>
                                  <div className="join-btn">
                                    <Link to={`/phd_application`}>
                                      Apply Now
                                    </Link>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <Col md="12" className="text-center">
                      {/* <Pagination /> */}
                    </Col>
                  </Col>

                  <Col lg="3" md="0">
                    {/* <CourseSidebar /> */}
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
        </Styles>
        <CourseSlider />
        {/* Testimonial Slider */}
        <TestimonialSlider />

        {/* Events Area */}

        {/* Team Slider */}
        {/* <TeamSlider /> */}

        {/* Help Area */}
        {/* <HelpArea /> */}

        {/* Blog Area */}
        {/* <HomeBlog /> */}

        {/* Campus Tour */}
        {/* < CampusTour /> */}

        {/* Newsletter Form */}
        <NewsletterForm />

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}
