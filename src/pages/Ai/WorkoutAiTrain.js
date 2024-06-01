import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Sheet,
  Stack,
  Table as MuiTable,
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
  // const [formInput, setFormInput] = useState(`--learning_rate 0.001 --batch_size 32 --num_epochs 100 --output_file model_params.json`); // 하이퍼 파라미터를 담을 상태
  const [formInput, setFormInput] = useState(``); // 하이퍼 파라미터를 담을 상태
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
      // console.log("formInput: ", formInput);
      // const convertToObject = () => {
      //   const inputValue = formInput.trim();
      //   console.log("!inputValue: ", inputValue);
      //   if (inputValue) {
      //     try {
      //       // `inputValue`에서 큰따옴표로 둘러싸인 문자열 뒤에 오는 공백과 콜론을 찾아, 공백을 제거하고 콜론만 남김
      //       const jsonString = `{${inputValue.replace(
      //         /("([^"]+)")\s*:/g,
      //         "$1:"
      //       )}}`;
      //       const parsedParams = JSON.parse(jsonString);
      //       console.log("!parsedParams: ", parsedParams);
      //       setParams(parsedParams);
      //     } catch (error) {
      //       console.error("Invalid input:", error);
      //       // setParams(inputValue + " --version " + version);
      //       setParams(inputValue);
      //       console.log("!!params: ", params);
      //     }
      //   } else {
      //     console.log("inputValue is empty");
      //     setParams({});
      //   }
      // };
      // convertToObject();
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
              console.log("params: ", params);

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
              <span style={{ verticalAlign: "middle" }}>&nbsp;운동 이름</span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
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
              <span style={{ verticalAlign: "middle" }}>
                &nbsp;Python 파일 경로
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={filePath}
                onChange={(e) => setFilePath(e.target.value)}
              />
            </Col>
          </Form.Group>
          {/* <Form.Group as={Row} style={{ marginBottom: "10px" }}>
            <Form.Label column sm="3">
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                code
              </span>
              <span style={{ verticalAlign: "middle" }}>
                &nbsp;하이퍼 파라미터
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                placeholder={
                  "예시: " +
                  '\'{"learning_rate": 0.002,"batch_size": 32,"num_epochs": 100,"version": 1.2}\''
                }
                onChange={(e) => setFormInput(e.target.value)}
              />
            </Col>
          </Form.Group> */}
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
              <span style={{ verticalAlign: "middle" }}>&nbsp;버전</span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={version}
                onChange={(e) => setVersion(e.target.value)}
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
                book_5
              </span>
              <span style={{ verticalAlign: "middle" }}>&nbsp;학습률</span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={learningRate}
                onChange={(e) => setLearningRate(e.target.value)}
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
                aspect_ratio
              </span>
              <span style={{ verticalAlign: "middle" }}>&nbsp;배치 크기</span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={batchSize}
                onChange={(e) => setBatchSize(e.target.value)}
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
              <span style={{ verticalAlign: "middle" }}>&nbsp;에포크 수</span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={numEpochs}
                onChange={(e) => setNumEpochs(e.target.value)}
              />
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
