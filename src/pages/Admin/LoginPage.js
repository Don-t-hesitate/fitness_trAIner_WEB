import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function LoginPage() {
  // 상태 변수 선언
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // 페이지 이동을 위한 useNavigate 함수와 로그인 함수를 가져오기
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // 로그인 폼 제출 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 서버에 로그인 요청 전송
      const response = await axios.post(
        '/api/admin/login',
        { username, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        // 로그인 성공 시 대시보드 페이지로 이동
        console.log(response.config.data.split(","));
        const user = JSON.parse(response.config.data)
        login(user);
        navigate('/dashboard');
        console.log('success~~');
      } /* else if (response.data.success === false) {
        // 로그인 실패 시 에러 메시지 표시
        alert(response.data.message, "status: ", response.data.status);
      } */
    } catch (error) {
      // 로그인 요청 실패 시 에러 처리
      console.error('Login failed:', error);
      alert('Login failed: ' + JSON.stringify(error.response.data.message));
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h4>관리자 로그인</h4>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <img src="/logo_real.png" alt="Logo" className="logo" />
              </div>
              <Form onSubmit={handleSubmit}>
              <div >
                  <div>
                    <Form.Group controlId="username">
                      <Form.Control
                        type="text"
                        placeholder="아이디를 입력해 주세요"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="password" className="mt-3">
                      <Form.Control
                        type="password"
                        placeholder="비밀번호를 입력해 주세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
                <p></p>
                <Button variant="primary" type="submit" className="ml-2" style={{ height: '150%', width: '100%' }}>
                  <div style={{fontWeight: "bold"}}>로그인</div>
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;