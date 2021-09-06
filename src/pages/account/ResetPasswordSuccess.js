import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/account.js";
import { asyncLocalStorage, TOKEN, USER } from "../../utility/global";
import { Segment, Button, Grid } from "semantic-ui-react";
import clientService from "../../services/clientService";

function ResetPasswordSuccess(props) {
  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper login-page">
        <section className="login-area">
          <Container>
            <Grid columns="equal">
              <Grid.Column></Grid.Column>
              <Grid.Column width={8}>
                <Segment stacked>
                  <h1 style={{ textAlign: "center" }}>
                    Your password was changed successfully
                  </h1>
                </Segment>
                <br />
                <br />
                <Button as="a" href="/login" fluid color="blue">
                  Login
                </Button>
              </Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid>
          </Container>
        </section>

        {/* Footer 2 */}
        <FooterTwo />
      </div>
    </Styles>
  );
}

export default ResetPasswordSuccess;
