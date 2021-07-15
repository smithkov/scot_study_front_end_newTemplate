import React, { useState, useEffect, lazy } from "react";
import { TheContent, AdminSidebar, TheFooter, TheHeader } from "../index";
import clientService from "../../../services/clientService";
import Moment from "react-moment";
import { imageStyles } from "../../utility/constants";
import { asyncLocalStorage, TOKEN, USER } from "../../utility/global";
import Loading from "../../widgets/loading";
import Message from "../../../components/widgets/message";
import { defaultImage } from "../../../utility/constants";
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

const PhdApplicationList = (props) => {
  const [hasData, setHasData] = useState(true);
  let [loading, setLoading] = useState(false);
  let [applications, setApplications] = useState([]);

  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const userId = getUser.id;

      const result = await clientService.findAllPhdApplications();

      const resultData = result.data.data;
      if (resultData.length < 1) {
        setHasData(false);
      }

      setApplications(resultData);
      setLoading(false);
    })();
  }, []);

  const deleteHandler = async (id) => {
    setLoading(true);
    const result = await clientService.deleteTestimonial(id);

    if (!result.data.error) {
      const newData = applications.filter((item) => item.id != id);
      setApplications(newData);
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
              <>
                <CCard accentColor="primary">
                  <CCardHeader>
                    <h4>PhD Applications</h4>
                  </CCardHeader>
                  <CCardBody>
                    {!loading ? (
                      hasData ? (
                        <Table singleLine>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>First Name</Table.HeaderCell>

                              <Table.HeaderCell>Middle Name</Table.HeaderCell>
                              <Table.HeaderCell>Last Name</Table.HeaderCell>
                              <Table.HeaderCell>Email</Table.HeaderCell>
                              <Table.HeaderCell>Phone Number</Table.HeaderCell>
                              <Table.HeaderCell>Topic</Table.HeaderCell>
                              <Table.HeaderCell>Qualification</Table.HeaderCell>
                              <Table.HeaderCell>Date</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>

                          <Table.Body>
                            {applications.map((item) => {
                              return (
                                <Table.Row>
                                  <Table.Cell>{item.firstname}</Table.Cell>
                                  <Table.Cell>{item.middlename}</Table.Cell>
                                  <Table.Cell>{item.lastname}</Table.Cell>
                                  <Table.Cell>{item.email}</Table.Cell>
                                  <Table.Cell>{item.phone}</Table.Cell>
                                  <Table.Cell>{item.topic}</Table.Cell>
                                  <Table.Cell>
                                    {item.Qualification.name}
                                  </Table.Cell>
                                  <Table.Cell>
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
                        <Message text="No Testimonies Found!" />
                      )
                    ) : (
                      <Loading />
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
  );
};

export default PhdApplicationList;
