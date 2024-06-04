import React, { useContext } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import IconButton from "@mui/joy/IconButton";
import Button from "@mui/joy/Button";
import { Link } from "react-router-dom";
import GetAppIcon from "@mui/icons-material/GetApp";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

import framesxTheme from "./theme.js";
import HeroLeft01 from "../blocks/HeroLeft01.js";
import HeroLeft02 from "../blocks/HeroLeft02.js";
import HeroLeft03 from "../blocks/HeroLeft03.js";
import HeroLeft04 from "../blocks/HeroLeft04.js";
import HeroLeft05 from "../blocks/HeroLeft05.js";
import { Typography } from "@mui/joy";
import { ModalContext } from "../ModalContext.js";
import axios from "axios";

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="lg"
      variant="soft"
      color="neutral"
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
      sx={{
        position: "fixed",
        zIndex: 999,
        top: "1rem",
        right: "1rem",
        borderRadius: "50%",
        boxShadow: "sm",
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

// axios 요청을 취소하는 함수를 저장할 변수
export let cancelTitleAppDownload;

function NavBar() {
  // ModalContext에서 로딩 모달을 사용하기 위한 상태와 함수를 가져옴
  const { startLoading, stopLoading, setProgress, setType } =
    useContext(ModalContext);

  // 앱 다운로드 요청
  const handleDownload = async (e) => {
    e.preventDefault();

    // axios 요청을 취소하는 함수를 저장할 변수
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    cancelTitleAppDownload = source.cancel;

    try {
      startLoading(); // 로딩 모달 표시
      setType("app"); // 다운로드 타입을 app으로 설정
      const response = await axios.get("/admin/app", {
        cancelToken: source.token, // axios 요청에 CancelToken을 전달
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const totalSize = progressEvent.total;
          const downloadedSize = progressEvent.loaded;
          const progress = (downloadedSize / totalSize) * 100;
          setProgress(progress);
        },
      });
      if (response.status === 200) {
        // 다운로드된 앱 파일을 Blob으로 변환하여 안보이는 a 태그를 생성하여 클릭 이벤트를 발생, 파일 저장 다이얼로그 표시
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "trAIner.apk";
        link.click();
      } else {
        console.log("Failed to download the app: ", response);
        alert("서버에서 앱 다운로드를 실패했습니다.");
      }
    } catch (error) {
      console.log("error: ", error);
      if (axios.isCancel(error)) {
        console.log("Download canceled:", error);
        alert("다운로드 취소됨");
      } else {
        console.log("Error occurred while downloading the app: ", error);
        alert(
          `앱 다운로드 중 오류가 발생했습니다: \n${error.response.status}: ${error.response.statusText}`
        );
      }
    } finally {
      stopLoading(); // 로딩 모달 닫기
    }
  };

  return (
    <div style={{ fontFamily: "GmarketSansBold" }}>
      {/* <Container fluid style={{backgroundColor: '#1E3252', position: 'relative'}}>
        <div style={{width: '100%', maxWidth: '유지할 최대 너비값', margin: '0 auto', padding: '20px'}}>
          <Stack direction='horizontal'>
            <h1 style={{marginLeft: '37.5%'}}><div style={{color: 'white'}}>trAIner fitness</div></h1>
            <Link className='ms-auto' to={'/login'}><Button variant='muted'><div style={{color: 'grey'}}>admin</div></Button></Link>
          </Stack>
        </div>
      </Container> */}
      <div
        fluid
        style={{
          position: "fixed",
          backgroundColor: "#1E3252",
          display: "flex",
          alignItems: "center",
          height: "70px",
          zIndex: 1000,
          width: "100%",
          padding: "0 20px",
        }}
      >
        <div>
          <Button
            variant="soft"
            color="primary"
            size="sm"
            onClick={(e) => handleDownload(e)}
          >
            <GetAppIcon style={{ color: "black" }} />
            {window.innerWidth > 768 ? (
              <Typography
                style={{ color: "black", fontFamily: "Pretendard-Regular" }}
              >
                앱 내려받기
              </Typography>
            ) : (
              <Typography
                style={{ color: "black", fontFamily: "Pretendard-Regular" }}
              >
                내려받기
              </Typography>
            )}
          </Button>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          {window.innerWidth > 768 ? (
            <h1
              style={{
                color: "white",
                margin: 0,
                marginRight: "61px",
                fontFamily: "GmarketSansMedium",
                fontWeight: "600",
              }}
            >
              tr
              <span
                style={{
                  color: "#76D1FE",
                  fontFamily: "GmarketSansMedium",
                  fontWeight: "600",
                }}
              >
                AI
              </span>
              ner
            </h1>
          ) : (
            <h1
              style={{
                color: "white",
                margin: 0,
                marginRight: "43px",
                fontFamily: "GmarketSansMedium",
                fontWeight: "600",
              }}
            >
              tr
              <span
                style={{
                  color: "#76D1FE",
                  fontFamily: "GmarketSansMedium",
                  fontWeight: "600",
                }}
              >
                AI
              </span>
              ner
            </h1>
          )}
        </div>
        <div>
          <Link to={"/login"}>
            <Button variant="muted">
              <div style={{ color: "grey" }}>admin</div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function TitlePage() {
  return (
    <>
      <NavBar />
      <CssVarsProvider disableTransitionOnChange theme={framesxTheme}>
        <CssBaseline />
        {/* <ColorSchemeToggle /> */}
        <Box
          sx={{
            height: "100vh",
            overflowY: "scroll",
            scrollSnapType: "y mandatory",
            "& > div": {
              scrollSnapAlign: "start",
            },
            fontFamily: "GmarketSansBold",
          }}
        >
          <HeroLeft01 />
          <HeroLeft02 />
          <HeroLeft03 />
          <HeroLeft04 />
          <HeroLeft05 />
        </Box>
      </CssVarsProvider>
    </>
  );
}

export default TitlePage;
