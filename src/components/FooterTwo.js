import React, { useEffect } from "react";
import Datas from "../data/footer/footer2.json";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import BackToTop from "./common/BackToTop";
import { Styles } from "./styles/footerTwo.js";
import { contact, social } from "../utility/constants";
import { TwitterTimelineEmbed } from "react-twitter-embed";

function FooterTwo() {
  const d = new Date();
  useEffect(() => {
    const form = document.getElementById("form4");
    const email = document.getElementById("email4");

    // form.addEventListener("submit", formSubmit);

    function formSubmit(e) {
      e.preventDefault();

      const emailValue = email.value.trim();

      if (emailValue === "") {
        setError(email, "Email can't be blank");
      } else if (!isEmail(emailValue)) {
        setError(email, "Not a valid email");
      } else {
        setSuccess(email);
      }
    }

    function setError(input, message) {
      const formControl = input.parentElement;
      const errorMsg = formControl.querySelector(".input-msg4");
      formControl.className = "form-control error";
      errorMsg.innerText = message;
    }

    function setSuccess(input) {
      const formControl = input.parentElement;
      formControl.className = "form-control success";
    }

    function isEmail(email) {
      return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    }
  });

  return (
    <Styles>
      {/* Footer Two */}
      <footer
        className="footer2"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${Datas.backgroundImage})`,
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
                  ADMISSION, GUIDES YOU THROUGH VISA PROCESSES AND SETTLES YOUR
                  ACCOMMODATION.
                </p>
                <ul className="list-unstyled">
                  <li>
                    <i className="las la-map-marker"></i>
                    {contact.fullAddress()}
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
            <Col md="2">
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
                    <Link to={"/compare"}>
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
                  <li>
                    <Link to="/gallery">
                      <i className="las la-angle-right"></i>Gallery
                    </Link>
                  </li>
                  <li>
                    <Link to="/exchange">
                      <i className="las la-angle-right"></i>Exchange Rate
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md="2">
              <div className="f-links">
                <h5></h5>
                <br />
                <br />
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
                    <Link to={"/exchange"}>
                      <i className="las la-angle-right"></i>Exchange Rate
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
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="ScotStudy"
                options={{ height: 400 }}
              />
            </Col>
            {/* <Col md="3">
              <div className="f-newsletter">
                <h5>Newsletter</h5>
                <p>Subscribe To The Newsletter</p>

                <form id="form4" className="form">
                  <p className="form-control">
                    <input
                      type="email"
                      placeholder="Enter email here"
                      id="email4"
                    />
                    <span className="input-msg4"></span>
                  </p>
                  <button>Submit</button>
                </form>
              </div>
            </Col> */}

            <Col md="12">
              <a
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.scotstudymobile.app"
              >
                <img
                  style={{ width: "200px", height: "80px" }}
                  src="/assets/images/app_store.png"
                />
              </a>
              <a
                target="_blank"
                href="https://apps.apple.com/gb/app/scotstudy/id1583428226"
              >
                <img
                  style={{ width: "200px", height: "80px" }}
                  src="/assets/images/play_store.png"
                />
              </a>
            </Col>

            <Col md="12">
              <div className="copytext-area text-center">
                <p>
                  Scotia World Limited &copy; {d.getFullYear()}, All Rights
                  Reserved.
                </p>
                <ul className="social list-unstyled list-inline">
                  <li className="list-inline-item">
                    <a target="_blank" href={social.facebook}>
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a target="_blank" href={social.twitter}>
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href={social.linkedIn}>
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a target="_blank" href={social.youtube}>
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Back To Top  */}
        <BackToTop />
      </footer>
    </Styles>
  );
}

export default FooterTwo;
