import React from "react";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
import routes from "./routes";
import DownloadModal from "./components/DownloadModal";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <RouterProvider router={routes} />
        <DownloadModal />
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
