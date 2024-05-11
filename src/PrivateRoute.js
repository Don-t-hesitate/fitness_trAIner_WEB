import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import LoadingModal from './components/LoadingModal';

const PrivateRoute = ({ element: Element, ...rest }) => {
  // AuthContext에서 user 상태 가져오기
  const { user } = useAuth();

  // user 상태가 undefined인 경우 (로딩 중일 때) 로딩 메시지 출력
  if (user === undefined) {
    return <LoadingModal />;
  }

  // user 상태가 truthy이고 username이 있을 경우 (인증된 경우)
  // 전달받은 Element 컴포넌트를 렌더링하고, 그렇지 않은 경우 '/'로 리다이렉트
  return user && user.username ? <Element {...rest} /> : <Navigate to="/" replace />;
};

export default PrivateRoute;