import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import AdminAddCar from "./components/AdminAddCar";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin/add-car" element={<PrivateRoute adminOnly={true}><AdminAddCar /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;