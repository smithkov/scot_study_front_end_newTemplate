import React, { Component } from "react";
import Datas from "../data/footer/footer.json";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import BackToTop from "./common/BackToTop";
import { Styles } from "./styles/footerOne.js";

class Footer extends Component {
  render() {
    const d = new Date();
    return (
      <Styles>
        {/* Footer Area */}
        <footer
          className="footer1"
          style={{
            backgroundImage: `url(assets/images/${
              process.env.PUBLIC_URL + Datas.backgroundImage
            })`,
          }}
        >
          <Container>
            <Row>
              <Col md="4">
                <div className="footer-logo-info">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/f-logo.png"}
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
                      <i className="las la-map-marker"></i>121 Giles Street,
                      Edinburgh EH6 6BZ, CA 94107
                    </li>
                    <li>
                      <i className="las la-envelope"></i>info@scotstudy.co.uk
                    </li>
                    <li>
                      <i className="las la-phone"></i>(234) 802 666 8008
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md="4">
                <div className="f-links">
                  <h5>Useful Links</h5>
                  <ul className="list-unstyled">
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>General Info
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>Help Center
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>Our Services
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>Online Support
                      </Link>
                    </li>
                  </ul>
                  <ul className="list-unstyled">
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>General Info
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>Help Center
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>Our Services
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
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
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/blog-2.jpg"
                        }
                        alt=""
                      />
                    </div>
                    <div className="post-content">
                      <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                        Lorem ipsum dolor sit amet consectet adipisicing elit
                        com...
                      </Link>
                      <span>Mar 30, 2020</span>
                    </div>
                  </div>
                  <div className="post-box d-flex">
                    <div className="post-img">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/blog-3.jpg"
                        }
                        alt=""
                      />
                    </div>
                    <div className="post-content">
                      <Link to={process.env.PUBLIC_URL + "/blog-details"}>
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
