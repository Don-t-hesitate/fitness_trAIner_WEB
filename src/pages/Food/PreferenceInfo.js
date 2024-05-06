import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Pagination, Form, Button } from "react-bootstrap";

function PreferenceInfo({ userId }) {
  const [preferenceData, setPreferenceData] = useState(null); // 선호도 데이터를 저장할 상태
  const [spicyPreference, setSpicyPreference] = useState(''); // 매운맛 선호도를 저장할 상태
  const [meatConsumption, setMeatConsumption] = useState(''); // 육류 섭취량을 저장할 상태
  const [tastePreference, setTastePreference] = useState(''); // 맛 선호도를 저장할 상태
  const [activityLevel, setActivityLevel] = useState(''); // 활동량을 저장할 상태
  const [preferenceTypeFood, setPreferenceTypeFood] = useState(''); // 선호 음식 종류를 저장할 상태

  // 수정 버튼 클릭 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/admin/food/preferences/${userId}`, {
        userId: preferenceData.userId,
        nickname: preferenceData.nickname,
        spicyPreference,
        meatConsumption,
        tastePreference,
        activityLevel,
        preferenceTypeFood
      });

      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert('선호도 정보 수정 실패');
      }
    } catch (error) {
      alert('Error updating preference data:', JSON.stringify(error.response.data.message));
      console.log('preData', preferenceData);
    }
  }

  // 컴포넌트가 마운트될 때 한 번만 실행
  useEffect(() => {
    const fetchPreferenceData = async () => {
      try {
        const response = await axios.get("/api/admin/food/preferences"); // 서버에서 선호도 데이터를 가져옴
        let data = response.data.result;
        data = data.find((preference) => preference.userId === Number(userId));
        setPreferenceData(data); // 선호도 데이터를 상태에 저장
        console.log('data?: ', data);
        if (data) {
          setSpicyPreference(data.spicyPreference);
          setMeatConsumption(data.meatConsumption);
          setTastePreference(data.tastePreference);
          setActivityLevel(data.activityLevel);
          setPreferenceTypeFood(data.preferenceTypeFood);
        }
      } catch (error) {
        console.error("Error fetching preference data:", error);
      }
    };
    fetchPreferenceData(); // 선호도 데이터 가져오는 함수 실행
  }, [userId]);

  // preferenceData가 null인 경우 (데이터 로딩 중) 로딩 메시지 표시
  if (!preferenceData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className='material-symbols-outlined' style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>format_list_numbered</span>
                <span style={{verticalAlign: "middle"}}> 회원 ID</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={preferenceData.userId}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className='material-symbols-outlined' style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>signature</span>
                <span style={{verticalAlign: "middle"}}> 회원 별명</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={preferenceData.nickname}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className='material-symbols-outlined' style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>onsen</span>
                <span style={{verticalAlign: "middle"}}> 매운맛 선호도</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={spicyPreference}
                  onChange={(e) => setSpicyPreference(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className='material-symbols-outlined' style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>egg_alt</span>
                <span style={{verticalAlign: "middle"}}> 육류 섭취량</span>
              </Form.Label>
              <Col sm="9">
                <Form.Check
                  inline
                  label="True"
                  type="radio"
                  id="meatConsumption-true"
                  name="meatConsumption"
                  value={true}
                  defaultChecked={meatConsumption === true}
                  onChange={(e) => setMeatConsumption(e.target.value)}
                />
                <Form.Check
                  inline
                  label="False"
                  type="radio"
                  id="meatConsumption-false"
                  name="meatConsumption"
                  value={false}
                  defaultChecked={meatConsumption === false}
                  onChange={(e) => setMeatConsumption(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className='material-symbols-outlined' style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>recommend</span>
                <span style={{verticalAlign: "middle"}}> 맛 선호도</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={tastePreference || ''}
                  onChange={(e) => setTastePreference(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className='material-symbols-outlined' style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>directions_run</span>
                <span style={{verticalAlign: "middle"}}> 활동량</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className='material-symbols-outlined' style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>menu_book</span>
                <span style={{verticalAlign: "middle"}}> 선호 음식 종류</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={preferenceTypeFood || ''}
                  onChange={(e) => setPreferenceTypeFood(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Row classsName='align-items-center'>
              <Col>
                <div></div>
              </Col>
              <Col xs='auto' className='ml-auto'>
                <Button type='submit' size='sm' variant='primary' style={{fontWeight: 'bold'}}> 
                  <span className="material-symbols-outlined" style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>edit</span>
                  <span style={{verticalAlign: 'middle'}}> 정보 수정</span>
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Button onClick={console.log("meatCnsmptn: ", meatConsumption)}>check</Button>
    </Container>
  );
}

export default PreferenceInfo;