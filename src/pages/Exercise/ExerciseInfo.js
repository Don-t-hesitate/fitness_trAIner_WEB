import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UploadBox from "../../components/UploadBox";
import LoadingModal from "../../components/LoadingModal";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Sheet,
  Button as MuiButton,
  Stack,
} from "@mui/joy";
import {
  ChevronRightRounded as ChevronRightRoundedIcon,
  HomeRounded as HomeRoundedIcon,
} from "@mui/icons-material";

function ExerciseInfo({ exerId }) {
  const [exerciseData, setExerciseData] = useState(null); // 운동 데이터를 저장할 상태
  const [exerciseId, setExerciseId] = useState(""); // 운동 ID를 저장할 상태
  const [exerciseName, setExerciseName] = useState(""); // 운동 이름을 저장할 상태
  const [perKcal, setPerKcal] = useState(""); // 운동 소모 칼로리를 저장할 상태
  const [exerciseType, setExerciseType] = useState(""); // 운동 타입을 저장할 상태
  const [formData, setFormData] = useState(null); // 운동 영상 URL을 저장할 상태

  // 운동 영상 존재 여부에 따라 <div> 안의 컴포넌트를 조건부 렌더링하기 위한 상태
  const [videoUrl, setVideoUrl] = useState(null);
  const [showUploadBox, setShowUploadBox] = useState(false);

  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  // 컴포넌트가 마운트될 때 한 번만 실행
  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL_BLD + `/exercises`
        );

        let data = response.data.result.exerciseList;
        data = data.find((item) => item.exerciseId === Number(exerId));
        setExerciseData(data);

        if (data) {
          // 각 필드 상태 업데이트
          setExerciseId(data.exerciseId);
          setExerciseName(data.exerciseName);
          setPerKcal(data.perKcal);
          setExerciseType(data.exerciseType);

          // 운동 영상 URL 가져오기
          const fetchVideoUrl = async () => {
            try {
              const videoResponse = await axios.get(
                process.env.REACT_APP_API_URL_BLD +
                  `/exercises/video/stream/${data.exerciseName}`,
                {
                  responseType: "blob",
                }
              );
              if (videoResponse.status === 200) {
                const blob = videoResponse.data;
                const videoUrl = URL.createObjectURL(blob);
                setVideoUrl(videoUrl);
                setShowUploadBox(false);
              } else {
                setShowUploadBox(true);
              }
            } catch (error) {
              setShowUploadBox(true);
              console.log("Error fetching video URL:", error);
            }
          };
          fetchVideoUrl();
        }
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      }
    };

    fetchExerciseData(); // 운동 데이터 가져오는 함수 실행
  }, [exerId]); // exerId가 변경될 때마다 실행

  // 삭제 버튼 클릭 시 실행되는 함수
  const deleteClick = (e) => {
    e.preventDefault();
    const check = window.confirm("정말 해당 운동을 삭제하시겠습니까?");
    if (check) {
      handleDelete(e);
    }
  };

  const videoPurge = async (e) => {
    e.preventDefault();
    const check = window.confirm("정말 영상을 삭제하시겠습니까?");
    if (check) {
      try {
        const response = await axios.delete(
          process.env.REACT_APP_API_URL_BLD +
            `/exercises/video/${exerciseData.exerciseName}`
        );
        if (response.data.success) {
          alert("영상 삭제 성공");
          setVideoUrl(null);
          setShowUploadBox(true);
          window.location.reload();
        } else {
          alert("영상 삭제 실패");
        }
      } catch (error) {
        console.log("Error deleting video:" + error);
        alert("Error deleting video:" + error);
      }
    }
  };

  // 운동 정보 삭제 함수
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        process.env.REACT_APP_API_URL_BLD +
          `/exercises/${exerciseData.exerciseName}`
      );
      if (response.data.success) {
        alert(response.data.result + ": 성공적으로 삭제됨");
        navigate("/exercise");
      } else {
        alert("운동 정보 삭제 실패");
      }
    } catch (error) {
      alert("Error deleting exercise data:", error.response.data.message);
    }
  };

  // 파일 업로드 함수
  const handleFileUpload = (data) => {
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData) {
        console.log("uploadFile: ", formData.get("file"));
        const response = await axios.post(
          process.env.REACT_APP_API_URL_BLD +
            `/exercises/video/${exerciseName}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success) {
          alert("영상 업로드 성공");
          window.location.reload();
        }
        // 비디오 업로드 성공 시 추가 작업 수행 (예: 비디오 URL 저장)
      }
    } catch (error) {
      // 에러 메시지 출력
      console.log("error: ", error);
      alert("영상 업로드 중 에러 발생:", error.response.data.message);
    }
  };

  // exerciseData가 null인 경우 (데이터 로딩 중) 로딩 메시지 표시
  if (!exerciseData) {
    return <LoadingModal data={exerciseData} />;
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="sm" />}
          sx={{ pl: 0 }}
        >
          <Link
            underline="none" // hover는 마우스를 올렸을 때 밑줄이 생기는 것
            color="neutral"
            href="/dashboard"
            aria-label="Home"
          >
            <HomeRoundedIcon />
          </Link>
          <Link
            underline="hover"
            color="neutral"
            href="/exercise"
            fontSize={12}
            fontWeight={500}
          >
            운동 카테고리 관리
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            운동 카테고리 상세
          </Typography>
        </Breadcrumbs>
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          mt: 2,
          p: 2,
          borderRadius: "sm",
          "& form": {
            display: "flex",
            flexDirection: "column",
            gap: 2,
          },
          [`& .MuiFormLabel-asterisk`]: {
            visibility: "hidden",
          },
          position: "relative",
        }}
      >
        {videoUrl && (
          <Button
            variant="danger"
            onClick={videoPurge}
            style={{ fontWeight: "bold" }}
          >
            <span
              className="material-symbols-outlined"
              style={{ verticalAlign: "middle" }}
            >
              movie_off
            </span>
            <span style={{ verticalAlign: "middle" }}> 영상 삭제</span>
          </Button>
        )}
        <div
          style={{
            height: "45vh",
            marginBottom: "20px",
            position: "relative",
          }}
        >
          {videoUrl && (
            <video
              src={videoUrl}
              controls
              style={{ width: "100%", height: "100%", paddingBottom: "50px" }}
            />
          )}
          {showUploadBox && (
            <div
              style={{
                border: "1px solid #ccc",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <UploadBox onFileUpload={handleFileUpload} extension={"mp4"} />
            </div>
          )}
        </div>
        <div style={{ position: "relative", height: "20px" }}>
          {formData && (
            <Button
              variant="primary"
              onClick={handleSubmit}
              style={{
                fontWeight: "bold",
                position: "absolute",
                bottom: "0",
                right: "0",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ verticalAlign: "middle" }}
              >
                upload
              </span>
              <span style={{ verticalAlign: "middle" }}> 영상 업로드</span>
            </Button>
          )}
        </div>
        <Form>
          <Form.Group as={Row} style={{ marginBottom: "0px" }}>
            <Form.Label column sm="3">
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                format_list_numbered
              </span>
              <span style={{ verticalAlign: "middle" }}> 번호</span>
            </Form.Label>
            <Col sm="9">
              <Form.Control value={exerciseId} disabled />
            </Col>
          </Form.Group>
          <Form.Group as={Row} style={{ marginBottom: "0px" }}>
            <Form.Label column sm="3">
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                exercise
              </span>
              <span style={{ verticalAlign: "middle" }}> 운동 이름</span>
            </Form.Label>
            <Col sm="9">
              <Form.Control value={exerciseName || ""} disabled />
            </Col>
          </Form.Group>
          <Form.Group as={Row} style={{ marginBottom: "0px" }}>
            <Form.Label column sm="3">
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                local_fire_department
              </span>
              <span style={{ verticalAlign: "middle" }}> 소모 칼로리</span>
            </Form.Label>
            <Col sm="9">
              <Form.Control value={perKcal || ""} disabled />
            </Col>
          </Form.Group>
          <Form.Group as={Row} style={{ marginBottom: "0px" }}>
            <Form.Label column sm="3">
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                category
              </span>
              <span style={{ verticalAlign: "middle" }}> 운동 타입</span>
            </Form.Label>
            <Col sm="9">
              <Form.Control value={exerciseType || ""} disabled />
            </Col>
          </Form.Group>
          <Stack direction justifyContent={"flex-end"}>
            <MuiButton
              color="danger"
              onClick={deleteClick}
              style={{ fontWeight: "bold" }}
              startDecorator={
                <span
                  className="material-symbols-outlined"
                  style={{ verticalAlign: "middle" }}
                >
                  delete
                </span>
              }
            >
              <span
                style={{
                  verticalAlign: "middle",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {" "}
                운동 삭제
              </span>
            </MuiButton>
          </Stack>
        </Form>
      </Sheet>
    </>
  );
}

export default ExerciseInfo;
