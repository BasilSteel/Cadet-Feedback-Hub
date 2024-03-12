import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./Components/Navbar";
import Discussion from "./Pages/Discussion";
import Feedback from "./Pages/Feedback";
import QuestionAndAnswer from "./Pages/QuestionAndAnswer";
import Suggestions from "./Pages/Suggestions";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Discussion />} />
      <Route path="/Discussion" element={<Discussion />} />
      <Route path="/Feedback" element={<Feedback />} />
      <Route path="/QuestionAndAnswer" element={<QuestionAndAnswer />} />
      <Route path="/Suggestions" element={<Suggestions />} />
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
