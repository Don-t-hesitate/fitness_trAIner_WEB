import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function FoodAiInfo({ foodAiId }) {
  const [aiData, setAiData] = useState(null);
  const navigate = useNavigate();
  console.log("id: " + foodAiId);

  const handleClick = (e) => {
    e.preventDefault();
    window.confirm("정말 삭제하시겠습니까?");
  };

  useEffect(() => {
      const fetchAiData = async () => {
        try {
          const response = await axios.get(`/api/ai/food/${foodAiId}`);
          setAiData(response.data);
        } catch (error) {
          console.error('Error fetching ai data:', error);
        }
      };
  
      fetchAiData();
      console.log(aiData);
    }, [foodAiId]);

    if (!aiData) {
      return <div>Loading...</div>;
    }

  return (
    <Container>
      <Row>
        <Col>
          <h2>음식 취향 분석 AI 상세</h2>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="3">모델 No.</Form.Label>
              <Col sm="9">
                <Form.Control value={aiData.no} disabled />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">모델 이름</Form.Label>
              <Col sm="9">
                <Form.Control value={aiData.name} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">학습률</Form.Label>
              <Col sm="9">
                <Form.Control value={"0.01"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">에포크 수</Form.Label>
              <Col sm="9">
                <Form.Control  value={"15"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">드롭아웃</Form.Label>
              <Col sm="9">
                <Form.Control value={"0.2"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">배치 사이즈</Form.Label>
              <Col sm="9">
                <Form.Control value={"64"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">버전</Form.Label>
              <Col sm="9">
                <Form.Control value={"1.0.0"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">사용 데이터 셋</Form.Label>
              <Col sm="9">
                <Form.Control value={"64"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">업데이트 일시</Form.Label>
              <Col sm="9">
                <Form.Control value={"2024-04-01 15:24:32"} />
              </Col>
            </Form.Group>

            {/* <Form.Group as={Row}>
              <Col sm={{ span: 9, offset: 3 }}>
                <Button variant="secondary" className="mr-3">변경내용 초기화</Button>
                <Button variant="secondary">과거 계약 조회</Button>
              </Col>
            </Form.Group> */}
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
            업데이트
          </Button>
          <Button variant="danger" size="sm" onClick={handleClick}>
            삭제
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default FoodAiInfo;