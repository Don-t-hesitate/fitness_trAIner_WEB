import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function UserInfo({ userId }) {
  const [userData, setUserData] = useState(null); // 회원 데이터를 저장할 상태
  const [username, setUsername] = useState(''); // 회원 ID를 저장할 상태
  const [nickname, setNickname] = useState(''); // 회원 별명을 저장할 상태
  const [age, setAge] = useState(''); // 회원 나이를 저장할 상태
  const [height, setHeight] = useState(''); // 회원 키를 저장할 상태
  const [weight, setWeight] = useState(''); // 회원 몸무게를 저장할 상태
  const [gender, setGender] = useState(''); // 회원 성별을 저장할 상태
  
  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  const deleteClick = (e) => {
    e.preventDefault();
    const check = window.confirm("정말 삭제하시겠습니까?");
    if (check) {
      handleDelete(e);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/admin/${userId}`);
      if (response.data.success) {
        alert(response.data.message);
        navigate('/user');
      } else {
        alert('회원 정보 삭제 실패');
      }
    } catch (error) {
      alert('Error deleting user data:', JSON.stringify(error.response.data.message));
    }
  };

  // 수정 버튼 클릭 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // PUT 요청을 보내 회원 정보 업데이트
      const response = await axios.put(`/api/admin/${userId}`, {
        userId: userData.userId,
        nickname,
        age,
        height,
        weight,
        gender
      });

      if (response.data.success) {
        // 업데이트 성공 메시지 출력
        alert(response.data.message);
        // navigate(0 , { replace: true });
      } else {
        // 업데이트 실패
        console.error('회원 정보 업데이트 실패');
      }
    } catch (error) {
      // 에러 발생 시 에러 메시지 출력
      console.error('Error updating user data:', error);
    }
  };

  // 컴포넌트 마운트 및 userId 변경 시 실행되는 hook
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 컴포넌트 마운트 및 userId 변경 시 실행되는 hook
        const response = await axios.get(`/api/admin/users`);
        let data = response.data.result.userList;
        data = data.find((user) => user.userId === Number(userId));
        setUserData(data); // 회원 데이터 상태 업데이트
        console.log("data: " + JSON.stringify(data));
        if (data) {
          // 각 필드 상태 업데이트
          setUsername(data.username);
          setNickname(data.nickname);
          setAge(data.age);
          setHeight(data.height);
          setWeight(data.weight);
          setGender(data.gender);
        }
      } catch (error) {
        // 에러 발생 시 에러 메시지 출력
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // 회원 데이터 가져오는 함수 실행
  }, [userId]); // userId 변경 시에만 실행되도록 의존성 배열 설정

  // userData가 null인 경우 (데이터 로딩 중) 로딩 메시지 표시
  if (!userData) { 
    return <div>Loading...</div>; 
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>format_list_numbered</span>
                <span style={{verticalAlign: "middle"}}> 회원 식별 번호</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={userData.userId} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>signature</span>
                <span style={{verticalAlign: "middle"}}> 회원 ID</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={username || ''} onChange={(e) => setUsername(e.target.value)} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>star</span>
                <span style={{verticalAlign: "middle"}}> 회원 별명</span>
                </Form.Label>
              <Col sm="9">
                <Form.Control value={nickname || ''} onChange={(e) => setNickname(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>update</span>
                <span style={{verticalAlign: "middle"}}> 회원 나이</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={age || ''} onChange={(e) => setAge(e.target.value)} />
              </Col>
            </Form.Group>
            
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>straighten</span>
                <span style={{verticalAlign: "middle"}}> 회원 키</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={height || ''} onChange={(e) => setHeight(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>scale</span>
                <span style={{verticalAlign: "middle"}}> 회원 몸무게</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={weight || ''} onChange={(e) => setWeight(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>wc</span>
                <span style={{verticalAlign: "middle"}}> 회원 성별</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={gender || ''} onChange={(e) => setGender(e.target.value)} />
              </Col>
            </Form.Group>
            
            <Row className="align-items-center">
              <Col>
                <div>
                </div>
              </Col>
              <Col xs="auto" className="ml-auto">
                <Button variant="primary" size="sm" type="submit" style={{fontWeight: "bold"}}>
                  <span className="material-symbols-outlined" style={{verticalAlign: "middle"}}>edit</span>
                  <span style={{verticalAlign: "middle"}}> 정보 수정</span>
                </Button>
                <Button variant="danger" size="sm" onClick={deleteClick} style={{fontWeight: "bold"}}>
                  <span className="material-symbols-outlined" style={{verticalAlign: "middle"}}>delete</span>
                  <span style={{verticalAlign: "middle"}}> 회원 탈퇴</span>
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      
    </Container>
  );
}

export default UserInfo;