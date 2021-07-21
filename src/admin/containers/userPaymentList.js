import React, { useState, useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import Moment from "react-moment";
import clientService from "../../services/clientService";
import { asyncLocalStorage, roles } from "../../utility/global";
import Loading from "../../components/widgets/loading";
import Message from "../../components/widgets/message";
import Forbidden from "../../components/widgets/forbidden";
import { Link, Redirect } from "react-router-dom";
import { CCard, CCardBody, CCardFooter, CCardHeader } from "@coreui/react";

import { years } from "../utility/constants";
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
  Input,
  Modal,
} from "semantic-ui-react";
const UserPaymentList = (props) => {
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [isRender, setIsRender] = useState(true);

  let [payments, setPayments] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const getRole = await asyncLocalStorage.getRole();

      if (getRole != roles.user) {
        setIsRender(false);
      }

      const userId = getUser.id;

      const paymentResult = await clientService.findUserPayments({ userId });
      const paymentData = paymentResult.data.data;
      setPayments(paymentData);
      setLoading(false);
      setHasData(paymentData.length > 0 ? true : false);
    })();
  }, []);

  return (
    <>
      {isRender ? (
        <div className="c-app c-default-layout">
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              {/* <TheContent /> */}
              <br />
              <Grid columns="equal">
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={14}>
                  <>
                    <h4>My Payments</h4>
                    <CCard accentColor="primary">
                      <CCardHeader>
                        <div className="card-header-actions">
                          <Button color="blue" as="a" href="/payment">
                            <Icon name="payment" />
                            Visa Payment
                          </Button>
                        </div>
                      </CCardHeader>
                      <CCardBody>
                        {loading ? (
                          <Loading />
                        ) : hasData ? (
                          <Table singleLine>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>RefId</Table.HeaderCell>
                                {/* <Table.HeaderCell>Name</Table.HeaderCell> */}
                                <Table.HeaderCell>Amount</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>

                            <Table.Body>
                              {payments.map((item) => {
                                return (
                                  <Table.Row>
                                    <Table.Cell>
                                      <h6>{item.refId}</h6>
                                    </Table.Cell>
                                    {/* <Table.Cell>
                                      {`${item.User.firstname} ${item.User.lastname}`}
                                    </Table.Cell> */}
                                    <Table.Cell width="2">
                                      {item.amount}
                                    </Table.Cell>
                                    <Table.Cell width="2">
                                      {item.status}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {" "}
                                      <Moment format="DD/MM/YYYY HH:mm">
                                        {item.updatedAt}
                                      </Moment>
                                    </Table.Cell>
                                  </Table.Row>
                                );
                              })}
                            </Table.Body>
                          </Table>
                        ) : (
                          <Message text={`No payments has been made yet.`} />
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

export default UserPaymentList;
