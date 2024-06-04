import React from "react";
import { Row, Col } from "react-bootstrap";
import FoodExcel from "./FoodExcel";
import { Box, Breadcrumbs, Link, Typography } from "@mui/joy";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

function PreferenceManage() {
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
          <Typography color="primary" fontWeight={500} fontSize={12}>
            선호 음식 관리
          </Typography>
        </Breadcrumbs>
      </Box>
      <Row>
        <Col>
          <Typography
            level="h2"
            fontWeight="700"
            marginBottom="16px"
            fontFamily="Pretendard-Regular"
          >
            선호 음식 관리
          </Typography>
          <FoodExcel
            apiDestination={"/admin/food/preferences/select_food_list.csv"}
          />
        </Col>
      </Row>
    </>
  );
}

export default PreferenceManage;
