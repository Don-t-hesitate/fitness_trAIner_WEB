import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../components/LoadingModal";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Sheet,
  Stack,
  Table as MuiTable,
  Button as MuiButton,
  ButtonGroup,
} from "@mui/joy";
import {
  ChevronRightRounded as ChevronRightRoundedIcon,
  HomeRounded as HomeRoundedIcon,
} from "@mui/icons-material";

function WorkoutAiInfo({ parentId, subId }) {
  const [aiData, setAiData] = useState(null); // 운동 AI 정보를 저장할 상태
  const [params, setParams] = useState(null); // 운동 AI 파라미터를 저장할 상태
  const [created, setCreated] = useState(null); // 운동 AI 생성시간을 저장할 상태
  const [inuse, setInuse] = useState(null); // 운동 AI 사용 여부를 저장할 상태

  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAiData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL_BLD +
            // "/api" +
            `/ai/exercise/${parentId}/${subId}`
        );
        setAiData(response.data.result);
        console.log("inuse: ", response.data.result.Inuse);
        setInuse(response.data.result.Inuse);
        console.log("res : ", response.data.result);
        // console.log('response: ', response.data.result);
      } catch (error) {
        console.error("Error fetching ai data:", error);
      }
    };

    fetchAiData();
    console.log(aiData);
  }, [parentId, subId]);

  useEffect(() => {
    if (aiData) {
      setParams(aiData.modelParams);
      setCreated(aiData.createdTime);
      console.log("!params:", params);
    }
  }, [aiData]);

  const handleClick = (e) => {
    e.preventDefault();
    const confirm = window.confirm("정말로 삭제하시겠습니까?");
    if (confirm) {
      handleDelete(e);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let dir = "";
      if (inuse) {
        dir = "Inuse&";
      }
      const response = await axios.delete(
        process.env.REACT_APP_API_URL_BLD +
          `/ai/exercise/${parentId}/${dir + aiData.modelFile}`
      );
      if (response.data.success) {
        alert("삭제 성공");
        navigate("/aiservice/workout");
      } else {
        alert("삭제 실패: " + response.data.message);
      }
    } catch (error) {
      console.error(
        "Error deleting exercise data:",
        error.response.data.message
      );
      alert("삭제 실패: " + error.response.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        process.env.REACT_APP_API_URL_BLD + `/ai/exercise/${parentId}/${subId}`
      );
      if (response.data.success) {
        alert("업데이트 성공");
        navigate("/aiservice/workout");
      } else {
        alert("업데이트 실패: " + response.data.message);
      }
    } catch (error) {
      console.error(
        "Error updating exercise data:",
        error.response.data.message
      );
      alert("업데이트 실패: " + error.response.data.message);
    }
  };

  // 운동 AI 정보가 없는 경우 로딩 모달 표시
  if (!params) {
    return <LoadingModal data={params} />;
  }

  const returnDate = () => {
    const date = new Date(created);
    return date.toLocaleString();
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
            underline="hover"
            color="neutral"
            href="/aiservice/workout"
            aria-label="AI 운동 자세 분석"
            fontSize={12}
          >
            운동 자세 분석 AI 목록
          </Link>
          <Link
            underline="hover"
            color="neutral"
            href={`/aiservice/workout/${parentId}`}
            aria-label="AI 운동 자세 분석"
            fontSize={12}
          >
            {parentId} 모델 관리
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            모델 상세
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
        <Form>
          <Form.Group as={Row}>
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
              <Form.Control value={parentId} disabled />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
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
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                버전
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={params.version}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                repeat
              </span>
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                반복 횟수
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={params.iteration}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                layers
              </span>
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                depth
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={params.depth}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                pace
              </span>
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                learning rate
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={params.learning_rate}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                settings
              </span>
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                에포크 수
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={params.num_epochs}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                trending_down
              </span>
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                dropout
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={"0.2"}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                picture_in_picture
              </span>
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                batch size
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={"64"}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
            </Col>
          </Form.Group>
          <Stack direction justifyContent="space-between">
            <div>
              <Typography
                variant="h6"
                fontWeight={500}
                style={{ fontFamily: "Pretendard-Regular", color: "#171a1c" }}
              >
                사용 데이터셋: 001-1-1-01-A2
              </Typography>
              <Typography
                variant="h6"
                fontWeight={500}
                style={{ fontFamily: "Pretendard-Regular", color: "#171a1c" }}
              >
                업데이트 일시: {returnDate()}
              </Typography>
            </div>
            <ButtonGroup sx={{ height: "36px" }}>
              <MuiButton
                variant="solid"
                color="primary"
                onClick={handleUpdate}
                startDecorator={
                  <span
                    className="material-symbols-outlined"
                    style={{ marginRight: "5px" }}
                  >
                    sync_alt
                  </span>
                }
              >
                <span style={{ verticalAlign: "middle", fontWeight: "bold" }}>
                  업데이트
                </span>
              </MuiButton>
              <MuiButton
                variant="solid"
                color="danger"
                onClick={handleClick}
                startDecorator={
                  <span
                    className="material-symbols-outlined"
                    style={{ marginRight: "5px" }}
                  >
                    delete
                  </span>
                }
              >
                <span style={{ verticalAlign: "middle", fontWeight: "bold" }}>
                  삭제
                </span>
              </MuiButton>
            </ButtonGroup>
          </Stack>
        </Form>
      </Sheet>
    </>
  );
}

export default WorkoutAiInfo;
