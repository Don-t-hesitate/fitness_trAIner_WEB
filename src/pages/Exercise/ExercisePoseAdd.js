import React, { useState } from "react";
import axios from "axios";
import { Row, Col, Form, Button, Stack } from "react-bootstrap";
import UploadBox from "../../components/UploadBox";
import { Box, Breadcrumbs, Link, Typography, Sheet } from "@mui/joy";
import {
  ChevronRightRounded as ChevronRightRoundedIcon,
  HomeRounded as HomeRoundedIcon,
} from "@mui/icons-material";
import styled from "styled-components";

const StyledFormControl = styled(Form.Control)`
  ::placeholder {
    color: red;
  }
`;

function ExercisePoseAdd() {
  const [exerciseName, setExerciseName] = useState(""); // 운동 이름을 저장할 상태
  const [dataType, setDataType] = useState(""); // 데이터 타입을 저장할 상태
  const [jsonFormData, setJsonFormData] = useState(null); // json 파일을 저장할 상태

  const handleFileUpload = (data, extension) => {
    if (extension === "json") {
      setJsonFormData(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    jsonFormData.append("parentPath", encodeURIComponent(exerciseName));
    jsonFormData.append("uploadPath", encodeURIComponent(dataType));
    for (const x of jsonFormData) {
      console.log("json: ", x);
    }
    try {
      const jsonRes = await axios.post(
        process.env.REACT_APP_API_URL_BLD + "/ai/pose",
        jsonFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (jsonRes.data.success) {
        alert("json 업로드 성공");
        console.log("jsonRes: ", jsonRes);
      } else {
        alert("json 업로드 실패: ", jsonRes.data.message);
        console.log("jsonRes error: ", jsonRes);
      }
    } catch (error) {
      console.error("error: ", error.responser);
      alert("Error adding exercise pose data:", error.response.data.message);
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
            운동 자세 데이터 관리
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            운동 자세 데이터 추가
          </Typography>
        </Breadcrumbs>
      </Box>
      <Typography level="h2" fontWeight={700} fontFamily="Pretendard-Regular">
        운동 자세 데이터 추가
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
          style={{
            height: "55vh",
            marginBottom: "20px",
            position: "relative",
          }}
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
            <UploadBox
              onFileUpload={handleFileUpload}
              multiple
              extension={"json"}
            />
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} style={{ marginBottom: "0px" }}>
            <Form.Label column sm="3">
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                exercise
              </span>
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                &nbsp;운동 이름
              </span>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                onChange={(e) => setExerciseName(e.target.value)}
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
            </Col>
          </Form.Group>
          {/* 데이터 타입 */}
          <Form.Group as={Row} style={{ marginBottom: "0px" }}>
            <Form.Label column sm="3">
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                data_object
              </span>
              <span style={{ verticalAlign: "middle", color: "#171a1c" }}>
                {" "}
                &nbsp;데이터 타입
              </span>
            </Form.Label>
            <Col sm="9">
              <StyledFormControl
                onChange={(e) => setDataType(e.target.value)}
                placeholder="ex) validation, training"
                style={{ backgroundColor: "#626b74", color: "#fff" }}
              />
            </Col>
          </Form.Group>
          <Stack direction="horizontal">
            <div></div>
            <Button
              type="submit"
              className="ms-auto"
              color="#0a6bcb"
              style={{
                fontWeight: "bold",
                backgroundColor: "#0a6bcb",
                color: "#fffff7",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  fontVariationSettings: "'FILL' 1",
                  paddingLeft: "10px",
                }}
              >
                send
              </span>
              <span style={{ verticalAlign: "middle", paddingRight: "10px" }}>
                &nbsp;&nbsp;데이터 전송
              </span>
            </Button>
          </Stack>
        </Form>
      </Sheet>
    </>
  );
}

export default ExercisePoseAdd;
