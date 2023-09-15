import React from "react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.ts";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <App />
        <Toaster />
      </ChakraProvider>
    </Router>
  </React.StrictMode>
);
