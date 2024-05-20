import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Pagination, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../../components/LoadingModal';

function ExerciseManage() {
  // 운동 데이터를 저장할 상태
  const [exerciseData, setExerciseData] = useState(null);
  // 현재 페이지 번호를 저장할 상태 및 보여줄 운동 수를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(12);
  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
      const response = await axios.get(process.env.REACT_APP_API_URL_BLD + '/exercises');
      setExerciseData(response.data.result.exerciseList);
      } catch (error) {
      console.error('Error fetching exercise data:', error);
      }
    };
  
    fetchExerciseData();
  }, []);

  if (!exerciseData) {
    return <LoadingModal data={exerciseData} />;
  }

  const handleRowClick = (exerciseId) => {
    // 운동 ID를 파라미터로 전달하여 운동 정보 페이지로 이동
    navigate(`/exercise/${exerciseId}`);
  };

  // 현재 페이지에 해당하는 운동 목록 계산
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exerciseData.slice(indexOfFirstExercise, indexOfLastExercise);

  // 페이지 번호 클릭 시 실행되는 함수
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션에 표시할 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(exerciseData.length / exercisesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2 style={{marginBottom: '24px', fontWeight: '800'}}>운동 카테고리 관리</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>번호</th>
                <th>운동 이름</th>
                <th>소모 칼로리</th>
              </tr>
            </thead>
            <tbody>
              {currentExercises.map((exercise, index) => (
                <tr key={exercise.exerciseId}  onClick={() => handleRowClick(exercise.exerciseId)}>
                  <td>{exercise.exerciseId}</td>
                  <td>{exercise.exerciseName}</td>
                  <td>{exercise.perKcal}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Stack direction="horizontal">
            <Pagination className='mb-0'>
              {pageNumbers.map((number) => (
                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageClick(number)}>
                  {number}
                </Pagination.Item>
              ))}
            </Pagination>
            <Button variant="primary" className="ms-auto" href='/exercise/add' style={{fontWeight: "bold"}}>
                <span className="material-symbols-outlined" style={{ verticalAlign: "middle"}}>add</span>
                <span style={{ verticalAlign: "middle" }}> 추가</span>
              </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default ExerciseManage;