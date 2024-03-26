import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const AnswerQuestionPage = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:4001/api/Question/${questionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setQuestion(data);
          setAnswerText(data.answerText || ""); // Set answerText to existing answer if it exists
        } else {
          console.error("Failed to fetch question:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [questionId]);

  const handleAnswerQuestion = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4001/api/Question/${questionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            questionText: question.questionText,
            answerText,
          }),
        }
      );
      if (response.ok) {
        // Handle success
        console.log("Answer submitted successfully");
      } else {
        // Handle error
        console.error("Failed to submit answer:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center mb-4">
            <Link
              to="/questions"
              className="text-blue-500 hover:underline flex items-center"
            >
              <BackArrow />
              Назад
            </Link>
          </div>
          {question && (
            <>
              <h2 className="text-lg font-semibold">{question.questionText}</h2>
              <textarea
                className="mt-2 w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Введите ответ"
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
              ></textarea>
              <button
                className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleAnswerQuestion}
              >
                Отправить ответ
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const BackArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 inline-block align-middle mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

export default AnswerQuestionPage;
