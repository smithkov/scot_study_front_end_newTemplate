import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import Search from "./common/Search";
import Sidebar from "./common/Sidebar";
import StickyMenu from "./common/StickyMenu";
import Menu from "../components/widgets/menu.js";
import MobileMenu from "./common/MobileMenu";
import { Styles } from "./styles/header.js";
import clientService from "../services/clientService";

class Header extends Component {
  // state = {
  //   institutions: [],
  // };
  // componentDidMount = async () => {
  //   const result = await clientService.institutions();
  //   this.setState({
  //     institutions: result.data.data,
  //   });
  // };
  render() {
    return (
      <Styles>
        {/* Topbar */}
        <section className="top-bar">
          <Container>
            <Row>
              <Col lg="6" md="5">
                <div className="bar-left">
                  <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">
                      <i className="las la-map-marker"></i>121 Giles Street,
                      Edinburgh EH6 6BZ Avenue, CA 94107.
                    </li>
                    <li className="list-inline-item">
                      <Link to={process.env.PUBLIC_URL + "/faq"}>
                        Have Questions
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg="6" md="7">
                <div className="bar-right d-flex justify-content-end">
                  <ul className="list-unstyled list-inline bar-social">
                    <li className="list-inline-item">
                      <Link
                        target="_blank"
                        to="https://www.facebook.com/Scot-study-107271957506468/"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link
                        target="_blank"
                        to="https://twitter.com/scotstudy?lang=en"
                      >
                        <i className="fab fa-twitter"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link target="_blank" to={process.env.PUBLIC_URL + "/"}>
                        <i className="fab fa-linkedin-in"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link
                        target="_blank"
                        to="https://www.instagram.com/scotstudy_/?hl=en-gb"
                      >
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </li>
                  </ul>
                  <ul className="list-unstyled list-inline bar-lang">
                    <li className="list-inline-item">
                      <Dropdown>
                        <Dropdown.Toggle as="Link">
                          <img src={"/assets/images/us.png"} alt="" />
                          English<i className="las la-angle-down"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu as="ul">
                          <Dropdown.Item as="li">
                            <img src={"/assets/images/us.png"} alt="" /> English
                          </Dropdown.Item>
                          <Dropdown.Item as="li">
                            <img src={"/assets/images/fra.png"} alt="" /> French
                          </Dropdown.Item>
                          <Dropdown.Item as="li">
                            <img src={"/assets/images/ger.png"} alt="" /> German
                          </Dropdown.Item>
                          <Dropdown.Item as="li">
                            <img src={"/assets/images/spa.png"} alt="" />{" "}
                            Spanish
                          </Dropdown.Item>
                          <Dropdown.Item as="li">
                            <img src={"/assets/images/bra.png"} alt="" />{" "}
                            Brazilian
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>
                  </ul>
                  <ul className="list-unstyled list-inline bar-login">
                    <li className="list-inline-item">
                      <Link to="/login">
                        <i className="las la-user"></i>Log In
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="/registration">
                        <i className="las la-user-edit"></i>Register
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Logo Area */}
        <section className="logo-area">
          <Container>
            <Row>
              <Col md="3">
                <div className="logo">
                  <a to="/">
                    <img src={"/assets/images/logo.png"} alt="" />
                  </a>
                </div>
              </Col>
              <Col md="9">
                <div className="logo-contact-box d-flex justify-content-end">
                  <div className="emcontact-box d-flex">
                    <div className="box-icon">
                      <i className="flaticon-phone-call"></i>
                    </div>
                    <div className="box-content">
                      <p>Call Us Now</p>
                      <span>(234) 802 666 8008</span>
                    </div>
                  </div>
                  <div className="emcontact-box d-flex">
                    <div className="box-icon">
                      <i className="flaticon-envelope"></i>
                    </div>
                    <div className="box-content">
                      <p>Contact</p>
                      <span>info@scotstudy.co.uk</span>
                    </div>
                  </div>
                  <div className="apply-btn">
                    <Link to="/register">
                      <i className="las la-clipboard-list"></i>Apply Now
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Navbar */}
        <section className="main-menu">
          <Container>
            <Row>
              <Col md="12">
                <div className="main-menu-box">
                  <Menu showBtn={false} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Sticky Menu */}
        <StickyMenu />

        {/* Mobile Menu */}
        <MobileMenu />
      </Styles>
    );
  }
}

export default Header;
