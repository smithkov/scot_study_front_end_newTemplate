import React, { Component } from "react";
import Datas from "../../data/gallery/gallery-page.json";
import { Container, Row, Col } from "react-bootstrap";
import ModalImage from "react-modal-image";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Pagination from "./../../components/Pagination";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/gallery.js";
import clientService from "../../services/clientService";

class Gallery extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    galleries: [],
  };

  componentDidMount = async () => {
    const result = await clientService.findAllGalleries();
    this.setState({
      galleries: result.data.data,
    });
  };
  render() {
    return (
      <Styles>
        {/* Main Wrapper */}
        <div className="main-wrapper gallery-page">
          {/* Header 2 */}
          <HeaderTwo />

          {/* Breadcroumb */}
          <BreadcrumbBox title="Gallery" />

          {/* Gallery Area */}
          <section className="gallery-page-area">
            <Container>
              <Row>
                {this.state.galleries.map((item, i) => (
                  <Col lg="4" sm="6" key={i}>
                    <div className="gallery-box">
                      <ModalImage
                        small={`${item.url}`}
                        large={`${item.url}`}
                        alt=""
                      />
                    </div>
                  </Col>
                ))}

                {/* <Col md="12" className="text-center">
                  <Pagination />
                </Col> */}
              </Row>
            </Container>
          </section>

          {/* Footer 2 */}
          <FooterTwo />
        </div>
      </Styles>
    );
  }
}

export default Gallery;
