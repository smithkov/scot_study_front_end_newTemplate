import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/account.js";
import { asyncLocalStorage, TOKEN, USER } from "../../utility/global";

import clientService from "../../services/clientService";

function ForgotPassword(props) {
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStyle, setAlertStyle] = useState("");
  const [isHasError, setIsHasError] = useState(false);

  const forgotHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await clientService.forgotPassword({ email });

    const { error } = response.data;
    setIsShowMessage(true);
    if (error) {
      setAlertMessage(`Your request did not go through`);
      setIsHasError(true);
      setAlertStyle("alert alert-warning");
    } else {
      setIsHasError(false);
      setAlertStyle("alert alert-success");
      setAlertMessage(
        `An e-mail has been sent to ${email} with further instructions.`
      );
    }
    setLoading(false);
  };
  const onChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper login-page">
        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Forgot Password" />

        {/* ForgotPassword Area */}
        <section className="login-area">
          <Container>
            <Row>
              <Col md="12">
                <div className="login-box">
                  <div className="login-title text-center">
                    <h3>Get Help Signing In</h3>
                  </div>
                  {isShowMessage ? (
                    <div
                      style={{ textAlign: "center" }}
                      class={alertStyle}
                      role="alert"
                    >
                      {alertMessage}
                    </div>
                  ) : (
                    ""
                  )}
                  <form
                    onSubmit={forgotHandler}
                    id="form_login"
                    className="form"
                  >
                    <p className="form-control">
                      <label htmlFor="login_user">Email</label>
                      <input
                        onChange={onChange}
                        required
                        name="email"
                        type="email"
                        placeholder="Email"
                        id="login_user"
                      />
                      <span className="login_input-msg"></span>
                    </p>

                    <button type="submit">Reset</button>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Footer 2 */}
        <FooterTwo />
      </div>
    </Styles>
  );
}

export default ForgotPassword;
