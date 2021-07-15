import React, { useState, useEffect, lazy } from "react";
import { TheContent, AdminSidebar, TheFooter, TheHeader } from "../index";
import clientService from "../../services/clientService";
import Moment from "react-moment";
import { asyncLocalStorage, TOKEN, USER } from "../../utility/global";
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
  Flag,
} from "semantic-ui-react";
const WidgetsDropdown = lazy(() =>
  import("../../views/widgets/WidgetsDropdown.js")
);

const Dashboard = (props) => {
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [userId, setUserId] = useState("");
  let [hasApplied, setHasApplied] = useState(false);
  let [applications, setApplications] = useState([]);
  let [agents, setAgents] = useState([]);
  let [users, setUsers] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const userId = getUser.id;
      setUserId(userId);

      const findApplications = await clientService.allApplications();
      setApplications(findApplications.data.data);

      const findAgents = await clientService.findAllAgents({ limit });
      setAgents(findAgents.data.data);

      setHasApplied(findApplications.data.data.length > 0 ? true : false);

      const allUsers = await clientService.allUsers();

      setUsers(allUsers.data.data);
    })();
  }, []);

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
              <>
                {/* <WidgetsDropdown /> */}
                {/* <CRow>
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
                </CRow> */}
                <Segment textAlign="center" color="blue">
                  <h3>Applications</h3>
                </Segment>
                <Table unstackable singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>No.</Table.HeaderCell>
                      <Table.HeaderCell>Full Name</Table.HeaderCell>
                      <Table.HeaderCell>Date of Submission</Table.HeaderCell>
                      <Table.HeaderCell>Degree Type</Table.HeaderCell>
                      <Table.HeaderCell>Agent</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {applications.map((item) => {
                      const agent = item.User.Agent;
                      return (
                        <Table.Row>
                          <Table.Cell>
                            <h5>{item.refNo}</h5>
                          </Table.Cell>
                          <Table.Cell>
                            <>{`${item.User.firstname}  ${item.User.lastname}`}</>
                          </Table.Cell>
                          <Table.Cell>
                            <Moment format="LLLL">{item.createdAt}</Moment>
                          </Table.Cell>
                          <Table.Cell>{item.DegreeType.name}</Table.Cell>
                          <Table.Cell>
                            {agent ? agent.agencyName : "Individual"}
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              as="a"
                              href={`/application_detail/${item.User.id}`}
                              color="blue"
                              size="small"
                            >
                              View application
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>

                <hr></hr>
                <Segment textAlign="center" color="blue">
                  <h3>Users</h3>
                </Segment>
                <Table unstackable singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Full Name</Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>Date of Registration</Table.HeaderCell>
                      <Table.HeaderCell>Country of Residence</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell>Last Login</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {users.map((item) => {
                      const agent = item.Agent;
                      return (
                        <Table.Row>
                          <Table.Cell>
                            {`${item.firstname}  ${item.lastname}`}
                          </Table.Cell>
                          <Table.Cell>
                            {item.email} {userId == item.id ? "(You)" : ""}{" "}
                          </Table.Cell>

                          <Table.Cell>
                            <Moment format="DD/MM/YYYY HH:mm">
                              {item.createdAt}
                            </Moment>
                          </Table.Cell>
                          <Table.Cell>
                            {item.country ? (
                              <>
                                <Flag name={item.country.code} />
                                {item.country.name}
                              </>
                            ) : (
                              "Not available"
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            {agent ? agent.agencyName : "Individual"}
                          </Table.Cell>
                          <Table.Cell>
                            {agent ? (
                              "..."
                            ) : (
                              <Moment fromNow>{item.updatedAt}</Moment>
                            )}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
                <hr></hr>

                <Segment textAlign="center" color="blue">
                  <h3>Agents</h3>
                </Segment>
                <Table unstackable singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>Phone</Table.HeaderCell>
                      <Table.HeaderCell>Date of Registration</Table.HeaderCell>
                      <Table.HeaderCell>Country</Table.HeaderCell>
                      <Table.HeaderCell>No. of Users</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {agents.map((item) => {
                      return (
                        <Table.Row>
                          <Table.Cell>{item.agencyName}</Table.Cell>
                          <Table.Cell>{item.email}</Table.Cell>
                          <Table.Cell>{item.phone}</Table.Cell>
                          <Table.Cell>
                            <Moment format="DD/MM/YYYY HH:mm">
                              {item.createdAt}
                            </Moment>
                          </Table.Cell>
                          <Table.Cell>
                            {item.country ? (
                              <>
                                <Flag name={item.country.code} />
                                {item.country.name}
                              </>
                            ) : (
                              "Not available"
                            )}
                          </Table.Cell>
                          <Table.Cell>{item.Users.length}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
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
