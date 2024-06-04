import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../components/LoadingModal";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Sheet,
  Table as MuiTable,
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

const WorkoutAi = () => {
  const [exerciseList, setExerciseList] = useState([]); // 운동 목록을 저장할 상태
  // 현재 페이지 번호를 저장할 상태 및 보여줄 운동 수를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(12);

  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExerciseList = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL_BLD + "/ai/exercise/list"
        );
        setExerciseList(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExerciseList();
  }, []);

  if (!exerciseList) {
    return <LoadingModal data={exerciseList} />;
  }

  const handleRowClick = (exerciseName) => {
    // 운동 ID를 파라미터로 전달하여 운동 정보 페이지로 이동
    navigate(`/aiservice/workout/${exerciseName}`);
  };

  // 현재 페이지에 해당하는 운동 목록 계산
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exerciseList.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  // 페이지 번호 클릭 시 실행되는 함수
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션에 표시할 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(exerciseList.length / exercisesPerPage); i++) {
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
            운동 자세 분석 AI 목록
          </Typography>
        </Breadcrumbs>
      </Box>
      <Typography level="h2" fontWeight={700} fontFamily="Pretendard-Regular">
        운동 자세 분석 AI 목록
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
                  <th>운동 이름</th>
                </tr>
              </thead>
              <tbody>
                {currentExercises.map((exercise, index) => (
                  <tr key={index} onClick={() => handleRowClick(exercise)}>
                    <td>{exercise}</td>
                  </tr>
                ))}
              </tbody>
            </MuiTable>
          </Box>
        </Sheet>
        <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
          <ThemeProvider theme={theme}>
            <MuiPagination
              count={Math.ceil(exerciseList.length / exercisesPerPage)}
              page={currentPage}
              onChange={(event, page) => handlePageClick(page)}
              color="primary"
              sx={{ display: "flex", justifyContent: "center" }}
            />
          </ThemeProvider>
        </MaterialCssVarsProvider>
      </div>
    </>
  );
};

export default WorkoutAi;
