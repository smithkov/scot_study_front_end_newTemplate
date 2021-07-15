import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/account.js";
import clientService from "../../services/clientService";
import { asyncLocalStorage, TOKEN, USER } from "../../utility/global";
import { req } from "../../utility/constants";

function PhdApplication(props) {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [selectedQualification, setSelectedQualification] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [firstname, setFirstname] = useState("");
  let [middlename, setMiddlename] = useState("");
  let [lastname, setLastname] = useState("");
  let [hasSubmitted, setHasSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let [topic, setTopic] = useState("");
  const [qualification, setQualification] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await clientService.findPhdQualifications();

      setQualification(result.data.data);
    })();
  }, []);

  const onChangeDropdown = async (e) => {
    const value = e.target.value;
    setSelectedQualification(value);
  };
  const onChange = async (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name == "phone") {
      setPhone(value);
    }
    if (name == "email") {
      setEmail(value);
    }
    if (name == "topic") {
      setTopic(value);
    }
    if (name == "firstname") {
      setFirstname(value);
    }
    if (name == "middlename") {
      setMiddlename(value);
    }

    if (name == "lastname") {
      setLastname(value);
    }
  };

  const apply = async (e) => {
    e.preventDefault();
    if (selectedQualification != "") {
      setLoading(true);
      const response = await clientService.savePhdApplication({
        email,
        phone,
        firstname,
        middlename,
        lastname,
        phdQualificationId: selectedQualification,
        topic: topic,
      });
      const { message, error } = response.data;

      if (error) {
        setIsShowMessage(true);
        setErrorMessage(message);
        window.scrollTo(500, 0);
      } else {
        setHasSubmitted(true);
      }
      setLoading(false);
      window.scrollTo(0, 0);
    } else {
      alert("Qualification is required!");
    }
  };

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper registration-page">
        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Application" />

        {/* Registration Area */}
        <section className="registration-area">
          <Container>
            <Row>
              <Col md="12">
                <div className="registration-box">
                  <div className="registration-title text-center">
                    <h3>PhD Application</h3>
                  </div>
                  {hasSubmitted ? (
                    <div
                      class="alert alert-success alert-dismissible fade show"
                      role="alert"
                    >
                      <h5>
                        <strong>Successful Submission!</strong> We have received
                        your application, and will contact you as soon as we
                        process it.
                      </h5>
                    </div>
                  ) : (
                    ""
                  )}
                  {hasSubmitted ? (
                    ""
                  ) : (
                    <form
                      onSubmit={apply}
                      id="form_registration"
                      className="form"
                    >
                      <h5 style={{ textAlign: "center" }}>
                        {" "}
                        {req} indicates required fields
                      </h5>{" "}
                      <hr></hr>
                      <p className="form-control">
                        <label htmlFor="registration_email">
                          First Name {req}
                        </label>
                        <input
                          onChange={onChange}
                          name="firstname"
                          type="text"
                          required
                          placeholder="First Name"
                          id="registration_email"
                        />
                        <span className="registration_input-msg"></span>
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">Middle Name</label>
                        <input
                          onChange={onChange}
                          name="middlename"
                          type="text"
                          placeholder="Middle Name"
                          id="registration_email"
                        />
                        <span className="registration_input-msg"></span>
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">
                          Last Name {req}
                        </label>
                        <input
                          onChange={onChange}
                          name="lastname"
                          type="text"
                          required
                          placeholder="Last Name"
                          id="registration_email"
                        />
                        <span className="registration_input-msg"></span>
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">Email {req}</label>
                        <input
                          onChange={onChange}
                          name="email"
                          type="text"
                          required
                          placeholder="Email"
                          id="registration_email"
                        />
                        <span className="registration_input-msg"></span>
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">Phone {req}</label>
                        <input
                          onChange={onChange}
                          name="phone"
                          required
                          type="text"
                          placeholder="Phone"
                          id="registration_email"
                        />
                        <span className="registration_input-msg"></span>
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_user">
                          Qualification {req}
                        </label>
                        <select
                          onChange={onChangeDropdown}
                          name="selectedQualification"
                          required
                          class="form-select form-select-lg"
                          aria-label=".form-select-sm example"
                        >
                          <option value="">Select Qualification</option>
                          {qualification.map((item, i) => (
                            <option value={item.id}>{item.name}</option>
                          ))}
                        </select>
                        <span className="registration_input-msg"></span>
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">Topic {req}</label>
                        <textarea
                          class="form-control"
                          rows="4"
                          onChange={onChange}
                          name="topic"
                          type="text"
                          placeholder="Topic"
                          id="registration_email"
                        />
                        <span className="registration_input-msg"></span>
                      </p>
                      <button type="submit">Submit Application</button>
                    </form>
                  )}
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

export default PhdApplication;
