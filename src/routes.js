import React from 'react';
import { Helmet } from 'react-helmet';
import { createBrowserRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PrivateRoute from './PrivateRoute'; // 인증된 사용자만 접근할 수 있는 라우트 컴포넌트
import HeaderBar from './components/HeaderBar'; // 헤더바 컴포넌트
import SideBar from './components/SideBar'; // 사이드바 컴포넌트
import GenericWrapper from './GenericWrapper'; // 제네릭 래퍼 컴포넌트

// 각 페이지 컴포넌트 임포트
import MainPage from './pages/MainPage';
import { LoginPage, Dashboard } from './pages/Admin';
import { UserInfo, UserManage } from './pages/User';
import { ExerciseManage, ExerciseAdd, ExerciseInfo, ExercisePoseList, ExercisePoseManage, ExercisePoseAdd, ExercisePoseInfo } from './pages/Exercise';
import { FoodManage, PreferenceManage, PreferenceInfo } from './pages/Food';
import { FoodAiManage, FoodAiTrain, FoodAiInfo, WorkoutAi, WorkoutAiManage, WorkoutAiTrain, WorkoutAiInfo } from './pages/Ai';

// 브라우저 라우터 생성 및 라우트 정의
const routes = createBrowserRouter([
  // 메인 페이지
  { path: '/', element: <><Helmet><title>메인 페이지</title></Helmet><MainPage /></>},
  // 잘못된 경로에 대한 처리
  { path: '*', element: <><Helmet><title>잘못된 접근</title></Helmet><h1>없는 페이지입니다.</h1><p style={{fontSize: '24px'}}>유효한 주소로 접근하세요.</p></> },
  // 로그인 페이지
  { path: '/login', element: <><Helmet><title>로그인</title></Helmet><LoginPage /></> },

  // 대시보드 페이지 (인증된 사용자만 접근 가능)
  {
    path: '/dashboard',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <Helmet><title>대시보드</title></Helmet>
            <HeaderBar />
            <Row className="g-0">
              <Col md={9}>
                <Dashboard />
              </Col>
              <Col md={3}>
                <SideBar />
              </Col>
            </Row>
          </>
        )}
      />
    ),
  },

  // 회원 관리 페이지 (인증된 사용자만 접근 가능)
  {
    path: '/user',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <Helmet><title>회원 관리</title></Helmet>
            <HeaderBar />
            <Row className="g-0">
              <Col md={9}>
                <UserManage />
              </Col>
              <Col md={3}>
                <SideBar />
              </Col>
            </Row>
          </>
        )}
      />
    ),
  },
  // 회원 상세보기 페이지 (GenericWrapper 컴포넌트 사용)
  { path: '/user/:userId', element: <><Helmet><title>회원 상세보기</title></Helmet><GenericWrapper mainComponent={UserInfo} paramKeys={['userId']} /></> },

  // 운동 카테고리 관리 페이지 (인증된 사용자만 접근 가능)
  {
    path: '/exercise',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <Helmet><title>운동 카테고리 관리</title></Helmet>
            <HeaderBar />
            <Row className="g-0">
              <Col md={9}>
                <ExerciseManage />
              </Col>
              <Col md={3}>
                <SideBar />
              </Col>
            </Row>
          </>
        )}
      />
    ),
  },
  // 운동 카테고리 추가 페이지 (인증된 사용자만 접근 가능)
  {
    path: '/exercise/add',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <Helmet><title>운동 카테고리 추가</title></Helmet>
            <HeaderBar />
            <Row className="g-0">
              <Col md={9}>
                <ExerciseAdd />
              </Col>
              <Col md={3}>
                <SideBar />
              </Col>
            </Row>
          </>
        )}
      />
    ),
  },
  // 운동 카테고리 상세보기 페이지 (GenericWrapper 컴포넌트 사용)
  { path: '/exercise/:exerId', element:  <><Helmet><title>운동 카테고리 상세보기</title></Helmet><GenericWrapper mainComponent={ExerciseInfo} paramKeys={["exerId"]}  /></> },

  // // 운동 자세 데이터의 자세별 페이지 (인증된 사용자만 접근 가능)
  // {
  //   path: '/exercise/pose',
  //   element: (
  //     <PrivateRoute
  //       element={() => (
  //         <>
  //           <Helmet><title>운동 자세 데이터</title></Helmet>
  //           <HeaderBar />
  //           <Row className="g-0">
  //             <Col md={9}>
  //               <ExercisePoseType />
  //             </Col>
  //             <Col md={3}>
  //               <SideBar />
  //             </Col>
  //           </Row>
  //         </>
  //       )}
  //     />
  //   ),
  // },
  // // 운동 자세 데이터 관리 페이지 (GenericWrapper 컴포넌트 사용)
  // 운동 자세 데이터 관리 페이지 (인증된 사용자만 접근 가능)
  {
    path: '/exercise/pose',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <Helmet><title>운동 자세 데이터 관리</title></Helmet>
            <HeaderBar />
            <Row className="g-0">
              <Col md={9}>
                <ExercisePoseManage />
              </Col>
              <Col md={3}>
                <SideBar />
              </Col>
            </Row>
          </>
        )}
      />
    ),
  },  
  // 운동 자세 데이터 추가 페이지 (인증된 사용자만 접근 가능)
  {
    path: '/exercise/pose/add',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <Helmet><title>운동 자세 데이터 추가</title></Helmet>
            <HeaderBar />
            <Row className="g-0">
              <Col md={9}>
                <ExercisePoseAdd />
              </Col>
              <Col md={3}>
                <SideBar />
              </Col>
            </Row>
          </>
        )}
      />
    ),
  },
  // 운동 자세 데이터 목록조회 페이지 (GenericWrapper 컴포넌트 사용)
  { path: '/exercise/pose/:exerciseName/:dataType?', element: <><Helmet><title>운동 자세 데이터 목록조회</title></Helmet><GenericWrapper mainComponent={ExercisePoseList} paramKeys={["exerciseName", "dataType"]} /></> },
  // 운동 자세 데이터 상세보기 페이지 (GenericWrapper 컴포넌트 사용)  
  { path: '/exercise/pose/:exerciseName/:dataType/:fileName', element: <><Helmet><title>운동 자세 데이터 상세보기</title></Helmet><GenericWrapper mainComponent={ExercisePoseInfo} paramKeys={["exerciseName", "dataType", "fileName"]} /></> },

  // 식품 데이터 관리 페이지 (인증된 사용자만 접근 가능)
  {
    path: '/food',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <Helmet><title>식품 데이터 관리</title></Helmet>
            <HeaderBar />
            <Row className="g-0">
              <Col md={9}>
                <FoodManage />
              </Col>
              <Col md={3}>
                <SideBar />
              </Col>
            </Row>
          </>
        )}
      />
    ),
  },
  
  // 사용자 음식 선호도 관리 페이지 (인증된 사용자만 접근 가능)
  { path: '/preference', element: <><Helmet><title>음식 선호도 관리</title></Helmet><GenericWrapper mainComponent={PreferenceManage} /></> },
  // 사용자 음식 선호도 상세보기 페이지 (GenericWrapper 컴포넌트 사용)
  { path: '/preference/:userId', element: <><Helmet><title>음식 선호도 상세보기</title></Helmet><GenericWrapper mainComponent={PreferenceInfo} paramKeys={["userId"]} /></> },
  
  // 식단 추천 AI 관리 페이지 (인증된 사용자만 접근 가능)
  {
    path: '/aiservice/food',
    element: (
      <PrivateRoute
      element={() => (
        <>
          <Helmet><title>식단 추천 AI 관리</title></Helmet>
          <HeaderBar />
          <Row className="g-0">
            <Col md={9}>
              <FoodAiManage />
            </Col>
            <Col md={3}>
              <SideBar />
            </Col>
          </Row>
        </>
      )}
      />
    ),
  },
  // 식단 추천 AI 학습 페이지 (인증된 사용자만 접근 가능)
  {
    path: '/aiservice/food/train',
    element: (
      <PrivateRoute
      element={() => (
        <>
          <Helmet><title>식단 추천 AI 학습</title></Helmet>
          <HeaderBar />
          <Row className="g-0">
            <Col md={9}>
              <FoodAiTrain />
            </Col>
            <Col md={3}>
              <SideBar />
            </Col>
          </Row>
        </>
      )}
      />
    ),
  },
  // 식단 추천 AI 상세보기 페이지 (GenericWrapper 컴포넌트 사용)
  { path: '/aiservice/food/:foodAiId', element:  <><Helmet><title>식단 추천 AI 상세보기</title></Helmet><GenericWrapper mainComponent={FoodAiInfo} paramKeys={["foodAiId"]} /></> },

  // 운동 자세 AI 종류 고르기 페이지 (GenericWrapper 컴포넌트 사용)
  { path: '/aiservice/workout', element: <><Helmet><title>운동 자세 AI 종류 고르기</title></Helmet><GenericWrapper mainComponent={WorkoutAi} /></> },
  // 운동 자세 AI 관리 페이지 (GenericWrapper 컴포넌트 사용, parentId 파라미터 옵션)
  { path: '/aiservice/workout/:exerciseName?', element: <><Helmet><title>운동 자세 AI 관리</title></Helmet><GenericWrapper mainComponent={WorkoutAiManage} paramKeys={["exerciseName"]} /></> },
  // 운동 자세 AI 상세보기 페이지 (GenericWrapper 컴포넌트 사용, parentId와 subId 파라미터)
  { path: '/aiservice/workout/:parentId/:subId', element: <><Helmet><title>운동 자세 AI 상세보기</title></Helmet><GenericWrapper mainComponent={WorkoutAiInfo} paramKeys={['parentId', 'subId']} /></> },
  // 운동 자세 AI 학습 페이지 (인증된 사용자만 접근 가능)
  {
    path: '/aiservice/workout/train',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <Helmet><title>운동 자세 AI 학습</title></Helmet>
            <HeaderBar />
            <Row className="g-0">
              <Col md={9}>
                <WorkoutAiTrain />
              </Col>
              <Col md={3}>
                <SideBar />
              </Col>
            </Row>
          </>
        )}
      />
    ),
  }
]);

export default routes;