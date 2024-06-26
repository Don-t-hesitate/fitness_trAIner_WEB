import React from "react";
import AvatarGroup from "@mui/joy/AvatarGroup";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import ArrowForward from "@mui/icons-material/ArrowForward";
import TwoSidedLayout from "../components/TwoSidedLayout";

export default function HeroLeft03() {
  return (
    <TwoSidedLayout reversed={true} photo="demo.png">
      <Typography
        color="primary"
        fontSize="lg"
        fontWeight="lg"
        fontFamily="GmarketSansBold"
      >
        운동 피드백
      </Typography>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
        fontFamily="GmarketSansBold"
      >
        지금 하고있는 운동의 <br></br>평가를 해드릴게요
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
        ner는 운동 자세를 세 단계로 평가하고 <br></br>개선 방안을 제시합니다.
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
