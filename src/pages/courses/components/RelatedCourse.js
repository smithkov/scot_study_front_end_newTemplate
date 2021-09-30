import React, { Component } from "react";
import Datas from "../../../data/course/popular.json";
import { Link } from "react-router-dom";
import { Styles } from "../styles/popularCourse.js";
import clientService from "../../../services/clientService";
import { myRoutes } from "../../../utility/constants";

class RelatedCourse extends Component {
  state = {
    relatedCourses: [],
  };

  componentDidMount = async () => {
    const result = await clientService.relatedCourses({
      facultyId: this.props.facultyId,
    });

    this.setState({
      relatedCourses: result.data.data,
    });
  };
  render() {
    const courses = this.state.relatedCourses;
    return (
      <Styles>
        {/* Popular Course */}
        <div className="popular-course">
          <h5>Related Courses</h5>

          <div className="popular-items">
            {courses.map((item) => (
              <div className="item-box d-flex" key={item.id}>
                <div className="item-img">
                  <Link to={myRoutes.courseDetail(item.id)}>
                    <img
                      src={item.CoursePhoto ? item.CoursePhoto.url : ""}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="item-content">
                  <p className="title">
                    <Link to={myRoutes.courseDetail(item.id)}>{item.name}</Link>
                  </p>

                  <p className="price">{item.fee}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Styles>
    );
  }
}

export default RelatedCourse;
