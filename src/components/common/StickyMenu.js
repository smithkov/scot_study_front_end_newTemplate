import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/stickyMenu.js";
import clientService from "../../services/clientService";
import Menu from "../widgets/menu.js";

function StickyMenu() {
  const [institutions, setInstitutions] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await clientService.institutions();
      setInstitutions(result.data.data);
      // window.addEventListener("scroll", () => {
      //   const stickyMenu = document.querySelector(".sticky-menu");

      //   if (window.scrollY > 160) {
      //     stickyMenu.classList.add("sticky");
      //   } else {
      //     stickyMenu.classList.remove("sticky");
      //   }
      // });
    })();
  }, []);

  return (
    <Styles>
      {/* Sticky Menu */}
      <section className="sticky-menu">
        <Container>
          <Row>
            <Col md="3">
              <div className="logo">
                <Link to={process.env.PUBLIC_URL + "/"}>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                    alt=""
                  />
                </Link>
              </div>
            </Col>
            <Col md="9">
              <Menu showBtn={true} />
            </Col>
          </Row>
        </Container>
      </section>
    </Styles>
  );
}

export default StickyMenu;
