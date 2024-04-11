import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function FoodAdd() {
  return (
    <Container>
      <Row>
        <Col>
          <h2>음식 추가</h2>
          <Form>
            {/* <Form.Group as={Row}>
              <Form.Label column sm="3">일련번호</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group> */}
            <Form.Group as={Row}>
              <Form.Label column sm="3">음식 코드</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">음식 이름</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">mainFoodType</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">detailedFoodType</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">칼로리</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">단백질</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">지방</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group><Form.Group as={Row}>
              <Form.Label column sm="3">탄수화물</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">맛</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">주재료</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">부재료</Form.Label>
              <Col sm="9">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">요리방식</Form.Label>
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

export default FoodAdd;