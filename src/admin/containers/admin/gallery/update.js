import React, { useState, useEffect, lazy } from "react";
import { TheContent, AdminSidebar, TheFooter, TheHeader } from "../../index";
import clientService from "../../../../services/clientService";
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

const GalleryUpdate = (props) => {
  const [loading, setLoading] = useState(false);

  let [userId, setUserId] = useState("");

  let [id, setId] = useState("");
  let [url, setUrl] = useState("");
  let [photoPreview, setPhotoPreview] = useState("");

  const [isShowMessage, setIsShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      const id = props.match.params.id;

      const findPhotoResult = await clientService.findGalleryById({
        id: id,
      });
    })();
  }, []);

  const photoChangedHandler = (event) => {
    setUrl(event.target.files[0]);

    let reader = new FileReader();

    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  const update = async (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("id", id);
    formData.append("url", url);

    const save = await clientService.uploadGallery(formData, id);
    if (!save.data.error) {
      props.history.push("/gallery_list");
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
                  <Form.Field>
                    <label>
                      {" "}
                      {/* Banner (Dimension Width:1679px x Height:503px){" "} */}
                    </label>
                    <input type="file" onChange={photoChangedHandler} />
                  </Form.Field>
                  <br />
                  <Image style={imageStyles(200)} src={photoPreview} />

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

export default GalleryUpdate;
