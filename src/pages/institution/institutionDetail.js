import React, { Component, useEffect, useState } from "react";
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

function InstitutionDetail(props) {
  const id = props.match.params.id;
  const [institution, setInstitution] = useState({});
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [degreeTypes, setDegreeTypes] = useState([]);
  const [offset, setOffset] = useState(initialOffset);
  const [limit, setLimit] = useState(initialLimit);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [institutionId, setInstitutionId] = useState(id);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [totalLoad, setTotalLoad] = useState(initialLimit);
  const [isDisableNext, setIsDisableNext] = useState(false);
  const [isDisablePrev, setIsDisablePrev] = useState(true);

  // state = {
  //   institution: {},
  //   courses: [],
  //   faculties: [],
  //   degreeTypes: [],
  //   offset: initialOffset,
  //   limit: initialLimit,
  //   selectedFaculty: "",
  //   selectedDegree: "",
  //   institutionId: "",
  //   isLoading: true,
  //   isEmpty: true,
  //   totalLoad: initialLimit,
  //   isDisableNext: false,
  //   isDisablePrev: true,
  // };

  useEffect(() => {
    (async () => {
      const result = await clientService.findInstitutionById({ id });
      const facultyResult = await clientService.facultiesLight();
      const degreeTypeResult = await clientService.degreeTypes();
      setInstitution(result.data.data);
      setFaculties(facultyResult.data.data);
      setDegreeTypes(degreeTypeResult.data.data);

      // const { selectedFaculty, offset, limit, selectedDegree } = this.state;

      schoolCourse(selectedFaculty, offset, limit, selectedDegree);
    })();
  }, [id]);
  // componentDidMount = async () => {
  //   const id = this.props.match.params.id;
  //   const result = await clientService.findInstitutionById({ id });
  //   const facultyResult = await clientService.facultiesLight();
  //   const degreeTypeResult = await clientService.degreeTypes();
  //   this.setState({
  //     institution: result.data.data,
  //     institutionId: id,
  //     faculties: facultyResult.data.data,
  //     degreeTypes: degreeTypeResult.data.data,
  //   });

  //   const { selectedFaculty, offset, limit, selectedDegree } = this.state;

  //   this.schoolCourse(selectedFaculty, offset, limit, selectedDegree);
  // };

  //api function
  async function schoolCourse(selectedFaculty, offset, limit, selectedDegree) {
    const result = await clientService.findCourseByInstitution({
      institutionId: institutionId,
      facultyId: selectedFaculty,
      offset,
      limit,
      degreeTypeId: selectedDegree,
    });
    let totalLoad = result.data.data;
    let totalLoadLength = totalLoad.length;

    setTotalLoad(totalLoad);
    setIsLoading(false);
    setIsEmpty(totalLoadLength > 0 ? false : true);
    setIsDisableNext(initialLimit > totalLoadLength ? true : false);
    setIsDisablePrev(offset < initialLimit ? true : false);
    setCourses(result.data.data);
  }
  const onChangeFaculty = async (e) => {
    const faculty = e.target.value;
    setSelectedFaculty(faculty);

    await schoolCourse(faculty, offset, limit, selectedDegree);
  };
  const onChangeDegree = async (e) => {
    const selectedDegree = e.target.value;

    setSelectedDegree(selectedDegree);
    await schoolCourse(selectedFaculty, offset, limit, selectedDegree);
  };

  const next = async (e) => {
    const newOffset = offset + limit;
    if (!isDisableNext) {
      setIsDisablePrev(false);
      setOffset(newOffset);

      await schoolCourse(selectedFaculty, newOffset, limit, selectedDegree);
    }
  };

  const prev = async (e) => {
    const newOffset = offset - limit;
    if (!isDisablePrev) {
      setIsDisableNext(false);
      setOffset(newOffset);

      await schoolCourse(selectedFaculty, newOffset, limit, selectedDegree);
    }
  };

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
                        onChange={onChangeFaculty}
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
                        onChange={onChangeDegree}
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
                        onClick={prev}
                      >
                        <i class="fas fa-arrow-circle-left"></i> Back
                      </button>
                      <div style={{ width: 20 }}></div>
                      <button
                        disabled={isDisableNext}
                        float="right"
                        type="button"
                        class="btn btn-primary"
                        onClick={next}
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

export default InstitutionDetail;
