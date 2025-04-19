import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CreateNote from "./components/CreateNote";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/dashboard/:id" element={<CreateNote/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
