import React, { useState, useEffect, lazy } from "react";
import { TheContent, AdminSidebar, TheFooter, TheHeader } from "../../index";
import clientService from "../../../../services/clientService";
import Moment from "react-moment";
import { imageStyles } from "../../../utility/constants";
import { asyncLocalStorage, TOKEN, USER } from "../../../utility/global";
import Loading from "../../../widgets/loading";
import Message from "../../../../components/widgets/message";
import { defaultImage } from "../../../../utility/constants";
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

const CoursePhotoList = (props) => {
  const [hasData, setHasData] = useState(true);
  let [loading, setLoading] = useState(false);
  let [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const userId = getUser.id;

      const result = await clientService.findAllTestimonial();

      const resultData = result.data.data;
      if (resultData.length < 1) {
        setHasData(false);
      }

      setTestimonials(resultData);
      setLoading(false);
    })();
  }, []);

  const deleteHandler = async (id) => {
    setLoading(true);
    const result = await clientService.deleteTestimonial(id);

    if (!result.data.error) {
      const newData = testimonials.filter((item) => item.id != id);
      setTestimonials(newData);
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
                    <h4>Testimonial List</h4>
                  </CCardHeader>
                  <CCardBody>
                    <Button
                      floated="right"
                      color="blue"
                      href="/testimonial_create"
                      as="a"
                    >
                      Add New
                    </Button>
                    <br />
                    <br />
                    {!loading ? (
                      hasData ? (
                        <Table singleLine>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>Title</Table.HeaderCell>
                              {/* <Table.HeaderCell>Content</Table.HeaderCell> */}
                              <Table.HeaderCell>First Name</Table.HeaderCell>
                              <Table.HeaderCell></Table.HeaderCell>
                              <Table.HeaderCell>Edit</Table.HeaderCell>
                              <Table.HeaderCell>Delete</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>

                          <Table.Body>
                            {testimonials.map((item) => {
                              return (
                                <Table.Row>
                                  <Table.Cell>{item.title}</Table.Cell>
                                  {/* <Table.Cell>
                                    {item.content}
                                  </Table.Cell> */}
                                  <Table.Cell>{item.firstname}</Table.Cell>
                                  <Table.Cell>
                                    <Image
                                      style={imageStyles(50, 50)}
                                      src={item.url ? item.url : defaultImage}
                                    />
                                  </Table.Cell>

                                  <Table.Cell>
                                    <Link to={`/testimonial_update/${item.id}`}>
                                      <Icon color="blue" name="edit" />
                                    </Link>
                                  </Table.Cell>

                                  <Table.Cell>
                                    <Button
                                      size="tiny"
                                      color="red"
                                      onClick={() => deleteHandler(item.id)}
                                      loading={loading}
                                    >
                                      <Icon color="white" name="delete" />{" "}
                                      Delete
                                    </Button>
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

export default CoursePhotoList;
