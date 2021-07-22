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
import { scrollUp } from "../../utility/constants";
import { Button, Segment, Dropdown, Grid, Label } from "semantic-ui-react";

const initialLimit = 6;
const initialOffset = 1;
const tables = {
  first: "FIRST_TABLE",
  second: "SECOND_TABLE",
  all: "ALL",
};
const compareArray = [
  {
    key: 0,
    text: "None",
    value: "",
  },
  {
    key: 2,
    text: "Compare Courses",
    value: "course",
  },
  {
    key: 1,
    text: "Compare Fees",
    value: "fee",
  },

  {
    key: 3,
    text: "Compare Scholarship",
    value: "scholarship",
  },
];
class Compare extends Component {
  state = {
    courses: [],
    courses2: [],
    faculties: [],
    degreeTypes: [],
    institutions: [],
    selectedFaculty: "",
    offset: initialOffset,
    offset2: initialOffset,
    limit: initialLimit,
    limit2: initialLimit,
    selectedDegree: "",
    selectedInstitution: "",
    selectedInstitution2: "",
    isDisablePrev: "",
    isDisableNext: "",
    isDisablePrev2: "",
    isDisableNext2: "",
    isLoading: true,
    isLoading2: true,
    isEmpty: true,
    isEmpty2: true,
    search: "",
    isChecked: false,
    loadingNext: false,
    loadingNext2: false,
    loadingPrev: false,
    loadingPrev2: false,
    hasSelectedScholar: false,
    hasSelectedFee: false,
    hasSelectedCourse: false,
    institutionOneCaption: "",
    institutionTwoCaption: "",
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
      isChecked,
      tables.all
    );

    clientService.facultiesLight().then((facultyResult) => {
      let facultypeData = facultyResult.data.data.map((item) => {
        return {
          key: item.id,
          value: item.id,
          text: item.name,
        };
      });
      this.setState({ faculties: facultypeData });
    });

    clientService.degreeTypes().then((degreeTypeResult) => {
      let degreeTypeData = degreeTypeResult.data.data.map((item) => {
        return {
          key: item.id,
          value: item.id,
          text: item.name,
        };
      });
      this.setState({
        degreeTypes: degreeTypeData,
      });
    });

    clientService.institutionsLighter().then((institutionResult) => {
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
    isChecked,
    tableType
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

    if (tableType == tables.all) {
      this.setState({
        courses: totalLoad,
        courses2: totalLoad,
        isDisablePrev: offset < initialLimit ? true : false,
        isDisableNext: initialLimit > totalLoadLength ? true : false,
        isDisablePrev2: offset < initialLimit ? true : false,
        isDisableNext2: initialLimit > totalLoadLength ? true : false,
        isLoading: false,
        isEmpty: totalLoadLength > 0 ? false : true,
        isLoading2: false,
        isEmpty2: totalLoadLength > 0 ? false : true,
      });
    } else if (tableType == tables.first) {
      this.setState({
        courses: totalLoad,
        isDisablePrev: offset < initialLimit ? true : false,
        isDisableNext: initialLimit > totalLoadLength ? true : false,
        isLoading: false,
        isEmpty: totalLoadLength > 0 ? false : true,
      });
    } else if (tableType == tables.second) {
      this.setState({
        courses2: totalLoad,
        isDisablePrev2: offset < initialLimit ? true : false,
        isDisableNext2: initialLimit > totalLoadLength ? true : false,
        isLoading2: false,
        isEmpty2: totalLoadLength > 0 ? false : true,
      });
    }
    this.setState({
      totalLoad,
    });
  };

  onChangeCompare = async (e, data) => {
    const value = data.value;

    switch (value) {
      case "fee": {
        this.setState({
          hasSelectedScholar: false,
          hasSelectedCourse: false,
          hasSelectedFee: true,
          isChecked: false,
        });
        break;
      }
      case "course": {
        this.setState({
          hasSelectedScholar: false,
          hasSelectedCourse: true,
          hasSelectedFee: false,
          isChecked: false,
        });
        break;
      }

      case "scholarship": {
        const checked = true;
        this.setState({
          hasSelectedScholar: true,
          hasSelectedCourse: false,
          hasSelectedFee: false,
          isChecked: checked,
        });
        const {
          selectedFaculty,
          offset,
          offset2,
          selectedInstitution,
          selectedInstitution2,
          selectedDegree,
          search,
          limit,
        } = this.state;
        await this.compare(
          selectedFaculty,
          offset,
          limit,
          selectedDegree,
          selectedInstitution,
          search,
          checked,
          tables.first
        );

        await this.compare(
          selectedFaculty,
          offset2,
          limit,
          selectedDegree,
          selectedInstitution2,
          search,
          checked,
          tables.second
        );
        break;
      }
      default: {
        this.setState({
          hasSelectedScholar: false,
          hasSelectedCourse: false,
          hasSelectedFee: false,
        });
        break;
      }
    }
  };
  onChangeFaculty = async (e, data) => {
    const newFaculty = data.value;

    const {
      selectedInstitution,
      selectedInstitution2,
      selectedDegree,
      offset,
      offset2,
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
      isChecked,
      tables.first
    );
    this.compare(
      newFaculty,
      offset2,
      limit,
      selectedDegree,
      selectedInstitution2,
      search,
      isChecked,
      tables.second
    );
    this.setState({
      selectedFaculty: newFaculty,
    });
  };

  onChangeDegreeType = async (e, data) => {
    const newDegreeType = data.value;

    const {
      selectedInstitution,
      selectedInstitution2,
      selectedFaculty,
      offset,
      offset2,
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
      isChecked,
      tables.first
    );
    this.compare(
      selectedFaculty,
      offset2,
      limit,
      newDegreeType,
      selectedInstitution2,
      search,
      isChecked,
      tables.second
    );
    this.setState({
      selectedDegree: newDegreeType,
    });
  };

  onChangeInstitution = async (e, data) => {
    const newInstitution = data.value;
    this.setState({
      institutionOneCaption: e.target.textContent,
    });

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
      isChecked,
      tables.first
    );
    this.setState({
      selectedInstitution: newInstitution,
    });
  };
  onChangeInstitution2 = async (e, data) => {
    const newInstitution = data.value;
    this.setState({
      institutionTwoCaption: e.target.textContent,
    });
    const {
      selectedFaculty,
      selectedDegree,
      offset2,
      limit,
      search,
      isChecked,
    } = this.state;
    this.compare(
      selectedFaculty,
      offset2,
      limit,
      selectedDegree,
      newInstitution,
      search,
      isChecked,
      tables.second
    );
    this.setState({
      selectedInstitution2: newInstitution,
    });
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
      isChecked,
      tables.first
    );
    await this.compare(
      selectedFaculty,
      offset,
      limit,
      selectedDegree,
      selectedInstitution,
      search,
      isChecked,
      tables.second
    );
  };
  next = async (tableType) => {
    this.setState({ loadingNext: true });
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
        isChecked,
        tables.first
      );

      this.setState({ loadingNext: false });
      scrollUp(tables.all);
    }
  };

  next2 = async (tableType) => {
    this.setState({ loadingNext2: true });
    const {
      isDisableNext2,
      selectedFaculty,
      selectedDegree,
      selectedInstitution2,
      offset2,
      limit,
      search,
      isChecked,
    } = this.state;
    const newOffset = offset2 + limit;
    if (!isDisableNext2) {
      this.setState({
        isDisablePrev2: false,
        offset2: newOffset,
      });

      await this.compare(
        selectedFaculty,
        newOffset,
        limit,
        selectedDegree,
        selectedInstitution2,
        search,
        isChecked,
        tables.second
      );
    }
    this.setState({ loadingNext2: false });
    scrollUp(tables.all);
  };

  prev = async (e) => {
    this.setState({ loadingPrev: true });
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
        isChecked,
        tables.first
      );
    }
    this.setState({ loadingPrev: false });
    scrollUp(tables.all);
  };

  prev2 = async (e) => {
    this.setState({ loadingPrev2: true });
    const {
      isDisableNext2,
      isDisablePrev2,
      selectedFaculty,
      selectedDegree,
      selectedInstitution2,
      offset2,
      limit,
      search,
      isChecked,
    } = this.state;
    const newOffset = offset2 - limit;
    if (!isDisablePrev2) {
      this.setState({
        isDisableNext2: false,
        offset2: newOffset,
      });

      await this.compare(
        selectedFaculty,
        newOffset,
        limit,
        selectedDegree,
        selectedInstitution2,
        search,
        isChecked,
        tables.second
      );
    }
    this.setState({ loadingPrev2: false });
    scrollUp(tables.all);
  };
  reset = async (e) => {
    window.location.reload(false);
  };
  render() {
    const {
      courses,
      courses2,
      isDisableNext,
      isDisablePrev,
      isDisableNext2,
      isDisablePrev2,
      isEmpty,
      isLoading,
      isEmpty2,
      isLoading2,
      loadingNext,
      loadingNext2,
      loadingPrev,
      loadingPrev2,
      faculties,
      degreeTypes,
      institutions,
      hasSelectedCourse,
      hasSelectedFee,
      hasSelectedScholar,
      institutionOneCaption,
      institutionTwoCaption,
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
                <Col lg="12" md="12" sm="12">
                  <Segment raised>
                    <Grid stackable columns="equal">
                      <Grid.Column width="4"></Grid.Column>
                      <Grid.Column>
                        <Dropdown
                          onChange={this.onChangeCompare}
                          placeholder="Compare"
                          fluid
                          search
                          selection
                          options={compareArray}
                        />
                      </Grid.Column>
                      <Grid.Column width="4"></Grid.Column>
                    </Grid>
                    <Grid stackable columns="equal">
                      <Grid.Column>
                        <Dropdown
                          name="selectedInstitution"
                          onChange={this.onChangeInstitution}
                          placeholder="Select Institution One"
                          fluid
                          loading={institutions.length == 0}
                          search
                          selection
                          options={institutions}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Dropdown
                          name="selectedInstitution2"
                          onChange={this.onChangeInstitution2}
                          placeholder="Select Institution Two"
                          fluid
                          search
                          loading={institutions.length == 0}
                          selection
                          options={institutions}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Dropdown
                          onChange={this.onChangeFaculty}
                          name="selectedFaculty"
                          placeholder="Select Faculty"
                          fluid
                          search
                          loading={faculties.length == 0}
                          selection
                          options={faculties}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Dropdown
                          onChange={this.onChangeDegreeType}
                          name="selectedDegree"
                          placeholder="Select Degree"
                          fluid
                          search
                          loading={degreeTypes.length == 0}
                          selection
                          options={degreeTypes}
                        />
                      </Grid.Column>
                    </Grid>
                  </Segment>
                  <br />
                  <br />
                </Col>
                {/* <Col lg="3" md="4" sm="5">
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
                </Col> */}
                <Col id={tables.all} lg="6" md="6" sm="6">
                  {isLoading ? (
                    <Loading />
                  ) : isEmpty ? (
                    <Message text={"No Result Found!"} />
                  ) : (
                    <div className="course-items2">
                      <Segment textAlign="center" stacked>
                        <Label size="large" color="blue">
                          {institutionOneCaption
                            ? institutionOneCaption
                            : "All"}
                        </Label>
                      </Segment>
                      <Row>
                        <CourseItemList
                          color="blue"
                          hasSelectedCourse={hasSelectedCourse}
                          hasSelectedFee={hasSelectedFee}
                          hasSelectedScholar={hasSelectedScholar}
                          courses={courses}
                        />
                      </Row>
                    </div>
                  )}

                  {isEmpty || isLoading ? (
                    ""
                  ) : (
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button
                        color="blue"
                        loading={loadingPrev}
                        disabled={isDisablePrev}
                        type="button"
                        class="btn btn-primary"
                        onClick={this.prev}
                      >
                        <i class="fas fa-arrow-circle-left"></i> Back
                      </Button>
                      <div style={{ width: 20 }}></div>
                      <Button
                        color="blue"
                        loading={loadingNext}
                        disabled={isDisableNext}
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
                <Col lg="6" md="6" sm="6">
                  {isLoading2 ? (
                    <Loading />
                  ) : isEmpty2 ? (
                    <Message text={"No Result Found!"} />
                  ) : (
                    <div className="course-items2">
                      <Segment textAlign="center" stacked>
                        <Label size="large" color="blue">
                          {institutionTwoCaption
                            ? institutionTwoCaption
                            : "All"}
                        </Label>
                      </Segment>
                      <Row>
                        <CourseItemList
                          hasSelectedCourse={hasSelectedCourse}
                          hasSelectedFee={hasSelectedFee}
                          hasSelectedScholar={hasSelectedScholar}
                          color="green"
                          courses={courses2}
                        />
                      </Row>
                    </div>
                  )}

                  {isEmpty2 || isLoading2 ? (
                    ""
                  ) : (
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button
                        color="blue"
                        loading={loadingPrev2}
                        disabled={isDisablePrev2}
                        type="button"
                        class="btn btn-primary"
                        onClick={this.prev2}
                      >
                        <i class="fas fa-arrow-circle-left"></i> Back
                      </Button>
                      <div style={{ width: 20 }}></div>
                      <Button
                        color="blue"
                        loading={loadingNext2}
                        disabled={isDisableNext2}
                        float="right"
                        type="button"
                        class="btn btn-primary"
                        onClick={this.next2}
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
        <FooterTwo />
      </div>
    );
  }
}

export default Compare;
