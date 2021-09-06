import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/account.js";
import { asyncLocalStorage, TOKEN, USER } from "../../utility/global";
import clientService from "../../services/clientService";
import { Segment, Button, Grid } from "semantic-ui-react";

function ResetPassword(props) {
  const token = props.match.params.token;

  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStyle, setAlertStyle] = useState("");
  const [isHasError, setIsHasError] = useState(false);
  const [isRender, setIsRender] = useState(false);
  let [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    (async () => {
      const validateToken = await clientService.resetPassword({ token });

      if (!validateToken.data.error) {
        setIsRender(true);
      }
    })();
  }, []);

  const changePasswordHandler = async (e) => {
    e.preventDefault();

    if (password == confirmPassword) {
      setLoading(true);
      setLoading(true);
      const response = await clientService.resetPasswordPost({
        password,
        token,
      });

      const { error } = response.data;
      setIsShowMessage(true);
      if (error) {
        setAlertMessage(`Your request did not go through`);
        setIsHasError(true);
        setAlertStyle("alert alert-warning");
      } else {
        props.history.replace("/reset-password-success");
      }
      setLoading(false);
    } else {
      setAlertMessage(`Password and confirm-password do not match.`);
      setIsHasError(true);
      setAlertStyle("alert alert-warning");
    }
    setLoading(false);
  };
  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "password") setPassword(value);
    else setConfirmPassword(value);
  };
  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper login-page">
        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}

        {/* ResetPassword Area */}
        <section className="login-area">
          <Container>
            <Row>
              {isRender ? (
                <Col md="12">
                  <div className="login-box">
                    <div className="login-title text-center">
                      <h3>Change Password</h3>
                    </div>
                    {isHasError ? (
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
                      onSubmit={changePasswordHandler}
                      id="form_login"
                      className="form"
                    >
                      <p className="form-control">
                        <label htmlFor="login_user">New Password</label>
                        <input
                          onChange={onChange}
                          required
                          name="password"
                          type="password"
                          placeholder="Password"
                          id="login_user"
                        />
                        <span className="login_input-msg"></span>
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_cpassword">
                          Confirm Password
                        </label>
                        <input
                          onChange={onChange}
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm password"
                          id="registration_cpassword"
                        />
                        <span className="registration_input-msg"></span>
                      </p>

                      <Button loading={loading} color="blue" type="submit">
                        Change Password
                      </Button>
                    </form>
                  </div>
                </Col>
              ) : (
                <Segment stacked>
                  <h4 style={{ textAlign: "center" }}>
                    This page no longer exist!
                  </h4>
                </Segment>
              )}
            </Row>
          </Container>
        </section>

        {/* Footer 2 */}
        <FooterTwo />
      </div>
    </Styles>
  );
}

export default ResetPassword;
