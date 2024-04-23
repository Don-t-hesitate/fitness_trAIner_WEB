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
          <Nav.Link>
            <span className="material-symbols-outlined" style={{verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>home</span>
            <span style={{verticalAlign: "middle"}}> 대시보드</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/user">
          <Nav.Link>
            <span className="material-symbols-outlined" style={{verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>people</span>
            <span style={{verticalAlign: "middle"}}> 회원 관리</span>
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>

      {/* 운동 데이터 관리 아코디언 */}
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="material-symbols-outlined" style={{verticalAlign: "middle", fontVariationSettings: "'FILL' 1", marginRight: "5px"}}>sports_gymnastics</span>
            <span style={{verticalAlign: "middle"}}> 운동 데이터 관리</span>
          </Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <LinkContainer to="/exercise/pose">
                <Nav.Link className="sub-menu">
                  <span className="material-symbols-outlined" style={{verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>detection_and_zone</span>
                  <span style={{verticalAlign: "middle"}}> 운동 자세 데이터 관리</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/exercise">
                <Nav.Link className="sub-menu">
                  <span className="material-symbols-outlined" style={{verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>exercise</span>
                  <span style={{verticalAlign: "middle"}}> 운동 카테고리 관리</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* 식품 데이터 관리 아코디언 */}
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="material-symbols-outlined" style={{verticalAlign: "middle", fontVariationSettings: "'FILL' 1", marginRight: "5px"}}>kitchen</span>
            <span style={{verticalAlign: "middle"}}> 식품 데이터 관리</span>
          </Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <LinkContainer to="/food">
                <Nav.Link className="sub-menu">
                  <span className="material-symbols-outlined" style={{verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>restaurant_menu</span>
                  <span style={{verticalAlign: "middle"}}> 식품 정보 데이터 관리</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/food">
                <Nav.Link className="sub-menu">
                  <span className="material-symbols-outlined" style={{verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>thumbs_up_down</span>
                  <span style={{verticalAlign: "middle"}}> 사용자 음식 선호도 데이터 관리</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* 운동 자세 분석 AI 관리 아코디언 */}
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="material-symbols-outlined" style={{verticalAlign: "middle", fontVariationSettings: "'FILL' 1", marginRight: "5px"}}>settings_accessibility</span>
            <span style={{verticalAlign: "middle"}}> 운동 자세 분석 AI 관리</span>
          </Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <LinkContainer to="/ai/workout/train">
                <Nav.Link className="sub-menu">
                  <span className="material-symbols-outlined" style={{verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                  <span style={{verticalAlign: "middle"}}> AI 학습</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/ai/workout">
                <Nav.Link className="sub-menu">
                  <span className="material-symbols-outlined" style={{verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>smart_toy</span>
                  <span style={{verticalAlign: "middle"}}> AI 모델 목록</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      
      {/* 음식 취향 분석 AI 관리 아코디언 */}
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="material-symbols-outlined" style={{verticalAlign: "middle", fontVariationSettings: "'FILL' 1", marginRight: "5px"}}>food_bank</span>
            <span style={{verticalAlign: "middle"}}> 음식 취향 분석 AI 관리</span>
          </Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <LinkContainer to="/ai/food/train">
                <Nav.Link className="sub-menu">
                  <span className="material-symbols-outlined" style={{verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                  <span style={{verticalAlign: "middle"}}> AI 학습</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/ai/food">
                <Nav.Link className="sub-menu">
                  <span className="material-symbols-outlined" style={{verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>smart_toy</span>
                  <span style={{verticalAlign: "middle"}}> AI 모델 관리</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Nav>
  );
}

export default SideBar;