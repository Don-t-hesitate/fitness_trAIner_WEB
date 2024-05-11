import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Stack } from "react-bootstrap";
import UploadBox from "../../components/UploadBox";


function ExercisePoseAdd() {
  const [exerciseCategory, setExerciseCategory] = useState('Bodyweight'); // 운동 카테고리를 저장할 상태
  const [exerciseName, setExerciseName] = useState(''); // 운동 이름을 저장할 상태
  const [jpegFormData, setJpegFormData] = useState(null); // jpeg 파일을 저장할 상태
  const [jsonFormData, setJsonFormData] = useState(null); // json 파일을 저장할 상태

  const handleFileUpload = (data, extension) => {
    if (extension === 'jpg') {
      setJpegFormData(data);
    } else if (extension === 'json') {
      setJsonFormData(data);
    }
    console.log('-----------------');
    for (const x of data.entries()) {
      console.log('data: ', x);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('onclick');
    
    jpegFormData.append('parentPath', exerciseCategory);
    jpegFormData.append('uploadPath', encodeURIComponent(exerciseName));
    jsonFormData.append('parentPath', exerciseCategory);
    jsonFormData.append('uploadPath', encodeURIComponent(exerciseName));
    for (const x of jsonFormData) {
      console.log('json: ', x);
    };
    for (const x of jpegFormData) {
      console.log('jpeg: ', x);
    };
    try {
      const imgRes = await axios.post(
        process.env.REACT_APP_API_URL + '/ai/pose', 
        jpegFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (imgRes.data.success) {
        alert('이미지 업로드 성공');
        console.log('imgRes: ', imgRes);
      } else {
        alert('이미지 업로드 실패: ', imgRes.data.message);
        console.log('imgRes error: ', imgRes);
      }

      const jsonRes = await axios.post(
        process.env.REACT_APP_API_URL + '/ai/pose',
        jsonFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (jsonRes.data.success) {
        alert('json 업로드 성공');
        console.log('jsonRes: ', jsonRes);
      } else {
        alert('json 업로드 실패: ', jsonRes.data.message);
        console.log('jsonRes error: ', jsonRes);
      }
      window.location.reload();
    } catch (error) {
      console.error('error: ', error.responser);
      alert('Error adding exercise pose data:', error.response.data.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>운동 자세 데이터 추가</h2>
          <h3>jpg: </h3>
          <div style={{ height: '150px', marginBottom: '20px', position: 'relative' }}>
            <div style={{ border: '1px solid #ccc', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
              <UploadBox onFileUpload={handleFileUpload} multiple extension={'jpg'} />
            </div>
          </div>
          <h3>json: </h3>
          <div style={{ height: '150px', marginBottom: '20px', position: 'relative' }}>
            <div style={{ border: '1px solid #ccc', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
              <UploadBox onFileUpload={handleFileUpload} multiple extension={'json'} />
            </div>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>category</span>
                <span style={{verticalAlign: "middle"}}> 운동 타입</span>
              </Form.Label>
              <Col sm="9">
                <Form.Select onChange={(e) => setExerciseCategory(e.target.value)}>
                  <option value="Bodyweight">맨몸 운동</option>
                  <option value="Dumbbell&barbell">덤벨&바벨 운동</option>
                  <option value="Machine">기구 운동</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>exercise</span>
                <span style={{verticalAlign: "middle"}}> 운동 이름</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control onChange={(e) => setExerciseName(e.target.value)} />
              </Col>
            </Form.Group>
            <Stack direction="horizontal">
              <div></div>
              <Button variant="primary" type="submit" className="ms-auto mt-2" style={{fontWeight: "bold"}}>
                <span className="material-symbols-outlined" style={{ verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>send</span>
                <span style={{verticalAlign: "middle"}}> 추가</span>
              </Button>
            </Stack>
          </Form>
        </Col>
      </Row> 
      <Row className="align-items-center">
          <Col>
            <div>
            </div>
          </Col>
          <Col xs="auto" className="ml-auto">
            
          </Col>
        </Row>
    </Container>
  );
}

export default ExercisePoseAdd;