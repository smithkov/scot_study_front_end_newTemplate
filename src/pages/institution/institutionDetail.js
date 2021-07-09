import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CourseItemGrid from "../courses/components/CourseItemsGrid";
import { Styles2 } from "../courses/styles/course.js";
import Timer from "react-compound-timer";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import PopularCourse from "../courses/components/PopularCourse";
import CourseTag from "../courses/components/CourseTag";
import FooterTwo from "../../components/FooterTwo";
import SchoolAbout from "../../components/widgets/schoolAbout";
import { Styles } from "./styles/eventDetails.js";
import clientService from "../../services/clientService";
import Loading from "../../components/widgets/loading";
import Message from "../../components/widgets/message";

const initialLimit = 12;
const initialOffset = 1;
class InstitutionDetail extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    institution: {},
    courses: [],
    faculties: [],
    degreeTypes: [],
    offset: initialOffset,
    limit: initialLimit,
    selectedFaculty: "",
    selectedDegree: "",
    institutionId: "",
    isLoading: true,
    isEmpty: true,
    totalLoad: initialLimit,
    isDisableNext: false,
    isDisablePrev: true,
  };
  componentDidMount = async () => {
    const id = this.props.match.params.id;
    const result = await clientService.findInstitutionById({ id });
    const facultyResult = await clientService.facultiesLight();
    const degreeTypeResult = await clientService.degreeTypes();
    this.setState({
      institution: result.data.data,
      institutionId: id,
      faculties: facultyResult.data.data,
      degreeTypes: degreeTypeResult.data.data,
    });

    const { selectedFaculty, offset, limit, selectedDegree } = this.state;

    this.schoolCourse(selectedFaculty, offset, limit, selectedDegree);
  };
  //api function
  schoolCourse = async (selectedFaculty, offset, limit, selectedDegree) => {
    const { institutionId } = this.state;
    const result = await clientService.findCourseByInstitution({
      institutionId: institutionId,
      facultyId: selectedFaculty,
      offset,
      limit,
      degreeTypeId: selectedDegree,
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
  onChangeFaculty = async (e) => {
    const { selectedDegree, offset, limit } = this.state;

    const faculty = e.target.value;
    this.setState({
      selectedFaculty: faculty,
    });
    await this.schoolCourse(faculty, offset, limit, selectedDegree);
  };
  onChangeDegree = async (e) => {
    const { selectedFaculty, offset, limit } = this.state;

    const selectedDegree = e.target.value;
    this.setState({
      selectedDegree,
    });
    await this.schoolCourse(selectedFaculty, offset, limit, selectedDegree);
  };

  next = async (e) => {
    const { isDisableNext, selectedFaculty, selectedDegree, offset, limit } =
      this.state;
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
        selectedDegree
      );
    }
  };

  prev = async (e) => {
    const { isDisablePrev, selectedFaculty, selectedDegree, offset, limit } =
      this.state;
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
        selectedDegree
      );
    }
  };
  render() {
    const {
      institution,
      courses,
      faculties,
      degreeTypes,
      isEmpty,
      isLoading,
      isDisableNext,
      isDisablePrev,
    } = this.state;
    return (
      <>
        <Styles>
          {/* Main Wrapper */}
          <div className="main-wrapper event-details-page">
            {/* Header 2 */}
            <HeaderTwo />

            {/* Breadcroumb */}
            <BreadcrumbBox title={institution.name} />

            {/* Event Details Area */}
            <Styles>
              <section className="event-details-area">
                <Container>
                  <Row>
                    <Col lg="12" md="8" sm="12">
                      <div className="event-details-content">
                        <div className="heading">
                          <h4>{institution.name}</h4>
                        </div>
                        <div className="event-icon">
                          <ul className="list-unstyled list-inline">
                            <li className="list-inline-item">
                              <i className="las la-calendar"></i> 19 February,
                              2021
                            </li>
                            <li className="list-inline-item">
                              <i className="las la-clock"></i> 10:30am
                            </li>
                            <li className="list-inline-item">
                              <i className="las la-map-marker"></i> 121 Giles
                              Street, Edinburgh EH6 6BZ, CA
                            </li>
                            <li className="list-inline-item">
                              <i className="las la-copy"></i> Social Science
                            </li>
                          </ul>
                        </div>
                        <div className="event-details-banner">
                          <img
                            src={institution.banner}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div className="event-details-overview">
                          <h5>About {institution.name}</h5>

                          <SchoolAbout id={institution.id} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
            </Styles>
          </div>
        </Styles>
        <div className="main-wrapper course-page">
          <Styles2>
            <section
              style={{ backgroundColor: "#F6F9FF" }}
              className="course-grid-area"
            >
              <Container>
                <Row>
                  <Col lg="12" md="12" sm="12">
                    <Row>
                      <Col lg="12" md="12" sm="12">
                        <select
                          onChange={this.onChangeFaculty}
                          class="form-select form-select-lg mb-3"
                          aria-label=".form-select-lg example"
                        >
                          <option selected>Select Faculty</option>
                          {faculties.map((item) => (
                            <>
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>{" "}
                              <br /> <br />
                            </>
                          ))}
                        </select>
                      </Col>

                      <Col lg="12" md="12" sm="12">
                        <select
                          onChange={this.onChangeDegree}
                          class="form-select form-select-lg mb-3"
                          aria-label=".form-select-lg example"
                        >
                          <option selected>Select Degree</option>
                          {degreeTypes.map((item) => (
                            <>
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>{" "}
                              <br /> <br />
                            </>
                          ))}
                        </select>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg="12" md="12" sm="12">
                    {isLoading ? (
                      <Loading />
                    ) : isEmpty ? (
                      <Message text={"No Result Found!"} />
                    ) : (
                      <div className="course-items">
                        <Row>
                          <CourseItemGrid
                            courses={courses}
                            isForInstitution={true}
                          />
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
                  </Col>
                </Row>
              </Container>
            </section>
            <FooterTwo />
          </Styles2>
        </div>
      </>
    );
  }
}

export default InstitutionDetail;
