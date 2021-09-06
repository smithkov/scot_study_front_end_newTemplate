import React, { useState, useEffect, lazy } from "react";
import { TheContent, AdminSidebar, TheFooter, TheHeader } from "../index";
import clientService from "../../services/clientService";
import Moment from "react-moment";
import { asyncLocalStorage, TOKEN, USER } from "../../utility/global";
import { MDBDataTableV5 } from "mdbreact";
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
  Input,
  Flag,
} from "semantic-ui-react";
const WidgetsDropdown = lazy(() =>
  import("../../views/widgets/WidgetsDropdown.js")
);

const AllApplicants = (props) => {
  let initialOffset = 0;
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [btnNext, setBtnNext] = useState(true);
  const [btnPrev, setBtnPrev] = useState(true);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(initialOffset);
  const [refSearch, setRefSearch] = useState("");

  let [userId, setUserId] = useState("");
  let [applications, setApplications] = useState([]);
  let limit = 10;

  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const userId = getUser.id;
      setUserId(userId);

      const findApplication = await clientService.allApplications({
        offset,
        limit,
        search,
        refSearch,
      });
      const data = findApplication.data.data;
      if (data.length < limit) {
        setBtnNext(true);
      } else {
        setBtnNext(false);
      }
      setApplications(data);
    })();
  }, []);

  const searchHandle = async (e) => {
    const value = e.target.value;
    setOffset(initialOffset);
    const findApplication = await clientService.allApplications({
      offset: initialOffset,
      limit,
      search: value,
      refSearch,
    });
    const data = findApplication.data.data;
    if (data.length == limit) {
      setBtnNext(false);
    } else {
      setBtnNext(true);
    }
    setApplications(data);
  };

  const refSearchHandle = async (e) => {
    const value = e.target.value;
    setOffset(initialOffset);
    const findApplication = await clientService.allApplications({
      offset: initialOffset,
      limit,
      search,
      refSearch: value,
    });
    const data = findApplication.data.data;
    if (data.length == limit) {
      setBtnNext(false);
    } else {
      setBtnNext(true);
    }
    setApplications(data);
  };

  const nextHandle = async (e) => {
    const newOffset = limit + offset;
    setOffset(newOffset);
    const findApplication = await clientService.allApplications({
      offset: newOffset,
      limit,
      search,
      refSearch,
    });
    const data = findApplication.data.data;
    if (data.length == limit) {
      setBtnPrev(false);
    } else {
      setBtnNext(true);
    }
    setApplications(data);
  };
  const prevHandle = async (e) => {
    const newOffset = offset - limit;
    setOffset(newOffset);
    const findApplication = await clientService.allApplications({
      offset: newOffset,
      limit,
      search,
      refSearch,
    });
    const data = findApplication.data.data;
    console.log(`${newOffset}   ${limit}`);
    if (newOffset <= initialOffset) {
      setBtnNext(false);
      setBtnPrev(true);
    }
    setApplications(data);
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
                <Segment textAlign="center" color="blue">
                  <h3>All Applications</h3>
                </Segment>
                <Segment raised>
                  <Grid padded stackable>
                    <Grid.Row>
                      <Grid.Column width={6}>
                        <Input
                          fluid
                          onChange={searchHandle}
                          //loading
                          placeholder="Search by first name or last name"
                        />
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <Input
                          fluid
                          onChange={refSearchHandle}
                          // loading
                          placeholder="Search by application no."
                        />
                      </Grid.Column>
                      <Grid.Column width={4}></Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>

                <Table unstackable striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>No.</Table.HeaderCell>
                      <Table.HeaderCell>Full Name</Table.HeaderCell>
                      <Table.HeaderCell>Date of Submission</Table.HeaderCell>
                      <Table.HeaderCell>Degree Type</Table.HeaderCell>
                      <Table.HeaderCell>Agent</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {applications.map((item) => {
                      const agent = item.User.Agent;
                      return (
                        <Table.Row>
                          <Table.Cell>
                            <h6>{item.refNo}</h6>
                          </Table.Cell>
                          <Table.Cell>
                            <>{`${item.User.firstname}  ${item.User.lastname}`}</>
                          </Table.Cell>
                          <Table.Cell>
                            <Moment format="LLLL">{item.regDate}</Moment>
                          </Table.Cell>
                          <Table.Cell>
                            {item.DegreeType ? item.DegreeType.name : ""}
                          </Table.Cell>
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
                          <Table.Cell>
                            <Button color="red" circular icon="trash" />
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
                <Segment raised>
                  <Grid padded unstackable>
                    <Grid.Row>
                      <Grid.Column width={3}>
                        <Button
                          fluid
                          color="blue"
                          disabled={btnPrev}
                          onClick={prevHandle}
                        >
                          <Icon name="arrow circle left" /> Prev
                        </Button>
                      </Grid.Column>
                      <Grid.Column width={10}></Grid.Column>
                      <Grid.Column width={3}>
                        <Button
                          fluid
                          color="blue"
                          disabled={btnNext}
                          onClick={nextHandle}
                        >
                          Next <Icon name="arrow circle right" />
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
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

export default AllApplicants;