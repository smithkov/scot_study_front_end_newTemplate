import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";

import Footer from "../../components/Footer";
import { Styles } from "./styles/blog.js";
import clientService from "../../services/clientService";

class Institutions extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    institutions: [],
  };

  componentDidMount = async () => {
    const result = await clientService.institutions();
    this.setState({
      institutions: result.data.data,
    });
  };
  render() {
    const { institutions } = this.state;
    return (
      <Styles>
        {/* Main Wrapper */}
        <div className="main-wrapper blog-classic-page">
          {/* Header 2 */}
          <HeaderTwo />

          {/* Breadcroumb */}
          <BreadcrumbBox title="Institutions" />

          {/* Blog Classic */}
          <section className="blog-classic-area">
            <Container>
              <Row>
                <Col lg="9" md="8" sm="7">
                  {institutions.map((item, i) => (
                    <div className="blog-item" key={i}>
                      <div className="blog-img">
                        <Link to={``}>
                          <img src={item.banner} alt="" className="img-fluid" />
                        </Link>
                      </div>
                      <div className="blog-auth_date d-flex">
                        <div className="author-img d-flex">
                          <Link to={``}>
                            <img src={item.logo} alt="" />
                          </Link>
                          <p>
                            <Link to={``}>{item.name}</Link>
                          </p>
                        </div>
                        <div className="post-date">
                          <p>
                            <i class="fas fa-map-marker-alt"></i>{" "}
                            {item.City.name}
                          </p>
                        </div>
                        <div className="post-category">
                          <p>
                            <i class="fas fa-graduation-cap"></i>{" "}
                            {item.Courses.length} courses
                          </p>
                        </div>
                      </div>
                      <div className="blog-title">
                        <h5>
                          <Link to={``}>{item.sellingPoint}</Link>
                        </h5>
                      </div>
                    </div>
                  ))}
                </Col>
                <Col lg="3" md="4" sm="5">
                  {/* <BlogSidebar /> */}
                </Col>
              </Row>
            </Container>
          </section>

          {/* Footer 2 */}
          <Footer />
        </div>
      </Styles>
    );
  }
}

export default Institutions;
