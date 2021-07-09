import React, { Component, useEffect, useState } from "react";
import Datas from "../data/course/slider.json";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Swiper from "react-id-swiper";
import { Styles } from "./styles/courseSlider.js";
import clientService from "../services/clientService";
import Loading from "../components/widgets/loading";

class CourseSlider extends Component {
  state = {
    faculties: [],
    isLoading: true,
  };
  componentDidMount = async () => {
    const result = await clientService.facultiesLight();

    this.setState({
      faculties: result.data.data,
      isLoading: false,
    });
  };
  render() {
    const { faculties } = this.state;
    const settings = {
      slidesPerView: 3,
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
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
      },
    };

    return (
      <Styles>
        {/* Course Slider */}
        <section
          style={{ backgroundColor: "#F6F9FF" }}
          className="course-slider-area"
        >
          {!this.state.isLoading ? (
            <Container>
              <Row>
                <Col md="12">
                  <div className="sec-title text-center">
                    <h4>Faculties</h4>
                  </div>
                </Col>
                <Col md="12" className="course-slider">
                  <Swiper {...settings}>
                    {faculties.map((item, i) => {
                      const photos = item.CoursePhotos;
                      const length = photos.length - 1;
                      const rand =
                        Math.floor(Math.random() * (length - 0 + 1)) + 0;

                      return (
                        <div className="course-item" key={i}>
                          <a href={`/faculty-courses/${item.id}`}>
                            <div
                              className="course-image"
                              style={{
                                backgroundImage: `url(${
                                  photos ? photos[rand].url : ""
                                })`,
                              }}
                            >
                              <div className="author-img d-flex">
                                <div className="img">
                                  <img src="" alt="" />
                                </div>
                                {/* <div className="title">
                              <p>{data.authorName}</p>
                              <span>{data.authorCourses}</span>
                            </div> */}
                              </div>
                              {/* <div className="course-price">
                            <p>{data.price}</p>
                          </div> */}
                            </div>
                          </a>
                          <div className="course-content">
                            <h6 className="heading">
                              <Link to="">{item.name}</Link>
                            </h6>
                            {/* <p className="desc">{data.courseDesc}</p> */}
                            {/* <div className="course-face d-flex justify-content-between">
                          <div className="duration">
                            <p>
                              <i className="las la-clock"></i>120
                            </p>
                          </div>
                          <div className="rating">
                            <ul className="list-unstyled list-inline">
                              <li className="list-inline-item">
                                <i className="las la-star"></i>
                              </li>
                              <li className="list-inline-item">
                                <i className="las la-star"></i>
                              </li>
                              <li className="list-inline-item">
                                <i className="las la-star"></i>
                              </li>
                              <li className="list-inline-item">
                                <i className="las la-star"></i>
                              </li>
                              <li className="list-inline-item">
                                <i className="las la-star-half-alt"></i>
                              </li>
                              <li className="list-inline-item">(4.5)</li>
                            </ul>
                          </div>
                          <div className="student">
                            <p>
                              <i className="las la-chair"></i>60
                            </p>
                          </div>
                        </div>
                       */}
                          </div>
                        </div>
                      );
                    })}
                  </Swiper>
                </Col>
              </Row>
            </Container>
          ) : (
            ""
          )}
        </section>
      </Styles>
    );
  }
}

export default CourseSlider;
