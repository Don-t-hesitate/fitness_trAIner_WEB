import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function ExercisePoseAdd() {
  return (
    <Container>
      <Row>
        <Col>
          <h2>운동 자세 데이터 추가</h2>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="3">일련번호</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">운동 이름</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">상태</Form.Label>
              <Col sm="9">
                <Form.Control style={{width: '100%', height: '200px', whiteSpace: 'pre-wrap'}} placeholder={`예) {
"condition": "팔꿈치 위치 고정",
"value": false
}, { "condition": "손목의 중립", ...
`} />
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
              추가
            </Button>
          </Col>
        </Row>
    </Container>
  );
}

export default ExercisePoseAdd;