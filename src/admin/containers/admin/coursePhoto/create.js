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

const CoursePhotoUpload = (props) => {
  const [loading, setLoading] = useState(false);

  let [userId, setUserId] = useState("");
  let [title, setTitle] = useState("");
  let [photoPreview, setPhotoPreview] = useState("");
  let [id, setId] = useState("");
  let [url, setUrl] = useState("");

  const [isShowMessage, setIsShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let [selectedFaculty, setSelectedFaculty] = useState("");
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    (async () => {
      const getUser = await asyncLocalStorage.getUser();
      const userId = getUser.id;
      setUserId(userId);

      const facultyResult = await clientService.faculties();
      let facultyData = facultyResult.data.data.map((item) => {
        return {
          key: item.id,
          value: item.id,
          text: item.name,
        };
      });
      setFaculties(facultyData);
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

  const onChangeDropdown = async (e, data) => {
    const value = data.value;

    setSelectedFaculty(value);
  };
  const update = async (e) => {
    if (selectedFaculty != "") {
      e.preventDefault();
      setLoading(true);
      let formData = new FormData();
      formData.append("facultyId", selectedFaculty);
      formData.append("url", url);
      formData.append("id", "");

      const save = await clientService.uploadCoursePhoto(formData);
      if (!save.data.error) {
        props.history.push("/course_photo_list");
      } else {
        setIsShowMessage(true);
        setErrorMessage("Could not be saved");
      }
      setLoading(false);
    } else {
      setIsShowMessage(true);
      setErrorMessage("Faculty is required!");
    }
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
                    <label>Faculty</label>
                    <Dropdown
                      required
                      fluid
                      selection
                      search
                      name="selectedFaculty"
                      label="Faculty"
                      placeholder={"Faculty"}
                      options={faculties}
                      onChange={onChangeDropdown}
                    />
                  </Form.Field>

                  <Form.Field>
                    <label>
                      {/* Banner (Dimension Width:1679px x Height:503px) */}
                    </label>
                    <input
                      name="photo"
                      type="file"
                      onChange={photoChangedHandler}
                    />
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

export default CoursePhotoUpload;
