import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function MemberInfo({ userId }) {
  const [memberData, setMemberData] = useState(null); // 회원 데이터를 저장할 상태
  const [username, setUsername] = useState(null); // 회원 ID를 저장할 상태
  const [nickname, setNickname] = useState(null); // 회원 별명을 저장할 상태
  const [length, setLength] = useState(null); // 회원 키를 저장할 상태
  const [weight, setWeight] = useState(null); // 회원 몸무게를 저장할 상태
  const [age, setAge] = useState(null); // 회원 나이를 저장할 상태

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
      const response = await axios.delete(`/api/member/${userId}`);
      if (response.data.success) {
        alert(response.data.message);
        navigate('/member');
      } else {
        console.error('회원 정보 삭제 실패');
      }
    } catch (error) {
      console.error('Error deleting member data:', error);
    }
  };

  // 수정 버튼 클릭 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // PUT 요청을 보내 회원 정보 업데이트
      const response = await axios.put(`/api/member/${userId}`, {
        username,
        nickname,
        length,
        weight,
        age
      });

      if (response.data.success) {
        // 업데이트 성공 메시지 출력
        alert(response.data.message);
      } else {
        // 업데이트 실패
        console.error('회원 정보 업데이트 실패');
      }
    } catch (error) {
      // 에러 발생 시 에러 메시지 출력
      console.error('Error updating member data:', error);
    }
  };

  // 컴포넌트 마운트 및 userId 변경 시 실행되는 hook
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        // 컴포넌트 마운트 및 userId 변경 시 실행되는 hook
        const response = await axios.get(`/api/member/${userId}`);
        const data = response.data;
        setMemberData(data); // 회원 데이터 상태 업데이트
        if (data) {
          // 각 필드 상태 업데이트
          setUsername(data.username);
          setNickname(data.nickname);
          setLength(data.length);
          setWeight(data.weight);
          setAge(data.age);
        }
      } catch (error) {
        // 에러 발생 시 에러 메시지 출력
        console.error('Error fetching member data:', error);
      }
    };

    fetchMemberData(); // 회원 데이터 가져오는 함수 실행
    console.log(memberData); // 현재 memberData 상태 출력 (디버깅 용도)
  }, [userId]); // userId 변경 시에만 실행되도록 의존성 배열 설정

  // memberData가 null인 경우 (데이터 로딩 중) 로딩 메시지 표시
  if (!memberData) { 
    return <div>Loading...</div>; 
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="3">회원 식별 번호</Form.Label>
              <Col sm="9">
                <Form.Control value={memberData.userid} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">회원 ID</Form.Label>
              <Col sm="9">
                <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} />
                {console.log("2:", username)}
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">회원 별명</Form.Label>
              <Col sm="9">
                <Form.Control value={nickname} onChange={(e) => setNickname(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">회원 키</Form.Label>
              <Col sm="9">
                <Form.Control value={length} onChange={(e) => setLength(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">회원 몸무게</Form.Label>
              <Col sm="9">
                <Form.Control value={weight} onChange={(e) => setWeight(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">회원 나이</Form.Label>
              <Col sm="9">
                <Form.Control value={age} onChange={(e) => setAge(e.target.value)} />
              </Col>
            </Form.Group>
            <Row className="align-items-center">
              <Col>
                <div>
                </div>
              </Col>
              <Col xs="auto" className="ml-auto">
                <Button variant="primary" size="sm" type="submit">
                  수정
                </Button>
                <Button variant="danger" size="sm" onClick={deleteClick}>
                  삭제
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      
    </Container>
  );
}

export default MemberInfo;