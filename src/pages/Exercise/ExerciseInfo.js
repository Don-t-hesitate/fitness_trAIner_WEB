import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col, Form, Button, ButtonGroup, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UploadBox from "../../components/UploadBox";

function ExerciseInfo({ exerId }) {
  const [exerciseData, setExerciseData] = useState(null); // 운동 데이터를 저장할 상태
  const [exerciseId, setExerciseId] = useState(''); // 운동 ID를 저장할 상태
  const [exerciseName, setExerciseName] = useState(''); // 운동 이름을 저장할 상태
  const [perKcal, setPerKcal] = useState(''); // 운동 소모 칼로리를 저장할 상태
  const [exerciseType, setExerciseType] = useState(''); // 운동 타입을 저장할 상태
  const [formData, setFormData] = useState(null); // 운동 영상 URL을 저장할 상태

  const [videoUrl, setVideoUrl] = useState(null);
  const [showUploadBox, setShowUploadBox] = useState(false);

  // 숫자만 입력 가능하도록 하는 함수의 에러용 상태
  const [error, setError] = useState(null);

  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  // 삭제 버튼 클릭 시 실행되는 함수
  const deleteClick = (e) => {
    e.preventDefault();
    const check = window.confirm("정말 해당 운동을 삭제하시겠습니까?");
    if (check) {
      handleDelete(e);
    }
  };

  const videoPurge = async (e) => {
    e.preventDefault();
    const check = window.confirm("정말 영상을 삭제하시겠습니까?");
    if (check) {
      try {
        const response = await axios.delete(process.env.REACT_APP_API_URL + `/exercises/video/${exerciseData.exerciseName}`);
        if (response.data.success) {
          alert("영상 삭제 성공");
          setVideoUrl(null);
          setShowUploadBox(true);
          window.location.reload();
        } else {
          alert("영상 삭제 실패");
        }
      } catch (error) {
        console.log("?Error deleting video:" + error);
        alert("Error deleting video:" + error);
      }
    }
  }

  // 운동 정보 삭제 함수
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(process.env.REACT_APP_API_URL + `/exercises/${exerciseData.exerciseName}`);
      if (response.data.success) {
        alert(response.data.result + ': 성공적으로 삭제됨');
        navigate('/exercise');
      } else {
        alert('운동 정보 삭제 실패');
      }
    } catch (error) {
      alert('Error deleting exercise data:', error.response.data.message);
    }
  };

  // 파일 업로드 함수
  const handleFileUpload = (data) => {
    setFormData(data);
  };

  // 수정 버튼 클릭 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // PUT 요청을 보내 운동 정보 업데이트
      const response = await axios.put(process.env.REACT_APP_API_URL + `/exercises`, {
        exerciseName: exerciseData.exerciseName,
        newExerciseName: exerciseName,
        newExerciseType: exerciseType,
        newPerKcal: perKcal
      });
      
      // response 객체와 response.data 객체가 존재하는지 확인
      if (response && response.data) {
        if (response.data.success) {
          if (formData) {
            console.log("?uploadFile: ", formData.get('file'));
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
          alert("운동 정보 수정 성공: ", response.data.message);
          window.location.reload();
        } else {
          alert('운동 정보 수정 실패: ' + response.data.message);
        }
      } else {
        // response 객체나 response.data 객체가 없는 경우 처리
        alert('서버 응답 오류: ' + response.data.message);
      }
    } catch (error) {
      // 에러 메시지 출력
      console.log('error: ', error);
      alert('Error updating exercise data:', error.response.data.message);
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

        if (data) {
          // 각 필드 상태 업데이트
          setExerciseId(data.exerciseId);
          setExerciseName(data.exerciseName);
          setPerKcal(data.perKcal);
          setExerciseType(data.exerciseType);

          // 운동 영상 URL 가져오기
          const fetchVideoUrl = async () => {
            try {
              console.log('data.exerciseName:', data.exerciseName);
              const videoResponse = await axios.get(process.env.REACT_APP_API_URL + `/exercises/video/stream/${data.exerciseName}`, {
                responseType: 'blob',
              });
              console.log('videRes:', videoResponse);
              if (videoResponse.status === 200) {
                const blob = videoResponse.data;
                const videoUrl = URL.createObjectURL(blob);
                setVideoUrl(videoUrl);
                setShowUploadBox(false);
              } else {
                setShowUploadBox(true);
              }
            } catch (error) {
              setShowUploadBox(true);
              console.log('Error fetching video URL:', error);
            }
          };
          fetchVideoUrl();
        }
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
    <Container className="mt-3">
      <Row>
        <Col>
          <div style={{ height: '300px'}}>
            {videoUrl && <Button variant="danger" onClick={videoPurge} style={{fontWeight: "bold"}}>
              <span className="material-symbols-outlined" style={{verticalAlign: "middle"}}>movie_off</span>
              <span style={{verticalAlign: "middle"}}> 영상 삭제</span>
              </Button>}
            {videoUrl && <video src={videoUrl} controls style={{ width: '100%', height: '100%', paddingBottom: '50px' }} />}
            {showUploadBox && <UploadBox onFileUpload={handleFileUpload} />}
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
                <Form.Control value={exerciseName || ''} onChange={(e) => setExerciseName(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                <span style={{verticalAlign: "middle"}}> 소모 칼로리</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={perKcal || ''} onChange={(e) => handleChange(e, setPerKcal, setError)} isInvalid={!!error} />
                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>category</span>
                <span style={{verticalAlign: "middle"}}> 운동 타입</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={exerciseType || ''} onChange={(e) => setExerciseType(e.target.value)} />
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