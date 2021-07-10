import React, { useState, useEffect, lazy } from "react";
import { TheContent, AdminSidebar, TheFooter, TheHeader } from "../../index";
import clientService from "../../../services/clientService";
import Moment from "react-moment";
import { imageStyles } from "../../../utility/constants";
import { asyncLocalStorage, TOKEN, USER } from "../../../utility/global";
import Loading from "../../../widgets/loading";
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
  TextArea,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
const WidgetsDropdown = lazy(() =>
  import("../../../views/widgets/WidgetsDropdown.js")
);

const InstitutionList = (props) => {
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);

  let [banners, setBanners] = useState([]);

  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const userId = getUser.id;

      const bannerResult = await clientService.banners();
      setBanners(bannerResult.data.data);
      setHasData(true);
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
                <CCard accentColor="primary">
                  <CCardHeader>
                    <h4>Banner List</h4>
                  </CCardHeader>
                  <CCardBody>
                    {hasData ? (
                      <Table singleLine>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>

                        <Table.Body>
                          {banners.map((item) => {
                            return (
                              <Table.Row>
                                <Table.Cell>
                                  <h4>{item.title}</h4>
                                </Table.Cell>
                                <Table.Cell>
                                  <Image
                                    style={imageStyles(100)}
                                    src={item.url}
                                  />
                                </Table.Cell>

                                <Table.Cell>
                                  <Link to={`/banner_update/${item.id}`}>
                                    <Icon color="blue" name="edit" />
                                  </Link>
                                </Table.Cell>
                              </Table.Row>
                            );
                          })}
                        </Table.Body>
                      </Table>
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

export default InstitutionList;
