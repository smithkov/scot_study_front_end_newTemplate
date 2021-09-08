import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/account.js";
import { Dropdown, Form, FormField, Input, Button } from "semantic-ui-react";
import { asyncLocalStorage, TOKEN, USER } from "../../utility/global";

import clientService from "../../services/clientService";

function Exchange(props) {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [unit, setUnit] = useState("1");
  const [result, setResult] = useState("");
  const [codes, setCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState("NGN");
  const [isPoundGotFocus, setIsPoundGotFocus] = useState(false);

  useEffect(() => {
    (async function () {
      const codes = await clientService.supportedCodes();
      const data = codes.data.supported_codes.map((data) => {
        return {
          key: "af",
          value: data[0],
          flag: data[0].substring(0, 2).toLowerCase(),
          text: data[1],
        };
      });
      setCodes(data);
      convert(unit, selectedCode);
    })();
  }, []);

  // const convertHandler = async (e) => {
  //   e.preventDefault();
  //   const converter = await clientService.currencyConverter({
  //     amount: unit,
  //     target: selectedCode,
  //   });
  // };
  const convert = async (value, selectedCode) => {
    const converter = await clientService.currencyConverter({
      amount: value,
      target: selectedCode,
    });

    setResult(converter.data.conversion_result);
  };

  const reverseConvert = async (value, selectedCode) => {
    const converter = await clientService.currencyConverter({
      amount: value,
      target: selectedCode,
    });

    setUnit(converter.data.conversion_result);
  };

  const onChange = async (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name == "unit") {
      setUnit(value);
      convert(value, selectedCode);
    } else if (name == "result") {
      setResult(value);
      reverseConvert(value, selectedCode);
    }
  };

  const onChangeDropDown = (e, data) => {
    const value = data.value;

    setSelectedCode(value);

    convert(unit, value);
  };
  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper login-page">
        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Currency Converter" />

        {/* Exchange Area */}
        <section className="login-area">
          <Container>
            <Row>
              <Col md="12">
                <div className="login-box">
                  <div className="login-title text-center">
                    <h3>Currency Converter</h3>
                  </div>

                  <Form>
                    <Form.Group widths="equal">
                      <Form.Field
                        pattern="([0-9]{1,3}).([0-9]{1,3})"
                        id="unit"
                        control={Input}
                        value={unit}
                        name="unit"
                        type="number"
                        min="1"
                        onChange={onChange}
                      />

                      <Form.Dropdown
                        placeholder="Select Currency"
                        fluid
                        search
                        selection
                        options={codes}
                        defaultValue={`NGN`}
                        onChange={onChangeDropDown}
                        name="selectedCode"
                      />
                    </Form.Group>
                    <Form.Group widths="equal">
                      <Form.Field
                        id="unit"
                        type="number"
                        min="1"
                        control={Input}
                        name="result"
                        value={result}
                        placeholder=""
                        onChange={onChange}
                      />
                      <Form.Dropdown
                        placeholder="Select Currency"
                        fluid
                        search
                        selection
                        options={[
                          {
                            key: "gb",
                            value: "GBP",
                            flag: "gb",
                            text: "Pound Sterling",
                          },
                        ]}
                        defaultValue={`GBP`}
                        onChange={onChangeDropDown}
                        name="selectedCode"
                      />
                    </Form.Group>
                  </Form>
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

export default Exchange;
