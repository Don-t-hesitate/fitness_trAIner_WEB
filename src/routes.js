import React from "react";
import { Helmet } from "react-helmet";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // 인증된 사용자만 접근할 수 있는 라우트 컴포넌트
import Header from "./components/Header"; // 헤더바 컴포넌트
import SideBar from "./components/SideBar"; // 사이드바 컴포넌트
import GenericWrapper from "./GenericWrapper"; // 제네릭 래퍼 컴포넌트
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";

// 각 페이지 컴포넌트 임포트
import { LoginPage, Dashboard } from "./pages/Admin";
import { UserInfo, UserManage } from "./pages/User";
import {
  ExerciseManage,
  ExerciseAdd,
  ExerciseInfo,
  ExercisePoseList,
  ExercisePoseManage,
  ExercisePoseAdd,
  ExercisePoseInfo,
} from "./pages/Exercise";
import { FoodManage, PreferenceManage } from "./pages/Food";
import {
  WorkoutAi,
  WorkoutAiManage,
  WorkoutAiTrain,
  WorkoutAiInfo,
} from "./pages/Ai";
import TitlePage from "./pages/TitlePage";
import ExcelTest from "./ExcelTest";

// 브라우저 라우터 생성 및 라우트 정의
const routes = createBrowserRouter([
  // 메인 페이지
  {
    path: "/",
    element: (
      <>
        <Helmet>
          <title>메인 페이지</title>
        </Helmet>
        <TitlePage />
      </>
    ),
  },
  // 잘못된 경로에 대한 처리
  {
    path: "*",
    element: (
      <>
        <Helmet>
          <title>잘못된 접근</title>
        </Helmet>
        <h1>없는 페이지입니다.</h1>
        <p style={{ fontSize: "24px" }}>유효한 주소로 접근하세요.</p>
      </>
    ),
  },
  // 로그인 페이지
  {
    path: "/login",
    element: (
      <>
        <Helmet>
          <title>로그인</title>
        </Helmet>
        <LoginPage />
      </>
    ),
  },
  {
    path: "/excel",
    element: (
      <>
        <Helmet>
          <title>엑셀 테스트</title>
        </Helmet>
        <ExcelTest />
      </>
    ),
  },
  // 대시보드 페이지 (인증된 사용자만 접근 가능)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute
        element={() => (
          <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: "flex", minHeight: "100dvh" }}>
              <Helmet>
                <title>대시보드</title>
              </Helmet>
              <SideBar />
              <Header />
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
                <Dashboard />
              </Box>
            </Box>
          </CssVarsProvider>
        )}
      />
    ),
  },

  // 회원 관리 페이지 (인증된 사용자만 접근 가능)
  {
    path: "/user",
    element: (
      <PrivateRoute
        element={() => (
          <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: "flex", minHeight: "100dvh" }}>
              <Helmet>
                <title>회원 관리</title>
              </Helmet>
              <SideBar />
              <Header />
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
                <UserManage />
              </Box>
            </Box>
          </CssVarsProvider>
        )}
      />
    ),
  },
  // 회원 상세보기 페이지 (GenericWrapper 컴포넌트 사용)
  {
    path: "/user/:userId",
    element: (
      <>
        <Helmet>
          <title>회원 상세보기</title>
        </Helmet>
        <GenericWrapper mainComponent={UserInfo} paramKeys={["userId"]} />
      </>
    ),
  },

  // 운동 카테고리 관리 페이지 (인증된 사용자만 접근 가능)
  {
    path: "/exercise",
    element: (
      <PrivateRoute
        element={() => (
          <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: "flex", minHeight: "100dvh" }}>
              <Helmet>
                <title>운동 카테고리 관리</title>
              </Helmet>
              <SideBar />
              <Header />
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
                <ExerciseManage />
              </Box>
            </Box>
          </CssVarsProvider>
        )}
      />
    ),
  },
  // 운동 카테고리 추가 페이지 (인증된 사용자만 접근 가능)
  {
    path: "/exercise/add",
    element: (
      <PrivateRoute
        element={() => (
          <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: "flex", minHeight: "100dvh" }}>
              <Helmet>
                <title>운동 카테고리 추가</title>
              </Helmet>
              <SideBar />
              <Header />
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
                <ExerciseAdd />
              </Box>
            </Box>
          </CssVarsProvider>
        )}
      />
    ),
  },
  // 운동 카테고리 상세보기 페이지 (GenericWrapper 컴포넌트 사용)
  {
    path: "/exercise/:exerId",
    element: (
      <>
        <Helmet>
          <title>운동 카테고리 상세보기</title>
        </Helmet>
        <GenericWrapper mainComponent={ExerciseInfo} paramKeys={["exerId"]} />
      </>
    ),
  },

  // 운동 자세 데이터 관리 페이지 (인증된 사용자만 접근 가능)
  {
    path: "/exercise_pose",
    element: (
      <PrivateRoute
        element={() => (
          <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: "flex", minHeight: "100dvh" }}>
              <Helmet>
                <title>운동 자세 데이터 관리</title>
              </Helmet>
              <SideBar />
              <Header />
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
                <ExercisePoseManage />
              </Box>
            </Box>
          </CssVarsProvider>
        )}
      />
    ),
  },
  // 운동 자세 데이터 추가 페이지 (인증된 사용자만 접근 가능)
  {
    path: "/exercise_pose/add",
    element: (
      <PrivateRoute
        element={() => (
          <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: "flex", minHeight: "100dvh" }}>
              <Helmet>
                <title>운동 자세 데이터 추가</title>
              </Helmet>
              <SideBar />
              <Header />
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
                <ExercisePoseAdd />
              </Box>
            </Box>
          </CssVarsProvider>
        )}
      />
    ),
  },
  // 운동 자세 데이터 목록조회 페이지 (GenericWrapper 컴포넌트 사용)
  {
    path: "/exercise_pose/:exerciseName/:dataType?",
    element: (
      <>
        <Helmet>
          <title>운동 자세 데이터 목록조회</title>
        </Helmet>
        <GenericWrapper
          mainComponent={ExercisePoseList}
          paramKeys={["exerciseName", "dataType"]}
        />
      </>
    ),
  },
  // 운동 자세 데이터 상세보기 페이지 (GenericWrapper 컴포넌트 사용)
  {
    path: "/exercise_pose/:exerciseName/:dataType/:fileName",
    element: (
      <>
        <Helmet>
          <title>운동 자세 데이터 상세보기</title>
        </Helmet>
        <GenericWrapper
          mainComponent={ExercisePoseInfo}
          paramKeys={["exerciseName", "dataType", "fileName"]}
        />
      </>
    ),
  },

  // 식품 데이터 관리 페이지 (인증된 사용자만 접근 가능)
  {
    path: "/food",
    element: (
      <PrivateRoute
        element={() => (
          <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: "flex", minHeight: "100dvh" }}>
              <Helmet>
                <title>식품 데이터 관리</title>
              </Helmet>
              <SideBar />
              <Header />
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
                <FoodManage />
              </Box>
            </Box>
          </CssVarsProvider>
        )}
      />
    ),
  },

  // 사용자 음식 선호도 관리 페이지 (인증된 사용자만 접근 가능)
  {
    path: "/preference",
    element: (
      <PrivateRoute
        element={() => (
          <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: "flex", minHeight: "100dvh" }}>
              <Helmet>
                <title>사용자 음식 선호도 관리</title>
              </Helmet>
              <SideBar />
              <Header />
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
                <PreferenceManage />
              </Box>
            </Box>
          </CssVarsProvider>
        )}
      />
    ),
  },

  // // 사용자 음식 선호도 상세보기 페이지 (GenericWrapper 컴포넌트 사용)
  // { path: '/preference/:userId', element: <><Helmet><title>음식 선호도 상세보기</title></Helmet><GenericWrapper mainComponent={PreferenceInfo} paramKeys={["userId"]} /></> },

  // 운동 자세 AI 종류 고르기 페이지 (GenericWrapper 컴포넌트 사용)
  {
    path: "/aiservice/workout",
    element: (
      <>
        <Helmet>
          <title>운동 자세 분석 AI 목록</title>
        </Helmet>
        <GenericWrapper mainComponent={WorkoutAi} />
      </>
    ),
  },
  // 운동 자세 AI 관리 페이지 (GenericWrapper 컴포넌트 사용, parentId 파라미터 옵션)
  {
    path: "/aiservice/workout/:exerciseName?",
    element: (
      <>
        <Helmet>
          <title>운동 자세 AI 관리</title>
        </Helmet>
        <GenericWrapper
          mainComponent={WorkoutAiManage}
          paramKeys={["exerciseName"]}
        />
      </>
    ),
  },
  // 운동 자세 AI 상세보기 페이지 (GenericWrapper 컴포넌트 사용, parentId와 subId 파라미터)
  {
    path: "/aiservice/workout/:parentId/:subId",
    element: (
      <>
        <Helmet>
          <title>운동 자세 AI 상세보기</title>
        </Helmet>
        <GenericWrapper
          mainComponent={WorkoutAiInfo}
          paramKeys={["parentId", "subId"]}
        />
      </>
    ),
  },
  // 운동 자세 AI 학습 페이지 (인증된 사용자만 접근 가능)
  {
    path: "/aiservice/workout/train",
    element: (
      <PrivateRoute
        element={() => (
          <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: "flex", minHeight: "100dvh" }}>
              <Helmet>
                <title>운동 자세 AI 학습</title>
              </Helmet>
              <SideBar />
              <Header />
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
                <WorkoutAiTrain />
              </Box>
            </Box>
          </CssVarsProvider>
        )}
      />
    ),

    // // 식단 추천 AI 관리 페이지 (인증된 사용자만 접근 가능)
    // {
    //   path: '/aiservice/food',
    //   element: (
    //     <PrivateRoute
    //     element={() => (
    //       <CssVarsProvider disableTransitionOnChange>
    //         <CssBaseline />
    //         <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
    //           <Helmet><title>식단 추천 AI 관리</title></Helmet>
    //           <SideBar />
    //           <Header />
    //           <Box
    //             component="main"
    //             className="MainContent"
    //             sx={{
    //               px: { xs: 2, md: 6},
    //               pt: {
    //                 xs: 'calc(12px + var(--Header-height))',
    //                 sm: 'calc(12px + var(--Header-height))',
    //                 md: 3,
    //               },
    //               pb: { xs: 2, sm: 2, md: 3 },
    //               flex: 1,
    //               display: 'flex',
    //               flexDirection: 'column',
    //               minWidth: 0,
    //               height: '100dvh',
    //               gap: 1,
    //               overflow: 'auto',
    //             }}
    //           >
    //             <FoodAiManage />
    //           </Box>
    //         </Box>
    //       </CssVarsProvider>
    //     )}
    //     />
    //   ),
    // },
    // // 식단 추천 AI 학습 페이지 (인증된 사용자만 접근 가능)
    // {
    //   path: '/aiservice/food/train',
    //   element: (
    //     <PrivateRoute
    //     element={() => (
    //       <CssVarsProvider disableTransitionOnChange>
    //         <CssBaseline />
    //         <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
    //           <Helmet><title>식단 추천 AI 학습</title></Helmet>
    //           <SideBar />
    //           <Header />
    //           <Box
    //             component="main"
    //             className="MainContent"
    //             sx={{
    //               px: { xs: 2, md: 6},
    //               pt: {
    //                 xs: 'calc(12px + var(--Header-height))',
    //                 sm: 'calc(12px + var(--Header-height))',
    //                 md: 3,
    //               },
    //               pb: { xs: 2, sm: 2, md: 3 },
    //               flex: 1,
    //               display: 'flex',
    //               flexDirection: 'column',
    //               minWidth: 0,
    //               height: '100dvh',
    //               gap: 1,
    //               overflow: 'auto',
    //             }}
    //           >
    //             <FoodAiTrain />
    //           </Box>
    //         </Box>
    //       </CssVarsProvider>
    //     )}
    //     />
    //   ),
    // },
    // // 식단 추천 AI 상세보기 페이지 (GenericWrapper 컴포넌트 사용)
    // { path: '/aiservice/food/:foodAiId', element:  <><Helmet><title>식단 추천 AI 상세보기</title></Helmet><GenericWrapper mainComponent={FoodAiInfo} paramKeys={["foodAiId"]} /></> },
  },
]);

export default routes;
