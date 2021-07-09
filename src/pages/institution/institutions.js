import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import PopularCourse from "../courses/components/PopularCourse";
import FooterTwo from "../../components/FooterTwo";
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
                <Col lg="12" md="11" sm="10">
                  {institutions.map((item, i) => (
                    <div className="blog-item" key={i}>
                      <div className="blog-img">
                        <a href={`institution/${item.id}`}>
                          <img src={item.banner} alt="" className="img-fluid" />
                        </a>
                      </div>
                      <div className="blog-auth_date d-flex">
                        <div className="author-img d-flex">
                          <Link to={`institution/${item.id}`}>
                            <img src={item.logo} alt="" />
                          </Link>
                          <p>
                            <a href={`institution/${item.id}`}>{item.name}</a>
                          </p>
                        </div>
                        <div className="post-date">
                          <p>
                            <i class="fas fa-map-marker-alt"></i>{" "}
                            {item.City.name}
                          </p>
                        </div>
                        <div className="post-date">
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
                {/* <Col lg="3" md="4" sm="5">
                  <PopularCourse />
                </Col> */}
              </Row>
            </Container>
          </section>

          {/* FooterTwo 2 */}
          <FooterTwo />
        </div>
      </Styles>
    );
  }
}

export default Institutions;
