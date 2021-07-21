import React, { useState, useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import clientService from "../../services/clientService";
import { asyncLocalStorage, TOKEN, USER } from "../utility/global";
import { Link, Redirect } from "react-router-dom";
import { CCard, CCardBody, CAlert, CCardHeader } from "@coreui/react";

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
const PaymentError = (props) => {
  const [isRender, setIsRender] = useState(true);
  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const userId = getUser.id;
      const refId = await asyncLocalStorage.getPaymentKey();
      if (refId) {
        const updateResult = await clientService.updatePayment({
          status: "unpaid",
          refId,
        });
        if (!updateResult.data.error) {
          await asyncLocalStorage.deletePaymentKey();
        }
      } else {
        setIsRender(false);
      }
    })();
  }, []);
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
              {isRender ? (
                <CCard borderColor="primary">
                  <CCardHeader>
                    <h4>Payment Aborted</h4>
                  </CCardHeader>
                  <CCardBody>
                    <CAlert style={{ textAlign: "center" }} color="warning">
                      {/*eslint-disable-next-line*/}
                      <h5>
                        Your payment was unsuccessful, please consider trying
                        again later, or kindly contact us at
                        info@scotstudy.co.uk{" "}
                      </h5>
                    </CAlert>
                  </CCardBody>
                </CCard>
              ) : (
                <p style={{ textAlign: "center" }}>
                  This link has expired or does not exist.
                </p>
              )}
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default PaymentError;
