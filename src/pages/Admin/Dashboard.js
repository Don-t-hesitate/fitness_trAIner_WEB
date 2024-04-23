import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Chart } from 'chart.js/auto';

function Dashboard() {
  const chartRef = useRef(null); // 차트 캔버스 엘리먼트 참조

  useEffect(() => {
    let chart = null;

    // chartRef.current에 캔버스 엘리먼트가 있는 경우
    if (chartRef && chartRef.current) {
      // 새로운 차트 인스턴스 생성
      chart = new Chart(chartRef.current, {
        type: 'bar', // 차트 타입: 바 차트
        data: data, // 차트 데이터
        options: options, // 차트 옵션
      });
    }

    // 컴포넌트 unmount 시 차트 인스턴스 제거
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []); // 빈 배열로 인해 컴포넌트 마운트 시에만 실행

  // 차트 데이터
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

  // 차트 옵션
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
    <Container fluid style={{ paddingLeft: '20px', paddingRight: '0px' }}>
      {/* 대시보드 제목 */}
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
    </Container>
  );
}

export default Dashboard;