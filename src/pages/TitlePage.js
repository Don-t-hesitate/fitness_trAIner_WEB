import React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import IconButton from "@mui/joy/IconButton";
import Button from "@mui/joy/Button";
import { Link } from "react-router-dom";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

import framesxTheme from "./theme.js";
import HeroLeft01 from "../blocks/HeroLeft01.js";
import HeroLeft02 from "../blocks/HeroLeft02.js";
import HeroLeft03 from "../blocks/HeroLeft03.js";
import HeroLeft04 from "../blocks/HeroLeft04.js";
import HeroLeft05 from "../blocks/HeroLeft05.js";
import HeroLeft06 from "../blocks/HeroLeft06.js";
import HeroLeft07 from "../blocks/HeroLeft07.js";
import HeroLeft08 from "../blocks/HeroLeft08.js";
import HeroLeft09 from "../blocks/HeroLeft09.js";
import HeroLeft10 from "../blocks/HeroLeft10.js";

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="lg"
      variant="soft"
      color="neutral"
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
      sx={{
        position: "fixed",
        zIndex: 999,
        top: "1rem",
        right: "1rem",
        borderRadius: "50%",
        boxShadow: "sm",
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

function NavBar() {
  return (
    <div style={{ fontFamily: "GmarketSansBold" }}>
      {/* <Container fluid style={{backgroundColor: '#1E3252', position: 'relative'}}>
        <div style={{width: '100%', maxWidth: '유지할 최대 너비값', margin: '0 auto', padding: '20px'}}>
          <Stack direction='horizontal'>
            <h1 style={{marginLeft: '37.5%'}}><div style={{color: 'white'}}>trAIner fitness</div></h1>
            <Link className='ms-auto' to={'/login'}><Button variant='muted'><div style={{color: 'grey'}}>admin</div></Button></Link>
          </Stack>
        </div>
      </Container> */}
      <div
        fluid
        style={{
          position: "fixed",
          backgroundColor: "#1E3252",
          display: "flex",
          alignItems: "center",
          height: "70px",
          zIndex: 1000,
          width: "100%",
          padding: "0 20px",
        }}
      >
        <div style={{ flex: 1, textAlign: "center" }}>
          <h1
            style={{
              color: "white",
              margin: 0,
              marginLeft: "60px",
              fontFamily: "GmarketSansMedium",
              fontWeight: "600",
            }}
          >
            tr
            <span
              style={{
                color: "#76D1FE",
                fontFamily: "GmarketSansMedium",
                fontWeight: "600",
              }}
            >
              AI
            </span>
            ner
          </h1>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Link to={"/login"}>
            <Button variant="muted">
              <div style={{ color: "grey" }}>admin</div>
            </Button>
          </Link>
        </div>
      </div>
      {/* <Container style={{position: 'fixed', top: 0, left: 0, right: 0, background: '#1E3252', opacity: 0.95}}>
        <Row>
          <Stack direction='horizontal'>
            <h1 style={{marginLeft: '40%'}}><div style={{color: 'white'}}>trAIner fitness</div></h1>
            <Link className='ms-auto' to={'/login'}><Button variant='muted'><div style={{color: 'grey'}}>admin</div></Button></Link>
          </Stack>
        </Row>
      </Container> */}
    </div>
  );
}

function TitlePage() {
  return (
    <>
      <NavBar />
      <CssVarsProvider disableTransitionOnChange theme={framesxTheme}>
        <CssBaseline />
        {/* <ColorSchemeToggle /> */}
        <Box
          sx={{
            height: "100vh",
            overflowY: "scroll",
            scrollSnapType: "y mandatory",
            "& > div": {
              scrollSnapAlign: "start",
            },
            fontFamily: "GmarketSansBold",
          }}
        >
          <HeroLeft01 />
          <HeroLeft02 />
          <HeroLeft03 />
          <HeroLeft04 />
          <HeroLeft05 />
          {/* <HeroLeft06 /> */}
          {/* <HeroLeft07 /> */}
          {/* <HeroLeft08 /> */}
          {/* <HeroLeft09 /> */}
          {/* <HeroLeft10 /> */}
        </Box>
      </CssVarsProvider>
    </>
  );
}

export default TitlePage;
