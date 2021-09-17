import React, { useState, useEffect, lazy } from "react";
import { TheContent, AdminSidebar, TheFooter, TheHeader } from "../../index";
import clientService from "../../../../services/clientService";
import Moment from "react-moment";
import { imageStyles } from "../../../utility/constants";
import { asyncLocalStorage, roles } from "../../../../utility/global";
import Loading from "../../../widgets/loading";
import Message from "../../../../components/widgets/message";
import Forbidden from "../../../../components/widgets/forbidden";

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
  Flag,
  TextArea,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
const WidgetsDropdown = lazy(() =>
  import("../../../views/widgets/WidgetsDropdown.js")
);

const ContactList = (props) => {
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [isRender, setIsRender] = useState(true);
  let [userId, setUserId] = useState("");

  let [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const getRole = await asyncLocalStorage.getRole();

      if (getRole != roles.admin) {
        setIsRender(false);
      }

      const userId = getUser.id;
      setUserId(userId);

      const result = await clientService.allContacts();
      const contactData = result.data.data;
      setContacts(contactData);
      setLoading(false);
      setHasData(contactData.length > 0 ? true : false);
    })();
  }, []);

  return (
    <>
      {isRender ? (
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
                    <CCard accentColor="primary">
                      <CCardHeader>
                        <h4>Contact List</h4>
                      </CCardHeader>
                      <CCardBody>
                        {loading ? (
                          <Loading />
                        ) : hasData ? (
                          <Table singleLine>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>Full Name</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Subject</Table.HeaderCell>
                                <Table.HeaderCell>Message</Table.HeaderCell>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>

                            <Table.Body>
                              {contacts.map((item) => {
                                return (
                                  <Table.Row>
                                    <Table.Cell>
                                      <h6>{item.fullname}</h6>
                                    </Table.Cell>
                                    <Table.Cell>{item.email}</Table.Cell>
                                    <Table.Cell width="2">
                                      {item.subject}
                                    </Table.Cell>
                                    <Table.Cell width="4">
                                      {item.message}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {" "}
                                      <Moment format="DD/MM/YYYY HH:mm">
                                        {item.createdAt}
                                      </Moment>
                                    </Table.Cell>
                                  </Table.Row>
                                );
                              })}
                            </Table.Body>
                          </Table>
                        ) : (
                          <Message text={`No contacts yet.`} />
                        )}
                      </CCardBody>
                    </CCard>
                  </>
                </Grid.Column>
                <Grid.Column></Grid.Column>
              </Grid>
            </div>
            <TheFooter />
          </div>
        </div>
      ) : (
        <Forbidden />
      )}
    </>
  );
};

export default ContactList;
