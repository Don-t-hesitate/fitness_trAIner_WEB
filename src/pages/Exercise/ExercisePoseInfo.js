import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import JSZip, { file } from 'jszip';
import LoadingModal from "../../components/LoadingModal";

function ExerciseInfo({ exerciseName, dataType, fileName }) {
  const [files, setFiles] = useState([]); // 서버에서 받아오는 파일을 저장할 상태
  // const [jpegFormData, setJpegFormData] = useState([]); // jpeg 파일을 저장할 상태
  const [jsonFormData, setJsonFormData] = useState(null); // json 파일을 저장할 상태
  const [json, setJson] = useState(null); // json 수정을 위한 상태

  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();
  
  // 삭제 버튼 클릭 시 실행되는 함수
  const deleteClick = (e) => {
    e.preventDefault();
    const check = window.confirm("정말 삭제하시겠습니까?");
    if (check) {
      handleDelete(e);
    }
  };

  // 삭제 요청을 보내는 함수
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(process.env.REACT_APP_API_URL_BLD + `/ai/pose/${exerciseName}/${dataType}/${fileName}`);
      if (response.data.success) {
        alert('삭제 성공');
        navigate('/exercise/pose');
      } else {
        alert('삭제 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error deleting exercise data:', error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchPoseData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL_BLD + `/ai/pose/${exerciseName}/${dataType}/${fileName}`, { responseType: 'blob' });
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

          const fileContents = await Promise.all(fileList.map(async (file) => {
            console.log('!file.name.split(\): ', file.name.split('\\'));
            const splitName = file.name.split('\\');
            console.log('!splitName: ', splitName);
            if (file.name.split('\\').indexOf(dataType)) {
              return {
              name: splitName[splitName.indexOf(dataType) + 1],
              content: await file.content,
              isImage: file.name.match(/\.(jpg|jpeg|png|gif|bmp)$/i),
              };
            } else {
              return null;
            }
        }));
  
        console.log('!fileContents: ', fileContents); 
        setFiles([...fileContents]); // 그냥 하면 얕은 복사(객체 참조)가 되므로 [...fileContents]로 깊은 복사
        } catch (e) {
          console.error('Error reading ZIP file:', e);
        }
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };

    fetchPoseData();
  }, [dataType, exerciseName, fileName]);

  useEffect(() => {
    const settingFiles = async () => {
      try {
        const filteredFiles = files.filter(file => file !== null);
        filteredFiles.forEach(file => {
          console.log('!file: ', file);
          if (file.name.endsWith('.json')) {
            setJsonFormData(file);
            console.log('json: ', file);
          // } else if (file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')) {
          //   setJpegFormData(prev => {
          //     // 유일한 이름만 저장
          //     if (!prev.some(existingFile => existingFile.name === file.name)) {
          //       return [...prev, { name: file.name, content: file.content }];
          //     }
          //     return prev;
          //   });
          //   console.log('img: ', file);
          } else {
            console.error('Unknown file type:', file);
          }
        });
        console.log('!jsonFormData: ', jsonFormData);
        setJson(JSON.stringify(JSON.parse(jsonFormData.content), null, 2));
      } catch (error) {
        console.error('Error setting files:', error);
      }
    }
    settingFiles();
    console.log('files: ', files);
  }, [files]);

  

  if (!json) {
    return (
      <LoadingModal />
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>운동 자세 데이터 - <strong>{dataType}</strong></h3>
          {/* <h3>jpg: </h3>
          <div style={{ height: '800px', marginBottom: '5px', position: 'relative' }}>
            <div style={{ border: '1px solid #ccc', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto', overflowY: 'scroll', maxHeight: '80vh' }}>
              {jpegFormData.map((file) => (
                <img src={`data:image/${file.name.split('.').pop()};base64,${file.content}`} alt={file.name} style={{maxWidth: '100%'}} />
              ))}
            </div>
          </div> */}
          <div style={{ height: '70vh', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ border: '1px solid #ccc', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {jsonFormData && (
                <Form style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <Form.Group controlId="jsonContent" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <Form.Control as="textarea" style={{ flex: 1, resize: 'none', backgroundColor: 'lightgrey' }} value={json} onChange={(e) => setJson(e.target.value)}  />
                  </Form.Group>
                </Form>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col>
          <div>
          </div>
        </Col>
        <Col xs="auto" className="ml-auto">
          <Button variant="danger" onClick={deleteClick}>
            <span className="material-symbols-outlined" style={{ verticalAlign: "middle"}}>delete</span>
            <span style={{verticalAlign: "middle", fontWeight: "bold"}}> 삭제</span>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ExerciseInfo;