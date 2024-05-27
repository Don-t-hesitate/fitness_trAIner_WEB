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
  const [version, setVersion] = useState(1); // 버전 정보를 담을 상태
  const [params, setParams] = useState({}); // 전송용 최종 파라미터를 담을 상태
  const [filePath, setFilePath] = useState("/home/t24108/"); // 파일 경로를 담을 상태
  // WebSocket 통신을 위한 상태
  const [send, setSend] = useState(false);
  const [socket, setSocket] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  // 파이썬 파일의 학습 진행 상태를 담을 상태
  const [progressMessages, setProgressMessages] = useState([
    "python " + filePath,
  ]);

  useEffect(() => {
    setProgressMessages(["python " + filePath + " " + formInput]);
  }, [filePath, formInput, exercise, version]);

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
      console.log("formInput: ", formInput);
      const convertToObject = () => {
        const inputValue = formInput.trim();
        console.log("!inputValue: ", inputValue);
        if (inputValue) {
          try {
            const jsonString = `{${inputValue.replace(
              /("([^"]+)")\s*:/g,
              "$1:"
            )}}`;
            const parsedParams = JSON.parse(jsonString);
            console.log("!parsedParams: ", parsedParams);
            setParams(parsedParams);
          } catch (error) {
            console.error("Invalid input:", error);
            setParams(inputValue + " --version " + version);
            console.log("!!params: ", params);
          }
        } else {
          setParams({});
        }
      };
      convertToObject();
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
          minHeight: 0,
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
                code
              </span>
              <span style={{ verticalAlign: "middle" }}>
                &nbsp;하이퍼 파라미터
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                placeholder={"예시: " + formInput}
                onChange={(e) => setFormInput(e.target.value)}
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
                format_list_numbered
              </span>
              <span style={{ verticalAlign: "middle" }}> 버전</span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                value={version}
                onChange={(e) => setVersion(e.target.value)}
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
