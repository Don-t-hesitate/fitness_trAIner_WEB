import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 인증 로직을 구현합니다.
    // 로그인 성공 시 대시보드 페이지로 이동합니다.
    if (username === 'admin' && password === 'admin') {
      navigate('/dashboard');
    } else if (username === ' ' && password === ' ') {
      alert('hello');
    } else {
      alert('잘못된 아이디 또는 비밀번호를 입력하셨습니다.');
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
                <Button variant="primary" type="submit" className="ml-2" style={{ height: '100%', width: '100%' }}>
                  Enter
                </Button>
              </Form>
              
            </Card.Body>
          </Card>
          <div className="text-center mt-3">
            <a href="/find-username">아이디 찾기</a> |{' '}
            <a href="/find-password">비밀번호 찾기</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;