import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const PasswordReset = () => {
  // 상태 변수 정의
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 비밀번호 재설정 폼 제출 시 호출되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 서버로 비밀번호 재설정 요청 전송
      const response = await axios.post('/api/reset-password/', { email });
      // 성공 시 메시지 업데이트
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      // 실패 시 에러 메시지 업데이트
      setError('비밀번호 재설정 실패');
      setMessage('');
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8}></Col>
        <Col md={4}>
          <Button variant="primary" href="/" className="mt-5">로그인</Button>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={10} md={8} lg={6}>
          {/* 비밀번호 재설정 제목 */}
          <h2 className="text-center mb-4">비밀번호 찾기</h2>
          {/* 비밀번호 재설정 폼 */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>이메일 주소</Form.Label>
              {/* 이메일 입력 필드 */}
              <Form.Control
                type="email"
                placeholder="이메일 주소를 입력해 주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            {/* 비밀번호 재설정 버튼 */}
            <Button variant="primary" type="submit" block className="mt-4">
              비밀번호 재설정
            </Button>
          </Form>
          {/* 성공 메시지 */}
          {message && (
            <Alert variant="success" className="mt-4">
              {message}
            </Alert>
          )}
          {/* 에러 메시지 */}
          {error && (
            <Alert variant="danger" className="mt-4">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordReset;