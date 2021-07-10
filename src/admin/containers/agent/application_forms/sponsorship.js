import React, { useState, useEffect } from "react";
import {
  TheContent,
  AgentSidebar,
  TheFooter,
  TheHeaderAgent,
} from "../../index";
import clientService from "../../../services/clientService";
import { CCard, CCardBody, CCardFooter, CCardHeader } from "@coreui/react";
import { years } from "../../../utility/constants";
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
const AgentSponsorship = (props) => {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [selectedSponsor, setSelectedSponsor] = useState("");
  let [name, setName] = useState("");
  let [occupation, setOccupation] = useState("");
  let [budget, setBudget] = useState("");

  let [userId, setUserId] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  let [hasApplied, setHasApplied] = useState(false);
  useEffect(() => {
    (async () => {
      const userId = props.match.params.userId;
      setUserId(userId);

      const findSponsorResult = await clientService.findSponsor({
        userId,
      });

      const currentData = findSponsorResult.data.data;
      if (currentData) {
        setSelectedSponsor(currentData.sponsor);
        setName(currentData.name);
        setOccupation(currentData.occupation);
        setBudget(currentData.budget);
      } else {
        //alert("No  data");
      }

      const findApplications = await clientService.findApplicationsByUser({
        userId,
      });

      setHasApplied(findApplications.data.data.length > 0 ? true : false);
    })();
  }, []);
  const onChangeDropdown = async (e, data) => {
    const name = data.name;
    const value = data.value;

    if (name == "selectedSponsor") {
      setSelectedSponsor(value);
    }
  };
  const update = async () => {
    if (selectedSponsor != "") {
      setLoading(true);

      const updateUser = await clientService.saveSponsor({
        name: name,
        sponsor: selectedSponsor,
        occupation: occupation,
        budget: budget,
        userId: userId,
      });

      const result = updateUser.data;
      if (!result.error) {
        setIsShowMessage(true);
        setErrorMessage(result.message);
      }

      setLoading(false);
      if (!hasApplied) {
        props.history.push(`/agent_visaHistory/${userId}`);
      }
    } else {
      setIsShowMessage(true);
      setErrorMessage("Please select a sponsor");
    }
    window.scrollTo(500, 0);
  };
  const onChange = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "name") {
      setName(value);
    }
    if (name == "occupation") {
      setOccupation(value);
    }
    if (name == "budget") {
      setBudget(value);
    }
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
              <CCard borderColor="primary">
                <CCardHeader>
                  <h4>Sponsorship Details</h4>
                </CCardHeader>
                <CCardBody>
                  {isShowMessage ? (
                    <Message warning>
                      <Message.Content>
                        <p style={{ textAlign: "center" }}>{errorMessage}</p>
                      </Message.Content>
                    </Message>
                  ) : (
                    ""
                  )}
                  <Form onSubmit={update}>
                    <Form.Field required>
                      <label>Sponsor</label>
                      <Dropdown
                        selection
                        onChange={onChangeDropdown}
                        name="selectedSponsor"
                        options={[
                          {
                            key: 1,
                            text: "Self-sponsored",
                            value: "Self-sponsored",
                          },
                          { key: 2, text: "Parents", value: "Parents" },
                          {
                            key: 1,
                            text: "Other relatives",
                            value: "Other relatives",
                          },
                          { key: 2, text: "Scholarship", value: "Scholarship" },
                        ]}
                        placeholder={selectedSponsor || "Choose an option"}
                      />
                    </Form.Field>

                    <Form.Field required>
                      <label>Sponsor's name</label>
                      <input
                        name="name"
                        value={name}
                        placeholder="Name"
                        required
                        onChange={onChange}
                      />
                    </Form.Field>
                    <Form.Field required>
                      <label>Occupation</label>
                      <input
                        name="occupation"
                        value={occupation}
                        placeholder="Occupation"
                        required
                        onChange={onChange}
                      />
                    </Form.Field>

                    <Form.Field required>
                      <label>Budget</label>
                      <input
                        name="budget"
                        value={budget}
                        placeholder="Budget"
                        required
                        onChange={onChange}
                      />
                    </Form.Field>

                    <hr />
                    <Button href={`/agent_highSchool/${userId}`} as="a">
                      Back
                    </Button>
                    <Button loading={loading} color="blue" type="submit">
                      Save
                    </Button>
                  </Form>
                </CCardBody>
              </CCard>

              <br />
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default AgentSponsorship;
