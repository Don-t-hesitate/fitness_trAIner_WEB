import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function WorkoutAiInfo({ parentId, subId }) {
  const [aiData, setAiData] = useState(null);
  const [aiData2, setAiData2] = useState(null);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    window.confirm("정말 삭제하시겠습니까?");
  };

  useEffect(() => {
    const fetchAiData = async () => {
      try {
        const response = await axios.get(`/api/ai/workout/${parentId}/${subId}`);
        setAiData(response.data);
      } catch (error) {
        console.error('Error fetching ai data:', error);
      }
    };

    fetchAiData();
    console.log(aiData);
  }, [parentId, subId]);

  useEffect(() => {
    const fetchAiData2 = async () => {
      try {
      const response = await axios.get('/api/exercise');
      setAiData2(response.data);
      } catch (error) {
      console.error('Error fetching ai data:', error);
      }
    };
  
    fetchAiData2();
  }, []);

  if (!aiData || !aiData2) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="3">운동 이름</Form.Label>
              <Col sm="9">
                <Form.Control value={aiData2[parentId - 1].name} disabled />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">버전</Form.Label>
              <Col sm="9">
                <Form.Control value={aiData.ver} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">iteration</Form.Label>
              <Col sm="9">
                <Form.Control value={aiData.iteration} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">depth</Form.Label>
              <Col sm="9">
                <Form.Control value={aiData.depth} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">learning rate</Form.Label>
              <Col sm="9">
                <Form.Control value={aiData.learningRate} />
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
            <div style={{fontWeight: "bold"}}>사용 데이터셋: 001-1-1-01-A2</div>
            <div style={{fontWeight: "bold"}}>업데이트 일시: 2024-04-01</div>
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

export default WorkoutAiInfo;