import React, { useState, useEffect, lazy } from "react";
import { TheContent, AdminSidebar, TheFooter, TheHeader } from "../index";
import clientService from "../../../services/clientService";
import Moment from "react-moment";
import { imageStyles } from "../../utility/constants";
import { asyncLocalStorage, TOKEN, USER } from "../../utility/global";
import Loading from "../../widgets/loading";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
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
  Flag,
  TextArea,
  Checkbox,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
const WidgetsDropdown = lazy(() =>
  import("../../views/widgets/WidgetsDropdown.js")
);

const ApplicationDetail = (props) => {
  const [hasData, setHasData] = useState(false);

  let [userId, setUserId] = useState("");

  let [profile, setProfile] = useState({});
  let [highestQualification, setHighestQualification] = useState({});
  let [previousQualification, setPreviousQualification] = useState({});
  let [highSchool, setHighSchool] = useState({});
  let [english, setEnglish] = useState({});
  let [visaStatuses, setVisaStatuses] = useState([]);
  let [documents, setDocuments] = useState([]);
  let [selectedVisaStatus, setSelectedVisaStatus] = useState("");
  let [sponsor, setSponsor] = useState({});
  let [visa, setVisa] = useState({});
  let [applications, setApplications] = useState([]);
  let [decisions, setDecisions] = useState([]);
  let [selectedDecision, setSelectedDecision] = useState("");
  let [decisionText, setDecisionText] = useState("");
  let [visaStatusText, setVisaStatusText] = useState("");
  let [hasDecided, setHasDecided] = useState(false);
  let [hasCAS, setHasCAS] = useState(false);
  let [credential, setCredential] = useState("");
  let [hasLoadedApplication, setHasLoadedApplication] = useState(false);
  let [hasPaid, setHasPaid] = useState(false);
  let [eligibilityCheck, setEligibilityCheck] = useState(false);
  let [appId, setAppId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      const id = props.match.params.id;
      const getUser = await asyncLocalStorage.getUser();
      const userId = getUser.id;
      setUserId(userId);

      const englishResult = await clientService.findEnglish({
        userId: id,
      });
      setEnglish(englishResult.data.data);

      const highestQualiResult = await clientService.findHighestQualification({
        userId: id,
      });
      setHighestQualification(highestQualiResult.data.data);

      const previousQualiResult = await clientService.findPreviousQualification(
        {
          userId: id,
        }
      );
      setPreviousQualification(previousQualiResult.data.data);

      const highSchoolhResult = await clientService.findHighSchool({
        userId: id,
      });
      setHighSchool(highSchoolhResult.data.data);

      const sponsorResult = await clientService.findSponsor({
        userId: id,
      });
      setSponsor(sponsorResult.data.data);

      const userProfile = await clientService.findUserById({ userId: id });
      setProfile(userProfile.data.data);
      setDocuments(userProfile.data.data.Documents);
      const visaResult = await clientService.findVisa({
        userId: id,
      });
      setVisa(visaResult.data.data);

      const userApplications = await clientService.findOneApplicationByUser({
        userId: id,
      });
      const appData = userApplications.data.data;
      //console.log(appData);
      setApplications(appData);

      if (appData) {
        const {
          hasPaid,
          hasDecided,
          hasCAS,
          eligibilityCheck,
          Decision,
          VisaApplyStatus,
          credential,
        } = appData;
        setCredential(credential);
        setHasPaid(hasPaid);
        setHasDecided(hasDecided);
        setHasCAS(hasCAS);
        setEligibilityCheck(eligibilityCheck);
        setSelectedDecision(Decision ? Decision.id : "");

        setDecisionText(Decision ? Decision.name : "");
        //setVisaStatusText(VisaApplyStatus ? VisaApplyStatus.name : "");
        setSelectedVisaStatus(VisaApplyStatus ? VisaApplyStatus.id : "");
        setAppId(appData.id);
        setHasLoadedApplication(true);
      }

      const decisionResult = await clientService.decisions();

      let decisionData = decisionResult.data.data.map((item) => {
        return {
          key: item.id,
          value: item.id,
          text: item.name,
        };
      });

      setDecisions(decisionData);

      const visaApplyStatusResult = await clientService.visaApplyStatuses();

      let visaData = visaApplyStatusResult.data.data.map((item) => {
        return {
          key: item.id,
          value: item.id,
          text: item.name,
        };
      });

      setVisaStatuses(visaData);
    })();
  }, []);
  const onChangeDropdown = async (e, data) => {
    const value = data.value;
    const name = data.name;
    if (name == "selectedVisaStatus") setSelectedVisaStatus(value);
    else setSelectedDecision(value);
  };
  const onChangeCheckbox = (e, data) => {
    let checked = data.checked;
    let name = data.name;

    if (name == "hasDecided") {
      setHasDecided(checked);
    } else if (name == "hasCAS") {
      setHasCAS(checked);
    } else if (name == "hasPaid") {
      setHasPaid(checked);
    } else if (name == "eligibilityCheck") {
      setEligibilityCheck(checked);
    }
  };
  const save = async () => {
    setLoading(true);
    const saveResult = await clientService.applicationDecisionUpdate(
      {
        hasCAS,
        hasPaid,
        eligibilityCheck,
        hasDecided,
        decisionId: selectedDecision,
        visaApplyStatusId: selectedVisaStatus,
      },
      appId
    );
    const result = saveResult.data;
    if (!result.error) {
      setErrorMessage(result.message);
      setIsShowMessage(true);
    } else {
      setErrorMessage(result.message);
      setIsShowMessage(true);
    }
    setLoading(false);
  };
  return (
    <div className="c-app c-default-layout">
      <AdminSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          {/* <TheContent /> */}
          <br />
          <Grid columns="equal">
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={14}>
              <CCard accentColor="primary">
                <CCardHeader>
                  {" "}
                  <Segment textAlign="center" stacked>
                    <h3>Profile</h3>
                  </Segment>
                </CCardHeader>
                <CCardBody>
                  {profile ? (
                    <Table singleLine>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <h5>First Name</h5>
                          </Table.Cell>
                          <Table.Cell>{profile.firstname}</Table.Cell>
                        </Table.Row>
                        {profile.middlename ? (
                          <Table.Row>
                            <Table.Cell>
                              <h5>Middle Name</h5>
                            </Table.Cell>
                            <Table.Cell>{profile.middlename}</Table.Cell>
                          </Table.Row>
                        ) : (
                          ""
                        )}

                        <Table.Row>
                          <Table.Cell>
                            <h5>Last Name</h5>
                          </Table.Cell>
                          <Table.Cell>{profile.lastname}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <h5>Email</h5>
                          </Table.Cell>
                          <Table.Cell>{profile.email}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <h5>Phone</h5>
                          </Table.Cell>
                          <Table.Cell>{profile.phone}</Table.Cell>
                        </Table.Row>
                        {profile.contactEmail ? (
                          <Table.Row>
                            <Table.Cell>
                              <h5>Contact Email</h5>
                            </Table.Cell>
                            <Table.Cell>{profile.contactEmail}</Table.Cell>
                          </Table.Row>
                        ) : (
                          ""
                        )}

                        <Table.Row>
                          <Table.Cell>
                            <h5>Date of Birth</h5>
                          </Table.Cell>
                          <Table.Cell>{profile.dob}</Table.Cell>
                        </Table.Row>
                        {profile.County ? (
                          <Table.Row>
                            <Table.Cell>
                              <h5>Country of Residence</h5>
                            </Table.Cell>
                            <Table.Cell>
                              <Flag name={profile.County.code} />
                              {profile.County.name}
                            </Table.Cell>
                          </Table.Row>
                        ) : (
                          ""
                        )}

                        <Table.Row>
                          <Table.Cell>
                            <h5>Gender</h5>
                          </Table.Cell>
                          <Table.Cell>{profile.gender}</Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>
                            <h5>Home Address</h5>
                          </Table.Cell>
                          <Table.Cell>{profile.homeAddress}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <h5>Postal Address</h5>
                          </Table.Cell>
                          <Table.Cell>{profile.postalAddress}</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  ) : (
                    <Loading />
                  )}
                </CCardBody>
              </CCard>

              <CCard accentColor="primary">
                <CCardHeader>
                  {" "}
                  <Segment textAlign="center" stacked>
                    <h3>Highest Qualification</h3>
                  </Segment>
                </CCardHeader>
                <CCardBody>
                  {highestQualification ? (
                    <Table singleLine>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <h5>Qualification</h5>
                          </Table.Cell>
                          <Table.Cell>
                            {highestQualification.QualificationType
                              ? highestQualification.QualificationType.name
                              : ""}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <h5>School Name</h5>
                          </Table.Cell>
                          <Table.Cell>
                            {highestQualification.hq_schoolName}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <h5>Year of Completion</h5>
                          </Table.Cell>
                          <Table.Cell>
                            {highestQualification.hq_programmeYear}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <h5>Has Completed?</h5>
                          </Table.Cell>
                          <Table.Cell>
                            {highestQualification.hq_completed}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  ) : (
                    <Loading />
                  )}
                </CCardBody>
              </CCard>
              {previousQualification ? (
                <CCard accentColor="primary">
                  <CCardHeader>
                    {" "}
                    <Segment textAlign="center" stacked>
                      <h3>Previous Qualification</h3>
                    </Segment>
                  </CCardHeader>
                  <CCardBody>
                    {previousQualification ? (
                      <Table singleLine>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              <h5>Qualification</h5>
                            </Table.Cell>
                            <Table.Cell>
                              {previousQualification.QualificationType
                                ? previousQualification.QualificationType.name
                                : ""}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <h5>School Name</h5>
                            </Table.Cell>
                            <Table.Cell>
                              {previousQualification.pq_schoolName}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <h5>Year of Completion</h5>
                            </Table.Cell>
                            <Table.Cell>
                              {previousQualification.pq_programmeYear}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <h5>Has Completed?</h5>
                            </Table.Cell>
                            <Table.Cell>
                              {previousQualification.pq_completed}
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    ) : (
                      <Loading />
                    )}
                  </CCardBody>
                </CCard>
              ) : (
                ""
              )}
              <CCard accentColor="primary">
                <CCardHeader>
                  {" "}
                  <Segment textAlign="center" stacked>
                    <h3>High School</h3>
                  </Segment>
                </CCardHeader>
                <CCardBody>
                  {highSchool ? (
                    <Table singleLine>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <h5>Shool Name</h5>
                          </Table.Cell>
                          <Table.Cell>{highSchool.highSchoolName}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <h5>Year of Completion</h5>
                          </Table.Cell>
                          <Table.Cell>{highSchool.completionYear}</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  ) : (
                    <Loading />
                  )}
                </CCardBody>
              </CCard>
              {english ? (
                <CCard accentColor="primary">
                  <CCardHeader>
                    {" "}
                    <Segment textAlign="center" stacked>
                      <h3>English Test</h3>
                    </Segment>
                  </CCardHeader>
                  <CCardBody>
                    {english ? (
                      <Table singleLine>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              <h5>Test Type</h5>
                            </Table.Cell>
                            <Table.Cell>{english.name}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <h5>Score</h5>
                            </Table.Cell>
                            <Table.Cell>{english.score}</Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    ) : (
                      <Loading />
                    )}
                  </CCardBody>
                </CCard>
              ) : (
                ""
              )}

              <CCard accentColor="primary">
                <CCardHeader>
                  <Segment textAlign="center" stacked>
                    <h3>Sponsorship</h3>
                  </Segment>
                </CCardHeader>
                <CCardBody>
                  {sponsor ? (
                    <Table singleLine>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <h5>Sponsor</h5>
                          </Table.Cell>
                          <Table.Cell>{sponsor.sponsor}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <h5>Name</h5>
                          </Table.Cell>
                          <Table.Cell>{sponsor.name}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <h5>Occupation</h5>
                          </Table.Cell>
                          <Table.Cell>{sponsor.occupation}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <h5>Budget</h5>
                          </Table.Cell>
                          <Table.Cell>{sponsor.budget}</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  ) : (
                    <Loading />
                  )}
                </CCardBody>
              </CCard>
              {visa ? (
                <CCard accentColor="primary">
                  <CCardHeader>
                    <Segment textAlign="center" stacked>
                      <h3>Visa History</h3>
                    </Segment>
                  </CCardHeader>

                  <CCardBody>
                    {visa.hasApplied == "No" ? (
                      <Segment textAlign="center" raised>
                        This applicant has no travel history.
                      </Segment>
                    ) : (
                      <Table singleLine>
                        <Table.Body>
                          {" "}
                          <Table.Row>
                            <Table.Cell>
                              <h5>Has Appled for Visa?</h5>
                            </Table.Cell>
                            <Table.Cell>{visa.hasApplied}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <h5>Has Appled for Visa?</h5>
                            </Table.Cell>
                            <Table.Cell>{visa.hasApplied}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <h5>Has Appled for Visa?</h5>
                            </Table.Cell>
                            <Table.Cell>{visa.hasApplied}</Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    )}
                  </CCardBody>
                </CCard>
              ) : (
                ""
              )}
              {credential ? (
                <CCard accentColor="primary">
                  <CCardHeader>
                    <Segment textAlign="center" stacked>
                      <h3>Document</h3>
                    </Segment>
                  </CCardHeader>

                  <CCardBody>
                    <Table singleLine>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>Credential</Table.Cell>
                          <Table.Cell>
                            <a
                              target="_blank"
                              href={`https://scotsudy.s3.eu-west-2.amazonaws.com/oldCredentials/${credential}`}
                            >
                              <Icon name="download" />
                            </a>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </CCardBody>
                </CCard>
              ) : (
                ""
              )}
              {documents.length > 0 ? (
                <CCard accentColor="primary">
                  <CCardHeader>
                    <Segment textAlign="center" stacked>
                      <h3>Documents</h3>
                    </Segment>
                  </CCardHeader>

                  <CCardBody>
                    <Table singleLine>
                      <Table.Body>
                        {documents.map((item) => {
                          return (
                            <Table.Row>
                              <Table.Cell>{item.name}</Table.Cell>
                              <Table.Cell>
                                <a href={item.url}>
                                  <Icon name="download" />
                                </a>
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table>
                  </CCardBody>
                </CCard>
              ) : (
                ""
              )}
              <CCard accentColor="primary">
                <CCardHeader>
                  {" "}
                  <Segment textAlign="center" stacked>
                    <h3>Applications</h3>
                  </Segment>
                </CCardHeader>
                <CCardBody>
                  {applications ? (
                    <Table singleLine>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <h5>Degree Type</h5>
                          </Table.Cell>
                          <Table.Cell>
                            {applications.DegreeType
                              ? applications.DegreeType.name
                              : ""}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <h5>First Institution of Choice</h5>
                          </Table.Cell>
                          <Table.Cell>{applications.institutionOne}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <h5>First Course of Choice</h5>
                          </Table.Cell>
                          <Table.Cell>{applications.courseOne}</Table.Cell>
                        </Table.Row>
                        {applications.courseTwo ? (
                          <>
                            <Table.Row>
                              <Table.Cell>
                                <h5>Second Institution of Choice</h5>
                              </Table.Cell>
                              <Table.Cell>
                                {applications.institutionTwo}
                              </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>
                                <h5>Second Course of Choice</h5>
                              </Table.Cell>
                              <Table.Cell>{applications.courseTwo}</Table.Cell>
                            </Table.Row>
                          </>
                        ) : (
                          ""
                        )}
                      </Table.Body>
                    </Table>
                  ) : (
                    <Loading />
                  )}
                </CCardBody>
              </CCard>

              <CCard accentColor="primary">
                <CCardHeader>
                  <Segment textAlign="center" stacked>
                    <h3>Decision Section</h3>
                  </Segment>
                </CCardHeader>
                <CCardBody>
                  {isShowMessage ? (
                    <Message info>
                      <Message.Content>
                        <p style={{ textAlign: "center" }}>{errorMessage}</p>
                      </Message.Content>
                    </Message>
                  ) : (
                    ""
                  )}
                  <Table singleLine>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <h5>Eligibilty Check</h5>
                        </Table.Cell>
                        <Table.Cell>
                          <Checkbox
                            checked={eligibilityCheck}
                            name="eligibilityCheck"
                            toggle
                            onChange={onChangeCheckbox}
                            label={eligibilityCheck ? "Passed" : "Failed"}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <h5>Has Paid?</h5>
                        </Table.Cell>
                        <Table.Cell>
                          <Checkbox
                            checked={hasPaid}
                            label={hasPaid ? "Yes" : "No"}
                            name="hasPaid"
                            toggle
                            onChange={onChangeCheckbox}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <h5>Has CAS?</h5>
                        </Table.Cell>
                        <Table.Cell>
                          <Checkbox
                            checked={hasCAS}
                            label={hasCAS ? "Yes" : "No"}
                            name="hasCAS"
                            toggle
                            onChange={onChangeCheckbox}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <h5>Has Decided?</h5>
                        </Table.Cell>
                        <Table.Cell>
                          <Checkbox
                            checked={hasDecided}
                            label={hasDecided ? "Yes" : "No"}
                            name="hasDecided"
                            toggle
                            onChange={onChangeCheckbox}
                          />
                        </Table.Cell>
                      </Table.Row>
                      {hasLoadedApplication ? (
                        <>
                          <Table.Row>
                            <Table.Cell>
                              <h5>Decision </h5>
                            </Table.Cell>
                            <Table.Cell>
                              <Form.Field required>
                                <Dropdown
                                  required
                                  defaultValue={selectedDecision}
                                  fluid
                                  selection
                                  search
                                  placeholder={"Select decision"}
                                  name="selectedDecision"
                                  label={"Decision"}
                                  options={decisions}
                                  onChange={onChangeDropdown}
                                />
                              </Form.Field>
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              <h5>Visa Apply Status</h5>
                            </Table.Cell>
                            <Table.Cell>
                              <Form.Field required>
                                <Dropdown
                                  defaultValue={selectedVisaStatus}
                                  required
                                  fluid
                                  selection
                                  search
                                  placeholder={"Select visa status"}
                                  name="selectedVisaStatus"
                                  label={"Visa Apply Status"}
                                  options={visaStatuses}
                                  onChange={onChangeDropdown}
                                />
                              </Form.Field>
                            </Table.Cell>
                          </Table.Row>
                        </>
                      ) : (
                        ""
                      )}
                    </Table.Body>
                  </Table>
                  <hr></hr>
                  <Button onClick={save} loading={loading} color="blue">
                    <Icon name="edit" /> Update
                  </Button>
                </CCardBody>
              </CCard>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default ApplicationDetail;
