import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import GoogleMap from "./GoogleMap";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/contact.js";
import { contact, social } from "../../utility/constants";
import { Message } from "semantic-ui-react";
import clientService from "../../services/clientService";

function Contact() {
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const form = document.getElementById("form_contact");
    const name = document.getElementById("contact_name");
    const email = document.getElementById("contact_email");
    const subject = document.getElementById("contact_subject");
    const message = document.getElementById("contact_message");

    form.addEventListener("submit", formSubmit);

    function formSubmit(e) {
      e.preventDefault();

      const nameValue = name.value.trim();
      const emailValue = email.value.trim();
      const subjectValue = subject.value.trim();
      const messageValue = message.value.trim();

      if (nameValue === "") {
        setError(name, "Name can't be blank");
      } else {
        setSuccess(name);
      }

      if (emailValue === "") {
        setError(email, "Email can't be blank");
      } else if (!isEmail(emailValue)) {
        setError(email, "Not a valid email");
      } else {
        setSuccess(email);
      }

      if (subjectValue === "") {
        setError(subject, "Subject can't be blank");
      } else {
        setSuccess(subject);
      }

      if (messageValue === "") {
        setError(message, "Message can't be blank");
      } else {
        setSuccess(message);
      }
    }

    function setError(input, message) {
      const formControl = input.parentElement;
      const errorMsg = formControl.querySelector(".contact_input-msg");
      formControl.className = "form-control text-left error";
      errorMsg.innerText = message;
    }

    function setSuccess(input) {
      const formControl = input.parentElement;
      formControl.className = "form-control success";
    }

    function isEmail(email) {
      return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    }
  });

  const save = async () => {
    const saveContact = await clientService.contact({
      fullname,
      email,
      subject,
      message,
    });
    if (!saveContact.data.error) {
      setIsShowMessage(true);
    }
  };
  const handleOnchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name == "fullname") {
      setFullname(value);
    } else if (name == "email") {
      setEmail(value);
    } else if (name == "subject") {
      setSubject(value);
    } else if (name == "message") {
      setMessage(value);
    }
  };

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper contact-page">
        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Contact Us" />

        {/* Contact Area */}
        <section className="contact-area">
          <Container>
            <Row>
              <Col md="4">
                <div className="contact-box-title">
                  <h4>Contact Info</h4>
                </div>
                <div className="contact-icon-box d-flex">
                  <div className="icon">
                    <i className="las la-map-marker"></i>
                  </div>
                  <div className="box-content">
                    <h5>Our Location</h5>
                    <p>{contact.fullAddress()}</p>
                  </div>
                </div>
                <div className="contact-icon-box d-flex">
                  <div className="icon">
                    <i className="las la-envelope-open"></i>
                  </div>
                  <div className="box-content">
                    <h5>Email Address</h5>
                    <p>
                      {contact.email}
                      <br />
                      {contact.email2}
                    </p>
                  </div>
                </div>
                <div className="contact-icon-box d-flex">
                  <div className="icon">
                    <i className="las la-phone"></i>
                  </div>
                  <div className="box-content">
                    <h5>Phone Number</h5>
                    <p>
                      {contact.phone1}
                      <br />
                      {contact.phone2}
                    </p>
                  </div>
                </div>
                <div className="contact-social">
                  <ul className="social list-unstyled list-inline">
                    <li className="list-inline-item">
                      <a target="_blank" href={social.facebook}>
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a target="_blank" href={social.twitter}>
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a target="_blank" href={social.linkedIn}>
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a target="_blank" href={social.youtube}>
                        <i className="fab fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md="8">
                <div className="contact-form">
                  <div className="form-title">
                    <h4>Get In Touch</h4>
                  </div>
                  <div className="form-box">
                    {isShowMessage ? (
                      <Message positive>
                        <Message.Header>
                          ENQUIRY SUBMITTED SUCCESSFULLY
                        </Message.Header>
                        <p>
                          We have received your enquiry and will get back to you
                          shortly.
                        </p>
                      </Message>
                    ) : (
                      ""
                    )}

                    <form onSubmit={save} id="form_contact" className="form">
                      <Row>
                        <Col md="6">
                          <p className="form-control">
                            <input
                              required
                              name="fullname"
                              onChange={handleOnchange}
                              type="text"
                              placeholder="Full Name"
                              id="contact_name"
                            />
                            <span className="contact_input-msg"></span>
                          </p>
                        </Col>
                        <Col md="6">
                          <p className="form-control">
                            <input
                              required
                              onChange={handleOnchange}
                              name="email"
                              type="email"
                              placeholder="Email Address"
                              id="contact_email"
                            />
                            <span className="contact_input-msg"></span>
                          </p>
                        </Col>
                        <Col md="12">
                          <p className="form-control">
                            <input
                              required
                              onChange={handleOnchange}
                              name="subject"
                              type="text"
                              placeholder="Subject"
                              id="contact_subject"
                            />
                            <span className="contact_input-msg"></span>
                          </p>
                        </Col>
                        <Col md="12">
                          <p className="form-control">
                            <textarea
                              required
                              onChange={handleOnchange}
                              name="message"
                              name="message"
                              id="contact_message"
                              placeholder="Enter Message"
                            ></textarea>
                            <span className="contact_input-msg"></span>
                          </p>
                        </Col>
                        <Col md="12">
                          <button type="submit">Send Message</button>
                        </Col>
                      </Row>
                    </form>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>

          {/* Google Map */}
          <GoogleMap />
        </section>

        {/* Footer 2 */}
        <FooterTwo />
      </div>
    </Styles>
  );
}

export default Contact;
