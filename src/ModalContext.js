import React, { createContext, useState, useMemo } from "react";

// 모달 관련 상태와 함수를 관리하는 컨텍스트를 생성
export const ModalContext = createContext();

// ModalContext를 제공하는 컴포넌트
export const ModalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false); // 모달의 로딩 상태를 저장할 상태
  const [progress, setProgress] = useState(1); // 다운로드 진행률을 저장할 상태
  const [type, setType] = useState(""); // 다운로드 모달의 타입을 저장할 상태

  // 로딩 시작 함수
  const startLoading = () => {
    setLoading(true);
  };

  // 로딩 종료 함수
  const stopLoading = () => {
    setLoading(false);
  };

  // useMemo를 사용하여 value 객체를 캐싱
  const value = useMemo(
    () => ({
      loading,
      startLoading,
      stopLoading,
      progress,
      setProgress,
      type,
      setType,
    }),
    [loading, progress, type]
  );

  // ModalContext.Provider를 사용하여 loading 상태와 startLoading, stopLoading 함수를 제공
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
