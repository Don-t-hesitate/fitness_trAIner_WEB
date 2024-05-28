import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Modal,
  Button,
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

// 디렉토리에 파일이 없을 때 보여줄 모달창 컴포넌트
function NoDataModal() {
  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  return (
    <div>
      <Modal show={true} centered>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>데이터 없음</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>해당 디렉토리에 파일이 존재하지 않습니다.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              뒤로 가기
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}

// 운동 자세 데이터의 운동 이름 목록을 보여주는 컴포넌트
function ExercisePoseNameList(props) {
  const [exerciseData, setExerciseData] = useState([]); // 운동 데이터를 저장할 상태
  // 현재 페이지 번호를 저장할 상태 및 보여줄 운동 수를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(12);

  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL_BLD +
            // "/api" +
            `/ai/pose/${props.exerciseName}`
        );
        setExerciseData(response.data.result);
      } catch (error) {
        console.error(error);
        setExerciseData(["no data"]);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (dataType) => {
    navigate(`/exercise_pose/${props.exerciseName}/${dataType}`);
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

  // 페이지네이션에 표시할 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(exerciseData.length / exercisesPerPage); i++) {
    pageNumbers.push(i);
  }

  if (!currentExercises) {
    return <LoadingModal data={currentExercises} />;
  }

  return (
    <>
      {/* 운동 데이터가 존재하면 테이블로 보여주고, 아니면 NoDataModal 컴포넌트를 보여줌 */}
      {exerciseData[0] !== "no data" ? (
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
                {props.exerciseName}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Typography
            level="h2"
            fontWeight={700}
            fontFamily="Pretendard-Regular"
          >
            <span
              style={{
                fontStyle: "italic",
                fontFamily: "Pretendard-Regular",
              }}
            >
              {props.exerciseName}
            </span>{" "}
            &nbsp;자세 데이터 타입
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
                      <th>데이터 타입</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentExercises && // currentExercises가 존재하면 테이블 행을 렌더링
                      currentExercises.map((exercise, index) => (
                        <tr
                          key={index}
                          onClick={() => handleRowClick(exercise)}
                        >
                          <td>{exercise}</td>
                        </tr>
                      ))}
                  </tbody>
                </MuiTable>
              </Box>
            </Sheet>
            <MaterialCssVarsProvider
              theme={{ [MATERIAL_THEME_ID]: materialTheme }}
            >
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
          {/* <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>데이터 타입</th>
                  </tr>
                </thead>
                <tbody>
                  {currentExercises.map((exercise, index) => (
                    <tr key={index} onClick={() => handleRowClick(exercise)}>
                      <td>{exercise}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Stack
            direction="horizontal"
            spacing={2}
            style={{ justifyContent: "center" }}
          >
            <Pagination>
              {pageNumbers.map((number) => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => handlePageClick(number)}
                >
                  {number}
                </Pagination.Item>
              ))}
            </Pagination>
          </Stack> */}
        </>
      ) : (
        <NoDataModal />
      )}
    </>
  );
}

// 특정 운동 자세 데이터 목록을 보여주는 컴포넌트
function ExercisePoseDataList(props) {
  const [exerciseData, setExerciseData] = useState([]); // 운동 데이터를 저장할 상태
  // 현재 페이지 번호를 저장할 상태 및 보여줄 운동 수를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(12);

  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL_BLD +
            // "/api" +
            `/ai/pose/${props.exerciseName}/${props.dataType}`
        );
        setExerciseData(response.data.result);
      } catch (error) {
        console.error(error);
        setExerciseData(["no data"]);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (fileName) => {
    navigate(
      `/exercise_pose/${props.exerciseName}/${props.dataType}/${fileName}`
    );
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

  // 페이지네이션에 표시할 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(exerciseData.length / exercisesPerPage); i++) {
    pageNumbers.push(i);
  }

  // 화면 크기 계산 로직
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 최대 페이지 번호 계산
  const maxPage = Math.ceil(exerciseData.length / exercisesPerPage);

  // 표시할 페이지 번호 범위 계산 로직
  const getPageNumberRange = (currentPage, maxPage, windowWidth) => {
    const delta = windowWidth > 768 ? 5 : 2; // 화면 크기에 따라 delta 값 조정
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(maxPage, currentPage + delta);

    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  // 페이지 번호 범위 계산
  const pageNumberRange = getPageNumberRange(currentPage, maxPage, windowWidth);

  if (!currentExercises) {
    return <LoadingModal data={currentExercises} />;
  }

  return (
    <>
      {/* 운동 데이터가 존재하면 테이블로 보여주고, 아니면 NoDataModal 컴포넌트를 보여줌 */}
      {exerciseData[0] !== "no data" ? (
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
                href={`/exercise_pose/${props.exerciseName}`}
                aria-label="Home"
                fontSize={12}
              >
                {props.exerciseName}
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                {props.dataType}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Typography
            level="h2"
            fontWeight={700}
            fontFamily="Pretendard-Regular"
          >
            <span
              style={{
                fontStyle: "italic",
                fontFamily: "Pretendard-Regular",
              }}
            >
              {props.exerciseName}/{props.dataType}
            </span>{" "}
            &nbsp;자세 데이터 목록
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
                      <th>데이터 파일 이름</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentExercises && // currentExercises가 존재하면 테이블 행을 렌더링
                      currentExercises.map((exercise, index) => (
                        <tr
                          key={index}
                          onClick={() => handleRowClick(exercise)}
                        >
                          <td>{exercise}</td>
                        </tr>
                      ))}
                  </tbody>
                </MuiTable>
              </Box>
            </Sheet>
            <MaterialCssVarsProvider
              theme={{ [MATERIAL_THEME_ID]: materialTheme }}
            >
              <ThemeProvider theme={theme}>
                <MuiPagination
                  count={Math.ceil(exerciseData.length / exercisesPerPage)}
                  page={currentPage}
                  onChange={(event, page) => handlePageClick(page)}
                  color={`primary`}
                  siblingCount={4}
                  sx={{ display: "flex", justifyContent: "center" }}
                />
              </ThemeProvider>
            </MaterialCssVarsProvider>
          </div>
          {/* <Row>
            <Col>
              <h3>{props.exerciseName} 자세 데이터 목록</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>데이터 타입</th>
                  </tr>
                </thead>
                <tbody>
                  {currentExercises.map((exercise, index) => (
                    <tr key={index} onClick={() => handleRowClick(exercise)}>
                      <td>{exercise}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Stack
            direction="horizontal"
            spacing={2}
            style={{ justifyContent: "center" }}
          >
            <Pagination>
              첫 번째 페이지로 이동 버튼
              <Pagination.First onClick={() => handlePageClick(1)} />

              이전 페이지로 이동 버튼
              <Pagination.Prev
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
              />

              처음 페이지 번호 표시
              {currentPage > 4 && (
                <>
                  <Pagination.Ellipsis disabled />
                </>
              )}

              현재 페이지와 가까운 번호들만 표시
              {pageNumberRange.map((number) => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => handlePageClick(number)}
                >
                  {number}
                </Pagination.Item>
              ))}

              마지막 페이지 번호 표시
              {currentPage <= maxPage - 3 && (
                <>
                  <Pagination.Ellipsis disabled />
                </>
              )}

              다음 페이지로 이동 버튼
              <Pagination.Next
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === maxPage}
              />

              마지막 페이지로 이동 버튼
              <Pagination.Last
                onClick={() => handlePageClick(maxPage)}
                disabled={currentPage === maxPage}
              />
            </Pagination>
          </Stack> */}
        </>
      ) : (
        <NoDataModal />
      )}
    </>
  );
}

function ExercisePoseList({ exerciseName, dataType }) {
  if (!dataType) {
    return <ExercisePoseNameList exerciseName={exerciseName} />;
  } else {
    return (
      <ExercisePoseDataList exerciseName={exerciseName} dataType={dataType} />
    );
  }
}

export default ExercisePoseList;
