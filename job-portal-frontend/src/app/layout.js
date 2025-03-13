// app/layout.jsx
"use client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Navbar from "./components/Navbar";
import Reducer from "@/Redux/Reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const store = createStore(Reducer);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <>
          <CssBaseline />
          <Provider store={store}>
            <Navbar />
            {children}
          </Provider>
          <ToastContainer />
        </>
      </body>
    </html>
  );
}
