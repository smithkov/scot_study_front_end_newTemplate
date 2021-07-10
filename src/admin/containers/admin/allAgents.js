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

const AllAgents = (props) => {
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [userId, setUserId] = useState("");
  let [agents, setAgents] = useState([]);

  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const userId = getUser.id;
      setUserId(userId);

      const findAgents = await clientService.findAllAgents();
      setAgents(findAgents.data.data);
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
                <Segment textAlign="center" color="blue">
                  <h3>All Agents</h3>
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

export default AllAgents;
