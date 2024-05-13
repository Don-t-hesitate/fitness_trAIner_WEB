import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Stack } from "react-bootstrap";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const ProgressWindow = ({ progressMessages }) => {
  return (
    <div
      style={{
        backgroundColor: "#282c34",
        color: "#abb2bf",
        width: "100%",
        padding: "1rem",
        borderRadius: "0.5rem",
        height: "300px",
        overflowY: "auto",
        autoscroll: "true",
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
      }}
    >
      {progressMessages.map((message, index) => (
        <div key={index} style={{ marginBottom: "0.5rem" }}>
          {message}
        </div>
      ))}
    </div>
  );
};

function WorkoutAiTrain() {
  const [formInput, setFormInput] = useState('');
  const [params, setParams] = useState({});
  const [filePath, setFilePath] = useState("");
  const [send, setSend] = useState(false);
  const [socket, setSocket] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [progressMessages, setProgressMessages] = useState([]);

  useEffect(() => {
    if (socket !== null) {
      setStompClient(Stomp.over(socket));
    }
  }, [socket]);

  const connectSocket = () => {
    try {
      const sckt = new SockJS(`http://localhost:8080/ai/exercise/train`);
      setSocket(sckt);
      console.log("!소켓 준비");
      console.log("formInput: ", formInput);
      const convertToObject = () => {
        const inputValue = formInput.trim();
        console.log("!inputValue: ", inputValue);
        if (inputValue) {
          try {
            const jsonString = `{${inputValue.replace(/("([^"]+)")\s*:/g, '$1:')}}`;
            const parsedParams = JSON.parse(jsonString);
            setParams(parsedParams);
          } catch (error) {
            console.error('Invalid input:', error);
          }
        } else {
          setParams({});
        }
      };
      convertToObject();
    } catch (error) {
      alert("서버와 연결 중 오류가 발생했습니다.")
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
              setProgressMessages((prevMessages) => [...prevMessages, message.body]);
            }
          });

          if (stompClient.connected) {
            
            console.log("params: ", params);
            
            const requestData = {
              pythonFilePath: filePath,
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
    <Container>
      <Row>
        <Col>
          <h2>운동 자세 분석 AI 학습</h2>
          <div style={{ height: '300px', marginBottom: '20px', position: 'relative' }}>
            <div style={{ border: '1px solid #ccc', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
              <ProgressWindow progressMessages={progressMessages} />
            </div>
          </div>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>folder</span>
                <span style={{ verticalAlign: "middle" }}> Python 파일 경로</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control onChange={(e) => setFilePath(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '5px', fontVariationSettings: "'FILL' 1" }}>code</span>
                <span style={{ verticalAlign: "middle" }}> 하이퍼 파라미터</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control onChange={(e) => setFormInput(e.target.value)} />
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Stack direction="horizontal">
          <div></div>
          <Button onClick={connectSocket} disabled={send} className="ms-auto mt-3" style={{ fontWeight: "bold" }}>
            <span className="material-symbols-outlined" style={{ verticalAlign: "middle", fontVariationSettings: "'FILL' 1" }}>send</span>
            <span style={{ verticalAlign: "middle", fontWeight: "bold" }}> 학습 시작</span>
          </Button>
        </Stack>
      </Row>
    </Container>
  );
}

export default WorkoutAiTrain;