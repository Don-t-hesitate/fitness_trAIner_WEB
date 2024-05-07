import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UploadBox from "../../components/UploadBox";

function ExerciseAdd() {
  const [exerciseName, setExerciseName] = useState(''); // 운동 이름을 저장할 상태
  const [perKcal, setPerKcal] = useState(''); // 운동 소모 칼로리를 저장할 상태
  const [exerciseType, setExerciseType] = useState(''); // 운동 타입을 저장할 상태
  const [uploadFile, setUploadFile] = useState(null); // 운동 영상 URL을 저장할 상태

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('테스트');
      const data = {
        exerciseName,
        exerciseType,
        perKcal
      };
  
      const response = await axios.post(`/exercises`, data);
  
      console.log("response?!: ", response);
      // response 객체와 response.data 객체가 존재하는지 확인
      if (response && response.data) {
        if (response.data.success) {
          if (uploadFile) {
            console.log("uploadFile: ", uploadFile);
            const videoResponse = await axios.post(`/exercises/video/${exerciseName}`, uploadFile, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log("Video upload response: ", videoResponse);
            // 비디오 업로드 성공 시 추가 작업 수행 (예: 비디오 URL 저장)
          }
          alert("추가 성공?: ", response.data.message);
          // navigate('/exercise');
        } else {
          alert('운동 정보 추가 실패');
        }
        console.log("response.data?: ", response.data);
      } else {
        // response 객체나 response.data 객체가 없는 경우 처리
        alert('서버 응답 오류');
      }
    } catch (error) {
      console.log("error: ", error);
      alert('Error adding exercise data:', JSON.stringify(error));
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>운동 카테고리 추가</h2>
          <div style={{ height: '300px', marginBottom: '20px' }}>
            <div style={{ border: '1px solid #ccc', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* <Button variant="secondary" onClick={handleVideoUpload}>업로드하기</Button> */}
              <UploadBox onFileUpload={setUploadFile} />
            </div>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>format_list_numbered</span>
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
                <Form.Control onChange={(e) => setPerKcal(e.target.value)} />
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
            </Form.Group>
            <Button variant="primary" type="submit" className="ms-auto mt-3" style={{fontWeight: "bold"}}>
              <span className="material-symbols-outlined" style={{ verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>send</span>
              <span style={{ verticalAlign: "middle" }}> 추가</span>
            </Button>
            <Stack direction="horizontal">
              <div></div>
              
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ExerciseAdd;