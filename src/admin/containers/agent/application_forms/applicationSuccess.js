import React, { useState, useEffect, lazy } from "react";
import {
  TheContent,
  AdminSidebar,
  TheFooter,
  TheHeaderAgent,
} from "../../index";
import clientService from "../../../services/clientService";
import Moment from "react-moment";
import { imageStyles } from "../../../utility/constants";
import { asyncLocalStorage, TOKEN, USER } from "../../../utility/global";
import Loading from "../../../widgets/loading";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
} from "@coreui/react";
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
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import AgentSidebar from "../../../containers/AgentSidebar";
const WidgetsDropdown = lazy(() =>
  import("../../../views/widgets/WidgetsDropdown.js")
);

const AgentApplicationSuccess = (props) => {
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);

  const [isShowMessage, setIsShowMessage] = useState(false);

  let [userId, setUserId] = useState("");

  let [institutions, setInstitutions] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const userId = getUser.id;
      setUserId(userId);

      const institutionResult = await clientService.allInstitutions();
      setInstitutions(institutionResult.data.data);
      setHasData(true);
    })();
  }, []);

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
              <>
                <CCard accentColor="primary">
                  <CCardHeader>
                    <h4 style={{ textAlign: "center" }}>
                      Application Submission
                    </h4>
                  </CCardHeader>
                  <CCardBody>
                    <Message floating>
                      <h3 style={{ textAlign: "center" }}>
                        Application submission was successful{" "}
                      </h3>
                    </Message>
                    <hr></hr>
                    <Button
                      href="/agent_dashboard"
                      color="blue"
                      floated="left"
                      as="a"
                    >
                      Go to dashboard
                    </Button>{" "}
                    <Button
                      href="/agent_users"
                      color="blue"
                      floated="right"
                      as="a"
                    >
                      Users' list
                    </Button>
                  </CCardBody>
                </CCard>
              </>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default AgentApplicationSuccess;
