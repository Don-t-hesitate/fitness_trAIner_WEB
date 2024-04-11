import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function FoodAiManage() {
  const [aiData, setAiData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAiData = async () => {
      try {
      const response = await axios.get('http://localhost:3001/api/ai/food');
      setAiData(response.data);
      } catch (error) {
      console.error('Error fetching ai data:', error);
      }
    };
  
    fetchAiData();
  }, []);

  if (!aiData) {
    return <div>Loading...</div>;
  }

  const handleRowClick = (aiId) => {
    // Navigate to the desired page with the ai ID as a parameter
    navigate(`/ai/food/${aiId}`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>음식 취향 분석 AI 관리</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>모델 이름</th>
              </tr>
            </thead>
            <tbody>
              {aiData.map((ai, index) => (
                <tr key={ai.no}  onClick={() => handleRowClick(ai.no)}>
                  <td>{index + 1}</td>
                  <td>{ai.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col>
          <div>
            {/* 페이지 번호 컴포넌트 또는 엘리먼트 추가 */}
            <span style={{color: 'blue', fontWeight: 'bold', textDecoration: "underline"}}>1</span> <span> 2 3 4 5</span>
          </div>
        </Col>
        {/* <Col xs="auto" className="ml-auto">
          <Button variant="primary" size="sm">
            추가
          </Button>
        </Col> */}
      </Row>
    </Container>
  );
}

export default FoodAiManage;