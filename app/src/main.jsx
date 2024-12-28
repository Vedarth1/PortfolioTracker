import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import ErrorPage from "./pages/ErrorPage.jsx";
import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import StocksPage from "./pages/StocksPage.jsx"
import PortfolioPage from "./pages/PortfolioPage.jsx"

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
      <Route path="/stocks" element={<StocksPage/>}/>
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);
