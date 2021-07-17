import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import CourseSidebarForCompare from "./components/CourseSidebarForCompare";
import CourseItemList from "./components/CourseItemsList";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/course.js";
import clientService from "../../services/clientService";
import Loading from "../../components/widgets/loading";
import Message from "../../components/widgets/message";

const initialLimit = 6;
const initialOffset = 1;
class Compare extends Component {
  state = {
    courses: [],
    faculties: [],
    degreeTypes: [],
    institutions: [],
    selectedFaculty: "",
    offset: initialOffset,
    limit: initialLimit,
    selectedDegree: "",
    selectedInstitution: "",
    isDisablePrev: "",
    isDisableNext: "",
    isLoading: true,
    isEmpty: true,
    search: "",
    isChecked: false,
  };

  async componentDidMount() {
    const {
      selectedFaculty,
      selectedDegree,
      selectedInstitution,
      offset,
      limit,
      search,
      isChecked,
    } = this.state;
    await this.compare(
      selectedFaculty,
      offset,
      limit,
      selectedDegree,
      selectedInstitution,
      search,
      isChecked
    );

    const facultyResult = await clientService.faculties();
    this.setState({ faculties: facultyResult.data.data });
    const degreeTypeResult = await clientService.degreeTypes();
    this.setState({
      degreeTypes: degreeTypeResult.data.data,
    });
    const institutionResult = await clientService.institutions();
    let institutionData = institutionResult.data.data.map((item) => {
      return {
        key: item.id,
        value: item.id,
        text: item.name,
      };
    });
    this.setState({
      institutions: institutionData,
    });
  }

  //api function
  compare = async (
    selectedFaculty,
    offset,
    limit,
    selectedDegree,
    selectedInstitution,
    search,
    isChecked
  ) => {
    const result = await clientService.compare({
      institutionId: selectedInstitution,
      facultyId: selectedFaculty,
      offset,
      limit,
      degreeTypeId: selectedDegree,
      search,
      scholarshipAmount: isChecked,
    });

    let totalLoad = result.data.data;
    let totalLoadLength = totalLoad.length;

    this.setState({
      courses: result.data.data,
      totalLoad,
      isLoading: false,
      isEmpty: totalLoadLength > 0 ? false : true,
      isDisablePrev: offset < initialLimit ? true : false,
      isDisableNext: initialLimit > totalLoadLength ? true : false,
    });
  };

  onChangeFaculty = async (e) => {
    const newFaculty = e.target.value;

    const {
      selectedInstitution,
      selectedDegree,
      offset,
      limit,
      search,
      isChecked,
    } = this.state;
    this.compare(
      newFaculty,
      offset,
      limit,
      selectedDegree,
      selectedInstitution,
      search,
      isChecked
    );
    this.setState({
      selectedFaculty: newFaculty,
    });
  };

  onChangeDegreeType = async (e) => {
    const newDegreeType = e.target.value;

    const {
      selectedInstitution,
      selectedFaculty,
      offset,
      limit,
      search,
      isChecked,
    } = this.state;
    this.compare(
      selectedFaculty,
      offset,
      limit,
      newDegreeType,
      selectedInstitution,
      search,
      isChecked
    );
    this.setState({
      selectedDegree: newDegreeType,
    });
  };

  onChangeInstitution = async (e, data) => {
    const newInstitution = data.value;

    const {
      selectedFaculty,
      selectedDegree,
      offset,
      limit,
      search,
      isChecked,
    } = this.state;
    this.compare(
      selectedFaculty,
      offset,
      limit,
      selectedDegree,
      newInstitution,
      search,
      isChecked
    );
    this.setState({
      selectedInstitution: newInstitution,
    });
  };
  onChangeCheck = async (e, data) => {
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
    }));

    const {
      selectedFaculty,
      selectedDegree,
      selectedInstitution,
      offset,
      limit,
      search,
      isChecked,
    } = this.state;
    this.compare(
      selectedFaculty,
      offset,
      limit,
      selectedDegree,
      selectedInstitution,
      search,
      !isChecked
    );
  };
  onChange = async (e) => {
    const search = e.target.value;

    const {
      selectedFaculty,
      selectedDegree,
      selectedInstitution,
      offset,
      limit,
      isChecked,
    } = this.state;
    this.setState({
      [e.target.name]: search,
    });

    await this.compare(
      selectedFaculty,
      offset,
      limit,
      selectedDegree,
      selectedInstitution,
      search,
      isChecked
    );
  };
  next = async (e) => {
    const {
      isDisableNext,
      selectedFaculty,
      selectedDegree,
      selectedInstitution,
      offset,
      limit,
      search,
      isChecked,
    } = this.state;
    const newOffset = offset + limit;
    if (!isDisableNext) {
      this.setState({
        isDisablePrev: false,
        offset: newOffset,
      });

      await this.compare(
        selectedFaculty,
        newOffset,
        limit,
        selectedDegree,
        selectedInstitution,
        search,
        isChecked
      );
    }
  };

  prev = async (e) => {
    const {
      isDisableNext,
      isDisablePrev,
      selectedFaculty,
      selectedDegree,
      selectedInstitution,
      offset,
      limit,
      search,
      isChecked,
    } = this.state;
    const newOffset = offset - limit;
    if (!isDisablePrev) {
      this.setState({
        isDisableNext: false,
        offset: newOffset,
      });

      await this.compare(
        selectedFaculty,
        newOffset,
        limit,
        selectedDegree,
        selectedInstitution,
        search,
        isChecked
      );
    }
  };
  reset = async (e) => {
    window.location.reload(false);
  };
  render() {
    const {
      courses,
      isDisableNext,
      isDisablePrev,
      isEmpty,
      isLoading,
      faculties,
      degreeTypes,
      institutions,
      isChecked,
    } = this.state;
    return (
      <div className="main-wrapper course-page">
        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Compare" />

        <Styles>
          {/* Course Grid */}
          <section className="course-list-area">
            <Container>
              <Row>
                <Col lg="3" md="4" sm="5">
                  <CourseSidebarForCompare
                    onChangeInstitution={this.onChangeInstitution}
                    onChangeFaculty={this.onChangeFaculty}
                    onChangeDegreeType={this.onChangeDegreeType}
                    canShowFaculty={true}
                    reset={this.reset}
                    onChange={this.onChange}
                    institutions={institutions}
                    faculties={faculties}
                    degreeTypes={degreeTypes}
                    onChangeCheck={this.onChangeCheck}
                    isChecked={isChecked}
                  />
                </Col>
                <Col lg="9" md="8" sm="7">
                  {isLoading ? (
                    <Loading />
                  ) : isEmpty ? (
                    <Message text={"No Result Found!"} />
                  ) : (
                    <div className="course-items2">
                      <Row>
                        <CourseItemList courses={courses} />
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

        {/* Footer 2 */}
        <FooterTwo />
      </div>
    );
  }
}

export default Compare;
