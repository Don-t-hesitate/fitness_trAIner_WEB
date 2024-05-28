import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
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
  CloudDownload as CloudDownloadIcon,
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

function WorkoutAiVersion(props) {
  const [aiVerData, setAiVerData] = useState(null); // AI 모델 정보를 저장할 상태
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);
  // 현재 페이지 번호를 저장할 상태 및 보여줄 모델 수를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [modelsPerPage] = useState(12);
  // 선택된 버전을 저장할 상태
  const [selectedVersion, setSelectedVersion] = useState(null);

  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVerData = async () => {
      try {
        console.log("?props: ", props);
        const response = await axios.get(
          process.env.REACT_APP_API_URL_BLD +
            // "/api" +
            // "http://ceprj.gachon.ac.kr:60008" +
            `/ai/exercise/${props.exerciseName}`
        );

        setAiVerData(response.data.result);
        setKeys(extractKeys(response.data.result));
        setValues(
          extractValues(response.data.result, extractKeys(response.data.result))
        );
        console.log("!aiVerData: ", aiVerData);
      } catch (error) {
        // alert('Error fetching data:', error.response.data.message);
        if (error.response.data.code === 310) {
          alert("AI 모델이 존재하지 않습니다.");
          setAiVerData([]);
        }
        console.error("Error fetching ver data:", error);
      }
    };

    fetchVerData();
  }, []);

  useEffect(() => {
    console.log("values: ", values);
    for (let i = 0; i < values.length; i++) {
      console.log("values[i].version: ", values[i].version);
      if (values[i].Inuse === "true") {
        console.log("selectedVersion: ", values[i].version);
        setSelectedVersion(values[i].version);
        console.log("selectedVersion: ", selectedVersion);
      }
    }
  }, [values]);

  // AI 모델 정보에서 키와 값 추출
  const extractKeys = (data) => {
    const keys = new Set();
    Object.values(data).forEach((arr) =>
      arr.forEach((str) => keys.add(str.split(": ")[0]))
    );
    return Array.from(keys);
  };
  const extractValues = (data, keys) => {
    return Object.entries(data)
      .flatMap(([_, arr]) => {
        const values = {};
        keys.forEach((k) => {
          const match = arr.find((str) => str.startsWith(k + ":"));
          values[k] = match ? match.split(": ")[1] : "";
        });
        return values;
      })
      .sort((a, b) => {
        const versionA = parseFloat(a.version) || 0;
        const versionB = parseFloat(b.version) || 0;
        return versionA - versionB;
      });
  };

  if (!aiVerData) {
    return <LoadingModal data={aiVerData} />;
  }

  const handleRowClick = (aiVer) => {
    // Navigate to the desired page with the ai ID as a parameter
    navigate(`/aiservice/workout/${props.exerciseName}/${aiVer}`);
  };

  const handleDownload = async (e, version) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL_BLD +
          `/ai/exercise/download/${props.exerciseName}/${version}`,
        { responseType: "blob" }
      );
      if (response.data) {
        // 파일 저장 다이얼로그 띄우기
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${props.exerciseName}_model.zip`;
        link.click();
      } else {
        console.error("!Error downloading AI model:", response);
        alert("받기 실패: " + response);
      }
    } catch (error) {
      console.error("!Error downloading AI model:", error);
      alert("받기 작업 중 오류 발생");
    }
  };

  // 현재 페이지에 해당하는 모델 목록 계산
  const indexOfLastModel = currentPage * modelsPerPage;
  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = values.slice(indexOfFirstModel, indexOfLastModel);

  // 페이지 번호 클릭 시 실행되는 함수
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션에 표시할 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(values.length / modelsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (!currentModels) {
    return <LoadingModal data={currentModels} />;
  } else if (!keys) {
    return <LoadingModal data={keys} />;
  } else if (!values) {
    return <LoadingModal data={values} />;
  }

  const handleRadioChange = (version) => {
    setSelectedVersion(version);
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
            underline="hover"
            color="neutral"
            href="/aiservice/workout"
            aria-label="AI 운동 자세 분석"
            fontSize={12}
          >
            운동 자세 분석 AI 목록
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            {props.exerciseName} 모델 관리
          </Typography>
        </Breadcrumbs>
      </Box>
      <Typography level="h2" fontWeight={700} fontFamily="Pretendard-Regular">
        <span style={{ fontStyle: "italic" }}>{props.exerciseName}</span>{" "}
        &nbsp;모델 관리
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
                  {keys.map((key, index) =>
                    key === "File" || key === "Inuse" ? (
                      <></>
                    ) : (
                      <th key={index}>{key}</th>
                    )
                  )}
                  <th>다운로드</th>
                </tr>
              </thead>
              <tbody>
                {currentModels.map(({ key, ...val }) =>
                  console.log(
                    "!values.version: ",
                    val.version,
                    " type: ",
                    typeof val.version
                  )
                )}
                {currentModels.map(({ key, ...val }) => (
                  <>
                    {/* Fi */}
                    {console.log("val: ", val["accuracy"])}
                    <tr
                      key={val.version}
                      onClick={() => handleRowClick(val.version)}
                    >
                      {keys.map((k, index) =>
                        !String(val[k]).includes("json") &&
                        String(val[k]).includes(".") &&
                        String(val[k]).split(".")[1].length > 3 ? (
                          <td key={`${key}-${index}`}>
                            {Number(val[k]).toFixed(5)}
                          </td>
                        ) : k !== "File" && k != "Inuse" ? (
                          <td key={`${key}-${index}`}>{val[k]}</td>
                        ) : (
                          <></>
                        )
                      )}
                      <td>
                        <MuiButton
                          variant="solid"
                          color="primary"
                          size="md"
                          sx={{ padding: 0, width: "100%" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(e, val.version);
                          }}
                        >
                          <CloudDownloadIcon />
                        </MuiButton>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </MuiTable>
          </Box>
        </Sheet>
        <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
          <ThemeProvider theme={theme}>
            <MuiPagination
              count={Math.ceil(values.length / modelsPerPage)}
              page={currentPage}
              onChange={(e, page) => handlePageClick(page)}
              color="primary"
              sx={{ display: "flex", justifyContent: "center", mt: 2 }}
            />
          </ThemeProvider>
        </MaterialCssVarsProvider>
      </div>
    </>
  );
}

function WorkoutAiManage({ exerciseName }) {
  console.log("id: " + exerciseName);

  return <WorkoutAiVersion exerciseName={exerciseName} />;
}

export default WorkoutAiManage;
