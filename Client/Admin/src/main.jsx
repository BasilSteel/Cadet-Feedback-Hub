import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Navbar from "./Components/Navbar";
import Discussion from "./Pages/Discussion";
import Feedback from "./Pages/Feedback";
import QuestionAndAnswer from "./Pages/QuestionAndAnswer";
import Suggestions from "./Pages/Suggestions";
import LoginPage from "./Pages/LoginPage";
import QuestionListPage from "./Pages/QuestionListPage";
import AnswerQuestionPage from "./Pages/AnswerQuestionPage";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken && decodedToken.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

const PrivateRoute = ({ element, ...props }) => {
  return isAuthenticated() ? (
    <>
      <Navbar />
      {element}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PrivateRoute element={<Discussion />} />} />
      <Route
        path="/Discussion"
        element={<PrivateRoute element={<Discussion />} />}
      />
      <Route
        path="/Feedback"
        element={<PrivateRoute element={<Feedback />} />}
      />
      <Route
        path="/QuestionAndAnswer"
        element={<PrivateRoute element={<QuestionAndAnswer />} />}
      />
      <Route
        path="/Suggestions"
        element={<PrivateRoute element={<Suggestions />} />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/questions"
        element={<PrivateRoute element={<QuestionListPage />} />}
      />
      <Route
        path="/answer/:questionId"
        element={<PrivateRoute element={<AnswerQuestionPage />} />}
      />
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
