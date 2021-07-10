import React, { useState, useEffect, lazy } from "react";
import { TheContent, AgentSidebar, TheFooter, TheHeaderAgent } from "../index";
import clientService from "../../services/clientService";
import Moment from "react-moment";
import { imageStyles } from "../../utility/constants";
import { asyncLocalStorage, TOKEN, USER, PENDING } from "../../utility/global";
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

const AgentSubmittedApplications = (props) => {
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [agentId, setAgentId] = useState("");
  let [hasApplication, setHasApplication] = useState(false);
  let [applications, setApplications] = useState([]);
  let [users, setUsers] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const agentId = getUser.id;
      setAgentId(agentId);

      const findApplications = await clientService.findAgentApplications({
        agentId: agentId,
      });
      setApplications(findApplications.data.data);

      setHasApplication(findApplications.data.data.length > 0 ? true : false);

      //const allUsers = await clientService.allUsers();

      //setUsers(allUsers.data.data);
    })();
  }, []);

  return (
    <div className="c-app c-default-layout">
      <AgentSidebar />
      <div className="c-wrapper">
        <TheHeaderAgent />
        <div className="c-body">
          {/* <TheContent /> */}
          <br />
          <Grid columns="equal">
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={14}>
              {hasApplication
                ? applications.map((item) => {
                    const { hasPaid, Decision, eligibilityCheck, hasCAS } =
                      item;
                    const user = item.User;
                    const fullName = `${user.firstname} ${user.middlename} ${user.lastname}`;
                    return (
                      <>
                        <Table unstackable celled striped color="blue">
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell colSpan="3">
                                <Segment textAlign="center" stacked>
                                  <h3>{`${fullName}'s Application`}</h3>
                                </Segment>
                              </Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
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
                        </Table>
                        <Button color="blue" fluid>
                          <Icon name="eye" /> View Application
                        </Button>
                        <hr />
                      </>
                    );
                  })
                : ""}
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default AgentSubmittedApplications;
