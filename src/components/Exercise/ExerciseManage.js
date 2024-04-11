import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ExerciseManage() {
  const [exerciseData, setExerciseData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
      const response = await axios.get('http://localhost:3001/api/exercise');
      setExerciseData(response.data);
      } catch (error) {
      console.error('Error fetching exercise data:', error);
      }
    };
  
    fetchExerciseData();
  }, []);

  if (!exerciseData) {
    return <div>Loading...</div>;
  }

  const handleRowClick = (exerciseId) => {
    // Navigate to the desired page with the exercise ID as a parameter
    navigate(`/exercise/${exerciseId}`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>운동 카테고리 관리</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>번호</th>
                <th>운동 이름</th>
                <th>소모 칼로리</th>
              </tr>
            </thead>
            <tbody>
              {exerciseData.map((exercise, index) => (
                <tr key={exercise.no}  onClick={() => handleRowClick(exercise.no)}>
                  <td>{exercise.no}</td>
                  <td>{exercise.name}</td>
                  <td>{exercise.cal}</td>
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
          <Button variant="primary" size="sm" href="/exercise/add">
            추가
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ExerciseManage;