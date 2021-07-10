import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/account.js";
import clientService from "../../services/clientService";
import { asyncLocalStorage, TOKEN, USER } from "../../utility/global";

function RegisterAgent(props) {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [selectedGender, setSelectedGender] = useState("");
  let [selectedMarital, setSelectedMarital] = useState("");

  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [agencyName, setAgencyName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  let [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await clientService.countries();

      setCountries(result.data.data);
    })();
  }, []);

  const onChangeDropdown = async (e) => {
    const name = e.target.name;
    const value = e.value;

    if (name == "selectedCountry") {
      setSelectedCountry(value);
    }
  };
  const onChange = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(value);
    if (name == "phone") {
      setPhone(value);
    }
    if (name == "email") {
      setEmail(value);
    }
    if (name == "password") {
      setPassword(value);
    }
    if (name == "confirmPassword") {
      setConfirmPassword(value);
    }
    if (name == "agencyName") {
      setAgencyName(value);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    if (password == confirmPassword) {
      setLoading(true);
      const response = await clientService.agentSignUp({
        email,
        password,
        phone,
        agencyName,
        countryId: selectedCountry,
      });
      const { message, error } = response.data;

      if (error) {
        setIsShowMessage(true);
        setErrorMessage(message);
        window.scrollTo(500, 0);
      } else {
        const { data, token } = response.data;

        const setToken = await asyncLocalStorage.setItem(TOKEN, token);
        const setUser = await asyncLocalStorage.setItem(
          USER,
          JSON.stringify(data)
        );
        let { from } = props.location.state || {
          from: { pathname: `/agent_dashboard` },
        };
        props.history.replace(from);
      }
      setLoading(false);
    } else {
      setIsShowMessage(true);
      setErrorMessage("Passwords do not match");
      window.scrollTo(500, 0);
    }
  };
  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper registration-page">
        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Registration" />

        {/* Registration Area */}
        <section className="registration-area">
          <Container>
            <Row>
              <Col md="12">
                <div className="registration-box">
                  <div className="registration-title text-center">
                    <h3>Agency Registration</h3>
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
                    onSubmit={register}
                    id="form_registration"
                    className="form"
                  >
                    {/* <p className="form-control">
                                            <label htmlFor="registration_fname">First Name</label>
                                            <input type="text" placeholder="First name" id="registration_fname" />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label htmlFor="registration_lname">Last Name</label>
                                            <input type="text" placeholder="Last name" id="registration_lname" />
                                            <span className="registration_input-msg"></span>
                                        </p> */}
                    <p className="form-control">
                      <label htmlFor="registration_email">Email Address</label>
                      <input
                        onChange={onChange}
                        name="email"
                        type="email"
                        placeholder="Email address"
                        id="registration_email"
                      />
                      <span className="registration_input-msg"></span>
                    </p>
                    {/* <p className="form-control">
                      <label htmlFor="registration_user">User Name</label>
                      <input
                        type="text"
                        placeholder="Username"
                        id="registration_user"
                      />
                      <span className="registration_input-msg"></span>
                    </p> */}
                    <p className="form-control">
                      <label htmlFor="registration_password">Password</label>
                      <input
                        onChange={onChange}
                        name="password"
                        type="password"
                        placeholder="*******"
                        id="registration_password"
                      />
                      <span className="registration_input-msg"></span>
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
                    <hr />
                    {/* Personal Information */}

                    <p className="form-control">
                      <label htmlFor="registration_user">Agency Name</label>
                      <input
                        onChange={onChange}
                        name="agencyName"
                        type="text"
                        placeholder="Agency Name"
                        id="registration_user"
                      />
                      <span className="registration_input-msg"></span>
                    </p>
                    <p className="form-control">
                      <label htmlFor="registration_user">Phone</label>
                      <input
                        onChange={onChange}
                        name="phone"
                        type="text"
                        placeholder="Phone"
                        id="registration_user"
                      />
                      <span className="registration_input-msg"></span>
                    </p>
                    <p className="form-control">
                      <label htmlFor="registration_user">Country</label>
                      <select
                        onChange={onChangeDropdown}
                        name="selectedCountry"
                        class="form-select form-select-lg"
                        aria-label=".form-select-sm example"
                      >
                        <option selected>Select Country</option>
                        {countries.map((item, i) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select>
                      <span className="registration_input-msg"></span>
                    </p>
                    <button type="submit">Register Now</button>
                  </form>
                  <div className="have_account-btn text-center">
                    <p>
                      Already have an account?{" "}
                      <Link to="/login">Login Here</Link>
                    </p>
                  </div>
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

export default RegisterAgent;
