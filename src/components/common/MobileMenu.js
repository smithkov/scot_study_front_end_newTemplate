import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/mobileMenu.js";
import clientService from "../../services/clientService";

function MobileMenu() {
  const [institution, setInstitution] = useState([]);

  useEffect(() => {
    // Mobile Menu
    (async () => {
      const result = await clientService.institutionsLighter();
      setInstitution(result.data.data);
    })();
    const hmBtn = document.getElementById("mb-sidebar-btn");

    if (hmBtn) {
      const mdSidebarOverlay = document.getElementById("mb-sidebar-overlay");
      const mdSidebarBody = document.getElementById("mb-sidebar-body");
      const mdSidebarExit = document.getElementById("close-mb-sidebar");

      hmBtn.addEventListener("click", function (e) {
        e.preventDefault();
        mdSidebarOverlay.classList.toggle("visible");
        mdSidebarBody.classList.toggle("opened");
      });

      mdSidebarOverlay.addEventListener("click", function (e) {
        e.preventDefault();
        mdSidebarOverlay.classList.remove("visible");
        mdSidebarBody.classList.remove("opened");
      });

      mdSidebarExit.addEventListener("click", function (e) {
        e.preventDefault();
        mdSidebarOverlay.classList.remove("visible");
        mdSidebarBody.classList.remove("opened");
      });
    }

    // Menu Accordion -----------------
    const menuButton = document.querySelectorAll(".mb-menu-button");
    menuButton.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("active");
        const content = button.nextElementSibling;

        if (button.classList.contains("active")) {
          content.className = "mb-menu-content show";
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.className = "mb-menu-content";
          content.style.maxHeight = "0";
        }
      });
    });
  }, []);

  return (
    <Styles>
      {/* Mobile Menu */}
      <section className="mobile-menu-area">
        <Container>
          <Row>
            <Col md="0" sm="12">
              {/* <div className="mb-topbar d-flex justify-content-between">
                <div className="topbar-item">
                  <p>
                    <i className="las la-phone"></i>(234) 802 666 8008
                  </p>
                </div>
                <div className="topbar-item">
                  <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">
                      <Link to={process.env.PUBLIC_URL + "/login"}>Log In</Link>
                    </li>
                    <li className="list-inline-item">/</li>
                    <li className="list-inline-item">
                      <Link to={process.env.PUBLIC_URL + "/registration"}>
                        Register
                      </Link>
                    </li>
                  </ul>
                </div>
              </div> */}
              <div className="mb-logo-area d-flex justify-content-between">
                <div className="mb-logo-box d-flex">
                  <div className="hm-button">
                    <a href={process.env.PUBLIC_URL + "/"} id="mb-sidebar-btn">
                      <i className="las la-bars"></i>
                    </a>
                  </div>
                  <div className="mb-logo">
                    <Link to={process.env.PUBLIC_URL + "/"}>
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/f-logo.png"
                        }
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
                {/* <div className="mb-search-box">
                  <form action="#">
                    <input
                      type="text"
                      name="search"
                      placeholder="Search Here"
                    />
                    <button type="submit">
                      <i className="las la-search"></i>
                    </button>
                  </form>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mobile Menu Sidebar */}
      <section className="mb-sidebar" id="mb-sidebar-body">
        <div className="mb-sidebar-heading d-flex justify-content-between">
          <div>
            <h5>Menu</h5>
          </div>
          <div>
            <a href={process.env.PUBLIC_URL + "/"} id="close-mb-sidebar">
              <i className="las la-times"></i>
            </a>
          </div>
        </div>
        <div className="mb-sidebar-menu">
          <div className="mb-menu-item">
            <button className="mb-menu-button active">
              <p>
                Home <i className="las la-plus"></i>
              </p>
            </button>
          </div>
          <div className="mb-menu-item">
            <button className="mb-menu-button active">
              <p>
                Intitutions <i className="las la-plus"></i>
              </p>
            </button>
            <div className="mb-menu-content show">
              <ul className="list-unstyled">
                {institution.map((item) => {
                  return (
                    <li>
                      <Link to={`/institution/${item.id}`}>{item.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="mb-menu-item">
            <button className="mb-menu-button active">
              <p>
                Courses <i className="las la-plus"></i>
              </p>
            </button>
            <div className="mb-menu-content show">
              <ul className="list-unstyled">
                <li>
                  <Link to={"/courses"}>Course List</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-menu-item">
            <button className="mb-menu-button">
              <p>
                Compare <i className="las la-plus"></i>
              </p>
            </button>
            <div className="mb-menu-content">
              <ul className="list-unstyled">
                <li>
                  <Link to={`/compare`}>Compare Courses</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-menu-item">
            <button className="mb-menu-button">
              <p>
                Contact <i className="las la-plus"></i>
              </p>
            </button>
            <div className="mb-menu-content">
              <ul className="list-unstyled">
                <li>
                  <Link to={`/contact`}>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-menu-item">
            <button className="mb-menu-button">
              <p>
                About <i className="las la-plus"></i>
              </p>
            </button>
            <div className="mb-menu-content">
              <ul className="list-unstyled">
                <li>
                  <Link to={`/about`}>About Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-menu-item">
            <button className="mb-menu-button">
              <p>
                Gallery <i className="las la-plus"></i>
              </p>
            </button>
            <div className="mb-menu-content">
              <ul className="list-unstyled">
                <li>
                  <Link to={`/gallery`}>Our Gallery</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-menu-item">
            <button className="mb-menu-button">
              <p>
                E-Pay <i className="las la-plus"></i>
              </p>
            </button>
            <div className="mb-menu-content">
              <ul className="list-unstyled">
                <li>
                  <Link to={``}>Make Payment</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="mb-sidebar-overlay" id="mb-sidebar-overlay"></div>
    </Styles>
  );
}

export default MobileMenu;
