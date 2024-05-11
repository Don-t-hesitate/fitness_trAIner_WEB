import React from 'react';
import { Button, Container, ListGroup, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ExercisePoseType = () => {
  const navigate = useNavigate();

  const handlePageNavigation = (exerciseType) => {
    // Navigate to the appropriate page based on the exercise type
    const header = '/exercise/pose';
    switch (exerciseType) {
      case 'bodyweight':
        navigate(header + '/bodyweight');
        break;
      case 'dumbbell-barbell':
        navigate(header + '/dumbbell-barbell');
        break;
      case 'machine':
        navigate(header + '/machine');
        break;
      default:
        navigate(header);
        break;
    }
  };

  return (
    <Container>
      <h2 className='mb-0'>운동 자세 데이터</h2>
      <Stack direction="vertical" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <p style={{ position: 'relative', textAlign: 'center', fontSize: 'large', paddingBottom: '5%', fontWeight: 'bold', fontSize: 'x-large' }}>운동 자세 데이터를 확인하려면 아래 카테고리를 클릭하세요.</p>
        <ListGroup style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '60vw' }}>
          <ListGroup.Item
            action
            onClick={() => handlePageNavigation('bodyweight')}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '50px',
              paddingBottom: '50px',
              backgroundColor: '#405f91',
              width: '100%'
            }}
          >
            <span style={{ color: 'white', display: 'block', textAlign: 'center', fontSize: 'x-large' }}>맨몸 운동</span>
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => handlePageNavigation('dumbbell-barbell')}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '50px',
              paddingBottom: '50px',
              backgroundColor: '#565f70',
              width: '100%'
            }}
          >
            <span style={{ color: 'white', display: 'block', textAlign: 'center', fontSize: 'x-large' }}>덤벨/바벨 운동</span>
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => handlePageNavigation('machine')}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '50px',
              paddingBottom: '50px',
              backgroundColor: '#705575',
              width: '100%'
            }}
          >
            <span style={{ color: 'white', display: 'block', textAlign: 'center', fontSize: 'x-large' }}>기구 운동</span>
          </ListGroup.Item>
        </ListGroup>
        <Stack direction="horizontal" style={{marginTop: '3%'}}>
          <div></div>
          <Button variant="primary" className='ms-auto' onClick={() => navigate('/exercise/pose/add')}>
            <span className="material-symbols-outlined" style={{ verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>add</span>
            <span style={{verticalAlign: "middle", fontWeight: "bold"}}> 추가</span>
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ExercisePoseType;
