import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/account.js";
import { asyncLocalStorage, TOKEN, USER } from "../../utility/global";

import clientService from "../../services/clientService";

function Login(props) {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await clientService.signIn({ email, password });

    const { message, error } = response.data;

    if (error) {
      setIsShowMessage(true);
      setErrorMessage(message);
    } else {
      const { data, token, isAdmin } = response.data;

      const setToken = await asyncLocalStorage.setItem(TOKEN, token);
      const setUser = await asyncLocalStorage.setItem(
        USER,
        JSON.stringify(data)
      );
      let { from } = props.location.state || {
        from: { pathname: isAdmin ? `/admin_dashboard` : `/dashboard` },
      };
      props.history.replace(from);
    }
    setLoading(false);
  };
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name == "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper login-page">
        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Log In" />

        {/* Login Area */}
        <section className="login-area">
          <Container>
            <Row>
              <Col md="12">
                <div className="login-box">
                  <div className="login-title text-center">
                    <h3>Log In</h3>
                  </div>
                  {isShowMessage ? (
                    <div
                      style={{ textAlign: "center" }}
                      class="alert alert-warning"
                      role="alert"
                    >
                      {errorMessage}
                    </div>
                  ) : (
                    ""
                  )}
                  <form
                    onSubmit={loginHandler}
                    id="form_login"
                    className="form"
                  >
                    <p className="form-control">
                      <label htmlFor="login_user">Email or username</label>
                      <input
                        onChange={onChange}
                        name="email"
                        type="text"
                        placeholder="Email or username"
                        id="login_user"
                      />
                      <span className="login_input-msg"></span>
                    </p>
                    <p className="form-control">
                      <label htmlFor="login_password">Password</label>
                      <input
                        onChange={onChange}
                        name="password"
                        type="password"
                        placeholder="*******"
                        id="login_password"
                      />
                      <span className="login_input-msg"></span>
                    </p>
                    <button type="submit">Log In</button>
                    <div className="save-forget-password d-flex justify-content-between">
                      <div className="save-passowrd">
                        <label htmlFor="save_password">
                          <input
                            type="checkbox"
                            id="save_password"
                            className="check-box"
                          />
                          Save Password
                        </label>
                      </div>

                      <div className="forget-password">
                        <a href="/forgot-password">Forget Password?</a>
                      </div>
                    </div>
                    <div className="not_account-btn text-center">
                      <p>
                        Haven't Any Account Yet?{" "}
                        <a href="/register">Click Here</a>
                      </p>
                    </div>
                    {/* <p>
                      {" "}
                      <a href="/agent-login">Agent Login</a>
                    </p> */}
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

export default Login;
