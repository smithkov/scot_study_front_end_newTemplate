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

class CourseSidebar extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    faculties: [],
    degreeTypes: [],
  };

  componentDidMount = async () => {
    const result = await clientService.faculties();
    const degreeTypeResult = await clientService.degreeTypes();

    this.setState({
      faculties: result.data.data,
      degreeTypes: degreeTypeResult.data.data,
    });
  };
  render() {
    const { faculties, degreeTypes } = this.state;
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
                    value={this.props.search}
                    onChange={this.props.onChange}
                    type="text"
                    name="search"
                    placeholder="Search Here"
                  />
                  <button type="submit">
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
                <h5>Course Faculty</h5>
                <select
                  onChange={this.props.onChangeFaculty}
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option selected>Select faculty</option>
                  {faculties.map((item) => (
                    <>
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>{" "}
                      <br /> <br />
                    </>
                  ))}
                </select>

                <hr />
                <h5>Degree Type</h5>
                <select
                  onChange={this.props.onChangeDegreeType}
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option selected>Select degree</option>
                  {degreeTypes.map((item) => (
                    <>
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>{" "}
                      <br /> <br />
                    </>
                  ))}
                </select>
              </div>
            </Styles2>
          </Col>

          {/* <Col md="12">
            <CoursePrice />
          </Col> */}
          <Col md="12">
            <PopularCourse />
          </Col>
          <Col md="12">
            <CourseTag />
          </Col>
        </Row>
      </div>
    );
  }
}

export default CourseSidebar;
