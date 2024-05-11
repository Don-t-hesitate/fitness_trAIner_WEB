import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Pagination, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import JSZip from 'jszip';

function ExercisePoseManage({ poseTypeName }) {
  const [files, setFiles] = useState([]); // 서버에서 받아오는 파일을 저장할 상태
  const [exerciseNameList, setExerciseNameList] = useState([]); // 운동 이름을 저장할 상태
  // 현재 페이지 번호를 저장할 상태 및 보여줄 운동 수를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(12);
  const [realPoseTypeName, setRealPoseTypeName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const settingRealPoseTypeName = async () => {
      try {
        if (poseTypeName === 'bodyweight') {
          setRealPoseTypeName('Bodyweight');
        } else if (poseTypeName === 'dumbbell-barbell') {
          setRealPoseTypeName('Dumbbell-barbell');
        } else if (poseTypeName === 'machine') {
          setRealPoseTypeName('Machine');
        }
      } catch (error) {
        console.error('Error setting realPoseTypeName:', error);
      }
    }
    settingRealPoseTypeName();
  }, [poseTypeName]);

  useEffect(() => {
    const fetchPoseData = async () => {
      try {
        console.log('realPoseTypeName: ', realPoseTypeName);
        const response = await axios.get(process.env.REACT_APP_API_URL + `/ai/pose/${realPoseTypeName}`, { responseType: 'blob' });
        console.log('response: ', response);
        try {
          const zip = new JSZip();
          const zipData = await zip.loadAsync(response.data);
          console.log('zipData: ', zipData);
          const fileList = [];

          zip.forEach((relativePath, zipEntry) => {
            if (!zipEntry.dir) {
              const isImage = zipEntry.name.match(/\.(jpg|jpeg|png|gif|bmp)$/i);
              fileList.push({ name: relativePath, content: zipEntry.async(isImage ? 'base64' : 'text') });
            }
          });
          const fileContents = await Promise.all(fileList.map(async (file) => ({
            name: file.name,
            content: await file.content,
            isImage: file.name.match(/\.(jpg|jpeg|png|gif|bmp)$/i),
          })));
  
          console.log('?fileContents: ', fileContents); 
          setFiles([...fileContents]); // 그냥 하면 얕은 복사(객체 참조)가 되므로 [...fileContents]로 깊은 복사
        } catch (e) {
          console.error('Error reading ZIP file:', e);
        }
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };
  
    fetchPoseData();
  }, [poseTypeName, realPoseTypeName]);

  useEffect(() => {
    const settingFiles = async () => {
      try {
        console.log('files: ', files);
        let newExerciseNameList = [...exerciseNameList];
        files.forEach(file => {
          if (!newExerciseNameList.includes(file.name.split('/')[1])) {
            newExerciseNameList.push(file.name.split('/')[1]);
          }
        });
        setExerciseNameList(newExerciseNameList);
        // setExerciseNameList([...exerciseNameList].sort());
        console.log('exerciseNameList: ', exerciseNameList);
      } catch (error) {
        console.error('Error setting files:', error);
      }
    }
    settingFiles();
  }, [files]);

  if (!files) {
    return <div>Loading...</div>;
  }

  const handleRowClick = (exerciseId) => {
    // 운동 ID를 파라미터로 전달하여 운동 정보 페이지로 이동
    navigate(`/exercise/pose/${poseTypeName}/${exerciseId}`);
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
          <h2>운동 자세 데이터 관리 -
            {
              poseTypeName === 'bodyweight' ? ' 맨몸 운동' :
              poseTypeName === 'dumbbell-barbell' ? ' 덤벨/바벨 운동' :
              poseTypeName === 'machine' ? ' 기구 운동' :
              ''
            }
          </h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>운동 이름</th>
              </tr>
            </thead>
            <tbody>
              {
                currentExercises.map((exercise, index) => (
                  <tr key={exercise} onClick={() => handleRowClick(exercise)}>
                    <td>{exercise}</td>
                  </tr>
                ))
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