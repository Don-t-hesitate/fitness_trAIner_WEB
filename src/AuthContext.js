import React, { createContext, useState, useContext } from 'react';

// 인증 관련 상태와 함수를 관리하는 컨텍스트를 생성
export const AuthContext = createContext();

// AuthContext를 제공하는 컴포넌트
export const AuthProvider = ({ children }) => {
  // 사용자 정보를 저장할 상태와 세션 스토리지에서 사용자 정보를 가져와 초기 상태로 설정
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 로그인 함수
  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  // AuthContext.Provider를 사용하여 user 상태와 login, logout 함수를 제공
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext에 접근하는 커스텀 hook
export const useAuth = () => {
  return useContext(AuthContext);
};