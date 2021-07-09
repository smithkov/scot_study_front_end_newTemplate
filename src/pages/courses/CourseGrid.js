import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import CourseSidebar from "./components/CourseSidebar";
import CourseItemGrid from "./components/CourseItemsGrid";
import FooterTwo from "../../components/FooterTwo";
import Loading from "../../components/widgets/loading";
import Message from "../../components/widgets/message";
import { Styles } from "./styles/course.js";
import clientService from "../../services/clientService";
const initialLimit = 6;
const initialOffset = 1;
class CourseGrid extends Component {
  state = {
    courses: [],
    isLoading: true,
    selectedFaculty: "",
    selectedDegreeType: "",
    selectedInstitution: "",
    search: "",
    isEmpty: true,
    offset: initialOffset,
    limit: initialLimit,
    totalLoad: initialLimit,
    isDisableNext: false,
    isDisablePrev: true,
  };

  componentDidMount = async () => {
    const {
      selectedFaculty,
      selectedDegreeType,
      selectedInstitution,
      offset,
      limit,
      search,
    } = this.state;

    await this.schoolCourse(
      selectedFaculty,
      offset,
      limit,
      selectedDegreeType,
      selectedInstitution,
      search
    );
  };

  //api function
  schoolCourse = async (
    selectedFaculty,
    offset,
    limit,
    selectedDegree,
    selectedInstitution,
    search
  ) => {
    const result = await clientService.allCoursesSearch({
      institutionId: selectedInstitution,
      facultyId: selectedFaculty,
      offset,
      limit,
      degreeTypeId: selectedDegree,
      search: search,
    });
    let totalLoad = result.data.data;
    let totalLoadLength = totalLoad.length;

    this.setState({
      totalLoad,
      isLoading: false,
      isEmpty: totalLoadLength > 0 ? false : true,
      isDisablePrev: offset < initialLimit ? true : false,
      isDisableNext: initialLimit > totalLoadLength ? true : false,
      courses: result.data.data,
    });
  };

  onChangeDegreeType = async (e) => {
    const { selectedFaculty, selectedInstitution, offset, limit, search } =
      this.state;

    const degreeType = e.target.value;
    this.setState({
      selectedDegree: degreeType,
    });
    await this.schoolCourse(
      selectedFaculty,
      offset,
      limit,
      degreeType,
      selectedInstitution,
      search
    );
  };

  onChangeFaculty = async (e) => {
    const { selectedDegreeType, selectedInstitution, offset, limit, search } =
      this.state;

    const faculty = e.target.value;
    this.setState({
      selectedFaculty: faculty,
    });
    await this.schoolCourse(
      faculty,
      offset,
      limit,
      selectedDegreeType,
      selectedInstitution,
      search
    );
  };
  onChange = async (e) => {
    const search = e.target.value;
    const {
      selectedFaculty,
      selectedDegreeType,
      selectedInstitution,
      offset,
      limit,
    } = this.state;
    this.setState({
      [e.target.name]: search,
    });

    const result = await this.schoolCourse(
      selectedFaculty,
      offset,
      limit,
      selectedDegreeType,
      selectedInstitution,
      search
    );
  };

  next = async (e) => {
    const {
      isDisableNext,
      selectedFaculty,
      selectedDegreeType,
      selectedInstitution,
      offset,
      limit,
      search,
    } = this.state;
    const newOffset = offset + limit;
    if (!isDisableNext) {
      this.setState({
        isDisablePrev: false,
        offset: newOffset,
      });

      await this.schoolCourse(
        selectedFaculty,
        newOffset,
        limit,
        selectedDegreeType,
        selectedInstitution,
        search
      );
    }
  };

  prev = async (e) => {
    const {
      isDisableNext,
      isDisablePrev,
      selectedFaculty,
      selectedDegreeType,
      selectedInstitution,
      offset,
      limit,
      search,
    } = this.state;
    const newOffset = offset - limit;
    if (!isDisablePrev) {
      this.setState({
        isDisableNext: false,
        offset: newOffset,
      });

      await this.schoolCourse(
        selectedFaculty,
        newOffset,
        limit,
        selectedDegreeType,
        selectedInstitution,
        search
      );
    }
  };

  reset = async (e) => {
    const search = "";
    const selectedDegreeType = "";
    const selectedInstitution = "";
    const offset = initialOffset;
    const limit = initialLimit;
    const selectedFaculty = "";

    const result = await this.schoolCourse(
      selectedFaculty,
      offset,
      limit,
      selectedDegreeType,
      selectedInstitution,
      search
    );
  };

  render() {
    const {
      courses,
      isEmpty,
      isLoading,
      search,
      isDisableNext,
      isDisablePrev,
    } = this.state;
    return (
      <div className="main-wrapper course-page">
        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Courses" />

        <Styles>
          {/* Course Grid */}
          <section className="course-grid-area">
            <Container>
              <Row>
                <Col lg="3" md="4" sm="5">
                  <CourseSidebar
                    canShowFaculty={true}
                    search={search}
                    onChange={this.onChange}
                    onChangeFaculty={this.onChangeFaculty}
                    onChangeDegreeType={this.onChangeDegreeType}
                    reset={this.reset}
                  />
                </Col>
                <Col lg="9" md="8" sm="7">
                  {isLoading ? (
                    <Loading />
                  ) : isEmpty ? (
                    <Message text={"No Result Found!"} />
                  ) : (
                    <div className="course-items">
                      <Row>
                        <CourseItemGrid courses={courses} />
                      </Row>
                    </div>
                  )}
                  {isEmpty || isLoading ? (
                    ""
                  ) : (
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button
                        disabled={isDisablePrev}
                        type="button"
                        class="btn btn-primary"
                        onClick={this.prev}
                      >
                        <i class="fas fa-arrow-circle-left"></i> Back
                      </button>
                      <div style={{ width: 20 }}></div>
                      <button
                        disabled={isDisableNext}
                        float="right"
                        type="button"
                        class="btn btn-primary"
                        onClick={this.next}
                      >
                        <i class="fas fa-arrow-circle-right"></i> Next
                      </button>
                    </div>
                  )}
                  <hr />
                </Col>
              </Row>
            </Container>
          </section>
        </Styles>

        {/* FooterTwo 2 */}
        <FooterTwo />
      </div>
    );
  }
}

export default CourseGrid;
