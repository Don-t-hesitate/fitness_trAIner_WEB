import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function WorkoutAiVersion(props) {
  const [aiVerData, setAiVerData] = useState(null);
  const [aiData, setAiData] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchVerData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/ai/workout/${props.parentId}`);
        setAiVerData(response.data);
      } catch (error) {
        console.error('Error fetching ver data:', error);
      }
    };
    
    fetchVerData();
  }, []);

  useEffect(() => {
    const fetchAiData = async () => {
      try {
      const response = await axios.get('http://localhost:3001/api/exercise');
      setAiData(response.data);
      } catch (error) {
      console.error('Error fetching ai data:', error);
      }
    };
  
    fetchAiData();
  }, []);

  if (!aiVerData || !aiData) {
    return <div>Loading...</div>;
  }

  const handleRowClick = (aiId) => {
    // Navigate to the desired page with the ai ID as a parameter
    navigate(`/ai/workout/${props.parentId}/${aiId}`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>{aiData[props.parentId - 1].name + " 모델 관리"}</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>버전</th>
                <th>iteration</th>
                <th>depth</th>
                <th>learningRate</th>
                <th>적용 여부</th>
              </tr>
            </thead>
            <tbody>
              {aiVerData.map((ai, index) => (
                <tr key={ai.id}>
                  <td onClick={() => handleRowClick(ai.ver)}>{ai.ver}</td>
                  <td onClick={() => handleRowClick(ai.ver)}>{ai.iteration}</td>
                  <td onClick={() => handleRowClick(ai.ver)}>{ai.depth}</td>
                  <td onClick={() => handleRowClick(ai.ver)}>{ai.learningRate}</td>
                  <td><Form.Check /></td>
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
        <Col xs="auto" className="ml-auto">
          <Button variant="primary" size="sm">
            적용
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

function WorkoutAiList() {
  const [aiData, setAiData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAiData = async () => {
      try {
      const response = await axios.get('http://localhost:3001/api/exercise');
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
    navigate(`/ai/workout/${aiId}`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>운동 자세 분석 AI 목록</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>운동 이름</th>
              </tr>
            </thead>
            <tbody>
              {aiData.map((ai, index) => (
                <tr key={ai.id}  onClick={() => handleRowClick(ai.no)}>
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

function WorkoutAiManage({ parentId }) {
  console.log("id: " + parentId);

  if (parentId) {
    return(
      <WorkoutAiVersion parentId={ parentId }/>
    );
  } else {
    return (
      <WorkoutAiList />
    );
  }
}

export default WorkoutAiManage;