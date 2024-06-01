import React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import ArrowForward from "@mui/icons-material/ArrowForward";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import TwoSidedLayout from "../components/TwoSidedLayout";

export default function HeroLeft04() {
  return (
    <TwoSidedLayout reversed={true} photo="result.png">
      <Typography
        color="primary"
        fontSize="lg"
        fontWeight="lg"
        fontFamily="GmarketSansBold"
      >
        운동 결과 확인하기
      </Typography>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
        fontFamily="GmarketSansBold"
      >
        수행한 운동의 정보를 <br></br>추적해보세요
      </Typography>
      <Typography
        fontSize="lg"
        textColor="text.secondary"
        lineHeight="lg"
        sx={{ marginTop: "10px" }}
        fontFamily="GmarketSansMedium"
      >
        tr
        <span style={{ color: "#219BCC", fontFamily: "GmarketSansMedium" }}>
          AI
        </span>
        ner는 평가한 운동에 대해 <br></br>점수를 매겨 사용자를 격려합니다.
      </Typography>
      {/* <Button size="lg" endDecorator={<ArrowForward fontSize="xl" />}>
        Get Started
      </Button> */}
      <Typography
        level="body-xs"
        sx={{
          position: "absolute",
          top: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      ></Typography>
    </TwoSidedLayout>
  );
}
