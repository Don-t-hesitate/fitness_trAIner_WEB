import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import LoginPage from './LoginPage';
import HamburgerMenu from './HamburgerMenu';
import AdminDashboard from './AdminDashboard';
import MemberManage from './MemberManage';
import MemberInfo from './MemberInfo'
import ExercisePoseManage from './ExercisePoseManage';
import ExercisePoseInfo from './ExercisePoseInfo';
import ExercisePoseAdd from './ExercisePoseAdd';
import ExerciseManage from './ExerciseManage';
import ExerciseAdd from './ExerciseAdd';
import ExerciseInfo from './ExerciseInfo';
import FoodManage from './FoodManage';
import FoodAdd from './FoodAdd';
import FoodInfo from './FoodInfo';
import SideBar from './SideBar';
import FoodAiManage from './FoodAiManage';
import FoodAiTrain from './FoodAiTrain';
import FoodAiInfo from './FoodAiInfo';
import WorkoutAiManage from './WorkoutAiManage';
import WorkoutAiTrain from './WorkoutAiTrain';
import WorkoutAiInfo from './WorkoutAiInfo';

const MemberInfoWrapper = () => {
  const { userId } = useParams();

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
  const { foodAiId } = useParams();

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
  const { parentId } = useParams();

  return (
    <>
      <HamburgerMenu />
      <Row className="align-items-center">
        <Col md={9}>
          <WorkoutAiManage parentId={parentId} />
          {console.log("og: " + parentId)}
        </Col>
        <Col md={3}>
          <SideBar />
        </Col>
      </Row>
    </>
  );
};

const WorkoutAiInfoWrapper = () => {
  const { parentId, subId } = useParams();

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
  const { exerId } = useParams();

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
  const { exerId } = useParams();

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
  const { foodId } = useParams();

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


function App() {
  return (
    <>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={
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
          } />
          {/* ------------------------ member ------------------------ */}
          <Route path='/member' element={
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
          } />
          <Route path="/member/:userId" element={<MemberInfoWrapper />} />
          
          {/* ------------------------ Exercise ------------------------ */}
          <Route path='/exercise' element={
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
          } />
          <Route path='/exercise/add' element={
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
          } />
          <Route path="/exercise/:exerId" element={<ExerciseInfoWrapper />} />
          {/* ------------------------ ExercisePose ------------------------ */}
          <Route path='/exercise/pose' element={
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
          } />
          <Route path='/exercise/pose/add' element={
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
          } />
          <Route path="/exercise/pose/:exerId" element={<ExercisePoseInfoWrapper />} />
          {/* ------------------------ Food ------------------------ */}
          <Route path='/food' element={
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
          } />
          <Route path='/food/add' element={
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
          } />
          <Route path="/food/:foodId" element={<FoodInfoWrapper />} />
          {/* ------------------------ FoodAI ------------------------ */}
          <Route path='/ai/food' element={
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
          } />
          <Route path='/ai/food/train' element={<>
            <HamburgerMenu />
              <Row className="align-items-center">
                <Col md={9}>
                  <FoodAiTrain />
                </Col>
                <Col md={3}>
                  <SideBar />
                </Col>
              </Row>
          </>} />
          <Route path="/ai/food/:foodAiId" element={<FoodAiInfoWrapper />} />
          {/* ------------------------ WorkoutAI ------------------------ */}
          <Route path='/ai/workout/:parentId?' element={<WorkoutAiManageWrapper />} />
          <Route path='/ai/workout/train' element={<>
            <HamburgerMenu />
              <Row className="align-items-center">
                <Col md={9}>
                  <WorkoutAiTrain />
                </Col>
                <Col md={3}>
                  <SideBar />
                </Col>
              </Row>
          </>} />
          <Route path="/ai/workout/:parentId/:subId" element={<WorkoutAiInfoWrapper />} />
          {/* ------------------------ etc ------------------------ */}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;