import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Button, Pagination, Stack } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import LoadingModal from "../../components/LoadingModal";

function ExercisePoseNameList(props) {
  const [exerciseData, setExerciseData] = useState([]); // 운동 데이터를 저장할 상태
  // 현재 페이지 번호를 저장할 상태 및 보여줄 운동 수를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(12);

  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL_BLD + `/ai/pose/${props.exerciseName}`);
        setExerciseData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (dataType) => {
    navigate(`/exercise/pose/${props.exerciseName}/${dataType}`);
  }

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
  
  if (!exerciseData) {
    return <LoadingModal />;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>{props.exerciseName} 자세 데이터 타입</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>데이터 타입</th>
                {/* Add more table headers if needed */}
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
        </Col>
      </Row>
      <Stack direction="horizontal" spacing={2} style={{ justifyContent: 'center' }}>
        <Pagination>
          {pageNumbers.map((number) => (
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageClick(number)}>
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </Stack>
    </Container>
  );
};

function ExercisePoseDataList(props) {
  const [exerciseData, setExerciseData] = useState([]); // 운동 데이터를 저장할 상태
  // 현재 페이지 번호를 저장할 상태 및 보여줄 운동 수를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(12);

  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL_BLD + `/ai/pose/${props.exerciseName}/${props.dataType}`);
        setExerciseData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (fileName) => {
    navigate(`/exercise/pose/${props.exerciseName}/${props.dataType}/${fileName}`);
  }

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

  
  // 화면 크기 계산 로직
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // 최대 페이지 번호 계산
  const maxPage = Math.ceil(exerciseData.length / exercisesPerPage);

  // 표시할 페이지 번호 범위 계산 로직
  const getPageNumberRange = (currentPage, maxPage, windowWidth) => {
    const delta = windowWidth > 768 ? 5 : 2; // 화면 크기에 따라 delta 값 조정
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(maxPage, currentPage + delta);

    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };
  
  // 페이지 번호 범위 계산
  const pageNumberRange = getPageNumberRange(currentPage, maxPage, windowWidth);
  
  if (!exerciseData) {
    return <LoadingModal />;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>{props.exerciseName} 자세 데이터 목록</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>데이터 타입</th>
                {/* Add more table headers if needed */}
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
        </Col>
      </Row>
        <Stack direction="horizontal" spacing={2} style={{ justifyContent: 'center' }}>
          <Pagination>
            {/* 첫 번째 페이지로 이동 버튼 */}
            <Pagination.First onClick={() => handlePageClick(1)} />

            {/* 이전 페이지로 이동 버튼 */}
            <Pagination.Prev
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
            />
            
            {/* <Pagination.Item key={1} active={currentPage === 1} onClick={() => handlePageClick(1)} >1</Pagination.Item> */}

            {/* 처음 페이지 번호 표시 */}
            {currentPage > 4 && (
              <>
                <Pagination.Ellipsis disabled />
              </>
            )}

            {/* 현재 페이지와 가까운 번호들만 표시 */}
            {pageNumberRange.map((number) => (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageClick(number)}
              >
                {number}
              </Pagination.Item>
            ))}

            {/* 마지막 페이지 번호 표시 */}
            {currentPage <= maxPage - 3 && (
              <>
                <Pagination.Ellipsis disabled />
              </>
            )}

            {/* <Pagination.Item key={maxPage} active={currentPage === maxPage} onClick={() => handlePageClick(maxPage)} >{maxPage}</Pagination.Item> */}

            {/* 다음 페이지로 이동 버튼 */}
            <Pagination.Next
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === maxPage}
            />

            {/* 마지막 페이지로 이동 버튼 */}
            <Pagination.Last onClick={() => handlePageClick(maxPage)} disabled={currentPage === maxPage} />
          </Pagination>
        </Stack>
    </Container>
  );
}

function ExercisePoseList({ exerciseName, dataType }) {
  if (!dataType) {
    return <ExercisePoseNameList exerciseName={exerciseName} />;
  } else {
    return <ExercisePoseDataList exerciseName={exerciseName} dataType={dataType} />;
  }
}

export default ExercisePoseList;