import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Form, Pagination, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../../components/LoadingModal';

function WorkoutAiVersion(props) {
  const [aiVerData, setAiVerData] = useState(null); // AI 모델 정보를 저장할 상태
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);
  // 현재 페이지 번호를 저장할 상태 및 보여줄 모델 수를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [modelsPerPage] = useState(12);
  // 선택된 버전을 저장할 상태
  const [selectedVersion, setSelectedVersion] = useState(null);
  
  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchVerData = async () => {
      try {
        console.log('?props: ', props);
        const response = await axios.get(process.env.REACT_APP_API_URL + `/ai/exercise/${props.exerciseName}`);

        setAiVerData(response.data.result);
        setKeys(extractKeys(response.data.result));
        setValues(extractValues(response.data.result, extractKeys(response.data.result)));
        console.log('!aiVerData: ', aiVerData);
      } catch (error) {
        // alert('Error fetching data:', error.response.data.message);
        if(error.response.data.code === 310) {
          alert('AI 모델이 존재하지 않습니다.');
          setAiVerData([]);
        }
        console.error('Error fetching ver data:', error);
      }
    };
    
    fetchVerData();
  }, []);

  useEffect(() => {
    console.log("values: ", values);
    for (let i = 0; i < values.length; i++) {
      console.log('values[i].version: ', values[i].version);
      if (values[i].Inuse === "true") {
        console.log('selectedVersion: ', values[i].version);
        setSelectedVersion(values[i].version);
        console.log("selectedVersion: ", selectedVersion);
      }
    }
  }, [values]);

  
  // AI 모델 정보에서 키와 값 추출
  const extractKeys = (data) => {
    const keys = new Set();
    Object.values(data).forEach((arr) =>
      arr.forEach((str) => keys.add(str.split(": ")[0]))
    );
    return Array.from(keys);
  }; 
  const extractValues = (data, keys) => {
    return Object.entries(data)
      .flatMap(([_, arr]) => {
        const values = {};
        keys.forEach((k) => {
          const match = arr.find((str) => str.startsWith(k + ":"));
          values[k] = match ? match.split(": ")[1] : "";
        });
        return values;
      })
      .sort((a, b) => {
        const versionA = parseFloat(a.version) || 0;
        const versionB = parseFloat(b.version) || 0;
        return versionA - versionB;
      });
  };
  

  if (!aiVerData) {
    return <LoadingModal />;
  }

  const handleRowClick = (aiVer) => {
    // Navigate to the desired page with the ai ID as a parameter
    navigate(`/aiservice/workout/${props.exerciseName}/${aiVer}`);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + `/ai/exercise/apply/${props.exerciseName}/${selectedVersion}`);
      if (response.data.success) {
        alert('적용 성공');
        navigate('/aiservice/workout');
      } else {
        alert('적용 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('!Error applying AI model:', error);
    }
  };

  // 현재 페이지에 해당하는 모델 목록 계산
  const indexOfLastModel = currentPage * modelsPerPage;
  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = values.slice(indexOfFirstModel, indexOfLastModel);

  // 페이지 번호 클릭 시 실행되는 함수
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션에 표시할 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(values.length / modelsPerPage); i++) {
    pageNumbers.push(i);
  }

  if(!currentModels || !keys || !values) {
    return <LoadingModal />;
  }
  
  const handleRadioChange = (version) => {
    setSelectedVersion(version);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>{props.exerciseName + " 모델 관리"}</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                {keys.map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
                <th>선택</th>
              </tr>
            </thead>
            <tbody>
              {currentModels.map(({ key, ...val })=>
                console.log('!values.version: ', val.version, " type: ", typeof val.version)
              )}
              {currentModels.map(({ key, ...val }) => (
                <tr
                  key={val.version}
                  onClick={() => handleRowClick(val.version)}
                >
                  {keys.map((k, index) => (
                    <td key={`${key}-${index}`}>{val[k]}</td>
                  ))}
                  <td>
                    <Form.Check 
                      type="radio" 
                      checked={val.version === selectedVersion}
                      onChange={() => handleRadioChange(val.version)}
                      onClick={(e) => e.stopPropagation()} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Stack direction="horizontal">
        <Pagination className='mt-3'>
          {pageNumbers.map((number) => (
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageClick(number)}>
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
        <Button variant="primary" className='ms-auto' onClick={handleApply} style={{fontWeight: 'bold'}} >
          <span className="material-symbols-outlined" style={{ verticalAlign: "middle", fontVariationSettings: "'FILL' 1"}}>publish</span>
          <span style={{verticalAlign: "middle"}}> 적용</span>
        </Button>
      </Stack>
    </Container>
  );
}

function WorkoutAiManage({ exerciseName }) {
  console.log("id: " + exerciseName);

  return(
    <WorkoutAiVersion exerciseName={ exerciseName }/>
  );

}

export default WorkoutAiManage;