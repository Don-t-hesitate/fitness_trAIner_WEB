import React from 'react';
import { Helmet } from 'react-helmet';
import { createBrowserRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PrivateRoute from './PrivateRoute'; // 인증된 사용자만 접근할 수 있는 라우트 컴포넌트
import HeaderBar from './components/HeaderBar'; // 헤더바 컴포넌트
import SideBar from './components/SideBar'; // 사이드바 컴포넌트
import GenericWrapper from './GenericWrapper'; // 제네릭 래퍼 컴포넌트

// 각 페이지 컴포넌트 임포트
import { LoginPage, PasswordReset, Dashboard } from './components/Admin/';
import { MemberInfo, MemberManage } from './components/Member/';
import { ExercisePoseManage, ExercisePoseAdd, ExercisePoseInfo, ExerciseManage, ExerciseAdd, ExerciseInfo, } from './components/Exercise/';
import { FoodManage, FoodAdd, FoodInfo } from './components/Food/';
import { FoodAiManage, FoodAiTrain, FoodAiInfo, WorkoutAiManage, WorkoutAiTrain, WorkoutAiInfo } from './components/Ai/';

// 브라우저 라우터 생성 및 라우트 정의
const routes = createBrowserRouter([
  // 잘못된 경로에 대한 처리
  { path: '*', element: <><Helmet><title>잘못된 접근</title></Helmet><h1>없는 페이지입니다.</h1><p style={{fontSize: '24px'}}>유효한 주소로 접근하세요.</p></> },
  // 로그인 페이지
  { path: '/', element: <><Helmet><title>로그인</title></Helmet><LoginPage /></> },
  // 비밀번호 찾기 페이지
  { path: '/find-password', element: <><Helmet><title>비밀번호 찾기</title></Helmet><PasswordReset /></>},

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
    path: '/member',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <Helmet><title>회원 관리</title></Helmet>
            <HeaderBar />
            <Row className="g-0">
              <Col md={9}>
                <MemberManage />
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
  { path: '/member/:userId', element: <><Helmet><title>회원 상세보기</title></Helmet><GenericWrapper mainComponent={MemberInfo} paramKeys={['userId']} /></> },

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
  // 운동 자세 데이터 상세보기 페이지 (GenericWrapper 컴포넌트 사용)  
  { path: '/exercise/pose/:exerId', element: <><Helmet><title>운동 자세 데이터 상세보기</title></Helmet><GenericWrapper mainComponent={ExercisePoseInfo} paramKeys={["exerId"]} /></> },

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
  // 식품 데이터 추가 페이지 (인증된 사용자만 접근 가능)
  {
    path: '/food/add',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <Helmet><title>식품 데이터 추가</title></Helmet>
            <HeaderBar />
            <Row className="g-0">
              <Col md={9}>
                <FoodAdd />
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
  // 식품 데이터 상세보기 페이지 (GenericWrapper 컴포넌트 사용)
  { path: '/food/:foodId', element: <><Helmet><title>식품 데이터 상세보기</title></Helmet><GenericWrapper mainComponent={FoodInfo} paramKeys={["foodId"]} /></> },
  
  // 식단 추천 AI 관리 페이지 (인증된 사용자만 접근 가능)
  {
    path: '/ai/food',
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
    path: '/ai/food/train',
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
  { path: '/ai/food/:foodAiId', element:  <><Helmet><title>식단 추천 AI 상세보기</title></Helmet><GenericWrapper mainComponent={FoodAiInfo} paramKeys={["foodAiId"]} /></> },

  // 운동 자세 AI 관리 페이지 (GenericWrapper 컴포넌트 사용, parentId 파라미터 옵션)
  { path: '/ai/workout/:parentId?', element: <><Helmet><title>운동 자세 AI 관리</title></Helmet><GenericWrapper mainComponent={WorkoutAiManage} paramKeys={["parentId"]} /></> },
  // 운동 자세 AI 학습 페이지 (인증된 사용자만 접근 가능)
  {
    path: '/ai/workout/train',
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
  },
  // 운동 자세 AI 상세보기 페이지 (GenericWrapper 컴포넌트 사용, parentId와 subId 파라미터)
  { path: '/ai/workout/:parentId/:subId', element: <><Helmet><title>운동 자세 AI 상세보기</title></Helmet><GenericWrapper mainComponent={WorkoutAiInfo} paramKeys={['parentId', 'subId']} /></> }
]);

export default routes;