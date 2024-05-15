import React, { useRef, useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

function LoginPage() {
  // // 상태 변수 선언
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  
  // 페이지 이동을 위한 useNavigate 함수와 로그인 함수를 가져오기
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    console.log("env: " + process.env.REACT_APP_API_URL_BLD);
  }, [usernameRef]);

  // 로그인 폼 제출 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('!env: ' + process.env.REACT_APP_API_URL_BLD);
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      // 서버에 로그인 요청 전송
      const response = await axios.post(
        process.env.REACT_APP_API_URL_BLD +
        // 'http://ceprj.gachon.ac.kr:60008' +
         '/admin/login',
        { username, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        // 로그인 성공 시 대시보드 페이지로 이동
        // console.log(response.config.data.split(","));
        const user = JSON.parse(response.config.data)
        login(user);
        navigate('/dashboard');
      }
    } catch (error) {
      // 로그인 요청 실패 시 에러 처리
      console.error('Login failed:', error);
      // alert('Login failed: ' + error.response.data.message);
    }
  };

  // Form.Control 컴포넌트에 Style Components로 Material Icons 적용
  const StyledFormControl = styled(Form.Control)`
  font-size: 16px;

  &::placeholder {
    font-family: 'Material Icons', sans-serif;
  }
`;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header className='text-center'>
              <h4>관리자 로그인</h4>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <img src="/logo_real.png" alt="Logo" className="logo" />
              </div>
              <Form onSubmit={handleSubmit} className='pt-5'>
                <div>
                  <Form.Group controlId="username" key="username">
                    <StyledFormControl
                      type="text"
                      placeholder="&#xE853; 아이디"
                      ref={usernameRef}
                    />
                  </Form.Group>
                  <Form.Group controlId="password" key="password" className="mt-3">
                    <StyledFormControl
                      type="password"
                      placeholder="&#xE897; 비밀번호"
                      ref={passwordRef}
                    />
                  </Form.Group>
                </div>
                <Button variant="primary" type="submit" className="ml-2 mt-4" style={{ height: '150%', width: '100%' }}>
                  <span className="material-icons" style={{ verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1" }}>login</span>
                  <span style={{fontWeight: "bold"}}> 로그인</span>
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