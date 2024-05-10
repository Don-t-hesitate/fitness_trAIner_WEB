import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import './HeaderBar.css';
import { AuthContext } from '../AuthContext';

const HeaderBar = () => {
  // AuthContext에서 로그아웃 함수 가져오기
  const { logout } = useContext(AuthContext);
  // 페이지 이동을 위한 navigate 함수 가져오기
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="sm" className="justify-content-between custom-navbar">
      {/* 로고와 관리자 페이지 텍스트 */}
      <Navbar.Brand href="/dashboard" style={{height: 'auto'}}>
        <img src='/logo_real.png' alt="Logo" style={{width: '25%', height: 'auto'}} />
        관리자 페이지
      </Navbar.Brand>
      {/* 로그아웃 버튼 */}
      <Button style={{margin: "10px"}} onClick={() => {logout(); navigate('/login');}}>
        <span className="material-symbols-outlined" style={{verticalAlign: "middle"}}>logout</span>
        <span style={{verticalAlign: "middle", fontWeight: "bold"}}> 로그아웃</span>
      </Button>
    </Navbar>
  );
};

export default HeaderBar;