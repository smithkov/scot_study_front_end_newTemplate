import React, { Component, Fragment } from "react";
import Datas from "../../../data/course/item.json";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Pagination from "./../../../components/Pagination";
import { myRoutes, formatScholarship } from "../../../utility/constants";
import { Dropdown, Checkbox, Table } from "semantic-ui-react";

class CourseItemList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { hasSelectedCourse, hasSelectedFee, hasSelectedScholar } =
      this.props;
    console.log(this.props.selections);
    return (
      <Fragment>
        {/* Course Item */}
        <Col md="12">
          <Table color={this.props.color} unstackable fixed compact striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                {hasSelectedCourse || hasSelectedScholar ? (
                  ""
                ) : (
                  <Table.HeaderCell>Fee</Table.HeaderCell>
                )}
                {hasSelectedCourse || hasSelectedFee ? (
                  ""
                ) : (
                  <Table.HeaderCell>Scholarship</Table.HeaderCell>
                )}
                <Table.HeaderCell>Faculty</Table.HeaderCell>
                <Table.HeaderCell>Degree</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body style={{ fontSize: 15 }}>
              {this.props.courses.map((item, i) => (
                <Table.Row>
                  <Table.Cell active={hasSelectedCourse}>
                    <strong>
                      {" "}
                      <Link to={myRoutes.courseDetail(item.id)}>
                        {item.name}
                      </Link>
                    </strong>
                  </Table.Cell>
                  {hasSelectedCourse || hasSelectedScholar ? (
                    ""
                  ) : (
                    <Table.Cell collapsing active={hasSelectedFee}>
                      {item.fee}
                    </Table.Cell>
                  )}
                  {hasSelectedCourse || hasSelectedFee ? (
                    ""
                  ) : (
                    <Table.Cell collapsing active={hasSelectedScholar}>
                      {item.scholarshipAmount > 0 || item.scholarshipAmount ? (
                        <>
                          <i
                            style={{ color: "green" }}
                            class="fas fa-check-circle"
                          ></i>
                          {` ${formatScholarship(item.scholarshipAmount)}`}
                        </>
                      ) : (
                        "None"
                      )}
                    </Table.Cell>
                  )}
                  <Table.Cell collapsing>{item.Faculty.name}</Table.Cell>
                  <Table.Cell collapsing>{item.DegreeType.name}</Table.Cell>
                </Table.Row>
                /*{ <div className="course-item d-flex">
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
         } */
              ))}

              {/* <Col md="12" className="text-center">
          <Pagination />
        </Col> */}
            </Table.Body>
          </Table>
          <hr />
        </Col>
      </Fragment>
    );
  }
}

export default CourseItemList;
