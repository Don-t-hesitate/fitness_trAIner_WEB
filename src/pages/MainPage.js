import React from 'react';
import { Button, Col, Row, Stack, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Container style={{position: 'fixed', top: 0, left: 0, right: 0, background: '#1E3252'}}>
      <Row>
        <Stack direction='horizontal'>
          <h1 style={{marginLeft: '40%'}}><div style={{color: 'white'}}>trAIner fitness</div></h1>
          <Link className='ms-auto' to={'/login'}><Button variant='muted'><div style={{color: 'grey'}}>admin</div></Button></Link>
        </Stack>
      </Row>
    </Container>
  );

}

function MainPage() {
  return (
    <>
      <NavBar />
      <Container style={{paddingTop: '75px'}}>
        <Row>
          <Col>
            <img src={process.env.PUBLIC_URL + '/main.jfif'} alt="Image" style={{width: '20%', height: 'auto'}}/>
            <div style={{paddingLeft: '100px'}}>내 손안의 헬스 트레이너, trAIner fitness</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{position: 'relative'}}>
              <img src={process.env.PUBLIC_URL + '/title.png'} alt="Image" style={{width: '100%', height: 'auto', opacity: 0.5, filter: "blur(3px)"}}/>
              <div style={{position: 'absolute', top: '40%', left: '25%', transform: 'translate(-50%, -50%)', color: 'black', fontSize: '24px'}}>trAIner fitness는 사용자의 휴대전화 카메라를 이용하여 
              <br></br>운동자세를 분석하고 개선책을 알려줍니다.
              <br></br>또한 식단을 추천받고 수행한 운동을 추적할 수 있습니다.
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MainPage;