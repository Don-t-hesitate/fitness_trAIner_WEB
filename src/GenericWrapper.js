import React from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import HeaderBar from './components/HeaderBar';
import SideBar from './components/SideBar';
import PrivateRoute from './PrivateRoute';

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
        <>
          {/* 상단 바 컴포넌트 */}
          <HeaderBar />
          <Row className="g-0">
            {/* 메인 컴포넌트 */}
            <Col md={9}>
              <MainComponent {...mainComponentProps} />
            </Col>
            {/* 사이드바 컴포넌트 */}
            <Col md={3}>
              <SideBar />
            </Col>
          </Row>
        </>
      )}
    />
  );
};

export default GenericWrapper;