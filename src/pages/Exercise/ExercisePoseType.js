import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
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
      </div>
    </Container>
  );
};

export default ExercisePoseType;
