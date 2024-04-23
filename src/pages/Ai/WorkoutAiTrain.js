import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function WorkoutAiTrain() {
  return (
    <Container>
      <Row>
        <Col>
          <h2>운동 자세 분석 AI 학습</h2>
          <Form>
            {/* <Form.Group as={Row}>
              <Form.Label column sm="3">일련번호</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group> */}
            <Form.Group as={Row}>
              <Form.Label column sm="3">운동 자세 데이터 선택</Form.Label>
              <Col sm="9">
              <Form.Select aria-label="Default select example">
                <option value="1">001-1-1-01</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">모델 이름</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">버전</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">하이퍼 파라미터</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row> 
      <Row className="align-items-center">
          <Col>
            <div>
            </div>
          </Col>
          <Col xs="auto" className="ml-auto">
            <Button variant="primary" size="sm" >
              학습
            </Button>
          </Col>
        </Row>
    </Container>
  );
}

export default WorkoutAiTrain;