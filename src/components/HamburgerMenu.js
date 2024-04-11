import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Offcanvas, Button, Accordion } from 'react-bootstrap';
import './HamburgerMenu.css';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {
  const [show, setShow] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" expand="sm" className="justify-content-between custom-navbar">
        <Navbar.Brand href="/dashboard"><img src='/logo_real.png' ></img>관리자 페이지</Navbar.Brand>
        {/* <Button variant="outline-dark" onClick={handleShow}>
          <span className="navbar-toggler-icon"></span>
        </Button> */}
        <Button style={{margin: "10px"}} onClick={() => {logout(); navigate('/');}}>로그아웃</Button>
      </Navbar>

      {/* <Offcanvas show={show} onHide={handleClose} placement="end" className="offcanvas-slide">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
          
        </Offcanvas.Header>
        <Button style={{width: '30%', position: 'relative', left: '35%'}}>로그아웃</Button>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link className="custom-nav-link custom-button" href="/dashboard">대시보드</Nav.Link>
            <Nav.Link className="custom-nav-link custom-button" href="/member">회원 관리</Nav.Link>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header className="custom-accordion-header">운동 데이터 관리</Accordion.Header>
                <Accordion.Body className="custom-accordion">
                  <Nav className="flex-column">
                    <Nav.Link className="custom-nav-link" href="/exercise">AI용 운동 자세 데이터 관리</Nav.Link>
                    <Nav.Link className="custom-nav-link" href="/food">운동 카테고리 관리</Nav.Link>
                  </Nav>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header className="custom-accordion-header">식품 데이터 관리</Accordion.Header>
                <Accordion.Body className="custom-accordion">
                  <Nav className="flex-column">
                    <Nav.Link className="custom-nav-link" href="/exercise">식품 정보 데이터 관리</Nav.Link>
                    <Nav.Link className="custom-nav-link" href="/food">사용자 선호 음식 데이터 관리</Nav.Link>
                  </Nav>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header className="custom-accordion-header">음식 취향 분석 AI 관리</Accordion.Header>
                <Accordion.Body className="custom-accordion">
                  <Nav className="flex-column">
                    <Nav.Link className="custom-nav-link" href="/exercise">AI 학습</Nav.Link>
                    <Nav.Link className="custom-nav-link" href="/food">AI 모델 관리</Nav.Link>
                  </Nav>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header className="custom-accordion-header">운동 자세 분석 AI 관리</Accordion.Header>
                <Accordion.Body className="custom-accordion">
                  <Nav className="flex-column">
                    <Nav.Link className="custom-nav-link" href="/exercise">AI 학습</Nav.Link>
                    <Nav.Link className="custom-nav-link" href="/food">AI 모델 목록</Nav.Link>
                  </Nav>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas> */}

      
    </>
  );
};

export default HamburgerMenu;