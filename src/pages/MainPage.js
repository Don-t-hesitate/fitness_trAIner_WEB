import React from 'react';
import { Button, Col, Row, Stack, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div >
      {/* <Container fluid style={{backgroundColor: '#1E3252', position: 'relative'}}>
        <div style={{width: '100%', maxWidth: '유지할 최대 너비값', margin: '0 auto', padding: '20px'}}>
          <Stack direction='horizontal'>
            <h1 style={{marginLeft: '37.5%'}}><div style={{color: 'white'}}>trAIner fitness</div></h1>
            <Link className='ms-auto' to={'/login'}><Button variant='muted'><div style={{color: 'grey'}}>admin</div></Button></Link>
          </Stack>
        </div>
      </Container> */}
      <Container fluid style={{
        position: 'fixed',
        backgroundColor: '#1E3252',
        display: 'flex',
        alignItems: 'center',
        height: '70px',
        zIndex: 1000,
        width: '100%',
        padding: '0 20px'
      }}>
        <div style={{flex: 1, textAlign: 'center'}}>
          <h1 style={{color: 'white', margin: 0, marginLeft: '60px'}}>trAIner fitness</h1>
        </div>
        <div style={{marginLeft: 'auto'}}>
          <Link to={'/login'}>
            <Button variant='muted'>
              <div style={{color: 'grey'}}>admin</div>
            </Button>
          </Link>
        </div>
      </Container>
      {/* <Container style={{position: 'fixed', top: 0, left: 0, right: 0, background: '#1E3252', opacity: 0.95}}>
        <Row>
          <Stack direction='horizontal'>
            <h1 style={{marginLeft: '40%'}}><div style={{color: 'white'}}>trAIner fitness</div></h1>
            <Link className='ms-auto' to={'/login'}><Button variant='muted'><div style={{color: 'grey'}}>admin</div></Button></Link>
          </Stack>
        </Row>
      </Container> */}
    </div>
  );

}

function MainPage() {
  return (
    <>
      {/* <div style={{height: '100vh', width: '1px', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)'}}></div> */}
      <NavBar />
      <Container style={{paddingTop: '75px'}}>
          <Stack direction='horizontal' style={{paddingTop: '100px', paddingBottom: '400px', height: '100vh'}}>
            <img src={process.env.PUBLIC_URL + '/main.jfif'} alt="Image" style={{width: '50%', height: 'auto', paddingLeft: '50px', paddingTop: '100px'}}/>
            <div style={{paddingLeft: '300px', fontSize: '30px', fontWeight: 'bold'}}>내 손안의 헬스 트레이너, trAIner fitness</div>
          </Stack>
        <Row>
          <Col>
            <div style={{position: 'relative', height: '90vh'}}>
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