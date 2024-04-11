import React from 'react';
import { useRouteLoaderData, useLoaderData } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PrivateRoute from './PrivateRoute';
import LoginPage from './components/Admin//LoginPage';
import InfoFind from './components/Admin/InfoFind';
import HamburgerMenu from './components/HamburgerMenu';
import SideBar from './components/SideBar';

import AdminDashboard from './components/Admin//AdminDashboard';

import MemberInfo from './components/Member/MemberInfo'
import MemberManage from './components/Member/MemberManage';

import ExercisePoseManage from './components/Exercise/ExercisePoseManage';
import ExercisePoseAdd from './components/Exercise/ExercisePoseAdd';
import ExercisePoseInfo from './components/Exercise/ExercisePoseInfo';
import ExerciseManage from './components/Exercise/ExerciseManage';
import ExerciseAdd from './components/Exercise/ExerciseAdd';
import ExerciseInfo from './components/Exercise/ExerciseInfo';

import FoodManage from './components/Food/FoodManage';
import FoodAdd from './components/Food/FoodAdd';
import FoodInfo from './components/Food/FoodInfo';

import FoodAiManage from './components/Ai/FoodAiManage';
import FoodAiTrain from './components/Ai/FoodAiTrain';
import FoodAiInfo from './components/Ai/FoodAiInfo';
import WorkoutAiManage from './components/Ai/WorkoutAiManage';
import WorkoutAiTrain from './components/Ai/WorkoutAiTrain';
import WorkoutAiInfo from './components/Ai/WorkoutAiInfo';


const MemberInfoWrapper = () => {
  const { userId } = useLoaderData();

  return (
    <>
      <HamburgerMenu />
      <Row className="align-items-center">
        <Col md={9}>
          <MemberInfo userId={userId} />
        </Col>
        <Col md={3}>
          <SideBar />
        </Col>
      </Row>
    </>
  );
};

const FoodAiInfoWrapper = () => {
  console.log("sibel: "+ useRouteLoaderData('/ai/food/:foodAiId'));
  const { foodAiId } = useRouteLoaderData('/ai/food/:foodAiId');

  return (
    <>
      <HamburgerMenu />
      <Row className="align-items-center">
        <Col md={9}>
          <FoodAiInfo foodAiId={foodAiId} />
        </Col>
        <Col md={3}>
          <SideBar />
        </Col>
      </Row>
    </>
  );
};

const WorkoutAiManageWrapper = () => {
  const { parentId } = useRouteLoaderData('/ai/workout/:parentId?');

  return (
    <>
      <HamburgerMenu />
      <Row className="align-items-center">
        <Col md={9}>
          <WorkoutAiManage parentId={parentId} />
        </Col>
        <Col md={3}>
          <SideBar />
        </Col>
      </Row>
    </>
  );
};

const WorkoutAiInfoWrapper = () => {
  const { parentId, subId } = useRouteLoaderData('/ai/workout/:parentId/:subId');

  return (
    <>
      <HamburgerMenu />
      <Row className="align-items-center">
        <Col md={9}>
          <WorkoutAiInfo parentId={parentId} subId={subId} />
        </Col>
        <Col md={3}>
          <SideBar />
        </Col>
      </Row>
    </>
  );
};

const ExerciseInfoWrapper = () => {
  const { exerId } = useRouteLoaderData('/exercise/:exerId');

  return (
    <>
      <HamburgerMenu />
      <Row className="align-items-center">
        <Col md={9}>
          <ExerciseInfo exerId={exerId} />
        </Col>
        <Col md={3}>
          <SideBar />
        </Col>
      </Row>
    </>
  );
};

const ExercisePoseInfoWrapper = () => {
  const { exerId } = useRouteLoaderData('/exercise/pose/:exerId');

  return (
    <>
      <HamburgerMenu />
      <Row className="align-items-center">
        <Col md={9}>
          <ExercisePoseInfo exerId={exerId} />
        </Col>
        <Col md={3}>
          <SideBar />
        </Col>
      </Row>
    </>
  );
};

const FoodInfoWrapper = () => {
  const { foodId } = useRouteLoaderData('/food/:foodId');

  return (
    <>
      <HamburgerMenu />
      <Row className="align-items-center">
        <Col md={9}>
          <FoodInfo foodId={foodId} />
        </Col>
        <Col md={3}>
          <SideBar />
        </Col>
      </Row>
    </>
  );
};

const routes = [
  { path: '/', element: <LoginPage /> },
  { path: '/find', element: <PrivateRoute element={InfoFind} /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <HamburgerMenu />
            <Row className="g-0">
              <Col md={9}>
                <AdminDashboard />
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
  {
    path: '/member',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <HamburgerMenu />
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
  { path: '/member/:userId', element: <PrivateRoute element={MemberInfoWrapper} />, loader: ({ params }) => { 
      const userId = params.userId;
      // userId를 사용하여 필요한 데이터 로드 로직 구현
      return { userId };
    } 
  },
  {
    path: '/exercise',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <HamburgerMenu />
            <Row className="align-items-center">
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
  {
    path: '/exercise/add',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <HamburgerMenu />
            <Row className="align-items-center">
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
  { path: '/exercise/:exerId', element: <PrivateRoute element={ExerciseInfoWrapper} />, loader: ({ params }) => ({ exerId: params.exerId }) },
  {
    path: '/exercise/pose',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <HamburgerMenu />
            <Row className="align-items-center">
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
  {
    path: '/exercise/pose/add',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <HamburgerMenu />
            <Row className="align-items-center">
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
  { path: '/exercise/pose/:exerId', element: <PrivateRoute element={ExercisePoseInfoWrapper} />, loader: ({ params }) => ({ exerId: params.exerId }) },
  {
    path: '/food',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <HamburgerMenu />
            <Row className="align-items-center">
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
  {
    path: '/food/add',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <HamburgerMenu />
            <Row className="align-items-center">
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
  { path: '/food/:foodId', element: <PrivateRoute element={FoodInfoWrapper} />, loader: ({ params }) => ({ foodId: params.foodId }) },
  {
    path: '/ai/food',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <HamburgerMenu />
            <Row className="align-items-center">
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
  {
    path: '/ai/food/train',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <HamburgerMenu />
            <Row className="align-items-center">
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
  { path: '/ai/food/:foodAiId', element: <PrivateRoute element={FoodAiInfoWrapper} />, loader: ({ params }) => ({ foodAiId: params.foodAiId }) },
  { path: '/ai/workout/:parentId?', element: <PrivateRoute element={WorkoutAiManageWrapper} />, loader: ({ params }) => ({ parentId: params.parentId }) },
  {
    path: '/ai/workout/train',
    element: (
      <PrivateRoute
        element={() => (
          <>
            <HamburgerMenu />
            <Row className="align-items-center">
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
  { path: '/ai/workout/:parentId/:subId', element: <PrivateRoute element={WorkoutAiInfoWrapper} />, loader: ({ params }) => ({ parentId: params.parentId, subId: params.subId }) },
];

export default routes;