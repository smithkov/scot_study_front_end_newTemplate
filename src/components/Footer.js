import React, { Component } from "react";
import Datas from "../data/footer/footer.json";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import BackToTop from "./common/BackToTop";
import { Styles } from "./styles/footerOne.js";
import { social, contact } from "../utility/constants";

class Footer extends Component {
  render() {
    const d = new Date();
    return (
      <Styles>
        {/* Footer Area */}
        <footer
          className="footer1"
          style={{
            backgroundImage: `url(assets/images/${Datas.backgroundImage})`,
          }}
        >
          <Container>
            <Row>
              <Col md="4">
                <div className="footer-logo-info">
                  <img
                    src={"/assets/images/f-logo.png"}
                    alt=""
                    className="img-fluid"
                  />
                  <p>
                    OUR ALL-IN-ONE PLATFORM HELPS YOU MONITOR AND SECURE
                    ADMISSION, GUIDES YOU THROUGH VISA PROCESSES AND SETTLES
                    YOUR ACCOMMODATION.
                  </p>
                  <ul className="list-unstyled">
                    <li>
                      <i className="las la-map-marker"></i>
                      {contact.address},{`${contact.city} ${contact.postcode}`}
                    </li>
                    <li>
                      <i className="las la-envelope"></i>
                      {contact.email}
                    </li>
                    <li>
                      <i className="las la-phone"></i>
                      {contact.phone1}
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md="4">
                <div className="f-links">
                  <h5>Useful Links</h5>
                  <ul className="list-unstyled">
                    <li>
                      <Link to={"/"}>
                        <i className="las la-angle-right"></i>Home
                      </Link>
                    </li>
                    <li>
                      <Link to={"/institutions"}>
                        <i className="las la-angle-right"></i>Institutions
                      </Link>
                    </li>

                    <li>
                      <Link to={"/courses"}>
                        <i className="las la-angle-right"></i>Courses
                      </Link>
                    </li>
                    <li>
                      <Link to={"/"}>
                        <i className="las la-angle-right"></i>Compare
                      </Link>
                    </li>
                    <li>
                      <Link to={"/contact"}>
                        <i className="las la-angle-right"></i>Contact
                      </Link>
                    </li>
                    <li>
                      <Link to={"/about"}>
                        <i className="las la-angle-right"></i>About Us
                      </Link>
                    </li>
                  </ul>
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/gallery">
                        <i className="las la-angle-right"></i>Gallery
                      </Link>
                    </li>
                    <li>
                      <Link to={"/contact"}>
                        <i className="las la-angle-right"></i>Help Center
                      </Link>
                    </li>
                    <li>
                      <Link to={"/about"}>
                        <i className="las la-angle-right"></i>Our Services
                      </Link>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href={
                          "https://www.freeprivacypolicy.com/live/7b6cada2-2648-4ac4-af00-fbdd6aacdc3b"
                        }
                      >
                        <i className="las la-angle-right"></i>Privacy Policy
                      </a>
                    </li>
                    <li>
                      <Link to={"/"}>
                        <i className="las la-angle-right"></i>Online Support
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md="4">
                <div className="f-post">
                  <h5>Recent Post</h5>
                  <div className="post-box d-flex">
                    <div className="post-img">
                      <img src={"/assets/images/blog-2.jpg"} alt="" />
                    </div>
                    <div className="post-content">
                      <Link to={"/blog-details"}>
                        Lorem ipsum dolor sit amet consectet adipisicing elit
                        com...
                      </Link>
                      <span>Mar 30, 2020</span>
                    </div>
                  </div>
                  <div className="post-box d-flex">
                    <div className="post-img">
                      <img src={"/assets/images/blog-3.jpg"} alt="" />
                    </div>
                    <div className="post-content">
                      <Link to={"/blog-details"}>
                        Lorem ipsum dolor sit amet consectet adipisicing elit
                        com...
                      </Link>
                      <span>Mar 30, 2020</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>

        {/* Copyright Area */}
        <section className="copyright-area">
          <Container>
            <Row>
              <Col md="6">
                <div className="copy-text">
                  <p>
                    Scotia World Limited &copy; {d.getFullYear()}, All Rights
                    Reserved.
                  </p>
                </div>
              </Col>
              <Col md="6" className="text-right">
                <ul target className="social list-unstyled list-inline">
                  <li className="list-inline-item">
                    <a
                      target="_blank"
                      href="https://www.facebook.com/Scot-study-107271957506468/"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      target="_blank"
                      href="https://twitter.com/scotstudy?lang=en"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="/">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      target="_blank"
                      href="https://www.youtube.com/channel/UC9ItAoglSWFBcxHsiJ0QX9g"
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>

          {/* Back To Top */}
          <BackToTop />
        </section>
      </Styles>
    );
  }
}

export default Footer;
