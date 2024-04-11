import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function MemberManage () {
  const [memberData, setMemberData] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setMemberData([{"id": 1, "name": 'kim', "email": 'a@ex.com', "phone": '123'}]);
  // }, []);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/member');
        setMemberData(response.data);
      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    };

    fetchMemberData();
  }, []);
  

  if (!memberData) {
    return <div>Loading...</div>;
  }
  
  const handleRowClick = (memberId) => {
    // Navigate to the desired page with the member ID as a parameter
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
                <th>No.</th>
                <th>회원 ID</th>
                <th>회원 닉네임</th>
              </tr>
            </thead>
            <tbody>
              {memberData.map((member, index) => (
                <tr key={member.id}  onClick={() => handleRowClick(member.no)}>
                  <td>{index + 1}</td>
                  <td>{member.id}</td>
                  <td>{member.nickname}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default MemberManage;