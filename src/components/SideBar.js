import React from "react";
import { Button, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function SideBar() {
  return (
    <Nav className="flex-column justify-content-start">
      <LinkContainer to="/dashboard">
        <Nav.Link>대시보드</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/member">
        <Nav.Link>회원 관리</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/ai">
        <Nav.Link>AI 관리</Nav.Link>
      </LinkContainer>
    </Nav>
  );
}

export default SideBar;