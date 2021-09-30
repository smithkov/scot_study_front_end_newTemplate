import React, { useState, useEffect, lazy } from "react";
import { TheContent, AdminSidebar, TheFooter, TheHeader } from "../index";
import clientService from "../../../services/clientService";
import Moment from "react-moment";
import { asyncLocalStorage, TOKEN, USER } from "../../../utility/global";
import { capitalize } from "../../../utility/constants";
import { MDBDataTableV5 } from "mdbreact";
import {
  CBadge,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
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
  Input,
  Placeholder,
  Divider,
  List,
  Message,
  Flag,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
const WidgetsDropdown = lazy(() =>
  import("../../views/widgets/WidgetsDropdown.js")
);

const AllUsers = (props) => {
  const initialOffset = 0;
  const limit = 20;
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  let [offset, setOffset] = useState(initialOffset);
  let [search, setSearch] = useState("");
  const [btnNext, setBtnNext] = useState(true);
  const [btnPrev, setBtnPrev] = useState(true);
  let [userId, setUserId] = useState("");
  let [users, setUsers] = useState([]);
  let [delName, setDelName] = useState("");
  let [showModal, setShowModal] = useState(false);
  let [id, setId] = useState("");

  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const userId = getUser.id;
      setUserId(userId);

      const findUsers = await clientService.allUsers({
        offset: initialOffset,
        limit,
        search,
      });
      const data = findUsers.data.data;

      if (data.length == limit) {
        setBtnNext(false);
      } else {
        setBtnNext(true);
      }
      setUsers(data);
    })();
  }, []);

  const searchHandle = async (e) => {
    const value = e.target.value;
    setOffset(initialOffset);
    const findUsers = await clientService.allUsers({
      offset: initialOffset,
      limit,
      search: value,
    });
    const data = findUsers.data.data;
    if (data.length == limit) {
      setBtnNext(false);
    } else {
      setBtnNext(true);
    }
    setUsers(data);
  };

  const nextHandle = async (e) => {
    const newOffset = limit + offset;
    setOffset(newOffset);
    const findUsers = await clientService.allUsers({
      offset: newOffset,
      limit,
      search,
    });
    const data = findUsers.data.data;

    if (data.length == limit) {
      setBtnPrev(false);
    } else {
      setBtnNext(true);
    }
    setUsers(data);
  };

  const deleteHandler = async () => {
    const deleteData = await clientService.deleteUser(id);
    if (!deleteData.data.error) {
      let user = users.filter((item) => item.id != id);
      setUsers(user);
      setShowModal(false);
    }
  };
  const modalHandler = (item) => {
    setId(item.id);
    setDelName(item.firstname);
    setShowModal(true);
  };
  const prevHandle = async (e) => {
    const newOffset = offset - limit;
    setOffset(newOffset);
    const findUsers = await clientService.allUsers({
      offset: newOffset,
      limit,
      search,
    });
    const data = findUsers.data.data;
    console.log(`${newOffset}   ${limit}`);
    if (newOffset <= initialOffset) {
      setBtnNext(false);
      setBtnPrev(true);
    }
    setUsers(data);
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
                <CModal
                  show={showModal}
                  onClose={() => setShowModal(false)}
                  size="sm"
                >
                  <CModalHeader closeButton>
                    <CModalTitle>Deletion prompt</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    Are you sure you want to delete <strong>{delName}</strong> ?
                  </CModalBody>
                  <CModalFooter>
                    <CButton color="danger" onClick={deleteHandler}>
                      Yes
                    </CButton>{" "}
                    <CButton
                      color="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      No
                    </CButton>
                  </CModalFooter>
                </CModal>
                <Segment textAlign="center" color="blue">
                  <h3>All Users</h3>
                </Segment>
                <Segment raised>
                  <Grid padded stackable>
                    <Grid.Row>
                      <Grid.Column width={6}>
                        <Input
                          fluid
                          onChange={searchHandle}
                          //loading
                          placeholder="Search by first name, last name or email"
                        />
                      </Grid.Column>

                      <Grid.Column width={10}></Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
                <Table unstackable striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Full Name</Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>Phone</Table.HeaderCell>
                      <Table.HeaderCell>Reg Date</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {users.map((user) => {
                      return (
                        <Table.Row>
                          <Table.Cell>
                            <h6>
                              {" "}
                              {!user.firstname && !user.lastname
                                ? "Unknown"
                                : `${capitalize(user.firstname)}  ${capitalize(
                                    user.firstname
                                  )} ${capitalize(user.lastname)}`}
                            </h6>
                          </Table.Cell>
                          <Table.Cell>{user.email}</Table.Cell>

                          <Table.Cell>{user.phone}</Table.Cell>
                          <Table.Cell>
                            {" "}
                            <Moment format="DD/MM/YYYY HH:mm">
                              {user.createdAt}
                            </Moment>
                          </Table.Cell>
                          <Table.Cell>
                            <Link onClick={() => modalHandler(user)}>
                              <Icon color="red" name="trash" />
                            </Link>
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

export default AllUsers;
