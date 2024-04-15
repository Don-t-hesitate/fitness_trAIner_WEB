import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MemberManage() {
  // 회원 데이터를 저장할 상태
  const [memberData, setMemberData] = useState(null); 
  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate(); 

  // 컴포넌트가 마운트될 때 한 번만 실행
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get('/api/member'); // 서버에서 회원 데이터를 가져옴
        setMemberData(response.data.userlist); // 회원 데이터를 상태에 저장
        if (response.data.success) {
          console.log(response.data.message);
        } else {
          console.log('fail');
        }
      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    };
    fetchMemberData();
  }, []); 

  // memberData가 null인 경우 (데이터 로딩 중) 로딩 메시지 표시
  if (!memberData) {
    return <div>Loading...</div>;
  }

  const handleRowClick = (memberId) => {
    // 회원 ID를 파라미터로 전달하여 회원 정보 페이지로 이동
    navigate(`/member/${memberId}`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>회원 관리</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>식별 번호</th>
                <th>회원 ID</th>
                <th>회원 닉네임</th>
              </tr>
            </thead>
            <tbody>
              {memberData && // 회원 데이터가 존재하는 경우에만 렌더링
                memberData.map((member, index) => (
                  <tr key={member.id} onClick={() => handleRowClick(member.userid)}>
                    {/* 각 행을 클릭하면 handleRowClick 함수가 실행되어 회원 정보 페이지로 이동 */}
                    <td>{member.userid}</td>
                    <td>{member.username}</td>
                    <td>{member.nickname}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default MemberManage;