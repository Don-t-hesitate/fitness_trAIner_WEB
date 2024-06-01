import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Sheet,
  Stack,
  Card as MuiCard,
} from "@mui/joy";
import {
  ChevronRightRounded as ChevronRightRoundedIcon,
  HomeRounded as HomeRoundedIcon,
} from "@mui/icons-material";

function Dashboard() {
  const chartRef = useRef(null); // 차트 캔버스 엘리먼트 참조

  useEffect(() => {
    let chart = null;

    // chartRef.current에 캔버스 엘리먼트가 있는 경우
    if (chartRef && chartRef.current) {
      // 새로운 차트 인스턴스 생성
      chart = new Chart(chartRef.current, {
        type: "bar", // 차트 타입: 바 차트
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
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [
      {
        label: "일일 사용자 접속 현황",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
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
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="sm" />}
          sx={{ pl: 0 }}
        >
          <Link
            underline="none" // hover는 마우스를 올렸을 때 밑줄이 생기는 것
            color="neutral"
            href="/dashboard"
            aria-label="Home"
          >
            <HomeRoundedIcon />
          </Link>
        </Breadcrumbs>
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          display: { xs: "initial", sm: "initial" },
          width: "100%",
          height: "60vh",
          borderRadius: "sm",
          borderColor: "#ffffff",
          flexShrink: 1,
          backgroundColor: "#ffffff",
          position: "relative",
        }}
      >
        {/* 대시보드 제목 */}
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <Typography
            level="h2"
            component="h1"
            fontFamily="Pretendard-Regular"
            sx={{ mb: 2 }}
          >
            대시보드
          </Typography>
          {/* <h1 className="h2" style={{ fontWeight: "800" }}> */}
        </div>

        <h4 style={{ fontWeight: "700" }}>서비스 현황</h4>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          spacing={4}
          sx={{
            display: "flex",
            maxWidth: "100%",
            mx: "auto",
            px: { xs: 2, md: 6 },
            py: { xs: 2, md: 3 },
          }}
        >
          <MuiCard sx={{ width: "30%" }}>
            <Typography
              level="title-lg"
              fontFamily="Pretendard-Regular"
              fontWeight="600"
              fontSize="20px"
            >
              오늘 가입자수
            </Typography>
            <Typography level="body-md" fontFamily="Pretendard-Regular">
              132명
            </Typography>
          </MuiCard>
          <MuiCard sx={{ width: "30%" }}>
            <Typography
              level="title-lg"
              fontFamily="Pretendard-Regular"
              fontWeight="600"
              fontSize="20px"
            >
              전체 가입자수
            </Typography>
            <Typography level="body-md" fontFamily="Pretendard-Regular">
              8,120명
            </Typography>
          </MuiCard>
          <MuiCard sx={{ width: "30%" }}>
            <Typography
              level="title-lg"
              fontFamily="Pretendard-Regular"
              fontWeight="600"
              fontSize="20px"
            >
              이용률
            </Typography>
            <Typography level="body-md" fontFamily="Pretendard-Regular">
              78%
            </Typography>
          </MuiCard>
        </Stack>

        <h4 style={{ fontWeight: "700", marginTop: "30px" }}>
          일일 사용자 접속 통계
        </h4>
        <canvas
          ref={chartRef}
          style={{ position: "absolute", width: "100%", height: "80%" }}
        />
      </Sheet>
    </>
  );
}

export default Dashboard;
