import React, { useEffect, useState } from "react";
import Datas from "../data/course/filter.json";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/courseFilter.js";
import clientService from "../services/clientService";

function CourseFilter() {
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    (async () => {
      const courses = await clientService.coursesForHome();
      const faculty = await clientService.faculties();
      setFaculty(faculty.data.data);
      setCourses(courses.data.data);
    })();
  }, []);

  return (
    <Styles>
      {/* Course Area */}
      <section className="course-filter">
        <Container>
          <Row>
            <Col md="12">
              <div className="sec-title text-center">
                <h4>{Datas.secTitle}</h4>
              </div>
            </Col>
            <Col md="12">
              <div className="filter-btns text-center">
                <ul className="filter-btn-list list-unstyled list inline">
                  <li data-target="*" className="active list-inline-item">
                    All Courses
                  </li>
                  {faculty.map((item) => {
                    return (
                      <li data-target={item.id} className="list-inline-item">
                        {item.name}
                      </li>
                    );
                  })}
                  {/* <li data-target="desi" className="list-inline-item">
                    Web Design
                  </li>
                  <li data-target="deve" className="list-inline-item">
                    Web Development
                  </li>
                  <li data-target="seo" className="list-inline-item">
                    Seo
                  </li>
                  <li data-target="prog" className="list-inline-item">
                    Programming
                  </li> */}
                </ul>
              </div>
              <Row className="filter-items">
                {courses.map((item) => (
                  <Col lg="4" md="6" key={item.id} data-id={item.facultyId}>
                    <div className="course-item">
                      <a href={`/course-details/${item.id}`}>
                        <div
                          className="course-image"
                          style={{
                            backgroundImage: `url(${item.CoursePhoto.url})`,
                          }}
                        >
                          <div className="author-img d-flex">
                            <div className="img">
                              <img src={item.Institution.logo} alt="" />
                            </div>
                            {/* <div className="title">
                              <p>{data.authorName}</p>
                              <span>{data.authorCourses}</span>
                            </div> */}
                          </div>
                          <div className="course-price">
                            <p>{item.fee}</p>
                          </div>
                        </div>
                      </a>
                      <div className="course-content">
                        <h6 className="heading">
                          <Link to="#">{item.name}</Link>
                        </h6>
                        <p className="desc">{item.Institution.name}</p>
                        <div className="course-face d-flex justify-content-between">
                          <div className="duration">
                            <p>
                              <i className="las la-clock"></i>
                              {item.duration}
                            </p>
                          </div>

                          <div className="student">
                            <p>
                              <i className="las la-chair"></i>
                              {item.intake}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col md="12" className="text-center">
              <div className="viewall-btn">
                <Link to={process.env.PUBLIC_URL + "/course-grid"}>
                  View All Courses
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Styles>
  );
}

export default CourseFilter;
