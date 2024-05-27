import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Pagination,
} from "react-bootstrap";
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
} from "@mui/joy";
import {
  ChevronRightRounded as ChevronRightRoundedIcon,
  HomeRounded as HomeRoundedIcon,
} from "@mui/icons-material";
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as extendMaterialTheme,
  THEME_ID as MATERIAL_THEME_ID,
  Pagination as MuiPagination,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { blue } from "@mui/material/colors";

const materialTheme = extendMaterialTheme();

const theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      darker: blue[900],
    },
  },
});

function ExercisePoseManage({ poseTypeName }) {
  // const [files, setFiles] = useState(''); // 서버에서 받아오는 파일을 저장할 상태
  const [exerciseNameList, setExerciseNameList] = useState([]); // 운동 이름을 저장할 상태
  // 현재 페이지 번호를 저장할 상태 및 보여줄 운동 수를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(12);
  // const [realPoseTypeName, setRealPoseTypeName] = useState('');

  const navigate = useNavigate();

  // useEffect(() => {
  //   const settingRealPoseTypeName = async () => {
  //     try {
  //       // 첫 글자만 대문자로 변환
  //       setRealPoseTypeName(poseTypeName.charAt(0).toUpperCase() + poseTypeName.slice(1));
  //       console.log(realPoseTypeName);
  //     } catch (error) {
  //       console.error('Error setting realPoseTypeName:', error);
  //     }
  //   }
  //   settingRealPoseTypeName();
  // }, [poseTypeName]);

  useEffect(() => {
    const fetchPoseData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL_BLD + `/ai/pose`
        );
        console.log("response: ", response);
        setExerciseNameList(response.data.result);
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      }
    };

    fetchPoseData();
  }, []);

  if (!exerciseNameList) {
    return <LoadingModal data={exerciseNameList} />;
  }

  const handleRowClick = (exerciseName) => {
    // 운동 ID를 파라미터로 전달하여 운동 정보 페이지로 이동
    navigate(`/exercise_pose/${exerciseName}`);
  };

  // 현재 페이지에 해당하는 운동 목록 계산
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  console.log("exerciseNameList: ", exerciseNameList);
  const currentExercises = exerciseNameList.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  // 페이지 번호 클릭 시 실행되는 함수
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션에 표시할 페이지 번호 계산
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(exerciseNameList.length / exercisesPerPage);
    i++
  ) {
    pageNumbers.push(i);
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
          <Typography color="primary" fontWeight={500} fontSize={12}>
            운동 자세 데이터 관리
          </Typography>
        </Breadcrumbs>
      </Box>
      <Typography level="h2" fontWeight={700} fontFamily="Pretendard-Regular">
        운동 자세 데이터 관리
      </Typography>
      <div>
        <Sheet
          className="UserTableContainer"
          variant="outlined"
          sx={{
            display: { xs: "initial", sm: "initial" },
            width: "100%",
            borderRadius: "sm",
            borderColor: "#fff",
            flexShrink: 1,
            overflow: "auto",
            minHeight: 0,
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--joy-palette-border)",
              padding: "8px",
            }}
          >
            <MuiTable
              aria-labelledby="tableTitle"
              stickyHeader
              hoverRow
              stripe="odd"
              variant="soft"
              sx={{
                "--TableCell-headBackground":
                  "var(--joy-palette-primary-200, #C7DFF7)",
                "--Table-headerUnderlineThickness": "1px",
                "--TableRow-hoverBackground":
                  "var(--joy-palette-primary-200, #C7DFF7)",
                "--TableRow-bodyBackground":
                  "var(--joy-palette-primary-200, #C7DFF7)",
                "--TableCell-paddingY": "4px",
                "--TableCell-paddingX": "8px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ fontWeight: "600" }}>운동 이름</th>
                </tr>
              </thead>
              <tbody>
                {exerciseNameList.length > 0 ? (
                  currentExercises.map((exerciseName, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => handleRowClick(exerciseName)}
                      >
                        <td>{exerciseName}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>운동 자세 데이터가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </MuiTable>
          </Box>
          <Stack direction justifyContent="flex-end">
            <MuiButton
              color="primary"
              component="a"
              href="/exercise_pose/add"
              style={{ marginRight: "7px", marginTop: "17px" }}
              startDecorator={
                <span
                  className="material-symbols-outlined"
                  style={{
                    verticalAlign: "middle",
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  add
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
        </Sheet>
        <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
          <ThemeProvider theme={theme}>
            <MuiPagination
              count={Math.ceil(exerciseNameList.length / exercisesPerPage)}
              page={currentPage}
              onChange={(event, page) => handlePageClick(page)}
              color={`primary`}
              sx={{ display: "flex", justifyContent: "center" }}
            />
          </ThemeProvider>
        </MaterialCssVarsProvider>
      </div>
    </>
  );
}

export default ExercisePoseManage;
