import React, { useState, useEffect, lazy } from "react";
import { TheContent, AgentSidebar, TheFooter, TheHeaderAgent } from "../index";
import clientService from "../../services/clientService";
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

const AgentUsers = (props) => {
  let [agentUsers, setAgentUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const userId = getUser.id;
      //alert(userId);
      const users = await clientService.findAllUsersByAgent({
        agentId: userId,
      });
      setAgentUsers(users.data.data);
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
              <CCard accentColor="primary">
                <CCardHeader>
                  <Segment textAlign="center" stacked>
                    <h3>My Applicants</h3>
                  </Segment>
                </CCardHeader>
                <CCardBody>
                  <Table singleLine>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Full Name</Table.HeaderCell>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.HeaderCell>
                          Date of Registration
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          Country of Residence
                        </Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {agentUsers.map((item) => {
                        return (
                          <Table.Row>
                            <Table.Cell>
                              <h4> {item.email}</h4>
                            </Table.Cell>
                            <Table.Cell>
                              <h4>{`${item.firstname}  ${item.lastname}`}</h4>
                            </Table.Cell>
                            <Table.Cell>
                              <h4>{item.phone}</h4>
                            </Table.Cell>
                            <Table.Cell>
                              <Moment format="DD/MM/YYYY HH:mm">
                                <h4>{item.createdAt}</h4>
                              </Moment>
                            </Table.Cell>
                            <Table.Cell>
                              {item.country ? (
                                <h4>
                                  <Flag name={item.country.code} />
                                  {item.country.name}
                                </h4>
                              ) : (
                                "Not available"
                              )}
                            </Table.Cell>
                            <Table.Cell>
                              {!item.Applications.length > 0 ? (
                                <Button
                                  color="blue"
                                  size="mini"
                                  href={`/agent_highest_qualification/${item.id}`}
                                  as="a"
                                >
                                  Apply
                                </Button>
                              ) : (
                                <Button
                                  size="mini"
                                  href={`/agent_user_application_detail/${item.id}`}
                                  as="a"
                                >
                                  View application
                                </Button>
                              )}
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
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

export default AgentUsers;
