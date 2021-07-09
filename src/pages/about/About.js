import React, { Component } from "react";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import AboutUs from "../../components/AboutUs";
import IconBox from "../../components/IconBox";
import TabBox from "./../../components/TabBox";
import TestimonialSlider from "../../components/TestimonialSlider";
import FaqEvent from "../../components/FaqEvent";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/about.js";

class About extends Component {
  render() {
    return (
      <Styles>
        {/* Main Wrapper */}
        <div className="main-wrapper about-page">
          {/* Header 2 */}
          <HeaderTwo />

          {/* Breadcroumb */}
          <BreadcrumbBox title="About Us" />

          {/* Tab Section */}
          <TabBox />

          {/* FooterTwo 2 */}
          <FooterTwo />
        </div>
      </Styles>
    );
  }
}

export default About;
