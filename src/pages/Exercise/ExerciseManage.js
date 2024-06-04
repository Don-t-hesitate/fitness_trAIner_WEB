import React, { useState, useEffect } from "react";
import axios from "axios";
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

function ExerciseManage() {
  // 운동 데이터를 저장할 상태
  const [exerciseData, setExerciseData] = useState(null);
  // 현재 페이지 번호를 저장할 상태 및 보여줄 운동 수를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(12);
  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL_BLD + "/exercises"
        );
        setExerciseData(response.data.result.exerciseList);
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      }
    };

    fetchExerciseData();
  }, []);

  if (!exerciseData) {
    return <LoadingModal data={exerciseData} />;
  }

  const handleRowClick = (exerciseId) => {
    // 운동 ID를 파라미터로 전달하여 운동 정보 페이지로 이동
    navigate(`/exercise/${exerciseId}`);
  };

  // 현재 페이지에 해당하는 운동 목록 계산
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exerciseData.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  // 페이지 번호 클릭 시 실행되는 함수
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            운동 카테고리 관리
          </Typography>
        </Breadcrumbs>
      </Box>
      <Typography level="h2" fontWeight={700} fontFamily="Pretendard-Regular">
        운동 카테고리 관리
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
                  <th>번호</th>
                  <th>운동 이름</th>
                  <th>소모 칼로리</th>
                </tr>
              </thead>
              <tbody>
                {currentExercises.map((exercise, index) => (
                  <tr
                    key={exercise.exerciseId}
                    onClick={() => handleRowClick(exercise.exerciseId)}
                  >
                    <td>{exercise.exerciseId}</td>
                    <td>{exercise.exerciseName}</td>
                    <td>{exercise.perKcal}</td>
                  </tr>
                ))}
              </tbody>
            </MuiTable>
          </Box>
          <Stack direction justifyContent="flex-end">
            <MuiButton
              color="primary"
              component="a"
              href="/exercise/add"
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
              count={Math.ceil(exerciseData.length / exercisesPerPage)}
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

export default ExerciseManage;
