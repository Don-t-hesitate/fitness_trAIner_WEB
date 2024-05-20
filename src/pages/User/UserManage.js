import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../../components/LoadingModal';

function UserManage() {
  // 회원 데이터를 저장할 상태
  const [userData, setUserData] = useState(null); 
  // 현재 페이지 번호를 저장할 상태 및 보여줄 회원 수를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);
  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate(); 
  
  // 컴포넌트가 마운트될 때 한 번만 실행
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('fetchUserData');
        const response = await axios.get(process.env.REACT_APP_API_URL_BLD + '/admin/users'); // 서버에서 회원 데이터를 가져옴
        setUserData(response.data.result.userList); // 회원 데이터를 상태에 저장
        if (response.data.success) {
          console.log(response.data.message);
        } else {
          console.log('fail');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData(); // 회원 데이터 가져오는 함수 실행
  }, []); 

  // userData가 null인 경우 (데이터 로딩 중) 로딩 메시지 표시
  if (!userData) {
    return <LoadingModal data={userData} />;
  }

  const handleRowClick = (userId) => {
    // 회원 ID를 파라미터로 전달하여 회원 정보 페이지로 이동
    navigate(`/user/${userId}`);
  };

  // 현재 페이지에 해당하는 사용자 목록 계산
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  // 페이지 번호 클릭 시 실행되는 함수
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션에 표시할 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(userData.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2 style={{marginBottom: '24px', fontWeight: '800'}}>회원 관리</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>식별 번호</th>
                <th>회원 닉네임</th>
                <th>회원 ID</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers && // currentUsers가 존재하면 테이블 행을 렌더링
                currentUsers.map((user, index) => (
                  <tr key={user.userId} onClick={() => handleRowClick(user.userId)}>
                    {/* 각 행을 클릭하면 handleRowClick 함수가 실행되어 회원 정보 페이지로 이동 */}
                    <td>{user.userId}</td>
                    <td>{user.nickname}</td>
                    <td>{user.username}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Pagination>
            {pageNumbers.map((number) => (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageClick(number)}
              >
                {number}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default UserManage;