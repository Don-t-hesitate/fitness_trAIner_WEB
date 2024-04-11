import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale } from 'chart.js/auto';

function AdminDashboard() {
  const chartRef = useRef(null);

  useEffect(() => {
    let chart = null;
    if (chartRef && chartRef.current) {
      chart = new Chart(chartRef.current, {
        type: 'bar',
        data: data,
        options: options,
      });
    }
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  const data = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        label: '일일 사용자 접속 현황',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={9} lg={10} className="ml-sm-auto px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">대시보드</h1>
            </div>
            <h4>서비스 현황</h4>
            <Row>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>오늘 가입자수</Card.Title>
                    <Card.Text>132명</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>전체 가입자수</Card.Title>
                    <Card.Text>8,120명</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>이용률</Card.Title>
                    <Card.Text>78%</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <h4>일일 사용자 접속 통계</h4>
            <canvas ref={chartRef} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;