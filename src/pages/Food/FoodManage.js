import React from "react";
import { Row, Col } from "react-bootstrap";
import FoodExcel from "./FoodExcel";
import { Box, Breadcrumbs, Link, Typography } from "@mui/joy";
import {
  ChevronRightRounded as ChevronRightRoundedIcon,
  HomeRounded as HomeRoundedIcon,
} from "@mui/icons-material";
import "../../components/font.css";
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as extendMaterialTheme,
  THEME_ID as MATERIAL_THEME_ID,
  Typography as MaterialTypography,
} from "@mui/material";

const materialTheme = extendMaterialTheme();

function FoodManage() {
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
            음식 관리
          </Typography>
        </Breadcrumbs>
      </Box>
      <Row>
        <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
          <Col>
            <Typography
              level="h2"
              fontWeight="700"
              marginBottom="16px"
              fontFamily="Pretendard-Regular"
            >
              음식 관리
            </Typography>
            <FoodExcel
              apiDestination={"/admin/food/info/food_db_result_final.xlsx"}
            />
          </Col>
        </MaterialCssVarsProvider>
      </Row>
    </>
  );
}

export default FoodManage;
