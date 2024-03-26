import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const QuestionListPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4001/api/Question", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setQuestions(data.reverse());
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:4001/api/Question/${questionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestions(questions.filter((q) => q.id !== questionId));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-lg font-semibold">Список вопросов</h2>
          <ul className="bg-white shadow sm:rounded-lg">
            {questions.map((question) => (
              <li key={question.id} className="border-b border-gray-200 p-4">
                <div>
                  <p>{question.questionText}</p>
                  <button
                    className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    Удалить
                  </button>
                  <Link
                    to={`/answer/${question.id}`}
                    className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Ответить
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuestionListPage;
