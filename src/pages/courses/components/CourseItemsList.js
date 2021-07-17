import React, { Component, Fragment } from "react";
import Datas from "../../../data/course/item.json";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Pagination from "./../../../components/Pagination";
import { myRoutes } from "../../../utility/constants";

class CourseItemList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        {/* Course Item */}
        {this.props.courses.map((item, i) => (
          <Col md="12" key={i}>
            <div className="course-item d-flex">
              <div className="course-image-box">
                <div
                  className="course-image"
                  style={{
                    backgroundImage: `url(${item.CoursePhoto.url})`,
                  }}
                >
                  <div className="author-img d-flex">
                    <div className="title">
                      <span>{`${item.intake} (intake)`}</span>
                    </div>
                  </div>
                  <div className="course-price">
                    <p>{item.fee}</p>
                  </div>
                </div>
              </div>
              <div style={{ width: "100%" }} className="course-content">
                <h4 style={{ wordWrap: "break-word" }} className="heading">
                  <Link to={myRoutes.courseDetail(item.id)}>{item.name}</Link>
                </h4>
                {/* <div className="rating">
                  <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">
                      <i className="las la-star"></i>
                    </li>
                    <li className="list-inline-item">
                      <i className="las la-star"></i>
                    </li>
                    <li className="list-inline-item">
                      <i className="las la-star"></i>
                    </li>
                    <li className="list-inline-item">
                      <i className="las la-star"></i>
                    </li>
                    <li className="list-inline-item">
                      <i className="las la-star-half-alt"></i>
                    </li>
                    <li className="list-inline-item">(4.5)</li>
                  </ul>
                </div> */}
                <p>
                  <strong>{item.Institution.name}</strong>
                </p>
                <p>
                  {" "}
                  <i className="fas fa-book"></i> {` ${item.Faculty.name}`}
                </p>
                <p className="desc">
                  {item.scholarshipAmount > 0 ? `Scholarship available` : ""}
                </p>
                <p>
                  <i className="las la-clock"></i>
                  {` ${item.duration}`}
                </p>
                <p>
                  <i className="las la-graduation-cap"></i>{" "}
                  {`${item.DegreeType.name}`}
                </p>

                <Link
                  className="details-btn"
                  to={myRoutes.courseDetail(item.id)}
                >
                  View Details
                </Link>
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

export default CourseItemList;
