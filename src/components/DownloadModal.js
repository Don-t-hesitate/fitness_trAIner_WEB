import React, { useContext } from "react";
import ReactDOM from "react-dom";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
  Stack,
  Sheet,
} from "@mui/joy";
import { ModalContext } from "../ModalContext";
import { cancelTitleAppDownload } from "../pages/TitlePage";
import { cancelAppDownload } from "./SideBar";
import { cancelModelManageDownload } from "../pages/Ai/WorkoutAiManage";
import { cancelModelInfoDownload } from "../pages/Ai/WorkoutAiInfo";

const DownloadModal = () => {
  const { loading, startLoading, stopLoading, progress, type } =
    useContext(ModalContext);
  const modalRoot = document.getElementById("modal-root");

  const getModal = () => {
    if (!modalRoot) return null;

    return ReactDOM.createPortal(
      <Modal
        keepMounted
        disableAutoFocus
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={loading}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10001,
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <Box display="flex" alignItems="center">
            <Stack direction="column" spacing={2}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress size="lg" determinate value={progress || 0}>
                  <Typography>{progress.toFixed(1)}%</Typography>
                </CircularProgress>
                <Typography
                  id="modal-title"
                  level="h4"
                  textColor="black"
                  fontWeight="lg"
                >
                  &nbsp;&nbsp;&nbsp;
                  {type === "app" ? <span>앱</span> : <span>모델</span>}
                  &nbsp;
                  <span style={{ fontFamily: "Pretendard-Regular" }}>
                    다운로드 중...
                  </span>
                </Typography>
              </Stack>
              <Button
                variant="solid"
                onClick={(e) => {
                  e.preventDefault();
                  if (type === "app") {
                    if (cancelAppDownload) {
                      cancelAppDownload();
                    } else if (cancelTitleAppDownload) {
                      cancelTitleAppDownload();
                    }
                  } else if (type === "model") {
                    if (cancelModelManageDownload) {
                      cancelModelManageDownload();
                    } else if (cancelModelInfoDownload) {
                      cancelModelInfoDownload();
                    }
                  }
                }}
                sx={{ cursor: "pointer" }}
              >
                취소
              </Button>
            </Stack>
          </Box>
        </Sheet>
      </Modal>,
      modalRoot
    );
  };

  return <>{getModal()}</>;
};

export default DownloadModal;
