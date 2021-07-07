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
  state = {
    institutions: [],
  };
  componentDidMount = async () => {
    const result = await clientService.institutions();
    this.setState({
      institutions: result.data.data,
    });
  };
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
                      <a target="_blank" href={process.env.PUBLIC_URL + "/"}>
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        target="_blank"
                        href="https://www.instagram.com/scotstudy_/?hl=en-gb"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                  <ul className="list-unstyled list-inline bar-lang">
                    <li className="list-inline-item">
                      <Dropdown>
                        <Dropdown.Toggle as="a">
                          <img
                            src={
                              process.env.PUBLIC_URL + "/assets/images/us.png"
                            }
                            alt=""
                          />
                          English<i className="las la-angle-down"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu as="ul">
                          <Dropdown.Item as="li">
                            <img
                              src={
                                process.env.PUBLIC_URL + "/assets/images/us.png"
                              }
                              alt=""
                            />{" "}
                            English
                          </Dropdown.Item>
                          <Dropdown.Item as="li">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/fra.png"
                              }
                              alt=""
                            />{" "}
                            French
                          </Dropdown.Item>
                          <Dropdown.Item as="li">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/ger.png"
                              }
                              alt=""
                            />{" "}
                            German
                          </Dropdown.Item>
                          <Dropdown.Item as="li">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/spa.png"
                              }
                              alt=""
                            />{" "}
                            Spanish
                          </Dropdown.Item>
                          <Dropdown.Item as="li">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/bra.png"
                              }
                              alt=""
                            />{" "}
                            Brazilian
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>
                  </ul>
                  <ul className="list-unstyled list-inline bar-login">
                    <li className="list-inline-item">
                      <Link to={process.env.PUBLIC_URL + "/login"}>
                        <i className="las la-user"></i>Log In
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to={process.env.PUBLIC_URL + "/registration"}>
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
                  <Link to={process.env.PUBLIC_URL + "/"}>
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                      alt=""
                    />
                  </Link>
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
                      <p>Enquery Us</p>
                      <span>info@scotstudy.co.uk</span>
                    </div>
                  </div>
                  <div className="apply-btn">
                    <Link to={process.env.PUBLIC_URL + "/registration"}>
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
