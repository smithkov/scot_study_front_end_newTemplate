import React, { useState, useEffect } from "react";
import { AgentSidebar, TheFooter, TheHeaderAgent } from "../../index";
import clientService from "../../../../services/clientService";
import { years } from "../../../utility/constants";
import HighestQualification from "../../../containers/highestQualification";

import { CCard, CCardBody, CCardFooter, CCardHeader } from "@coreui/react";

import { Dropdown, Button, Grid, Form, Message } from "semantic-ui-react";
const AgentHighSchool = (props) => {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let [highSchoolName, setHighSchoolName] = useState("");
  let [selectedCompletionYear, setSelectedCompletionYear] = useState("");
  let [completedYear, setCompletedYear] = useState([]);
  let [userId, setUserId] = useState("");
  let [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    (async () => {
      const userId = props.match.params.userId;
      setUserId(userId);
      let yearData = years().map((item) => {
        return {
          key: item,
          value: item,
          text: item,
        };
      });
      setCompletedYear(yearData);
      const findHighSchoolhResult = await clientService.findHighSchool({
        userId,
      });

      const currentData = findHighSchoolhResult.data.data;
      if (currentData) {
        setHighSchoolName(currentData.highSchoolName);
        setSelectedCompletionYear(currentData.completionYear);
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

    if (name == "selectedCompletionYear") {
      setSelectedCompletionYear(value);
    }
  };
  const update = async () => {
    if (selectedCompletionYear != "") {
      setLoading(true);

      const updateUser = await clientService.saveHighSchool({
        completionYear: selectedCompletionYear,
        userId: userId,
        highSchoolName: highSchoolName,
      });

      const result = updateUser.data;
      if (!result.error) {
        setIsShowMessage(true);
        setErrorMessage(result.message);
        if (!hasApplied) {
          props.history.push(`/agent_english/${userId}`);
        }
      }

      setLoading(false);
    } else {
      setIsShowMessage(true);
      setErrorMessage("Completion year is required");
    }
    window.scrollTo(500, 0);
  };
  const onChange = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "highSchoolName") {
      setHighSchoolName(value);
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
                  <h4>High School Details</h4>
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
                      <label>Completion year</label>
                      <Dropdown
                        selection
                        onChange={onChangeDropdown}
                        name="selectedCompletionYear"
                        options={completedYear}
                        placeholder={
                          selectedCompletionYear || "Choose an option"
                        }
                      />
                    </Form.Field>

                    <Form.Field required>
                      <label>High school name</label>
                      <input
                        name="highSchoolName"
                        value={highSchoolName}
                        placeholder="High school name"
                        required
                        onChange={onChange}
                      />
                    </Form.Field>

                    <hr />
                    <Button
                      href={`/agent_previous_qualification/${userId}`}
                      as="a"
                    >
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

export default AgentHighSchool;
