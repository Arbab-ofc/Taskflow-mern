import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

const savedTheme = localStorage.getItem("taskflow-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  document.documentElement.classList.add("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3200,
          style: {
            border: "1px solid #e2e8f0",
            boxShadow: "0 20px 45px -24px rgba(15, 23, 42, 0.45)",
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
