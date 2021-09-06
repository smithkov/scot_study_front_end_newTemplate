import React, { useState, useEffect, useRef } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import clientService from "../../services/clientService";
import { asyncLocalStorage, TOKEN, USER } from "../../utility/global";
import { Link, Redirect } from "react-router-dom";
import Loading from "../../components/widgets/loading";
import { CCard, CCardBody, CCardFooter, CCardHeader } from "@coreui/react";
import Modal from "react-bootstrap/Modal";
import { years } from "../utility/constants";
import {
  Menu,
  Dropdown,
  Header,
  Button,
  Icon,
  Image,
  Table,
  Segment,
  Grid,
  Form,
  Placeholder,
  Divider,
  List,
  Message,
  Input,
} from "semantic-ui-react";
const Application = (props) => {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [highSchoolName, setHighSchoolName] = useState("");
  let [selectedCompletionYear, setSelectedCompletionYear] = useState("");
  let [completedYear, setCompletedYear] = useState([]);
  let [userId, setUserId] = useState("");
  let [schoolOne, setSchoolOne] = useState([]);
  let [schoolTwo, setSchoolTwo] = useState([]);
  let [selectedSchoolOne, setSelectedSchoolOne] = useState("");
  let [selectedSchoolTwo, setSelectedSchoolTwo] = useState("");
  let [selectedSchoolOneName, setSelectedSchoolOneName] = useState("");
  let [selectedSchoolTwoName, setSelectedSchoolTwoName] = useState("");
  let [isOpenModal, setIsOpenModal] = useState(false);
  let [institutions, setInstitutions] = useState([]);
  let [degreeTypes, setDegreeTypes] = useState([]);
  let [selectedDegreeType, setSelectedDegreeType] = useState("");
  let [faculties, setFaculties] = useState("");
  let [selectedFaculty, setSelectedFaculty] = useState("");
  let [selectedInstitution, setSelectedInstitution] = useState("");

  let [search, setSearch] = useState("");

  let [isCourse1, setIsCourse1] = useState(false);
  let [isCourse2, setIsCourse2] = useState(false);
  let [courseOneId, setCourseOneId] = useState("");
  let [courseTwoId, setCourseTwoId] = useState("");

  let [hasLoadedDegreeType, setHasLoadedDegreeType] = useState(false);

  let [courseOne, setCourseOne] = useState("");
  let [courseTwo, setCourseTwo] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  let [hasApplied, setHasApplied] = useState(false);
  let [submitFlag, setSubmitFlag] = useState(false);

  let [defaultDegree, setDefaultDegree] = useState("");

  useEffect(() => {
    (async () => {
      const degreeTypeResult = await clientService.degreeTypes();

      let degreeTypeData = degreeTypeResult.data.data.map((item) => {
        return {
          key: item.id,
          value: item.id,
          text: item.name,
        };
      });

      setDegreeTypes(degreeTypeData);

      const facultyResult = await clientService.facultiesLight();

      let facultyData = facultyResult.data.data.map((item) => {
        return {
          key: item.id,
          value: item.id,
          text: item.name,
        };
      });

      setFaculties(facultyData);

      const schools = await clientService.institutions();

      let schoolData = schools.data.data.map((item) => {
        return {
          key: item.id,
          value: item.id,
          text: item.name,
        };
      });

      setSchoolOne(schoolData);
      setSchoolTwo(schoolData);

      const getUser = await asyncLocalStorage.getUser();
      const userId = getUser.id;
      setUserId(userId);

      // const highestQuali = await clientService.findHighestQualification({
      //   userId,
      // });
      // if (!highestQuali.data.data) {
      //   props.history.push("/edu_background");
      // }

      // const highSchool = await clientService.findHighSchool({
      //   userId,
      // });

      // if (!highSchool.data.data) {
      //   props.history.push("/highSchool");
      // }

      // const englishTest = await clientService.findEnglish({
      //   userId,
      // });

      // if (!englishTest.data.data) {
      //   props.history.push("/english_test");
      // }

      // const sponsor = await clientService.findSponsor({
      //   userId,
      // });
      // if (!sponsor.data.data) {
      //   props.history.push("/sponsorship");
      // }
      // const visaHistory = await clientService.findVisa({
      //   userId,
      // });
      // if (!visaHistory.data.data) {
      //   props.history.push("/visa_history");
      // }

      const findApplications = await clientService.findApplicationsByUser({
        userId,
      });
      setHasApplied(findApplications.data.data.length > 0 ? true : false);
      const previousSelectedCourse = await asyncLocalStorage.getCourse();
      if (previousSelectedCourse) {
        const findCourseResult = await clientService.findCourseById(
          previousSelectedCourse
        );
        const findCourseData = findCourseResult.data.data;
        setCourseOne(findCourseData);
        setCourseOneId(findCourseData.id);
        setDefaultDegree(findCourseData.DegreeTypeId);
        setSelectedDegreeType(findCourseData.DegreeTypeId);
        if (findCourseData.Institution) {
          setSelectedSchoolOneName(findCourseData.Institution.name);
        }
      }
      setHasLoadedDegreeType(true);
    })();
  }, []);
  const onChangeDropdown = async (e, data) => {
    const name = data.name;
    const value = data.value;
    const text = e.target.innerText;

    if (name == "selectedSchoolOne") {
      setSelectedSchoolOne(value);
      setSelectedSchoolOneName(text);
    } else if (name == "selectedSchoolTwo") {
      setSelectedSchoolTwo(value);
      setSelectedSchoolTwoName(text);
    } else if (name == "selectedDegreeType") {
      setSelectedDegreeType(value);
    } else if (name == "selectedFaculty") {
      setSelectedFaculty(value);

      const school = await clientService.findCourseByInstitutionForReg({
        institutionId: selectedSchoolOne,
        degreeTypeId: selectedDegreeType,
        search: search,
        facultyId: value,
      });

      const data = school.data.data;

      setInstitutions(data);
    }
  };
  const selectCourse = async (course) => {
    if (isCourse1) {
      await asyncLocalStorage.setCourse(course.id);
      setCourseOne(course);
      setCourseOneId(course.id);
      setSelectedSchoolOneName(course.Institution.name);
    } else if (isCourse2) {
      setCourseTwo(course);
      setCourseTwoId(course.id);
      setSelectedSchoolTwoName(course.Institution.name);
    }
    setIsOpenModal(false);
  };

  const newApplication = () => {
    setHasApplied(false);
  };
  const loadSchoolOne = async () => {
    setIsOpenModal(true);
    setIsCourse1(true);
    setIsCourse2(false);

    const school = await clientService.findCourseByInstitutionForReg({
      institutionId: selectedSchoolOne,
      degreeTypeId: selectedDegreeType,
      search: search,
      facultyId: selectedFaculty,
    });
    const data = school.data.data;

    setInstitutions(data);
  };

  const loadSchoolTwo = async () => {
    setIsOpenModal(true);
    setIsCourse1(false);
    setIsCourse2(true);
    const school = await clientService.findCourseByInstitutionForReg({
      institutionId: selectedSchoolTwo,
      degreeTypeId: selectedDegreeType,
      search: search,
      facultyId: selectedFaculty,
    });
    const data = school.data.data;

    setInstitutions(data);
  };
  const removeCourse = (courseNumber) => {
    if (courseNumber == 1) {
      setCourseOne("");
    } else if (courseNumber == 2) {
      setCourseTwo("");
    }
  };
  const searchCourse = async (e) => {
    const value = e.target.value;
    const school = await clientService.findCourseByInstitutionForReg({
      institutionId: selectedSchoolTwo,
      degreeTypeId: selectedDegreeType,
      search: value,
      facultyId: selectedFaculty,
    });
    const data = school.data.data;

    setInstitutions(data);
  };
  const update = async () => {
    if (courseOne != "") {
      setLoading(true);

      const updateUser = await clientService.saveApplication({
        courseOne: courseOne ? courseOne.name : "",
        courseTwo: courseTwo ? courseTwo.name : "",
        institutionOne: selectedSchoolOneName,
        institutionTwo: selectedSchoolTwoName,
        degreeTypeId: selectedDegreeType,
        userId: userId,
      });

      const result = updateUser.data;
      if (!result.error) {
        await asyncLocalStorage.removeCourse();
        props.history.push("/applicationSuccess");
      }

      setLoading(false);
    } else {
      setIsShowMessage(true);
      setErrorMessage("Please select at least a first course of choice.");
    }
    window.scrollTo(500, 0);
  };

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          {/* <TheContent /> */}
          <br />
          {hasLoadedDegreeType ? (
            <Grid columns="equal">
              <Grid.Column width={1}></Grid.Column>
              <Grid.Column width={14}>
                <CCard borderColor="primary">
                  <CCardHeader>
                    <h4>Application</h4>
                  </CCardHeader>
                  <CCardBody>
                    <>
                      {isShowMessage ? (
                        <Message warning>
                          <Message.Content>
                            <p style={{ textAlign: "center" }}>
                              {errorMessage}
                            </p>
                          </Message.Content>
                        </Message>
                      ) : (
                        ""
                      )}
                      <Form onSubmit={update}>
                        <Modal
                          size="lg"
                          show={isOpenModal}
                          onHide={() => setIsOpenModal(false)}
                          aria-labelledby="example-modal-sizes-title-lg"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                              Course List
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Input
                              name="search"
                              onChange={searchCourse}
                              placeholder="Search course"
                            />{" "}
                            <Dropdown
                              required
                              selection
                              search
                              name="selectedFaculty"
                              label="Faculty"
                              placeholder={"Faculty"}
                              options={faculties}
                              onChange={onChangeDropdown}
                            />
                            {institutions.length > 0 ? (
                              <Table unstackable color="blue">
                                <Table.Header>
                                  <Table.Row>
                                    <Table.HeaderCell>Course</Table.HeaderCell>
                                    <Table.HeaderCell>Faculty</Table.HeaderCell>
                                    <Table.HeaderCell>Degree</Table.HeaderCell>
                                    <Table.HeaderCell>
                                      Institution
                                    </Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                  {institutions.map((item) => {
                                    return (
                                      <Table.Row>
                                        <Table.Cell>
                                          <h6>{item.name}</h6>
                                        </Table.Cell>
                                        <Table.Cell>
                                          {item.Faculty.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                          {item.DegreeType.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                          {item.Institution.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                          <Button
                                            onClick={() => selectCourse(item)}
                                            size="mini"
                                            color="blue"
                                          >
                                            Select
                                          </Button>
                                        </Table.Cell>
                                      </Table.Row>
                                    );
                                  })}
                                </Table.Body>
                              </Table>
                            ) : (
                              <Message floating>No result found</Message>
                            )}
                          </Modal.Body>
                        </Modal>
                        {hasLoadedDegreeType ? (
                          <Form.Field required>
                            <label>Degree of choice</label>
                            <Dropdown
                              fluid
                              selection
                              defaultValue={defaultDegree}
                              name="selectedDegreeType"
                              label="Degree Type"
                              placeholder={"Degree Type"}
                              options={degreeTypes}
                              onChange={onChangeDropdown}
                            />
                          </Form.Field>
                        ) : (
                          ""
                        )}

                        {courseOne ? (
                          <Table unstackable compact color="blue">
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>
                                  First course of choice{" "}
                                </Table.HeaderCell>
                                <Table.HeaderCell>Institution</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>

                            <Table.Body>
                              <Table.Row>
                                <Table.Cell>{courseOne.name}</Table.Cell>
                                <Table.Cell>{selectedSchoolOneName}</Table.Cell>
                                <Table.Cell>
                                  <Link onClick={() => removeCourse(1)}>
                                    {" "}
                                    <Icon
                                      color="red"
                                      size="large"
                                      name="cancel"
                                    />
                                  </Link>
                                </Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          </Table>
                        ) : (
                          ""
                        )}
                        {selectedDegreeType && !courseOne ? (
                          <>
                            <Button
                              type="button"
                              onClick={loadSchoolOne}
                              positive
                            >
                              Select first course of choice
                            </Button>{" "}
                            <br />
                            <br />
                          </>
                        ) : (
                          ""
                        )}

                        {courseTwo ? (
                          <Table unstackable compact color="blue">
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>
                                  Second course of choice{" "}
                                </Table.HeaderCell>
                                <Table.HeaderCell>Institution</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>

                            <Table.Body>
                              <Table.Row>
                                <Table.Cell>{courseTwo.name}</Table.Cell>
                                <Table.Cell>{selectedSchoolTwoName}</Table.Cell>
                                <Table.Cell>
                                  <Link onClick={() => removeCourse(2)}>
                                    {" "}
                                    <Icon
                                      color="red"
                                      size="large"
                                      name="cancel"
                                    />
                                  </Link>
                                </Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          </Table>
                        ) : (
                          ""
                        )}
                        {courseOne && !courseTwo ? (
                          <>
                            <Button
                              type="button"
                              onClick={loadSchoolTwo}
                              positive
                            >
                              Select second course of choice
                            </Button>{" "}
                            <br />
                            <br />
                          </>
                        ) : (
                          ""
                        )}
                        <hr />
                        <Button loading={loading} color="blue" type="submit">
                          Submit
                        </Button>
                      </Form>
                      <br />
                    </>
                  </CCardBody>
                </CCard>
              </Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid>
          ) : (
            <Loading />
          )}
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default Application;
