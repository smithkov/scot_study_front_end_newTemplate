import React, { Component, Fragment } from "react";
import Datas from "../../../data/course/item.json";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Pagination from "./../../../components/Pagination";
import { myRoutes } from "../../../utility/constants";

class CourseItemGrid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { courses, isForInstitution } = this.props;
    return (
      <Fragment>
        {/* Course Item */}

        {courses.map((item, i) => (
          <Col lg={isForInstitution ? 4 : 6} md={12} key={i}>
            <div className="course-item">
              <Link to={myRoutes.courseDetail(item.id)}>
                <div
                  className="course-image"
                  style={{
                    backgroundImage: `url(${item.CoursePhoto.url})`,
                  }}
                >
                  <div className="author-img d-flex">
                    <div className="img">
                      <img src="" alt="" />
                    </div>
                    <div className="title">
                      <p>{item.Institution.name}</p>
                      <span>{item.Faculty.name}</span>
                    </div>
                  </div>
                  <div className="course-price">
                    <p>{item.fee}</p>
                  </div>
                </div>
              </Link>
              <div className="course-content">
                <h6 className="heading">
                  <Link to={myRoutes.courseDetail(item.id)}>{item.name}</Link>
                </h6>
                <p className="desc">
                  {item.intake}
                  {item.isPopular ? (
                    <span style={{ color: "green" }}> {` (Popular)`}</span>
                  ) : (
                    ""
                  )}
                  <span style={{ float: "right" }}>
                    {item.scholarshipAmount != 0 ? "Scholarship available" : ""}
                  </span>
                </p>
                <div className="course-face d-flex justify-content-between">
                  <div className="duration">
                    <p>
                      <i className="las la-clock"></i>
                      {item.duration}
                    </p>
                  </div>

                  <div className="student">
                    <p>
                      <i className="las la-graduation-cap"></i>
                      {item.DegreeType ? item.DegreeType.name : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))}

        {/* <Col md="12" className="text-center">
          <Pagination />
        </Col> */}
      </Fragment>
    );
  }
}

export default CourseItemGrid;
