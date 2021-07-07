import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import clientService from "../../services/clientService";

function Menu(props) {
  const [institutions, setInstitutions] = useState([]);
  useEffect(async () => {
    const result = await clientService.institutions();
    setInstitutions(result.data.data);
    window.addEventListener("scroll", () => {
      const stickyMenu = document.querySelector(".sticky-menu");

      if (window.scrollY > 160) {
        stickyMenu.classList.add("sticky");
      } else {
        stickyMenu.classList.remove("sticky");
      }
    });
  }, []);

  return (
    <div className="menu-box d-flex justify-content-end">
      <ul className="nav menu-nav">
        <li className="nav-item dropdown active">
          <Link
            className="nav-link dropdown-toggle"
            to={process.env.PUBLIC_URL + "/"}
            data-toggle="dropdown"
          >
            Home <i className="las"></i>
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to={process.env.PUBLIC_URL + "/"}
            data-toggle="dropdown"
          >
            Institutions <i className="las la-angle-down"></i>
          </Link>
          <ul className="dropdown list-unstyled">
            {institutions.map((item) => {
              return (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={process.env.PUBLIC_URL + "/about"}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="/courses"
            data-toggle="dropdown"
          >
            Courses <i className="las"></i>
          </a>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to={process.env.PUBLIC_URL + "/"}
            data-toggle="dropdown"
          >
            Compare <i className="las"></i>
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to={process.env.PUBLIC_URL + "/"}
            data-toggle="dropdown"
          >
            Contact <i className="las"></i>
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="/about"
            data-toggle="dropdown"
          >
            About Us <i className="las"></i>
          </a>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to={process.env.PUBLIC_URL + "/"}
            data-toggle="dropdown"
          >
            e-Pay <i className="las"></i>
          </Link>
        </li>
      </ul>
      {props.showBtn ? (
        <div className="apply-btn">
          <Link to={process.env.PUBLIC_URL + "/registration"}>
            <i className="las la-clipboard-list"></i>Apply Now
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Menu;
