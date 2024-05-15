import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Pagination, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../../components/LoadingModal';

const WorkoutAi = () => {
  const [exerciseList, setExerciseList] = useState([]); // 운동 목록을 저장할 상태
  // 현재 페이지 번호를 저장할 상태 및 보여줄 운동 수를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(12);

  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExerciseList = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/ai/exercise/list');
        setExerciseList(response.data.result);
        console.log('response: ', response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExerciseList();
  }, []);

  if (!exerciseList) {
    return <LoadingModal />;
  }

  const handleRowClick = (exerciseName) => {
    // 운동 ID를 파라미터로 전달하여 운동 정보 페이지로 이동
    navigate(`/aiservice/workout/${exerciseName}`);
  };

  // 현재 페이지에 해당하는 운동 목록 계산
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exerciseList.slice(indexOfFirstExercise, indexOfLastExercise);

  // 페이지 번호 클릭 시 실행되는 함수
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션에 표시할 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(exerciseList.length / exercisesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>운동 자세 분석 AI</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>운동 이름</th>
              </tr>
            </thead>
            <tbody>
              {currentExercises.map((exercise, index) => (
                <tr key={index} onClick={() => handleRowClick(exercise)}>
                  <td>{exercise}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Stack direction="horizontal" spacing={2}>
            <Pagination>
              {pageNumbers.map((number) => (
                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageClick(number)}>
                  {number}
                </Pagination.Item>
              ))}
            </Pagination>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default WorkoutAi;