import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../components/LoadingModal";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Sheet,
  Stack,
  Button as MuiButton,
  ButtonGroup,
} from "@mui/joy";
import {
  ChevronRightRounded as ChevronRightRoundedIcon,
  HomeRounded as HomeRoundedIcon,
  CloudDownload as CloudDownloadIcon,
} from "@mui/icons-material";
import { ModalContext } from "../../ModalContext";

export let cancelModelInfoDownload;

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
            `/ai/exercise/${parentId}/${subId}`
        );
        setAiData(response.data.result);
        setInuse(response.data.result.Inuse);
      } catch (error) {
        console.error("Error fetching ai data:", error);
      }
    };

    fetchAiData();
  }, [parentId, subId]);

  useEffect(() => {
    if (aiData) {
      setParams(aiData.modelParams);
      setCreated(aiData.createdTime);
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

  // ModalContext에서 로딩 모달을 사용하기 위한 상태와 함수를 가져옴
  const { startLoading, stopLoading, setProgress, setType, setCancel } =
    useContext(ModalContext);

  const handleDownload = async (e, subId) => {
    e.preventDefault();
    // 버전이 1.0이나 2.0 같은 형식이면 .0을 제거, 1.0.1 같은 형식이면 제거하지 않음
    if (subId.split(".").length === 2 && subId.includes(".0")) {
      subId = subId.split(".")[0];
    } else {
      console.log("subId: ", subId);
    }

    // axios 요청을 취소하는 함수를 저장할 변수
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    cancelModelInfoDownload = source.cancel;

    try {
      startLoading(); // 로딩 모달 표시
      setType("model"); // 내려받기 타입 설정
      const response = await axios.get(
        process.env.REACT_APP_API_URL_BLD +
          `/ai/exercise/download/${parentId}/${subId}`,
        {
          cancelToken: source.token,
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            const totalSize = progressEvent.total;
            const downloadedSize = progressEvent.loaded;
            const progress = (downloadedSize / totalSize) * 100;
            setProgress(progress);
          },
        }
      );
      if (response.data) {
        // 파일 저장 다이얼로그 띄우기
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${parentId}_model.zip`;
        link.click();
      } else {
        console.error("Error downloading AI model:", response);
        alert("받기 실패: ", response);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Download canceled:", error.message);
        alert("받기 취소됨");
      } else {
        console.error("Error downloading AI model:", error);
        alert(
          "모델 받기 작업 중 오류 발생: ",
          `\n${error.response.status}: ${error.response.statusText}`
        );
      }
    } finally {
      stopLoading(); // 로딩 모달 닫기
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
              <Form.Control value={params.version} disabled />
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
                error
              </span>
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                손실
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control value={params.loss} disabled />
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
                grading
              </span>
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                정확도
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control value={params.accuracy} disabled />
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
                book_5
              </span>
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                학습률
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control value={params.learning_rate} disabled />
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
                aspect_ratio
              </span>
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                배치 크기
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control value={params.batch_size} disabled />
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
                에포크 수
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control value={params.num_epochs} disabled />
            </Col>
          </Form.Group>
          <Stack direction justifyContent="space-between" position="relative">
            <div>
              <Typography
                variant="h6"
                fontWeight={500}
                style={{ fontFamily: "Pretendard-Regular", color: "#171a1c" }}
              >
                업데이트 일시: {returnDate()}
              </Typography>
            </div>
            <ButtonGroup
              // buttonFlex="1 0 120px"
              sx={{
                height: "36px",
                // minWidth: "240px",
              }}
            >
              <MuiButton
                variant="solid"
                color="primary"
                size="md"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(e, subId);
                }}
                startDecorator={<CloudDownloadIcon />}
              >
                <span style={{ verticalAlign: "middle", fontWeight: "bold" }}>
                  내려받기
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
