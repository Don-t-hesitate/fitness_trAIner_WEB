import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function ExerciseInfo({ exerId }) {
    const [exerciseData, setExerciseData] = useState(null);
    const navigate = useNavigate();

    const handleClick = (e) => {
      e.preventDefault();
      window.confirm("정말 삭제하시겠습니까?");
    };

    useEffect(() => {
      const fetchExerciseData = async () => {
        try {
          const response = await axios.get(`/api/exercise/${exerId}`);
          setExerciseData(response.data);
        } catch (error) {
          console.error('Error fetching exercise data:', error);
        }
      };
  
      fetchExerciseData();
      console.log(exerciseData);
    }, [exerId]);

    if (!exerciseData) {
      return <div>Loading...</div>;
    }

    return (
      <Container>
        <Row>
          <Col>
            <div style={{ height: '300px', marginBottom: '20px' }}>
              {exerciseData.video ? (
                <div>
                  {/* 영상 플레이어 컴포넌트 또는 iframe 등을 사용하여 영상 표시 */}
                  <video src={exerciseData.video} controls style={{ width: '100%', height: '100%' }} />
                </div>
              ) : (
                <div style={{ border: '1px solid #ccc', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button variant="secondary">업로드하기</Button>
                </div>
              )}
            </div>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm="3">번호</Form.Label>
                <Col sm="9">
                  <Form.Control value={exerciseData.no} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">운동 이름</Form.Label>
                <Col sm="9">
                  <Form.Control value={exerciseData.name} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">소모 칼로리</Form.Label>
                <Col sm="9">
                  <Form.Control value={exerciseData.cal} />
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
              수정
            </Button>
            <Button variant="danger" size="sm" onClick={handleClick}>
              삭제
            </Button>
          </Col>
        </Row>
      </Container>
    );
}

export default ExerciseInfo;