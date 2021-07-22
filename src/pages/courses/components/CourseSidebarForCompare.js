import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import CourseSearch from "./CourseSearch";
import CoursePrice from "./CoursePrice";
import PopularCourse from "./PopularCourse";
import CourseTag from "./CourseTag";
import CourseCategory from "./CourseCategory";
import { Styles } from "../styles/courseSearch.js";
import { Styles2 } from "../styles/courseCategory.js";
import clientService from "../../../services/clientService";
import { Dropdown, Checkbox } from "semantic-ui-react";

class CourseSidebarForCompare extends Component {
  componentDidMount = async () => {};
  render() {
    return (
      <div className="course-sidebar">
        <Row>
          <Col md="12">
            <Styles>
              {/* Course Search */}
              <div className="course-search">
                <h5>Search Course</h5>
                <form action="#">
                  <input
                    onChange={this.props.onChange}
                    type="text"
                    name="search"
                    placeholder="Search course"
                  />
                  <button type="button">
                    <i className="las la-search"></i>
                  </button>
                </form>
              </div>
            </Styles>
          </Col>
          <Col md="12">
            <Styles2>
              {/* Course Tag */}
              <div className="course-category">
                <h5>Institutions</h5>
                <Dropdown
                  onChange={this.props.onChangeInstitution}
                  placeholder="Select Institutions"
                  fluid
                  multiple
                  search
                  selection
                  options={this.props.institutions}
                />
                <br />
                {this.props.canShowFaculty ? (
                  <>
                    <h5>Course Faculty</h5>
                    <select
                      onChange={this.props.onChangeFaculty}
                      class="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                    >
                      <option value="">All</option>
                      {this.props.faculties.map((item) => (
                        <>
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>{" "}
                          <br /> <br />
                        </>
                      ))}
                    </select>

                    <hr />
                  </>
                ) : (
                  ""
                )}

                <h5>Degree Type</h5>
                <select
                  onChange={this.props.onChangeDegreeType}
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option value="">All</option>
                  {this.props.degreeTypes.map((item) => (
                    <>
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>{" "}
                      <br /> <br />
                    </>
                  ))}
                </select>
                <Checkbox
                  name="hasScholarship"
                  onChange={this.props.onChangeCheck}
                  checked={this.props.isChecked}
                  label={<label>Scholarship</label>}
                />
                <p></p>
                <div class="d-grid gap-2">
                  <button
                    onClick={this.props.reset}
                    type="button"
                    class="btn btn-primary"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </Styles2>
          </Col>

          {/* <Col md="12">
            <CoursePrice />
          </Col> */}
          <Col md="12">
            <PopularCourse />
          </Col>
          {/* <Col md="12">
            <CourseTag />
          </Col> */}
        </Row>
      </div>
    );
  }
}

export default CourseSidebarForCompare;
