import React, { useState, useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import clientService from "../../services/clientService";

import { asyncLocalStorage, TOKEN, USER } from "../utility/global";
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
} from "semantic-ui-react";
import { CCard, CCardBody, CCardFooter, CCardHeader } from "@coreui/react";
const ApplicationSuccess = (props) => {
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
              <CCard accentColor="primary">
                <CCardHeader></CCardHeader>
                <CCardBody>
                  <>
                    <Segment textAlign="center" color="blue">
                      <h2>Your application has been submitted</h2>
                    </Segment>
                    <hr />
                    <Button as="a" href="/dashboard" color="blue">
                      Return to dashboard
                    </Button>
                  </>
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

export default ApplicationSuccess;
