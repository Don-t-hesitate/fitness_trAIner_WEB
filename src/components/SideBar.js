import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SportsGymnasticsRoundedIcon from "@mui/icons-material/SportsGymnasticsRounded";
import KitchenIcon from "@mui/icons-material/Kitchen";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { SvgIcon } from "@mui/joy";
import { LinkContainer } from "react-router-bootstrap";
import { closeSidebar } from "./utils";

function DetectionAndZoneIcon() {
  // 운동 자세 데이터 관리 아이콘
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="#626b74"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path d="M80-680v-120q0-33 23.5-56.5T160-880h120v80H160v120H80ZM280-80H160q-33 0-56.5-23.5T80-160v-120h80v120h120v80Zm400 0v-80h120v-120h80v120q0 33-23.5 56.5T800-80H680Zm120-600v-120H680v-80h120q33 0 56.5 23.5T880-800v120h-80ZM540-580q-33 0-56.5-23.5T460-660q0-33 23.5-56.5T540-740q33 0 56.5 23.5T620-660q0 33-23.5 56.5T540-580Zm-28 340H352l40-204-72 28v136h-80v-188l158-68q35-15 51.5-19.5T480-560q21 0 39 11t29 29l40 64q26 42 70.5 69T760-360v80q-66 0-123.5-27.5T540-380l-28 140Z" />
      </svg>
    </SvgIcon>
  );
}

function Toggler({ defaultExpanded = false, renderToggle, children }) {
  const [open, setOpen] = React.useState(defaultExpanded);
  console.log("defaultExpanded: ", defaultExpanded);
  useEffect(() => {
    setOpen(defaultExpanded);
  }, [defaultExpanded]);

  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  // 선택된 리스트 아이템 구분을 위한 상태
  const [dashboard, setDashboard] = useState(false);
  const [user, setUser] = useState(false);
  const [posture, setPosture] = useState(false);
  const [category, setCategory] = useState(false);
  const [food, setFood] = useState(false);
  const [preference, setPreference] = useState(false);
  const [exerciseAiLearn, setExerciseAiLearn] = useState(false);
  const [exerciseAiModel, setExerciseAiModel] = useState(false);
  const routeStateMap = {
    "/dashboard": setDashboard,
    "/user": setUser,
    "/user/\\d+": setUser,
    "/exercise_pose": setPosture,
    "/exercise_pose/\\w+": setPosture,
    "/exercise_pose/\\w+/\\w+": setPosture,
    "/exercise_pose/\\w+/\\w+/D\\d+-\\d+-\\d+\\.json$": setPosture,
    "/exercise": setCategory,
    "/exercise/\\w+": setCategory,
    "/exercise/\\d+": setCategory,
    "/food": setFood,
    "/preference": setPreference,
    "/aiservice/workout/train": setExerciseAiLearn,
    "/aiservice/workout": setExerciseAiModel,
    "/aiservice/workout/\\w+": setExerciseAiModel,
    "/aiservice/workout/\\w+/\\d+": setExerciseAiModel,
    "/aiservice/workout/\\w+/\\d+\\.\\d+": setExerciseAiModel,
  };

  const navigate = useNavigate();

  // 선택된 리스트 아이템에 따라 상태 변경
  useEffect(() => {
    let setSelectedState;

    for (const route in routeStateMap) {
      const regex = new RegExp(`^${route}$`);
      console.log("route!: ", route);
      console.log("regex: ", regex);
      if (regex.test(window.location.pathname)) {
        setSelectedState = routeStateMap[route];
        break;
      }
    }

    if (setSelectedState) {
      setSelectedState(true);
    }
  }, [window.location.pathname]);

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s, filter 0.3s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
        filter: "var(--Sidebar-blur, none)",
        // backgroundColor: 'var(--joy-palette-background-backdrop)',
        backgroundColor: "var(--joy-palette-background, #fbfcfe)",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          textDecorationLine: "none",
        }}
        component="a"
        href="/dashboard"
      >
        <IconButton variant="soft" color="primary" size="lg">
          <a href="/dashboard">
            <img src="/logo_ver2.png" alt="logo" style={{ width: "44px" }} />
          </a>
        </IconButton>
        <div style={{ marginLeft: "25px", marginTop: "5px" }}>
          <Typography level="title-lg" fontFamily="GmarketSansMedium">
            tr
            <span style={{ color: "#219BCC", fontFamily: "GmarketSansMedium" }}>
              AI
            </span>
            ner
          </Typography>
        </div>
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            fontFamily: "Pretendard-Regular",
          }}
        >
          <ListItem>
            <ListItemButton
              component="a"
              href="/dashboard"
              selected={dashboard}
            >
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" fontFamily="Pretendard-Regular">
                  대시보드
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component="a" href="/user" selected={user}>
              <GroupRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" fontFamily="Pretendard-Regular">
                  사용자
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              defaultExpanded={posture || category ? true : false}
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <SportsGymnasticsRoundedIcon />
                  <ListItemContent>
                    <Typography
                      level="title-sm"
                      fontFamily="Pretendard-Regular"
                    >
                      운동 데이터 관리
                    </Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    component="a"
                    href="/exercise_pose"
                    selected={posture}
                  >
                    <DetectionAndZoneIcon /> 운동 자세 데이터 관리
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    component="a"
                    href="/exercise"
                    selected={category}
                  >
                    <FitnessCenterIcon /> 운동 카테고리 관리
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem nested>
            <Toggler
              defaultExpanded={food || preference ? true : false}
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <KitchenIcon />
                  <ListItemContent>
                    <Typography
                      level="title-sm"
                      fontFamily="Pretendard-Regular"
                    >
                      식품 데이터 관리
                    </Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton component="a" href="/food" selected={food}>
                    <RestaurantMenuIcon /> 식품 정보 데이터 관리
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    component="a"
                    href="/preference"
                    selected={preference}
                  >
                    <ThumbsUpDownIcon /> 사용자 음식 선호도 데이터 관리
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem nested>
            <Toggler
              defaultExpanded={
                exerciseAiLearn || exerciseAiModel ? true : false
              }
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AccessibilityNewIcon />
                  <ListItemContent>
                    <Typography
                      level="title-sm"
                      fontFamily="Pretendard-Regular"
                    >
                      운동 자세 분석 AI 관리
                    </Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    component="a"
                    href="/aiservice/workout/train"
                    selected={exerciseAiLearn}
                  >
                    <AutoAwesomeIcon /> AI 학습
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    component="a"
                    href="/aiservice/workout"
                    selected={exerciseAiModel}
                  >
                    <SmartToyIcon /> AI 모델 목록
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
          <ListItem>
            <ListItemButton component="a" href="/download">
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" fontFamily="Pretendard-Regular">
                  앱 다운로드
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          {/* <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <FoodBankIcon />
                  <ListItemContent>
                    <Typography level="title-sm" fontFamily="Pretendard-Regular">음식 취향 분석 AI 관리</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton component="a" href="/aiservice/food/train" selected={foodAiLearn}>
                    <AutoAwesomeIcon /> AI 학습
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component="a" href="/aiservice/food" selected={foodAiModel}>
                    <SmartToyIcon /> AI 모델 목록
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem> */}
        </List>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button
            variant="solid"
            sx={{ color: "var(--Logout-color, primary)" }}
            size="sm"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <Typography
              sx={{
                color: "var(--Logout-text-color, #ffffff)",
                fontFamily: "Pretendard-Regular",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                logout
              </span>
              로그아웃
            </Typography>
          </Button>
        </Box>
      </Box>
    </Sheet>
  );
}
