import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import PrivateRoute from "./PrivateRoute";

const GenericWrapper = ({ mainComponent: MainComponent, paramKeys = [] }) => {
  // URL 파라미터 값 가져오기
  const params = useParams();

  // URL 파라미터 값 중에서 mainComponentProps에 전달할 파라미터만 추출
  const mainComponentProps = paramKeys.reduce((acc, paramKey) => {
    acc[paramKey] = params[paramKey];
    return acc;
  }, {});

  // PrivateRoute 컴포넌트를 렌더링합니다.
  // PrivateRoute는 사용자가 인증된 경우에만 렌더링됩니다.
  return (
    <PrivateRoute
      element={() => (
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <Box sx={{ display: "flex", minHeight: "100dvh" }}>
            <Header />
            <SideBar />
            <Box
              component="main"
              className="MainContent"
              sx={{
                px: { xs: 2, md: 6 },
                pt: {
                  xs: "calc(12px + var(--Header-height))",
                  sm: "calc(12px + var(--Header-height))",
                  md: 3,
                },
                pb: { xs: 2, sm: 2, md: 3 },
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                height: "100dvh",
                gap: 1,
                overflow: "auto",
              }}
            >
              <MainComponent {...mainComponentProps} />
            </Box>
          </Box>
        </CssVarsProvider>
      )}
    />
  );
};

export default GenericWrapper;
