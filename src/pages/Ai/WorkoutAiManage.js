import React, { useState, useEffect, useContext } from "react";
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
import { ModalContext } from "../../ModalContext";

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

export let cancelModelManageDownload;

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
        const response = await axios.get(
          process.env.REACT_APP_API_URL_BLD +
            `/ai/exercise/${props.exerciseName}`
        );

        setAiVerData(response.data.result);
        setKeys(extractKeys(response.data.result));
        setValues(
          extractValues(response.data.result, extractKeys(response.data.result))
        );
      } catch (error) {
        if (error.response.data.code === 310) {
          alert("AI 모델이 존재하지 않습니다.");
          setAiVerData([]);
        }
        console.error("Error fetching ver data:", error);
      }
    };

    fetchVerData();
  }, []);

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

  const handleRowClick = (aiVer) => {
    // ai ID를 매개변수로 하여 원하는 페이지로 이동
    navigate(`/aiservice/workout/${props.exerciseName}/${aiVer}`);
  };

  // ModalContext에서 로딩 모달을 사용하기 위한 상태와 함수를 가져옴
  const { startLoading, stopLoading, setProgress, setType, setCancel } =
    useContext(ModalContext);

  const handleDownload = async (e, version) => {
    e.preventDefault();
    if (!version) {
      alert("다운로드할 모델을 선택해주세요.");
      return;
    }
    // 버전이 1.0이나 2.0 같은 형식이면 .0을 제거, 1.0.1 같은 형식이면 제거하지 않음
    if (version.split(".").length === 2 && version.includes(".0")) {
      version = version.split(".")[0];
    }

    // axios 요청을 취소하는 함수를 저장할 변수
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    cancelModelManageDownload = source.cancel;

    try {
      startLoading(); // 로딩 모달 표시
      setType("model"); // 내려받기 타입 설정
      const response = await axios.get(
        process.env.REACT_APP_API_URL_BLD +
          `/ai/exercise/download/${props.exerciseName}/${version}`,
        {
          cancelToken: source.token,
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            const totalSize = progressEvent.total;
            const downloadedSize = progressEvent.loaded;
            const progress = (downloadedSize / totalSize) * 100;
            setProgress(progress);
          },
        }
      );
      if (response.data) {
        // 파일 저장 다이얼로그 띄우기
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${props.exerciseName}_model.zip`;
        link.click();
      } else {
        console.error("Error downloading AI model:", response);
        alert("받기 실패: ", `\n ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Download canceled:", error.message);
      } else {
        console.log("Error downloading AI model:", error);
        alert(
          "받기 작업 중 오류 발생: ",
          `\n ${error.response.status}: ${error.response.statusText}`
        );
      }
    } finally {
      stopLoading(); // 로딩 모달 닫기
    }
  };

  if (!aiVerData) {
    return <LoadingModal data={aiVerData} />;
  }

  // 현재 페이지에 해당하는 모델 목록 계산
  const indexOfLastModel = currentPage * modelsPerPage;
  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = values.slice(indexOfFirstModel, indexOfLastModel);

  // 페이지 번호 클릭 시 실행되는 함수
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!currentModels) {
    return <LoadingModal data={currentModels} />;
  } else if (!keys) {
    return <LoadingModal data={keys} />;
  } else if (!values) {
    return <LoadingModal data={values} />;
  }

  return (
    <>
      {console.log("values: ", values)}
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
                    key === "File" || key === "Inuse" || key === "history" ? (
                      <></>
                    ) : (
                      <th key={index}>{key}</th>
                    )
                  )}
                  <th>다운로드</th>
                </tr>
              </thead>
              <tbody>
                {currentModels.map(({ key, ...val }) => (
                  <>
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
                        ) : k !== "File" && k !== "Inuse" && k !== "history" ? (
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
  return <WorkoutAiVersion exerciseName={exerciseName} />;
}

export default WorkoutAiManage;
