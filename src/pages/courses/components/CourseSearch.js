import React, { Component } from "react";
import { Styles } from "../styles/courseSearch.js";

class CourseSearch extends Component {
  render() {
    return (
      <Styles>
        {/* Course Search */}
        <div className="course-search">
          <h5>Search Course</h5>
          <form>
            <input
              type="text"
              name="search"
              placeholder="Search course by name"
            />
            <button type="button">
              <i className="las la-search"></i>
            </button>
          </form>
        </div>
      </Styles>
    );
  }
}

export default CourseSearch;
