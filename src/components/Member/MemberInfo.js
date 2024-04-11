import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function MemberInfo({ userId }) {
    const [memberData, setMemberData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMemberData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/api/member/${userId}`);
            setMemberData(response.data);
          } catch (error) {
            console.error('Error fetching member data:', error);
          }
        };
    
        fetchMemberData();
        console.log(memberData);
      }, [userId]);

      if (!memberData) {
        return <div>Loading...</div>;
      }

    return (
        <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="3">회원 No.</Form.Label>
              <Col sm="9">
                <Form.Control value={memberData.no} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">회원 ID</Form.Label>
              <Col sm="9">
                <Form.Control value={memberData.id} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">회원 별명</Form.Label>
              <Col sm="9">
                <Form.Control value={memberData.nickname} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">회원 키</Form.Label>
              <Col sm="9">
                <Form.Control value={memberData.length} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">회원 몸무게</Form.Label>
              <Col sm="9">
                <Form.Control value={memberData.weight} disabled />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">회원 나이</Form.Label>
              <Col sm="9">
                <Form.Control value={memberData.age} disabled />
              </Col>
            </Form.Group>

            {/* <Form.Group as={Row}>
              <Col sm={{ span: 9, offset: 3 }}>
                <Button variant="secondary" className="mr-3">변경내용 초기화</Button>
                <Button variant="secondary">과거 계약 조회</Button>
              </Col>
            </Form.Group> */}
          </Form>
        </Col>
      </Row>
    </Container>
    );
}

export default MemberInfo;