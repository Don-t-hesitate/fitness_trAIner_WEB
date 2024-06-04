import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import JSZip, { file } from "jszip";
import LoadingModal from "../../components/LoadingModal";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Stack,
  Button as MuiButton,
} from "@mui/joy";
import {
  ChevronRightRounded as ChevronRightRoundedIcon,
  HomeRounded as HomeRoundedIcon,
} from "@mui/icons-material";

function ExerciseInfo({ exerciseName, dataType, fileName }) {
  const [files, setFiles] = useState([]); // 서버에서 받아오는 파일을 저장할 상태
  // const [jpegFormData, setJpegFormData] = useState([]); // jpeg 파일을 저장할 상태
  // const [jsonFormData, setJsonFormData] = useState(null); // json 파일을 저장할 상태
  const jsonFormData = useRef(null); // json 파일을 저장할 상태
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

  useEffect(() => {
    const fetchPoseData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL_BLD +
            `/ai/pose/${exerciseName}/${dataType}/${fileName}`,
          { responseType: "blob" }
        );
        try {
          const zip = new JSZip();
          const zipData = await zip.loadAsync(response.data);
          console.log("zipData: ", zipData);
          const fileList = [];

          zip.forEach((relativePath, zipEntry) => {
            if (!zipEntry.dir) {
              const isImage = zipEntry.name.match(/\.(jpg|jpeg|png|gif|bmp)$/i);
              fileList.push({
                name: relativePath,
                content: zipEntry.async(isImage ? "base64" : "text"),
              });
            }
          });

          const fileContents = await Promise.all(
            fileList.map(async (file) => {
              const splitName = file.name.split("\\");
              if (
                splitName.length > 1 &&
                file.name.split("\\").indexOf(dataType)
              ) {
                return {
                  name: splitName[splitName.indexOf(dataType) + 1],
                  content: await file.content,
                  isImage: file.name.match(/\.(jpg|jpeg|png|gif|bmp)$/i),
                };
              } else if (
                file.name.split("/").length &&
                file.name.split("/").indexOf(dataType)
              ) {
                return {
                  name: file.name.split("/")[
                    file.name.split("/").indexOf(dataType) + 1
                  ],
                  content: await file.content,
                  isImage: file.name.match(/\.(jpg|jpeg|png|gif|bmp)$/i),
                };
              } else {
                return null;
              }
            })
          );

          setFiles([...fileContents]); // 그냥 하면 얕은 복사(객체 참조)가 되므로 [...fileContents]로 깊은 복사
        } catch (e) {
          console.error("Error reading ZIP file:", e);
        }
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      }
    };

    fetchPoseData();
  }, [dataType, exerciseName, fileName]);

  useEffect(() => {
    const settingFiles = async () => {
      try {
        const filteredFiles = files.filter((file) => file !== null);
        filteredFiles.forEach((file) => {
          if (file.name.endsWith(".json")) {
            jsonFormData.current = file;
            setJson(
              JSON.stringify(JSON.parse(jsonFormData.current.content), null, 2)
            );
          } else {
            console.error("Unknown file type:", file);
          }
        });
      } catch (error) {
        console.error("Error setting files:", error);
      }
    };
    settingFiles();
  }, [files]);

  // 삭제 요청을 보내는 함수
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        process.env.REACT_APP_API_URL_BLD +
          `/ai/pose/${exerciseName}/${dataType}/${fileName}`
      );
      if (response.data.success) {
        alert("삭제 성공");
        navigate("/exercise_pose");
      } else {
        alert("삭제 실패: " + response.data.message);
      }
    } catch (error) {
      console.error(
        "Error deleting exercise data:",
        error.response.data.message
      );
    }
  };

  if (!json) {
    return <LoadingModal data={json} />;
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
            underline="hover" // hover는 마우스를 올렸을 때 밑줄이 생기는 것
            color="neutral"
            href="/exercise_pose"
            aria-label="Home"
            fontSize={12}
          >
            운동 자세 데이터 관리
          </Link>
          <Link
            underline="hover" // hover는 마우스를 올렸을 때 밑줄이 생기는 것
            color="neutral"
            href={`/exercise_pose/${exerciseName}`}
            aria-label="Home"
            fontSize={12}
          >
            {exerciseName}
          </Link>
          <Link
            underline="hover" // hover는 마우스를 올렸을 때 밑줄이 생기는 것
            color="neutral"
            href={`/exercise_pose/${exerciseName}/${dataType}`}
            aria-label="Home"
            fontSize={12}
          >
            {dataType}
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            {fileName}
          </Typography>
        </Breadcrumbs>
      </Box>
      <Typography level="h2" fontWeight={700} fontFamily="Pretendard-Regular">
        운동 자세 데이터 -{" "}
        <span style={{ fontStyle: "italic" }}>{fileName}</span>
      </Typography>
      <div
        style={{
          height: "70vh",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {jsonFormData.current && (
            <Form
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <Form.Group
                controlId="jsonContent"
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <Form.Control
                  as="textarea"
                  style={{
                    flex: 1,
                    resize: "none",
                    backgroundColor: "lightgrey",
                  }}
                  value={json}
                  onChange={(e) => setJson(e.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </div>
      </div>
      <Stack direction justifyContent="flex-end">
        <MuiButton
          color="danger"
          onClick={deleteClick}
          style={{ marginTop: "10px" }}
          startDecorator={
            <span
              className="material-symbols-outlined"
              style={{
                verticalAlign: "middle",
              }}
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
            삭제
          </span>
        </MuiButton>
      </Stack>
    </>
  );
}

export default ExerciseInfo;
