import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Suggestions from "./Pages/Suggestions";
import Discussions from "./Pages/Discussions";
import QandA from "./Pages/QandA";
import Feedback from "./Pages/Feedback";
import AdminPanel from "./Pages/AdminPanel";
import Discussion from "./Pages/Discussion"; // Новая страница для обсуждения

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/Suggestions" element={<Suggestions />} />
      <Route path="/Qanda" element={<QandA />} />
      <Route path="/Discussions" element={<Discussions />} />
      <Route path="/Feedback" element={<Feedback />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/discussion/:id" element={<Discussion />} />{" "}
      {/* Новый маршрут */}
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
