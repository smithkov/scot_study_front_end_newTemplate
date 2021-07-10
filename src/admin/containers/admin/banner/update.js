import React, { useState, useEffect, lazy } from "react";
import { TheContent, AdminSidebar, TheFooter, TheHeader } from "../../index";
import clientService from "../../../services/clientService";
import Moment from "react-moment";
import { imageStyles, tinyApiKey } from "../../../utility/constants";
import { asyncLocalStorage, TOKEN, USER } from "../../../utility/global";
import { Editor } from "@tinymce/tinymce-react";
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

const WidgetsDropdown = lazy(() =>
  import("../../../views/widgets/WidgetsDropdown.js")
);

const BannerUpdate = (props) => {
  const [loading, setLoading] = useState(false);

  let [userId, setUserId] = useState("");
  let [title, setTitle] = useState("");
  let [id, setId] = useState("");
  let [url, setUrl] = useState("");
  let [bannerPreview, setBannerPreview] = useState("");

  const [isShowMessage, setIsShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      const bannerId = props.match.params.id;

      const findBannerResult = await clientService.findBannerById({
        id: bannerId,
      });

      const bannerData = findBannerResult.data.data;
      if (bannerData) {
        const { id, title, url } = bannerData;
        setId(id);
        setUrl(url);
        setTitle(title);
        setBannerPreview(url);
      }
    })();
  }, []);

  const bannerChangedHandler = (event) => {
    setUrl(event.target.files[0]);

    let reader = new FileReader();

    reader.onloadend = () => {
      setBannerPreview(reader.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  const onChange = async (e) => {
    const value = e.target.value;

    setUrl(value);
  };
  const update = async (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("url", url);

    const save = await clientService.saveBanner(formData, id);
    if (!save.data.error) {
      props.history.push("/banner_list");
    } else {
      setIsShowMessage(true);
      setErrorMessage("Could not be saved");
    }
    setLoading(false);
  };
  return (
    <div className="c-app c-default-layout">
      <AdminSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          {/* <TheContent /> */}
          <br />
          <Grid columns="equal">
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={8}>
              {isShowMessage ? (
                <Message warning>
                  <Message.Content>
                    <p style={{ textAlign: "center" }}>{errorMessage}</p>
                  </Message.Content>
                </Message>
              ) : (
                ""
              )}
              <>
                <Form onSubmit={update}>
                  <Form.Field required>
                    <label>Title </label>
                    <TextArea
                      onChange={onChange}
                      name="title"
                      value={title}
                      placeholder="Title"
                    />
                  </Form.Field>

                  <Form.Field>
                    <label>
                      {" "}
                      Banner (Dimension Width:1679px x Height:503px){" "}
                    </label>
                    <input type="file" onChange={bannerChangedHandler} />
                  </Form.Field>
                  <br />
                  <Image style={imageStyles(200)} src={bannerPreview} />

                  <hr />

                  <Button loading={loading} color="blue" type="submit">
                    Save
                  </Button>
                  <br />
                  <br />
                </Form>
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

export default BannerUpdate;
