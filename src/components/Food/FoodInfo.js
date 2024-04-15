import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function FoodInfo({ foodId }) {
    const [foodData, setFoodData] = useState(null);
    const navigate = useNavigate();

    const handleClick = (e) => {
      e.preventDefault();
      window.confirm("정말 삭제하시겠습니까?");
    };

    useEffect(() => {
        const fetchFoodData = async () => {
          try {
            const response = await axios.get(`/api/food/${foodId}`);
            setFoodData(response.data);
          } catch (error) {
            console.error('Error fetching food data:', error);
          }
        };
    
        fetchFoodData();
        console.log(foodData);
      }, [foodId]);

      if (!foodData) {
        return <div>Loading...</div>;
      }

    return (
        <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="3">음식 코드</Form.Label>
              <Col sm="9">
                <Form.Control value={foodData.code} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">음식 이름</Form.Label>
              <Col sm="9">
                <Form.Control value={foodData.name} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">mainFoodType</Form.Label>
              <Col sm="9">
                <Form.Control value={foodData.mainFoodType} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">detailedFoodType</Form.Label>
              <Col sm="9">
                <Form.Control value={foodData.detailedFoodType} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">칼로리</Form.Label>
              <Col sm="9">
                <Form.Control value={foodData.calorie} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">단백질</Form.Label>
              <Col sm="9">
                <Form.Control value={foodData.protein} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">지방</Form.Label>
              <Col sm="9">
                <Form.Control value={foodData.fat} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">탄수화물</Form.Label>
              <Col sm="9">
                <Form.Control value={foodData.carbohydrate} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">맛</Form.Label>
              <Col sm="9">
                <Form.Control value={foodData.taste} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">주재료</Form.Label>
              <Col sm="9">
                <Form.Control value={foodData.mainIngredient} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">부재료</Form.Label>
              <Col sm="9">
                <Form.Control value={foodData.secondaryIngredient} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">요리방식</Form.Label>
              <Col sm="9">
                <Form.Control value={foodData.cookMethod} />
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
      <Row className="align-items-center">
        <Col>
          <div>
          </div>
        </Col>
        <Col xs="auto" className="ml-auto">
          <Button variant="primary" size="sm" >
            수정
          </Button>
          <Button variant="danger" size="sm" onClick={handleClick}>
            삭제
          </Button>
        </Col>
      </Row>
    </Container>
    );
}

export default FoodInfo;