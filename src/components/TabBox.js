import React, { Component } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { Styles } from "./styles/tabBox.js";
import { Styles2 } from "./styles/teamStyle.js";
import { Link } from "react-router-dom";
import Datas from "../data/instructor/instructor.json";
import TeamSlider from "../components/TeamSlider";

class TabBox extends Component {
  render() {
    return (
      <Styles>
        {/* Tab Box Area */}
        <section className="tab-section">
          <Container>
            <Tab.Container defaultActiveKey="why">
              <Row>
                <Col lg="3" md="4">
                  <Nav className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="why">
                        <i className="las la-arrow-right"></i> About Us
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="mission">
                        <i className="las la-arrow-right"></i> Why Choose Us
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="vision">
                        <i className="las la-arrow-right"></i> About Scotland
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="team">
                        <i className="las la-arrow-right"></i> Meet the team
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col lg="9" md="8">
                  <Tab.Content>
                    <Tab.Pane eventKey="why">
                      <h4 className="tab-title">About Us</h4>
                      <p className="tab-desc">
                        Scotia-World is an innovative business venture set-up to
                        help international students with intentions of studying
                        and living in Scotland achieve their dreams through a
                        seamless-technological process.
                      </p>
                      <p className="tab-desc">
                        We are committed to helping international students
                        choose perfect courses to suit their careers, as well as
                        providing a range of top ranked academic institutions in
                        Scotland to put them on a right path. We are associated
                        with the best universities in Scotland to help secure
                        admission easily and monitor your enrolment process
                        through our seamless technology.
                      </p>
                      <p className="tab-desc">
                        Scotia-Study is a Mobile app designed to provide you
                        with relevant information about Scotland High Education
                        (HE) and to give you the platform to apply to any
                        Scottish institutions of your choice, monitor your
                        application while waiting for decisions, step-by-step
                        enrolment progression, visa application guidance and
                        processing, and pre-departure briefing from your mobile
                        phones at your convenience without any charges.
                      </p>
                      <p className="tab-desc">
                        With the privilege of having access to join our
                        international students network across all institutions
                        in Scotland, we can guarantee home-away-from-home
                        experience throughout your study in Scottish
                        territories. Moreover, combining our professional
                        experience of over a decade in recruitment and
                        counselling, with our seamless Mobile app for
                        recruitment- we can guarantee smooth process and
                        experience towards your enrolment. In addition, our
                        staff are committed to helping students throughout their
                        student journey.
                      </p>
                      <p className="tab-desc">
                        We also arrange tours to Scotland territories for
                        tourists from West Africa for summer, events and during
                        festive seasons. This is prepared to help tourists
                        experience and understand Scottish cultures, heritage,
                        history and environment.
                      </p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="mission">
                      <h4 className="tab-title">Why Choose Us</h4>
                      <p className="tab-desc">
                        Our business directors and staff are alumni of
                        prestigious universities in Scotland. Therefore, our
                        services are embedded in Scottish educational system,
                        culture and heritage as well as working closely with all
                        Scottish institutions in order to make sure
                        international students feel warmly accepted into
                        Scottish environment. Our Mobile app is designed through
                        our first-hand experience in providing solutions to
                        international students’ concerns in terms of application
                        for admission, acceptance, visa application,
                        pre-departure as well as enrolment.
                      </p>
                      <p className="tab-desc">
                        We understand the challenges international students
                        faced in settling down in a new environment and the feel
                        of loneliness when away from home, and that is why we
                        are providing ‘everything’ necessary for students to
                        settle-in into the new life in Scotland with ease and
                        without any charges. We are determined to create an easy
                        and awesome experience for our the international
                        students from start to finish. Our Mobile app will help
                        students experience a seamless journey from applying
                        from their various homes to beginning a new life in
                        Scotland just by the touch of a button.
                      </p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="vision">
                      <h4 className="tab-title">About Scotland</h4>
                      <p className="tab-desc">
                        Ancient Scotland was made up of four separate groups:
                        Angles, Britons, Picts and Gaels (also known as Scoti).
                        In 1967, the drilling of the first North Sea oil well
                        was considered a major industrial achievement of the
                        time, creating a huge supporting industry in Scotland
                        and giving the whole of UK access to oil made at home
                        for the first time. Moreover, films like Braveheart and
                        Trainspotting helped to establish Scotland as a cultural
                        powerhouse; for example, J.K. Rowling wrote the global
                        phenomenon ‘Harry Potter’ in Edinburgh. The scientists
                        that successfully cloned the first mammal from an adult
                        cell, Dolly the Sheep were from the Scotland. John
                        Napier was the inventor of logarithms and the decimal
                        point, to mention few prominent from Scotland.
                      </p>
                      <p className="tab-desc">
                        Scotland is a country located up north of United
                        Kingdom. Scotland comprises of seven cities; Aberdeen,
                        Dundee, Edinburgh (the capital), Glasgow, Inverness,
                        Perth and Stirling. Its nature is impressive, the
                        history rich and many other aspects of Scottish life are
                        quite fascinating and unique. Living in Scotland will
                        give you the opportunities to find some more practical
                        information such as facts about Scotland, culture and
                        politics, whisky production and distilleries (well known
                        for that), our dynamic weather, webcams in Scotland and
                        many other aspects about daily life in Scotland which
                        you will find both interesting and handy.
                      </p>
                      <p className="tab-desc">
                        Visiting one of the seven cities in Scotland should
                        really be part of everyone’s itinerary when holidaying
                        here. There is a wealth of culture, historic buildings,
                        beautiful squares, castles, museums, restaurants and
                        other fascinating attractions to be found in all of our
                        cities. Edinburgh might top the charts if we talk
                        visitor numbers but Glasgow, Stirling and the others all
                        played their own significant role in history, have their
                        own unique identities and they all have many attractions
                        on offer.
                      </p>
                      <p className="tab-desc">
                        The Scottish education system is distinctly different
                        from those in the other countries of the United Kingdom.
                        In 2014, research by the Office for National Statistics
                        found that Scotland was the most highly educated country
                        in Europe and among the most well-educated in the world
                        in terms of tertiary education attainment.
                        Qualifications at the secondary school and
                        post-secondary (further education) level are provided by
                        the Scottish Qualifications Authority, which is the
                        national awarding and accrediting body in Scotland. Post
                        study permit (Scottish Talent Hunt) was initiated in
                        Scotland with the aim of allowing international students
                        to stay back after studies in order to develop their
                        skills and knowledge, before it was expanded to other
                        parts of the United Kingdom and was later scrapped off.
                      </p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="team">
                      <h4 className="tab-title">Meet the team</h4>
                      <Styles2>
                        <div className="main-wrapper instructor-page">
                          <section className="instructor-area">
                            <Container>
                              <Row>
                                {Datas.map((data, i) => (
                                  <Col lg="4" md="4" sm="6" key={i}>
                                    <div className="instructor-item">
                                      <img
                                        src={`/images/team/${data.personImage}`}
                                        alt=""
                                        className="img-fluid"
                                      />

                                      <div
                                        style={{ height: 100 }}
                                        className="img-content text-center"
                                      >
                                        <h5>{data.personName}</h5>
                                        <p>{data.personTitle}</p>
                                      </div>
                                    </div>
                                  </Col>
                                ))}
                              </Row>
                            </Container>
                          </section>
                        </div>
                      </Styles2>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </section>
      </Styles>
    );
  }
}

export default TabBox;
