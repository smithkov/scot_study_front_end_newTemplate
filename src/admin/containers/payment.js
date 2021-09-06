import React, { useState, useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import clientService from "../../services/clientService";
import { asyncLocalStorage, roles } from "../../utility/global";
import { Link, Redirect } from "react-router-dom";

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CFooter,
  CAlert,
} from "@coreui/react";

import { years } from "../utility/constants";
import { Dropdown, Button, Grid, Form, TextArea } from "semantic-ui-react";
const Payment = (props) => {
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [other, setOther] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [hasOther, setHasOther] = useState(false);
  const [purposes, setPurposes] = useState([]);
  const [paymentPurposeLabel, setPaymentPurposeLabel] = useState("");

  const otherPurposeId = "4375e178-416c-46c7-b654-85039636b617";

  useEffect(() => {
    (async () => {
      const purposeResult = await clientService.findAllPaymentPurpose();

      let purposeData = purposeResult.data.data.map((item) => {
        return {
          key: item.id,
          value: item.id,
          text: item.name,
        };
      });

      setPurposes(purposeData);
    })();
  }, []);

  const onChange = (e) => {
    const amount = parseFloat(e.target.value).toFixed(2);
    if (amount > 0) setAmount(amount);
  };

  const onChangeOther = (e) => {
    setOther(e.target.value);
  };

  const onChangeDropdown = async (e, data) => {
    const value = data.value;
    const text = data.options.find((x) => x.value == value);
    setPaymentPurposeLabel(text.text);
    if (value == otherPurposeId) setHasOther(true);
    else setHasOther(false);
    setSelectedPurpose(value);
  };
  const payment = async () => {
    if (selectedPurpose) {
      if (hasOther && other == "") {
        alert("Other payment purposes is required once you select 'Other'");
      } else {
        const getUser = await asyncLocalStorage.getUser();
        const userId = getUser.id;
        setLoading(true);
        const pay = await clientService.makePayment({
          amount,
          userId,
          paymentPurposeId: selectedPurpose,
          other,
          hasOther,
        });
        setLoading(false);
        const { session, refId } = pay.data;
        //storing paymentRefId in localstorage for updating payment later
        await asyncLocalStorage.setPaymentKey(refId);
        window.location.href = `${session}`;
      }
    } else {
      alert("Please select payment purpose");
    }
  };
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          {/* <TheContent /> */}
          <br />

          <Grid stackable columns="equal">
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={9}>
              <CCard borderColor="primary">
                <CCardHeader>
                  <h4>Visa Payment</h4>
                </CCardHeader>
                <CCardBody>
                  <CAlert color="info">
                    PLEASE CHECK ALL INFORMATION IS CORRECT BEFORE PROCEEDING TO
                    PAYMENT
                  </CAlert>
                  <Form onSubmit={payment}>
                    <Form.Field required>
                      <label>Amount</label>
                      <input
                        name="amount"
                        placeholder="Amount"
                        required
                        type="number"
                        min="10"
                        onChange={onChange}
                      />
                    </Form.Field>

                    <Form.Field required>
                      <label>Payment Purpose</label>
                      <Dropdown
                        required
                        fluid
                        selection
                        name="selectedPurpose"
                        label="Payment Purpose"
                        placeholder={"Payment purpose"}
                        options={purposes}
                        onChange={onChangeDropdown}
                      />
                    </Form.Field>

                    {hasOther ? (
                      <Form.Field required>
                        <label>Other Purposes</label>
                        <TextArea
                          name="other"
                          onChange={onChangeOther}
                          rows={2}
                          placeholder="Specify other payment purposes"
                        />
                      </Form.Field>
                    ) : (
                      ""
                    )}

                    <hr />
                    <Button
                      disabled={loading}
                      loading={loading}
                      color="blue"
                      type="submit"
                    >
                      Pay now
                    </Button>
                  </Form>
                  <br />
                </CCardBody>
                <CFooter></CFooter>
              </CCard>
            </Grid.Column>
            <Grid.Column width="5">
              <CCard>
                <CCardHeader>
                  <h4>Payment Summary</h4>
                </CCardHeader>
                <CCardBody>
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr key={3}>
                        <td>
                          <strong>Payment Purpose:</strong>
                        </td>
                        <td>{paymentPurposeLabel || "Yet to be selected"}</td>
                      </tr>
                      <tr key={1}>
                        <td>
                          <strong>
                            <h5>Total Sum:</h5>
                          </strong>
                        </td>
                        <td>
                          <h5>£{amount || 0.0}</h5>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CCardBody>
                <CFooter>
                  <p style={{ color: "blue" }}>
                    * You will receive an email receipt
                  </p>
                </CFooter>
                <img src="/images/SecurePayment.png" />
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

export default Payment;
