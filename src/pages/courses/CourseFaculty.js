import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import CourseSidebar from "./components/CourseSidebar";
import CourseItemGrid from "./components/CourseItemsGrid";
import Footer from "../../components/Footer";
import Loading from "../../components/widgets/loading";
import Message from "../../components/widgets/message";
import { Styles } from "./styles/course.js";
import clientService from "../../services/clientService";
import { Button, Segment, Dropdown, Grid, Label } from "semantic-ui-react";
import { scrollUp } from "../../utility/constants";
const initialLimit = 6;
const initialOffset = 1;
class CourseFaculty extends Component {
  state = {
    courses: [],
    faculties: [],
    degreeTypes: [],
    institutions: [],
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
    facultyName: "",
    loadingNext: false,
    loadingPrev: false,
  };

  componentDidMount = async () => {
    const facultyId = this.props.match.params.id;
    this.setState({
      selectedFaculty: facultyId,
    });
    const { selectedDegreeType, selectedInstitution, offset, limit, search } =
      this.state;

    await this.schoolCourse(
      facultyId,
      offset,
      limit,
      selectedDegreeType,
      selectedInstitution,
      search
    );

    const facultyResult = await clientService.faculties();
    this.setState({
      faculties: facultyResult.data.data,
    });
    const degreeTypeResult = await clientService.degreeTypes();
    this.setState({
      degreeTypes: degreeTypeResult.data.data,
    });
    const institutionResult = await clientService.institutions();

    this.setState({
      institutions: institutionResult.data.data,
    });
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
    const result = await clientService.courseByParams({
      facultyId: selectedFaculty,
      institutionId: selectedInstitution,
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

  onChangeInstitution = async (e) => {
    const {
      selectedDegreeType,
      selectedFaculty,
      selectedInstitution,
      offset,
      limit,
      search,
    } = this.state;

    const institution = e.target.value;
    this.setState({
      selectedInstitution: institution,
    });
    await this.schoolCourse(
      selectedFaculty,
      offset,
      limit,
      selectedDegreeType,
      institution,
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

  reset = async (e) => {
    const search = "";
    const selectedDegreeType = "";
    const selectedInstitution = "";
    const offset = initialOffset;
    const limit = initialLimit;
    const { selectedFaculty } = this.state;

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
        loadingNext: true,
      });

      await this.schoolCourse(
        selectedFaculty,
        newOffset,
        limit,
        selectedDegreeType,
        selectedInstitution,
        search
      );

      this.setState({
        loadingNext: false,
      });
      scrollUp("wrapper");
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
        loadingPrev: true,
      });

      await this.schoolCourse(
        selectedFaculty,
        newOffset,
        limit,
        selectedDegreeType,
        selectedInstitution,
        search
      );

      this.setState({
        loadingPrev: false,
      });
      scrollUp("wrapper");
    }
  };

  render() {
    const {
      courses,
      isEmpty,
      isLoading,
      search,
      isDisableNext,
      isDisablePrev,
      institutions,
      degreeTypes,
      faculties,
      loadingNext,
      loadingPrev,
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
                    canShowFaculty={false}
                    search={search}
                    onChange={this.onChange}
                    onChangeFaculty={this.onChangeFaculty}
                    onChangeDegreeType={this.onChangeDegreeType}
                    onChangeInstitution={this.onChangeInstitution}
                    reset={this.reset}
                    faculties={faculties}
                    institutions={institutions}
                    degreeTypes={degreeTypes}
                  />
                </Col>
                <Col id="wrapper" lg="9" md="8" sm="7">
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
                    <div class="d-flex flex-row">
                      <Button
                        disabled={isDisablePrev}
                        loading={loadingPrev}
                        color="blue"
                        type="button"
                        class="btn btn-primary"
                        onClick={this.prev}
                      >
                        <i class="fas fa-arrow-circle-left"></i> Back
                      </Button>
                      <div style={{ width: 20 }}></div>
                      <Button
                        disabled={isDisableNext}
                        color="blue"
                        loading={loadingNext}
                        float="right"
                        type="button"
                        class="btn btn-primary"
                        onClick={this.next}
                      >
                        Next <i class="fas fa-arrow-circle-right"></i>
                      </Button>
                    </div>
                  )}
                  <hr />
                </Col>
              </Row>
            </Container>
          </section>
        </Styles>

        {/* Footer 2 */}
        <Footer />
      </div>
    );
  }
}

export default CourseFaculty;
