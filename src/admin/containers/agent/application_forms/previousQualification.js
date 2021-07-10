import React, { useState, useEffect } from "react";
import {
  TheContent,
  AgentSidebar,
  TheFooter,
  TheHeaderAgent,
} from "../../index";
import clientService from "../../../services/clientService";
import PreviousQualification from "../../../containers/previousQualification";
import { asyncLocalStorage, TOKEN, USER } from "../../../utility/global";
import { years } from "../../../utility/constants";
import { CCard, CCardBody, CCardFooter, CCardHeader } from "@coreui/react";
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
const AgentPreviousQualification = (props) => {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  let [errorMessage, setErrorMessage] = useState("");
  let [selectedQualification, setSelectedQualification] = useState("");
  // let [qualificationText, setQualificationText] = useState("");
  // let [programeYearText, setProgrameYearText] = useState("");
  // let [hasCompletedText, setHasCompletedText] = useState("");
  let [qualification, setQualification] = useState([]);
  // let [hq_completed, setHq_completed] = useState("");
  let [userId, setUserId] = useState("");
  // let [hq_grade, setHq_grade] = useState("");
  // let [hq_schoolName, setHq_schoolName] = useState("");
  let [selectedProgrammeYear, setSelectedProgrammeYear] = useState("");
  let [programmeYear, setProgrammeYear] = useState([]);

  //previous qualification states below

  let [selectedPreviousQualification, setSelectedPreviousQualification] =
    useState("");
  let [previousQualificationText, setPreviousQualificationText] = useState("");
  let [previousProgrameYearText, setPreviousProgrameYearText] = useState("");
  let [previousHasCompletedText, setPreviousHasCompletedText] = useState("");
  let [previousQualification, setPreviousQualification] = useState([]);
  let [pq_completed, setPq_completed] = useState("");
  let [pq_grade, setPq_grade] = useState("");
  let [pq_schoolName, setPq_schoolName] = useState("");
  let [showPrevious, setShowPrevious] = useState(false);
  let [hasApplied, setHasApplied] = useState(false);

  let [selectedPreviousProgrammeYear, setSelectedPreviousProgrammeYear] =
    useState("");
  let [previousProgrammeYear, setPreviousProgrammeYear] = useState([]);

  useEffect(() => {
    (async () => {
      const userId = props.match.params.userId;
      setUserId(userId);

      const findQualiResult = await clientService.findHighestQualification({
        userId,
      });

      // const findApplications = await clientService.findApplicationsByUser({
      //   userId,
      // });

      // setHasApplied(findApplications.data.data.length > 0 ? true : false);
      // const currentData = findQualiResult.data.data;

      const findPreviousQualiResult =
        await clientService.findPreviousQualification({
          userId,
        });
      const currentPreviousData = findPreviousQualiResult.data.data;
      if (currentPreviousData) {
        setPq_schoolName(currentPreviousData.pq_schoolName);
        setPreviousHasCompletedText(currentPreviousData.pq_completed);
        setPq_completed(currentPreviousData.pq_completed);
        setPq_grade(currentPreviousData.pq_grade);
        setPreviousProgrameYearText(currentPreviousData.pq_programmeYear);
        setSelectedPreviousProgrammeYear(currentPreviousData.pq_programmeYear);
        setPreviousQualificationText(
          currentPreviousData.QualificationType.name
        );

        setSelectedPreviousQualification(
          currentPreviousData.QualificationType.id
        );
      }

      const qualificationResult = await clientService.qualificationTypes();

      let qualificationTypeData = qualificationResult.data.data.map((item) => {
        return {
          key: item.id,
          value: item.id,
          text: item.name,
        };
      });

      setQualification(qualificationTypeData);

      let yearData = years().map((item) => {
        return {
          key: item,
          value: item,
          text: item,
        };
      });

      setProgrammeYear(yearData);

      //Previous qualification states set below

      let previousQualificationTypeData = qualificationResult.data.data.map(
        (item) => {
          return {
            key: item.id,
            value: item.id,
            text: item.name,
          };
        }
      );

      setPreviousQualification(previousQualificationTypeData);

      let previousYearData = years().map((item) => {
        return {
          key: item,
          value: item,
          text: item,
        };
      });

      setPreviousProgrammeYear(previousYearData);
    })();
  }, []);
  const onChangeDropdown = async (e, data) => {
    const name = data.name;
    const value = data.value;

    if (name == "selectedQualification") {
      setSelectedQualification(value);
    }

    if (name == "selectedProgrammeYear") {
      setSelectedProgrammeYear(value);
    }

    if (name == "selectedPreviousQualification") {
      setSelectedPreviousQualification(value);
    }
    if (name == "pq_completed") {
      setPq_completed(value);
    }
    if (name == "selectedPreviousProgrammeYear") {
      setSelectedPreviousProgrammeYear(value);
    }
  };

  const save = async () => {
    //setLoading2(true);

    const result = clientService.savePreviousQualification({
      pq_programmeYear: selectedPreviousProgrammeYear,
      pq_completed,
      pq_grade,
      pq_schoolName,
      qualificationTypeId: selectedPreviousQualification,
      userId,
    });
    setLoading2(false);

    if (!result.error) {
      setErrorMessage(result.message);
      if (!hasApplied) {
        props.history.push(`/agent_highSchool/${userId}`);
      }
    } else {
      setErrorMessage(result.message);
    }

    window.scrollTo(500, 0);
  };
  const onChange = async (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name == "pq_grade") {
      setPq_grade(value);
    }
    if (name == "pq_schoolName") {
      setPq_schoolName(value);
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
                <CCardBody>
                  {isShowMessage ? (
                    <Message warning>
                      <Message.Content style={{ textAlign: "center" }}>
                        {errorMessage}
                      </Message.Content>
                    </Message>
                  ) : (
                    ""
                  )}

                  <PreviousQualification
                    onChangeDropdown={onChangeDropdown}
                    onChange={onChange}
                    loading={loading}
                    save={save}
                    schoolName={pq_schoolName}
                    grade={pq_grade}
                    hasCompleted={previousHasCompletedText}
                    programmeYear={previousProgrameYearText}
                    qualification={previousQualificationText}
                    isForAgent={true}
                    backLink={`/agent_highest_qualification/${userId}`}
                  />
                  <br />
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

export default AgentPreviousQualification;
