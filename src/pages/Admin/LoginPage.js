import React, { useRef, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import FormControl from "@mui/joy/FormControl";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";

function LoginPage() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.3s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={{
          // display: 'flex',
          // flexDirection: 'column',
          // height: '100vh',
          // width: '100%',
          // px: 2,
          // backgroundColor: 'background.body',
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton
                variant="soft"
                color="primary"
                size="sm"
                component="a"
                href="/"
              >
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">
                tr<span style={{ color: "#219BCC" }}>AI</span>ner
              </Typography>
            </Box>
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Box sx={{ mb: 4 }}>
                <Typography level="h4" component="h1">
                  관리자 로그인
                </Typography>
              </Box>
              <Box
                component="form"
                onSubmit={async (e) => {
                  e.preventDefault();

                  try {
                    const username = e.currentTarget.username.value;
                    const password = e.currentTarget.password.value;
                    const response = await axios.post(
                      process.env.REACT_APP_API_URL_BLD + "/admin/login",
                      { username, password },
                      { withCredentials: true }
                    );

                    if (response.data.success) {
                      const user = JSON.parse(response.config.data);
                      login(user);
                      navigate("/dashboard");
                    }
                  } catch (error) {
                    console.log("error: ", error);
                    console.error("Login failed:", error);
                  }
                }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: 400,
                  maxWidth: "100%",
                }}
              >
                <FormControl required>
                  <Input
                    autoFocus
                    name="username"
                    inputRef={usernameRef}
                    placeholder="아이디"
                    id="username"
                    startDecorator={<AccountCircle />}
                  />
                </FormControl>
                <FormControl required>
                  <Input
                    name="password"
                    inputRef={passwordRef}
                    placeholder="비밀번호"
                    id="password"
                    type="password"
                    startDecorator={<PasswordIcon />}
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button type="submit" fullWidth>
                    <span
                      className="material-icons"
                      style={{
                        verticalAlign: "middle",
                        marginRight: "5px",
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      login
                    </span>
                    <span style={{ fontWeight: "bold" }}> 로그인</span>
                  </Button>
                </Stack>
              </Box>
            </Stack>
            {/* </Box> */}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            // 'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
            `url("${process.env.PUBLIC_URL}/fitness.jpg")`,
        }}
      />
    </CssVarsProvider>
  );
}

export default LoginPage;
