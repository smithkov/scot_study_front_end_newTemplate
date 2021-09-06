import React, { useState, useEffect, lazy } from "react";
import { TheContent, AdminSidebar, TheFooter, TheHeader } from "../../index";
import clientService from "../../../../services/clientService";
import Moment from "react-moment";
import { imageStyles, tinyApiKey } from "../../../utility/constants";
import { asyncLocalStorage, TOKEN, USER } from "../../../utility/global";
import { defaultImage } from "../../../../utility/constants";
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

const CoursePhotoUpdate = (props) => {
  const [loading, setLoading] = useState(false);

  let [userId, setUserId] = useState("");
  let [title, setTitle] = useState("");

  let [content, setContent] = useState("");
  let [firstname, setFirstname] = useState("");
  let [id, setId] = useState("");
  let [url, setUrl] = useState("");
  let [photoPreview, setPhotoPreview] = useState("");

  const [isShowMessage, setIsShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      const id = props.match.params.id;

      const findTestimonialResult = await clientService.findTestimonialById({
        id: id,
      });

      const result = findTestimonialResult.data.data;
      if (result) {
        const { id, firstname, title, content, url } = result;
        setId(id);
        setUrl(url);
        setFirstname(firstname);
        setTitle(title);
        setContent(content);
        setPhotoPreview(url ? url : defaultImage);
      }
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

  const onChange = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "firstname") {
      setFirstname(value);
    } else if (name == "title") {
      setTitle(value);
    } else if (name == "content") {
      setContent(value);
    }
  };
  const update = async (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("id", id);
    formData.append("firstname", firstname);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("url", url);

    const save = await clientService.saveTestimonial(formData, id);
    if (!save.data.error) {
      props.history.push("/testimonial_list");
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
                    <input
                      maxlength="45"
                      name="title"
                      placeholder="Title"
                      required
                      value={title}
                      onChange={onChange}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Content </label>
                    <textarea
                      maxlength="2000"
                      name="content"
                      placeholder="Content"
                      required
                      value={content}
                      onChange={onChange}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>First Name </label>
                    <input
                      name="firstname"
                      placeholder="Firstname"
                      required
                      value={firstname}
                      onChange={onChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>
                      {" "}
                      <label>Photo (Dimension equal width and height)</label>
                    </label>
                    <input type="file" onChange={photoChangedHandler} />
                  </Form.Field>
                  <br />
                  <Image style={imageStyles(50, 50)} src={photoPreview} />

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

export default CoursePhotoUpdate;
