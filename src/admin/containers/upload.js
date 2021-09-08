import React, { Component } from "react";
//import UploadService from "../services/upload-files.service";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import { asyncLocalStorage, TOKEN, USER } from "../utility/global";
import clientService from "../../services/clientService";
import { CCard, CCardBody, CCardFooter, CCardHeader } from "@coreui/react";
import { years } from "../utility/constants";
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

export default class UploadDoc extends Component {
  constructor(props) {
    super(props);
    this.selectFiles = this.selectFiles.bind(this);
    this.upload = this.upload.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);

    this.state = {
      selectedFiles: undefined,
      progressInfos: [],
      message: [],
      userId: "",
      fileInfos: [],
      name: "",
    };
  }

  async componentDidMount() {
    const getUser = await asyncLocalStorage.getUser();
    const userId = getUser.id;
    this.setState({
      userId,
    });
    clientService.findUserDocuments({ userId }).then((response) => {
      this.setState({
        fileInfos: response.data.data,
      });
    });
  }

  selectFiles(event) {
    this.setState({
      progressInfos: [],
      selectedFiles: event.target.files,
    });
  }

  upload(idx, file) {
    let _progressInfos = [...this.state.progressInfos];
    const { userId, name } = this.state;
    clientService
      .uploadDocument(file, userId, name, (event) => {
        _progressInfos[idx].percentage = Math.round(
          (100 * event.loaded) / event.total
        );
        this.setState({
          _progressInfos,
        });
      })
      .then((response) => {
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            "Uploaded the file successfully: " + file.name,
          ];
          return {
            message: nextMessage,
          };
        });

        return clientService.findUserDocuments({
          userId: this.state.userId,
        });
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data.data,
          name: "",
        });
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            "Could not upload the file: " + file.name,
          ];
          return {
            progressInfos: _progressInfos,
            message: nextMessage,
          };
        });
      });
  }
  onChangeHandle = (e) => {
    const value = e.target.value;

    this.setState({ name: value });
  };
  nextHandle = async (e) => {
    const checkIfUploadedDocs = await clientService.findUserDocuments({
      userId: this.state.userId,
    });
    if (checkIfUploadedDocs.data.data.length > 0) {
      this.props.history.push("/application");
    } else {
      alert("Please upload your documents");
    }
  };
  uploadFiles() {
    if (this.state.name != "") {
      const selectedFiles = this.state.selectedFiles;

      let _progressInfos = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
      }

      this.setState(
        {
          progressInfos: _progressInfos,
          message: [],
        },
        () => {
          for (let i = 0; i < selectedFiles.length; i++) {
            this.upload(i, selectedFiles[i]);
          }
        }
      );
    } else {
      alert("Document's name is required!");
    }
  }

  render() {
    const { selectedFiles, progressInfos, message, fileInfos, name } =
      this.state;

    return (
      <div className="c-app c-default-layout">
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            {/* <TheContent /> */}
            <br />
            <Grid columns="equal">
              <Grid.Column width={1}></Grid.Column>
              <Grid.Column width={14}>
                <CCard borderColor="primary">
                  <CCardHeader>
                    <h4>Upload Documents (Image or PDF)</h4>
                  </CCardHeader>
                  <CCardBody>
                    <div>
                      {progressInfos &&
                        progressInfos.map((progressInfo, index) => (
                          <div className="mb-2" key={index}>
                            <span>{progressInfo.fileName}</span>
                            <div className="progress">
                              <div
                                className="progress-bar progress-bar-info"
                                role="progressbar"
                                aria-valuenow={progressInfo.percentage}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: progressInfo.percentage + "%" }}
                              >
                                {progressInfo.percentage}%
                              </div>
                            </div>
                          </div>
                        ))}

                      <div className="row my-3">
                        <div className="col-8">
                          <input
                            name="name"
                            value={name}
                            placeholder="Title of document"
                            required
                            onChange={this.onChangeHandle}
                          />
                          <label className="btn btn-default p-0">
                            <input
                              type="file"
                              multiple
                              onChange={this.selectFiles}
                            />
                          </label>
                        </div>

                        <div className="col-4">
                          <button
                            onClick={this.uploadFiles}
                            className="btn btn-success btn-sm"
                            disabled={!selectedFiles}
                          >
                            Upload
                          </button>
                        </div>
                      </div>

                      {message.length > 0 && (
                        <div className="alert alert-secondary" role="alert">
                          <ul>
                            {message.map((item, i) => {
                              return <li key={i}>{item}</li>;
                            })}
                          </ul>
                        </div>
                      )}

                      <div className="card">
                        <div className="card-header">List of Files</div>
                        <ul className="list-group list-group-flush">
                          {fileInfos &&
                            fileInfos.map((file, index) => (
                              <li className="list-group-item" key={index}>
                                <a href={file.url}>{file.name}</a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                    <Grid>
                      <Grid.Column floated="left" width={3}>
                        <Button as="a" href="/visa_history">
                          <Icon name="backward" /> Back
                        </Button>
                      </Grid.Column>
                      <Grid.Column floated="right" width={4}>
                        <Button onClick={this.nextHandle} color="blue">
                          <Icon name="forward" /> Proceed to application
                        </Button>
                      </Grid.Column>
                    </Grid>
                  </CCardBody>
                  <hr />
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
  }
}
