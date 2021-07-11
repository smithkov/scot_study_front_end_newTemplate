import React, { useState, useEffect, lazy } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import clientService from "../../services/clientService";

import { asyncLocalStorage, TOKEN, USER, PENDING } from "../utility/global";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
} from "@coreui/react";
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
} from "semantic-ui-react";
const WidgetsDropdown = lazy(() =>
  import("../views/widgets/WidgetsDropdown.js")
);

const Dashboard = (props) => {
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [userId, setUserId] = useState("");
  let [applications, setApplications] = useState([]);
  let [hasApplied, setHasApplied] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const userId = getUser.id;
      setUserId(userId);

      const findApplications = await clientService.findApplicationsByUser({
        userId,
      });
      const applicationResult = findApplications.data.data;
      setApplications(applicationResult);
      setHasApplied(applicationResult.length > 0 ? true : false);
    })();
  }, []);

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          {/* <TheContent /> */}
          <br />
          <Grid columns="equal">
            <Grid.Column width={1}></Grid.Column>

            <Grid.Column width={14}>
              <>
                <div style={{ height: 20 }}></div>
                {/* <WidgetsDropdown /> */}
                <CRow>
                  <WidgetsDropdown
                    title={"Home"}
                    icon={"cil-home"}
                    color="primary"
                  />
                  <WidgetsDropdown
                    title={"Settings"}
                    icon={"cil-settings"}
                    color="success"
                  />
                  <WidgetsDropdown
                    title={"Compose Message"}
                    icon={"cil-envelope-open"}
                    color="primary"
                  />
                  <WidgetsDropdown
                    title={"Inbox"}
                    icon={"cil-inbox"}
                    color="success"
                  />
                </CRow>
                {hasApplied ? (
                  <Table unstackable celled striped color="red">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell colSpan="3">
                          <Segment textAlign="center" stacked>
                            <h3>My Application</h3>
                          </Segment>
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    {applications.map((item) => {
                      const { hasPaid, Decision, eligibilityCheck, hasCAS } =
                        item;
                      return (
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell collapsing>
                              <Header as="h4">Form Submission</Header>
                            </Table.Cell>
                            <Table.Cell>
                              <strong>Submitted</strong>
                            </Table.Cell>
                            <Table.Cell collapsing textAlign="right">
                              <Icon
                                color="grey"
                                name="smile outline"
                                size="large"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell collapsing>
                              <Header as="h4">Eligibilty Check</Header>
                            </Table.Cell>
                            <Table.Cell>
                              <strong>
                                {eligibilityCheck ? "Passed" : PENDING}
                              </strong>
                            </Table.Cell>
                            <Table.Cell collapsing textAlign="right">
                              <Icon
                                color="grey"
                                name={
                                  eligibilityCheck
                                    ? "smile outline"
                                    : "frown outline"
                                }
                                size="large"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell collapsing>
                              <Header as="h4">Has Paid?</Header>
                            </Table.Cell>
                            <Table.Cell>
                              <strong>{hasPaid ? "Yes" : "No"}</strong>
                            </Table.Cell>
                            <Table.Cell collapsing textAlign="right">
                              <Icon
                                color="grey"
                                name={
                                  hasPaid ? "smile outline" : "frown outline"
                                }
                                size="large"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell collapsing>
                              <Header as="h4">Has CAS?</Header>
                            </Table.Cell>
                            <Table.Cell>
                              <strong>{hasCAS ? "Yes" : PENDING}</strong>
                            </Table.Cell>
                            <Table.Cell collapsing textAlign="right">
                              <Icon
                                color="grey"
                                name={
                                  hasCAS ? "smile outline" : "frown outline"
                                }
                                size="large"
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell collapsing>
                              <Header as="h4">Decision</Header>
                            </Table.Cell>
                            <Table.Cell>
                              <strong>
                                {Decision ? Decision.name : PENDING}
                              </strong>
                            </Table.Cell>
                            <Table.Cell collapsing textAlign="right">
                              <Icon
                                color="grey"
                                name={
                                  Decision ? "smile outline" : "frown outline"
                                }
                                size="large"
                              />
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      );
                    })}
                  </Table>
                ) : (
                  ""
                )}
                <Button as="a" href="/application" fluid positive>
                  {hasApplied ? "Start a new application" : "Apply"}
                </Button>
              </>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default Dashboard;
