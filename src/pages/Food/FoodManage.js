import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FoodExcel from './FoodExcel';

function FoodManage() {
  const [foodData, setFoodData] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchFoodData = async () => {
  //     try {
  //     const response = await axios.get('/api/food');
  //     setFoodData(response.data);
  //     } catch (error) {
  //     console.error('Error fetching food data:', error);
  //     }
  //   };
  
  //   fetchFoodData();
  // }, []);

  // if (!foodData) {
  //   return <div>Loading...</div>;
  // }

  // const handleRowClick = (foodId) => {
  //   // Navigate to the desired page with the food ID as a parameter
  //   navigate(`/food/${foodId}`);
  // };

  return (
    <Container>
      <Row>
        <Col>
          <h2>음식 관리</h2>
          {/* <Table striped bordered hover>
            <thead>
              <tr>
                <th>음식 코드</th>
                <th>음식 이름</th>
                <th>mainFoodType</th>
                <th>
                  detailedFoodType
                </th>
                <th>
                  칼로리
                </th>
                <th>
                  단백질
                </th>
                <th>
                  지방
                </th>
                <th>
                  탄수화물
                </th>
                <th>
                  맛
                </th>
                <th>
                  주재료
                </th>
                <th>
                  부재료
                </th>
                <th>
                  요리방식
                </th>
              </tr>
            </thead> */}
            {/* <tbody>
              {foodData.map((food, index) => (
                <tr key={food.id}  onClick={() => handleRowClick(food.code)}>
                  <td>{food.code}</td>
                  <td>{food.name}</td>
                  <td>{food.mainFoodType}</td>
                  <td>{food.detailedFoodType}</td>
                  <td>{food.calorie}</td>
                  <td>{food.protein}</td>
                  <td>{food.fat}</td>
                  <td>{food.carbohydrate}</td>
                  <td>{food.taste}</td>
                  <td>{food.mainIngredient}</td>
                  <td>{food.secondaryIngredient}</td>
                  <td>{food.cookMethod}</td>
                </tr>
              ))}
            </tbody> */}
          {/* </Table> */}
          <FoodExcel />
        </Col>
      </Row>
      {/* <Row className="align-items-center">
        <Col>
          <div>
            <span style={{color: 'blue', fontWeight: 'bold', textDecoration: "underline"}}>1</span> <span> 2 3 4 5</span>
          </div>
        </Col>
        <Col xs="auto" className="ml-auto">
          <Button variant="primary" size="sm" href='/food/add'>
            추가
          </Button>
        </Col>
      </Row> */}
    </Container>
  );
}

export default FoodManage;