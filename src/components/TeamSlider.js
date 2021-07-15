import React, { Component } from "react";
import Datas from "../data/team/team-slider.json";
import { Container, Row, Col } from "react-bootstrap";
import Swiper from "react-id-swiper";
import { Styles } from "./styles/teamSlider.js";
import clientService from "../services/clientService";

class TeamSlider extends Component {
  state = {
    institutions: [],
    loading: true,
  };

  async componentDidMount() {
    const result = await clientService.institutionsLighter();

    this.setState({
      institutions: result.data.data,
      loading: false,
    });
  }
  render() {
    const { institutions, loading } = this.state;
    const settings = {
      slidesPerView: 4,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      spaceBetween: 30,
      watchSlidesVisibility: true,
      pagination: {
        el: ".slider-dot.text-center",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
      },
    };

    return (
      <Styles>
        {/* Team Slider */}
        <section className="team-member-area">
          <Container>
            <Row>
              <Col md="12">
                <div className="sec-title text-center">
                  <h4>{Datas.secTitle}</h4>
                </div>
              </Col>
              <Col md="12" className="team-slider">
                {loading ? (
                  ""
                ) : (
                  <Swiper {...settings}>
                    {institutions.map((item, i) => (
                      <div className="team-item" key={i}>
                        <img
                          style={{ height: 100 }}
                          src={item.banner}
                          alt=""
                          className="img-fluid"
                        />
                        <div className="img-content text-center">
                          <h5>{item.name}</h5>
                          <p>{``}</p>
                        </div>
                      </div>
                    ))}
                  </Swiper>
                )}
              </Col>
            </Row>
          </Container>
        </section>
      </Styles>
    );
  }
}

export default TeamSlider;
