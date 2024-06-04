import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
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
import "./Nanumgothiccoding.css";

const ProgressWindow = ({ progressMessages }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [progressMessages]);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: "#282c34",
        color: "#abb2bf",
        width: "100%",
        height: "100%",
        padding: "1rem",
        borderRadius: "0.5rem",
        overflowY: "auto",
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
      }}
    >
      {progressMessages.map((message, index) => (
        <div style={{}}>
          {index === 0 ? (
            <span
              style={{
                color: "springgreen",
                fontFamily: "Nanum Gothic Coding",
              }}
            >
              {"입력된 명령: "}
            </span>
          ) : (
            <span
              style={{
                color: "springgreen",
                fontFamily: "Nanum Gothic Coding",
              }}
            >
              {"[" + index + "]:"}
            </span>
          )}
          <span
            key={index}
            style={{
              marginBottom: "0.5rem",
              color: "lightgray",
              fontFamily: "Nanum Gothic Coding",
            }}
          >
            {" " + message}
          </span>
        </div>
      ))}
    </div>
  );
};

function WorkoutAiTrain() {
  const [exercise, setExercise] = useState("push_up"); // 운동 이름을 담을 상태
  const [learningRate, setLearningRate] = useState(0.001); // 학습률을 담을 상태
  const [batchSize, setBatchSize] = useState(32); // 배치 크기를 담을 상태
  const [numEpochs, setNumEpochs] = useState(100); // 에포크 횟수를 담을 상태
  const [version, setVersion] = useState(1); // 버전 정보를 담을 상태
  const [params, setParams] = useState(
    `{"learning_rate": ${learningRate},"batch_size": ${batchSize},"num_epochs": ${numEpochs},"version": ${version}}`
  ); // 하이퍼 파라미터를 담을 상태
  const [filePath, setFilePath] = useState(
    `/home/t24108/v1.0src/ai/fitness/${exercise}/${exercise}_model_training.py`
  ); // 파일 경로를 담을 상태

  // 숫자만 입력할 수 있도록 하는 함수의 에러 메시지를 담을 상태
  const [versionError, setVersionError] = useState(null);
  const [learningRateError, setLearningRateError] = useState(null);
  const [batchSizeError, setBatchSizeError] = useState(null);
  const [numEpochsError, setNumEpochsError] = useState(null);

  // WebSocket 통신을 위한 상태
  const [send, setSend] = useState(false);
  const [socket, setSocket] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  // 파이썬 파일의 학습 진행 상태를 담을 상태
  const [progressMessages, setProgressMessages] = useState([
    "python " + filePath,
  ]);

  useEffect(() => {
    setParams(
      `{"learning_rate":${learningRate},"batch_size":${batchSize},"num_epochs":${numEpochs},"version":${version}}`
    );
  }, [learningRate, batchSize, numEpochs, version]);

  useEffect(() => {
    setProgressMessages(["python " + filePath + " " + params]);
  }, [filePath, exercise, version, params]);

  useEffect(() => {
    setFilePath(
      `/home/t24108/v1.0src/ai/fitness/${exercise}/${exercise}_model_training.py`
    );
  }, [exercise]);

  useEffect(() => {
    if (socket !== null) {
      setStompClient(Stomp.over(socket));
    }
  }, [socket]);

  const connectSocket = () => {
    try {
      const sckt = new SockJS(
        `${process.env.REACT_APP_API_URL_BLD}/ai/workout/train`
      );
      setSocket(sckt);
      console.log("소켓 준비");
      console.log("params: ", params);
    } catch (error) {
      alert("서버와 연결 중 오류가 발생했습니다.");
      console.error("Error while connecting to WebSocket: ", error);
    }
  };
  useEffect(() => {
    if (stompClient !== null) {
      try {
        console.log("소켓 연결 전");
        try {
          stompClient.connect({}, () => {
            console.log("소켓 연결 성공");

            stompClient.subscribe("/topic/progress", (message) => {
              if (message.body === "END") {
                disconnectSocket();
                console.log("학습 완료");
              } else if (message.body === "ERROR") {
                alert("학습 중 오류가 발생했습니다.");
                disconnectSocket();
              } else {
                console.log("message.body: ", message.body);
                if (progressMessages.indexOf("콘솔창") !== -1) {
                  console.log("콘솔창 삭제");
                  setProgressMessages([]);
                }
                setProgressMessages((prevMessages) => [
                  ...prevMessages,
                  message.body,
                ]);
              }
            });

            if (stompClient.connected) {
              const requestData = {
                pythonFilePath: filePath,
                exerciseName: exercise,
                params: params,
              };
              console.log("requestData: ", requestData);
              console.log("type: ", typeof params);
              stompClient.send("/app/start", {}, JSON.stringify(requestData));
            }
          });
        } catch (err) {
          alert("소켓 연결 중 오류가 발생했습니다.");
          console.error("err_con: ", err);
        }

        return () => {
          if (socket) {
            socket.close();
            setSend(false);
          }
        };
      } catch (error) {
        console.error("error_inter: ", error);
        alert("소켓 통신 중 오류가 발생했습니다.");
      }
    }
  }, [stompClient]);

  const disconnectSocket = () => {
    if (socket !== null) {
      socket.close();
      console.log("소켓 연결 끊김");
    } else {
      console.log("소켓 연결 없음");
    }
  };

  // 숫자만 입력할 수 있도록 하는 함수
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

  const handleRnumberChange = (e, setValue, setError) => {
    const inputValue = e.target.value;
    const isNumber = /^\d*\.?\d*$/.test(inputValue); // 실수(소수점 포함) 허용 정규식

    if (!isNumber && inputValue !== "") {
      setError("숫자(소수점 *포함*)만 입력 가능합니다.");
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
          <Typography color="primary" fontWeight={500} fontSize={12}>
            운동 자세 분석 AI 학습
          </Typography>
        </Breadcrumbs>
      </Box>
      <Typography level="h2" fontWeight={700} fontFamily="Pretendard-Regular">
        운동 자세 분석 AI 학습
      </Typography>
      <Sheet
        className="UserTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "initial", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          borderColor: "#fff",
          flexShrink: 1,
          position: "relative",
        }}
      >
        <Stack direction justifyContent="space-between">
          <h3 style={{ color: "dimgrey" }}>콘솔 창:</h3>
          <MuiButton
            color="neutral"
            variant="solid"
            sx={{ height: "36px" }}
            onClick={(e) => {
              e.preventDefault();
              setProgressMessages(["python " + filePath]);
            }}
            startDecorator={
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                restart_alt
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
              콘솔 창 초기화
            </span>
          </MuiButton>
        </Stack>
        <div style={{ height: "45vh", position: "relative" }} className="mb-3">
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
            <ProgressWindow progressMessages={progressMessages} />
          </div>
        </div>
        <Form>
          <Form.Group as={Row} style={{ marginBottom: "10px" }}>
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
                &nbsp;운동 이름
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} style={{ marginBottom: "10px" }}>
            <Form.Label column sm="3">
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                folder
              </span>
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                &nbsp;Python 파일 경로
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={filePath}
                onChange={(e) => setFilePath(e.target.value)}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="3" style={{ marginBottom: "10px" }}>
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
                &nbsp;버전
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={version}
                onChange={(e) =>
                  handleRnumberChange(e, setVersion, setVersionError)
                }
                isInvalid={!!versionError}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
              <Form.Control.Feedback type="invalid">
                {versionError}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} style={{ marginBottom: "10px" }}>
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
                &nbsp;학습률
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={learningRate}
                onChange={(e) =>
                  handleRnumberChange(e, setLearningRate, setLearningRateError)
                }
                isInvalid={!!learningRateError}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
              <Form.Control.Feedback type="invalid">
                {learningRateError}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} style={{ marginBottom: "10px" }}>
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
                &nbsp;배치 크기
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={batchSize}
                onChange={(e) =>
                  handleChange(e, setBatchSize, setBatchSizeError)
                }
                isInvalid={!!batchSizeError}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
              <Form.Control.Feedback type="invalid">
                {batchSizeError}
              </Form.Control.Feedback>
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
                &nbsp;에포크 수
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={numEpochs}
                onChange={(e) =>
                  handleChange(e, setNumEpochs, setNumEpochsError)
                }
                isInvalid={!!numEpochsError}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
              <Form.Control.Feedback type="invalid">
                {numEpochsError}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Form>
        <Stack direction justifyContent="flex-end" marginTop="15px">
          <MuiButton
            onClick={connectSocket}
            disabled={send}
            color="primary"
            startDecorator={
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
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
              학습 시작
            </span>
          </MuiButton>
        </Stack>
      </Sheet>
    </>
  );
}

export default WorkoutAiTrain;
