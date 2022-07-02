import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";

import style from "../styles/CustomNavbar.module.css";

const CustomNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <Navbar variant="dark" expand="lg" className={style.navbar}>
        <Container fluid className="mx-4">
          <Navbar.Brand>
            <img
              src={require("../images/3.png")}
              height="36px"
              className="d-inline-block align-top"
              alt="Logo mi turno"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#link" className="mx-3 fs-5">
                Sucursales
              </Nav.Link>
              <Nav.Link href="/users" className="mx-3 fs-5">
                Usuarios
              </Nav.Link>
              <Nav.Link href="#link" className="mx-3 fs-5">
                Turnos
              </Nav.Link>
              <Nav.Link href="/myaccount" className="mx-3 fs-5">
                Mi Perfil
              </Nav.Link>
              <Nav.Link onClick={handleLogout} className="mx-3 fs-5">
                LOGOUT
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;