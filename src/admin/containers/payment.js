import React, { useState, useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import clientService from "../../services/clientService";
import { asyncLocalStorage } from "../../utility/global";
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
  Message,
  Input,
  Modal,
} from "semantic-ui-react";
const Payment = (props) => {
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  let [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  let [hasApplied, setHasApplied] = useState(false);
  let [submitFlag, setSubmitFlag] = useState(false);

  const onChange = (e) => {
    setAmount(e.target.value);
  };
  const payment = async () => {
    const getUser = await asyncLocalStorage.getUser();
    const userId = getUser.id;
    setLoading(true);
    const pay = await clientService.makePayment({ amount, userId });
    setLoading(false);
    const { session, refId } = pay.data;
    //storing paymentRefId in localstorage for updating payment later
    await asyncLocalStorage.setPaymentKey(refId);
    window.location.href = `${session}`;
  };
  return (
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
              <CCard borderColor="primary">
                <CCardHeader>
                  <h4>Visa Payment</h4>
                </CCardHeader>
                <CCardBody>
                  <Form onSubmit={payment}>
                    <input
                      name="amount"
                      placeholder="Amount"
                      required
                      type="number"
                      min="10"
                      onChange={onChange}
                    />
                    <hr />
                    <Button
                      disabled={loading}
                      loading={loading}
                      color="blue"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Form>
                  <br />
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

export default Payment;
