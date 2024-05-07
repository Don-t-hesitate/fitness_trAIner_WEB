import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col, Form, Button, ButtonGroup, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ExerciseInfo({ exerId }) {
  const [exerciseData, setExerciseData] = useState(null); // 운동 데이터를 저장할 상태
  const [exerciseId, setExerciseId] = useState(''); // 운동 ID를 저장할 상태
  const [exerciseName, setExerciseName] = useState(''); // 운동 이름을 저장할 상태
  const [perKcal, setPerKcal] = useState(''); // 운동 소모 칼로리를 저장할 상태
  const [exerciseType, setExerciseType] = useState(''); // 운동 타입을 저장할 상태

  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  // 삭제 버튼 클릭 시 실행되는 함수
  const deleteClick = (e) => {
    e.preventDefault();
    const check = window.confirm("정말 삭제하시겠습니까?");
    if (check) {
      handleDelete(e);
    }
  };

  // 운동 정보 삭제 함수
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(process.env.REACT_APP_API_URL + `/exercises/${exerciseData.exerciseName}`);
      if (response.data.success) {
        alert(response.data.result);
        navigate('/exercise');
      } else {
        alert('운동 정보 삭제 실패');
      }
    } catch (error) {
      alert('Error deleting exercise data:', JSON.stringify(error.response.data.message));
    }
  };

  // 수정 버튼 클릭 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("버튼 누름");
    try {
      // PUT 요청을 보내 운동 정보 업데이트
      const response = await axios.put(process.env.REACT_APP_API_URL + `/exercises`, {
        exerciseName: exerciseData.exerciseName,
        newExerciseName: exerciseName,
        newExerciseType: exerciseType,
        newPerKcal: perKcal
      });
      console.log("response: ", response);
      console.log("ㅇㅇ?");
      if (response.data.success) {
        // 업데이트 성공 메시지 출력
        alert(response.data.message);
      } else {
        // 업데이트 실패
        alert('운동 정보 수정 실패');
      }
    } catch (error) {
      // 에러 메시지 출력
      alert('Error updating exercise data:', JSON.stringify(error.response.data.message));
      console.log('exerData', exerciseData);
    }
  };


  // 컴포넌트가 마운트될 때 한 번만 실행
  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `/exercises`);
        
        let data = response.data.result.exerciseList;
        data = data.find((item) => item.exerciseId === Number(exerId));
        setExerciseData(data);
        console.log("data: ", data);

        if (data) {
          // 각 필드 상태 업데이트
          setExerciseId(data.exerciseId);
          setExerciseName(data.exerciseName);
          setPerKcal(data.perKcal);
          setExerciseType(data.exerciseType);
        }
        console.log(exerciseData);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };

    fetchExerciseData(); // 운동 데이터 가져오는 함수 실행
  }, [exerId]); // exerId가 변경될 때마다 실행

  // exerciseData가 null인 경우 (데이터 로딩 중) 로딩 메시지 표시
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
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>format_list_numbered</span>
                <span style={{verticalAlign: "middle"}}> 번호</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={exerciseId} disabled/>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>exercise</span>
                <span style={{verticalAlign: "middle"}}> 운동 이름</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                <span style={{verticalAlign: "middle"}}> 소모 칼로리</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={perKcal} onChange={(e) => setPerKcal(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>category</span>
                <span style={{verticalAlign: "middle"}}> 운동 타입</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={exerciseType} onChange={(e) => setExerciseType(e.target.value)} />
              </Col>
            </Form.Group>
            <Stack direction="horizontal">
              <ButtonGroup className="pt-2 ms-auto">
                <Button variant="primary" type="submit" style={{fontWeight: "bold"}}>
                  <span className="material-symbols-outlined" style={{verticalAlign: "middle"}}>edit</span>
                  <span style={{verticalAlign: "middle"}}> 운동 수정</span>
                </Button>
                <Button variant="danger" onClick={deleteClick} style={{fontWeight: "bold"}}>
                  <span className="material-symbols-outlined" style={{verticalAlign: "middle"}}>delete</span>
                  <span style={{verticalAlign: "middle"}}> 운동 삭제</span>
                </Button>
              </ButtonGroup>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ExerciseInfo;