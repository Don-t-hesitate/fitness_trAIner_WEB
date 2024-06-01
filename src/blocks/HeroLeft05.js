/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowForward from "@mui/icons-material/ArrowForward";
import TwoSidedLayout from "../components/TwoSidedLayout";

export default function HeroLeft05() {
  return (
    <TwoSidedLayout reversed={true} photo="rank.png">
      <Typography
        color="primary"
        fontSize="lg"
        fontWeight="lg"
        fontFamily="GmarketSansBold"
      >
        운동으로 경쟁하기
      </Typography>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
        fontFamily="GmarketSansBold"
      >
        다른 사람과 <br></br>운동 결과를 <br></br>경쟁해보세요
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
        ner는 운동 점수를 합산하여 <br></br>랭킹에 등록하고 다른 사람들과{" "}
        <br></br>경쟁을 제공합니다.
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
