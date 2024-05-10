import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Stack } from "react-bootstrap";
import UploadBox from "../../components/UploadBox";

function ExerciseAdd() {
  const [exerciseName, setExerciseName] = useState(''); // 운동 이름을 저장할 상태
  const [perKcal, setPerKcal] = useState(''); // 운동 소모 칼로리를 저장할 상태
  const [exerciseType, setExerciseType] = useState(''); // 운동 타입을 저장할 상태
  const [formData, setFormData] = useState(null); // 운동 영상 URL을 저장할 상태
  
  // 숫자만 입력 가능하도록 하는 함수의 에러용 상태
  const [error, setError] = useState(null);

  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();
  
  // 파일 업로드 함수
  const handleFileUpload = (data) => {
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        exerciseName,
        exerciseType,
        perKcal
      };
  
      const response = await axios.post(process.env.REACT_APP_API_URL + `/exercises`, data);

      // response 객체와 response.data 객체가 존재하는지 확인
      if (response && response.data) {
        if (response.data.success) {
          if (formData) {
            console.log("uploadFile: ", formData.get('file'));
            const videoResponse = await axios.post(
              process.env.REACT_APP_API_URL + `/exercises/video/${exerciseName}`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );
            console.log("Video upload response: ", videoResponse);
            // 비디오 업로드 성공 시 추가 작업 수행 (예: 비디오 URL 저장)
          }
          console.log("?response: ", response);
          alert("운동 추가 성공: ", response.data.message);
          navigate('/exercise');
        } else {
          alert('운동 추가 실패: ' + response.data.message);
        }
      } else {
        // response 객체나 response.data 객체가 없는 경우 처리
        alert('서버 응답 오류: ' + response.data.message);
      }
    } catch (error) {
      console.log("error: ", error);
      alert('Error adding exercise data:', error.response.data.message);
    }
  }

  // 숫자만 입력 가능하도록 하는 함수
  const handleChange = (e, setValue, setError) => {
    const inputValue = e.target.value;
    const isNumber = /^\d+$/.test(inputValue);

    if (!isNumber && inputValue !== '') {
      setError('숫자(소수점 *제외*)만 입력 가능합니다.');
    } else {
      setError(null);
      setValue(inputValue);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>운동 카테고리 추가</h2>
          <div style={{ height: '300px', marginBottom: '20px' }}>
            <div style={{ border: '1px solid #ccc', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              
              <UploadBox onFileUpload={handleFileUpload} />
            </div>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>exercise</span>
                <span style={{ verticalAlign: "middle" }}> 운동 이름</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control onChange={(e) => setExerciseName(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                <span style={{ verticalAlign: "middle" }}> 소모 칼로리</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={perKcal || ''} onChange={(e) => handleChange(e, setPerKcal, setError)} isInvalid={!!error} />
                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>category</span>
                <span style={{ verticalAlign: "middle" }}> 운동 타입</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control onChange={(e) => setExerciseType(e.target.value)} />
              </Col>
              <Stack direction="horizontal">
                <div></div>
                <Button variant="primary" type="submit" className="ms-auto mt-2" style={{fontWeight: "bold"}}>
                  <span className="material-symbols-outlined" style={{ verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>send</span>
                  <span style={{ verticalAlign: "middle" }}> 추가</span>
                </Button>
              </Stack>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ExerciseAdd;