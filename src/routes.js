import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import HamburgerMenu from './components/HamburgerMenu';
import SideBar from './components/SideBar';
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
  const { params: { userId } } = useRouteMatch('/member/:userId');

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
  const { params: { foodAiId } } = useRouteMatch('/ai/food/:foodAiId');

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
  const { params: { parentId } } = useRouteMatch('/ai/workout/:parentId?');

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
  const { params: { parentId, subId } } = useRouteMatch('/ai/workout/:parentId/:subId');

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
  const { params: { exerId } } = useRouteMatch('/exercise/:exerId');

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
  const { params: { exerId } } = useRouteMatch('/exercise/pose/:exerId');

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
  const { params: { foodId } } = useRouteMatch('/food/:foodId');

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
  {
    path: '/dashboard',
    element: (
      <>
        <HamburgerMenu />
        <Row className="align-items-center">
          <Col md={11}>
            <AdminDashboard />
          </Col>
          <Col md={1}>
            <SideBar />
          </Col>
        </Row>
      </>
    ),
  },
  {
    path: '/member',
    element: (
      <>
        <HamburgerMenu />
        <Row className="align-items-center">
          <Col md={9}>
            <MemberManage />
          </Col>
          <Col md={3}>
            <SideBar />
          </Col>
        </Row>
      </>
    ),
  },
  { path: '/member/:userId', element: <MemberInfoWrapper /> },
  {
    path: '/exercise',
    element: (
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
    ),
  },
  {
    path: '/exercise/add',
    element: (
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
    ),
  },
  { path: '/exercise/:exerId', element: <ExerciseInfoWrapper /> },
  {
    path: '/exercise/pose',
    element: (
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
    ),
  },
  {
    path: '/exercise/pose/add',
    element: (
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
    ),
  },
  { path: '/exercise/pose/:exerId', element: <ExercisePoseInfoWrapper /> },
  {
    path: '/food',
    element: (
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
    ),
  },
  {
    path: '/food/add',
    element: (
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
    ),
  },
  { path: '/food/:foodId', element: <FoodInfoWrapper /> },
  {
    path: '/ai/food',
    element: (
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
    ),
  },
  {
    path: '/ai/food/train',
    element: (
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
    ),
  },
  { path: '/ai/food/:foodAiId', element: <FoodAiInfoWrapper /> },
  { path: '/ai/workout/:parentId?', element: <WorkoutAiManageWrapper /> },
  {
    path: '/ai/workout/train',
    element: (
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
    ),
  },
  { path: '/ai/workout/:parentId/:subId', element: <WorkoutAiInfoWrapper /> },
];

export default routes;