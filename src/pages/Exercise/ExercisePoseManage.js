import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Pagination, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../../components/LoadingModal';

function ExercisePoseManage({ poseTypeName }) {
  // const [files, setFiles] = useState(''); // 서버에서 받아오는 파일을 저장할 상태
  const [exerciseNameList, setExerciseNameList] = useState([]); // 운동 이름을 저장할 상태
  // 현재 페이지 번호를 저장할 상태 및 보여줄 운동 수를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(12);
  // const [realPoseTypeName, setRealPoseTypeName] = useState('');

  const navigate = useNavigate();

  // useEffect(() => {
  //   const settingRealPoseTypeName = async () => {
  //     try {
  //       // 첫 글자만 대문자로 변환
  //       setRealPoseTypeName(poseTypeName.charAt(0).toUpperCase() + poseTypeName.slice(1));
  //       console.log(realPoseTypeName);
  //     } catch (error) {
  //       console.error('Error setting realPoseTypeName:', error);
  //     }
  //   }
  //   settingRealPoseTypeName();
  // }, [poseTypeName]);

  useEffect(() => {
    const fetchPoseData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL_BLD + `/ai/pose`);
        console.log('response: ', response);
        setExerciseNameList(response.data.result);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };
  
    fetchPoseData();
  }, []);

  if (!exerciseNameList) {
    return <LoadingModal />;
  }

  const handleRowClick = (exerciseName) => {
    // 운동 ID를 파라미터로 전달하여 운동 정보 페이지로 이동
    navigate(`/exercise/pose/${exerciseName}`);
  };

  // 현재 페이지에 해당하는 운동 목록 계산
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  console.log('exerciseNameList: ', exerciseNameList);
  const currentExercises = exerciseNameList.slice(indexOfFirstExercise, indexOfLastExercise);

  // 페이지 번호 클릭 시 실행되는 함수
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션에 표시할 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(exerciseNameList.length / exercisesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>운동 자세 데이터 관리</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>운동 이름</th>
              </tr>
            </thead>
            <tbody>
              {
                exerciseNameList.length > 0 ? currentExercises.map((exerciseName, index) => {
                  return (
                    <tr key={index} onClick={() => handleRowClick(exerciseName)}>
                      <td>{exerciseName}</td>
                    </tr>
                  );
                }) : (<tr><td>운동 자세 데이터가 없습니다.</td></tr>)
              }
            </tbody>
          </Table>
        </Col>
      </Row>
      <Stack direction="horizontal">
        <Pagination>
          {pageNumbers.map((number) => (
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageClick(number)}>
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
        <Button variant="primary" className='ms-auto' href="/exercise/pose/add">
          <span className="material-symbols-outlined" style={{ verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>add</span>
          <span style={{verticalAlign: "middle", fontWeight: "bold"}}> 추가</span>
        </Button>
      </Stack>
    </Container>
  );
}

export default ExercisePoseManage;