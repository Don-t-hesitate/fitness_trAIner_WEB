import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function ExerciseAdd() {
  return (
    <Container>
      <Row>
        <Col>
          <h2>운동 카테고리 추가</h2>
          <div style={{ height: '300px', marginBottom: '20px' }}>
            <div style={{ border: '1px solid #ccc', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button variant="secondary">업로드하기</Button>
            </div>
          </div>
          <Form>
            {/* <Form.Group as={Row}>
              <Form.Label column sm="3">일련번호</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group> */}
            <Form.Group as={Row}>
              <Form.Label column sm="3">운동 이름</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">소모 칼로리</Form.Label>
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
              추가
            </Button>
          </Col>
        </Row>
    </Container>
  );
}

export default ExerciseAdd;