import React, { useState, useEffect, lazy } from "react";
import { TheContent, AgentSidebar, TheFooter, TheHeaderAgent } from "../index";
import clientService from "../../services/clientService";
import Moment from "react-moment";
import { imageStyles } from "../../utility/constants";
import { asyncLocalStorage, TOKEN, USER } from "../../utility/global";
import Loading from "../../widgets/loading";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
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
  Flag,
  TextArea,
  Checkbox,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
const WidgetsDropdown = lazy(() =>
  import("../../views/widgets/WidgetsDropdown.js")
);

const RegisterForUserForAgent = (props) => {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [selectedGender, setSelectedGender] = useState("");
  let [selectedMarital, setSelectedMarital] = useState("");

  let [agentId, setAgentId] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [contactEmail, setContactEmail] = useState("");
  let [firstname, setFirstname] = useState("");
  let [middlename, setMiddlename] = useState("");
  let [lastname, setLastname] = useState("");
  let [dob, setDob] = useState("");
  let [homeAddress, setHomeAddress] = useState("");
  let [postalAddress, setPostalAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let [selectedCountry, setSelectedCountry] = useState("");
  let [country, setCountry] = useState([]);

  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const userId = getUser.id;
      setAgentId(userId);
      const allCountries = await clientService.countries();

      let countryData = allCountries.data.data.map((item) => {
        return {
          key: item.id,
          value: item.id,
          flag: item.code,
          text: item.name,
        };
      });
      setCountry(countryData);
    })();
  }, []);

  const onChangeDropdown = async (e, data) => {
    const name = data.name;
    const value = data.value;
    let courseResult;

    if (name == "selectedGender") {
      setSelectedGender(value);
    } else if (name == "selectedMarital") {
      setSelectedMarital(value);
    } else if (name == "selectedCountry") {
      setSelectedCountry(value);
    }
  };
  const onChange = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "phone") {
      setPhone(value);
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
    if (name == "dob") {
      setDob(value);
    }
    if (name == "homeAddress") {
      setHomeAddress(value);
    }
    if (name == "postalAddress") {
      setPostalAddress(value);
    }
  };

  const register = async (e) => {
    setLoading(true);
    const response = await clientService.createAgentUser({
      phone,
      firstname,
      middlename,
      lastname,
      marital: selectedMarital,
      gender: selectedGender,
      dob,
      homeAddress,
      postalAddress,
      agentId,
      countryId: selectedCountry,
    });
    const { message, error } = response.data;

    if (error) {
      setIsShowMessage(true);
      setErrorMessage(message);
      window.scrollTo(500, 0);
    } else {
      props.history.push("/agent_users");
    }
    setLoading(false);
  };
  return (
    <div className="c-app c-default-layout">
      <AgentSidebar />
      <div className="c-wrapper">
        <TheHeaderAgent />
        <div className="c-body">
          {/* <TheContent /> */}
          <br />
          <Grid columns="equal">
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={14}>
              <CCard accentColor="primary">
                <CCardHeader>
                  {" "}
                  <Segment textAlign="center" stacked>
                    <h3> Create a new applicant</h3>
                  </Segment>
                </CCardHeader>
                <CCardBody>
                  {isShowMessage ? (
                    <Message warning>
                      <Message.Header>{errorMessage}</Message.Header>
                    </Message>
                  ) : (
                    ""
                  )}
                  <Form onSubmit={register} size="large">
                    <Segment stacked style={{ textAlign: "left" }}>
                      <Divider horizontal>New User Information</Divider>

                      <Form.Field required>
                        <label>First name</label>
                        <input
                          onChange={onChange}
                          name="firstname"
                          required
                          placeholder="Firstname"
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Middle name</label>
                        <input
                          name="middlename"
                          placeholder="Middle name"
                          onChange={onChange}
                        />
                      </Form.Field>
                      <Form.Field required>
                        <label>Last name</label>
                        <input
                          name="lastname"
                          required
                          placeholder="Last name"
                          onChange={onChange}
                        />
                      </Form.Field>
                      <Form.Field required>
                        <label>Phone</label>

                        <Form.Input
                          fluid
                          required
                          name="phone"
                          placeholder="Phone"
                          onChange={onChange}
                        />
                      </Form.Field>
                      <Form.Field required>
                        <label>Country of residence</label>
                        <Dropdown
                          required
                          fluid
                          selection
                          search
                          name="selectedCountry"
                          placeholder={"Country of residence"}
                          options={country}
                          onChange={onChangeDropdown}
                        />
                      </Form.Field>
                      <Form.Field required>
                        <label>Date of birth</label>
                        <input
                          name="dob"
                          placeholder="Date of birth"
                          required
                          onChange={onChange}
                        />
                      </Form.Field>
                      <Form.Field required>
                        <label>Gender</label>
                        <Dropdown
                          selection
                          onChange={onChangeDropdown}
                          name="selectedGender"
                          options={[
                            { key: 1, text: "Male", value: "Male" },
                            { key: 2, text: "Female", value: "Female" },
                          ]}
                          placeholder="Choose an option"
                        />
                      </Form.Field>
                      <Form.Field required>
                        <label>Marital</label>
                        <Dropdown
                          selection
                          onChange={onChangeDropdown}
                          name="selectedMarital"
                          options={[
                            { key: 1, text: "Single", value: "Single" },
                            { key: 2, text: "Married", value: "Married" },
                          ]}
                          placeholder="Choose an option"
                        />
                      </Form.Field>
                      <Form.Field required>
                        <label>Home address</label>
                        <input
                          name="homeAddress"
                          placeholder="Home address"
                          required
                          onChange={onChange}
                        />
                      </Form.Field>
                      <Form.Field required>
                        <label>Contact address</label>
                        <input
                          name="postalAddress"
                          placeholder="Contact address"
                          required
                          onChange={onChange}
                        />
                      </Form.Field>
                      <Button loading={loading} color="blue" fluid size="large">
                        Register
                      </Button>
                    </Segment>
                  </Form>
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

export default RegisterForUserForAgent;
