import React, { Component } from "react";
import Datas from "../data/testimonial/testimonial-slider.json";
import { Container, Row, Col } from "react-bootstrap";
import Swiper from "react-id-swiper";
import { Styles } from "./styles/testimonialSlider.js";
import clientService from "../services/clientService";
import { defaultImage } from "../utility/constants";

class TestimonialSlider extends Component {
  state = {
    testimonials: [],
    isLoading: true,
  };

  async componentDidMount() {
    const result = await clientService.findAllTestimonial();
    this.setState({ testimonials: result.data.data, isLoading: false });
  }
  render() {
    const { testimonials, isLoading } = this.state;

    const settings = {
      slidesPerView: 2,
      loop: false,
      speed: 18000,
      autoplay: {
        delay: 30000,
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
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 2,
        },
      },
    };

    return (
      <Styles>
        {/* Testimonial Slider */}
        <section
          className="testimonial-area"
          style={{
            backgroundImage: `url("https://www.hull.ac.uk/editor-assets/images/news/students-outside-student-central.xdd4bb125.jpg?q=85")`,
          }}
        >
          <Container>
            <Row>
              <Col md="12">
                <div className="sec-title text-center">
                  <h4>{Datas.secTitle}</h4>
                </div>
              </Col>
              <Col md="12" className="testimonial-slider">
                {isLoading ? (
                  ""
                ) : (
                  <>
                    {" "}
                    <Swiper {...settings}>
                      {testimonials.map((item, i) => (
                        <div className="slider-item" key={i}>
                          <div className="desc">
                            <h5>{item.title}</h5>
                            <p>{item.content}</p>
                          </div>
                          <div className="writer">
                            <img
                              src={`${item.url}`}
                              className="slider-image"
                              alt={defaultImage}
                            />
                            <h6>{item.firstname}</h6>
                            <p>Student</p>
                          </div>
                        </div>
                      ))}
                    </Swiper>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </section>
      </Styles>
    );
  }
}

export default TestimonialSlider;
