import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import UploadBox from "../../components/UploadBox";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Sheet,
  Stack,
  Button as MuiButton,
} from "@mui/joy";
import {
  ChevronRightRounded as ChevronRightRoundedIcon,
  HomeRounded as HomeRoundedIcon,
} from "@mui/icons-material";

function ExerciseAdd() {
  const [exerciseName, setExerciseName] = useState(""); // 운동 이름을 저장할 상태
  const [perKcal, setPerKcal] = useState(""); // 운동 소모 칼로리를 저장할 상태
  const [exerciseType, setExerciseType] = useState(""); // 운동 타입을 저장할 상태
  const [formData, setFormData] = useState(null); // 운동 영상 URL을 저장할 상태

  // 숫자만 입력 가능하도록 하는 함수의 에러용 상태
  const [error, setError] = useState(null);

  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  // 파일 업로드 함수
  const handleFileUpload = (data) => {
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        exerciseName,
        exerciseType,
        perKcal,
      };

      const response = await axios.post(
        process.env.REACT_APP_API_URL_BLD + `/exercises`,
        data
      );

      // response 객체와 response.data 객체가 존재하는지 확인
      if (response && response.data) {
        if (response.data.success) {
          if (formData) {
            console.log("uploadFile: ", formData.get("file"));
            const videoResponse = await axios.post(
              process.env.REACT_APP_API_URL_BLD +
                `/exercises/video/${exerciseName}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log("Video upload response: ", videoResponse);
          }
          alert("운동 추가 성공: ", response.data.message);
          navigate("/exercise");
        } else {
          alert("운동 추가 실패: " + response.data.message);
        }
      } else {
        // response 객체나 response.data 객체가 없는 경우 처리
        alert("서버 응답 오류: " + response.data.message);
      }
    } catch (error) {
      console.log("error: ", error);
      alert("Error adding exercise data:", error.response.data.message);
    }
  };

  // 숫자만 입력 가능하도록 하는 함수
  const handleChange = (e, setValue, setError) => {
    const inputValue = e.target.value;
    const isNumber = /^\d+$/.test(inputValue);

    if (!isNumber && inputValue !== "") {
      setError("숫자(소수점 *제외*)만 입력 가능합니다.");
    } else {
      setError(null);
      setValue(inputValue);
    }
  };

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
            underline="hover" // hover는 마우스를 올렸을 때 밑줄이 생기는 것
            color="neutral"
            href="/exercise_pose"
            aria-label="Home"
            fontSize={12}
          >
            운동 카테고리 관리
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            운동 카테고리 추가
          </Typography>
        </Breadcrumbs>
      </Box>
      <Typography level="h2" fontWeight={700} fontFamily="Pretendard-Regular">
        운동 카테고리 추가
      </Typography>
      <Sheet
        variant="outlined"
        sx={{
          padding: 2,
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
        <div
          style={{ height: "50vh", marginBottom: "20px", position: "relative" }}
        >
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
            <UploadBox onFileUpload={handleFileUpload} />
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
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
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                운동 이름
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                onChange={(e) => setExerciseName(e.target.value)}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
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
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                소모 칼로리
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={perKcal || ""}
                onChange={(e) => handleChange(e, setPerKcal, setError)}
                isInvalid={!!error}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
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
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                운동 타입
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                onChange={(e) => setExerciseType(e.target.value)}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
            </Col>
            <Stack direction justifyContent="flex-end">
              <MuiButton
                color="primary"
                type="submit"
                style={{ marginTop: "10px" }}
                startDecorator={
                  <span
                    className="material-symbols-outlined"
                    style={{
                      verticalAlign: "middle",
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    send
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
                  추가
                </span>
              </MuiButton>
            </Stack>
          </Form.Group>
        </Form>
      </Sheet>
    </>
  );
}

export default ExerciseAdd;
