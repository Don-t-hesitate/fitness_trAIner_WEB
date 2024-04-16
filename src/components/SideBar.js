import React from "react";
import { Nav, Accordion } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './SideBar.css';

function SideBar() {
  return (
    <Nav className="flex-column sidebar">
      {/* 대시보드와 회원 관리 링크 */}
      <Nav.Item>
        <LinkContainer to="/dashboard">
          <Nav.Link>대시보드</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/user">
          <Nav.Link>회원 관리</Nav.Link>
        </LinkContainer>
      </Nav.Item>

      {/* 운동 데이터 관리 아코디언 */}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>운동 데이터 관리</Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <LinkContainer to="/exercise/pose">
                <Nav.Link className="sub-menu">AI용 운동 자세 데이터 관리</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/exercise">
                <Nav.Link className="sub-menu">운동 카테고리 관리</Nav.Link>
              </LinkContainer>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* 식품 데이터 관리 아코디언 */}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>식품 데이터 관리</Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <LinkContainer to="/food">
                <Nav.Link className="sub-menu">식품 정보 데이터 관리</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/food">
                <Nav.Link className="sub-menu">사용자 선호 음식 데이터 관리</Nav.Link>
              </LinkContainer>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* 음식 취향 분석 AI 관리 아코디언 */}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>음식 취향 분석 AI 관리</Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <LinkContainer to="/ai/food/train">
                <Nav.Link className="sub-menu">AI 학습</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/ai/food">
                <Nav.Link className="sub-menu">AI 모델 관리</Nav.Link>
              </LinkContainer>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* 운동 자세 분석 AI 관리 아코디언 */}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>운동 자세 분석 AI 관리</Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <LinkContainer to="/ai/workout/train">
                <Nav.Link className="sub-menu">AI 학습</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/ai/workout">
                <Nav.Link className="sub-menu">AI 모델 목록</Nav.Link>
              </LinkContainer>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Nav>
  );
}

export default SideBar;