import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col, Form, Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoadingModal from "../../components/LoadingModal";



function WorkoutAiInfo({ parentId, subId }) {
  const [aiData, setAiData] = useState(null); // 운동 AI 정보를 저장할 상태
  const [params, setParams] = useState(null); // 운동 AI 파라미터를 저장할 상태
  const [created, setCreated] = useState(null); // 운동 AI 생성시간을 저장할 상태
  const [inuse, setInuse] = useState(null); // 운동 AI 사용 여부를 저장할 상태

  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const confirm = window.confirm("정말로 삭제하시겠습니까?");
    if (confirm) {
      handleDelete(e);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let dir = "";
      if (inuse) {
        dir = "Inuse&";
      }
      const response = await axios.delete(process.env.REACT_APP_API_URL_BLD + `/ai/exercise/${parentId}/${dir + aiData.modelFile}`);
      if (response.data.success) {
        alert('삭제 성공');
        navigate('/aiservice/workout');
      } else {
        alert('삭제 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error deleting exercise data:', error.response.data.message);
      alert('삭제 실패: ' + error.response.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(process.env.REACT_APP_API_URL_BLD + `/ai/exercise/${parentId}/${subId}`);
      if (response.data.success) {
        alert('업데이트 성공');
        navigate('/aiservice/workout');
      } else {
        alert('업데이트 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error updating exercise data:', error.response.data.message);
      alert('업데이트 실패: ' + error.response.data.message);
    }
  };


  useEffect(() => {
    const fetchAiData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL_BLD + `/ai/exercise/${parentId}/${subId}`);
        setAiData(response.data.result);
        console.log("inuse: ", response.data.result.Inuse);
        setInuse(response.data.result.Inuse);
        console.log("res : ", response.data.result);
        // console.log('response: ', response.data.result);
      } catch (error) {
        console.error('Error fetching ai data:', error);
      }
    };

    fetchAiData();
    console.log(aiData);
  }, [parentId, subId]);

  useEffect(() => {
    if (aiData) {
      setParams(aiData.modelParams);
      setCreated(aiData.createdTime);
      console.log('!params:', params);
    }
  }, [aiData]);

  // 운동 AI 정보가 없는 경우 로딩 모달 표시
  if (!params) {
    return <LoadingModal data={params} />;
  }

  const returnDate = () => {
    const date = new Date(created);
    return date.toLocaleString();
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>exercise</span>
                <span style={{ verticalAlign: 'middle' }}> 운동 이름</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={parentId} disabled />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>format_list_numbered</span>
                <span style={{ verticalAlign: 'middle' }}> 버전</span>                
              </Form.Label>
              <Col sm="9">
                <Form.Control value={params.version} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>repeat</span>
                <span style={{ verticalAlign: 'middle' }}> 반복 횟수</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={params.iteration} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>layers</span>
                <span style={{ verticalAlign: 'middle' }}> depth</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={params.depth} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>pace</span>
                <span style={{ verticalAlign: 'middle' }}> learning rate</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={params.learning_rate} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>settings</span>
                <span style={{ verticalAlign: 'middle' }}> 에포크 수</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control  value={params.num_epochs} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>trending_down</span>
                <span style={{ verticalAlign: 'middle' }}> dropout</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={"0.2"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>picture_in_picture</span>
                <span style={{ verticalAlign: 'middle' }}> batch size</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={"64"} />
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Stack direction="horizontal" className="mt-3">
        <Col>
          <div>
            <div style={{fontWeight: "bold"}}>사용 데이터셋: 001-1-1-01-A2</div>
            <div style={{fontWeight: "bold"}}>업데이트 일시: {returnDate()}</div>
          </div>
        </Col>
        <Col xs="auto" className="ml-auto">
          <Button variant="primary" onClick={handleUpdate}>
            <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px' }}>save</span>
            <span style={{ verticalAlign: 'middle', fontWeight: 'bold' }}> 업데이트</span>
          </Button>
          <Button variant="danger" onClick={handleClick}>
            <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px' }}>delete</span>
            <span style={{ verticalAlign: 'middle', fontWeight: 'bold' }}> 삭제</span>
          </Button>
        </Col>
      </Stack>
    </Container>
  );
}

export default WorkoutAiInfo;