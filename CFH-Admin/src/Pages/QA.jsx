import { useState, useEffect } from "react";

export default function QA() {
  const [qaList, setQAList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5136/api/Question")
      .then((response) => response.json())
      .then((data) => setQAList(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleAddAnswer = (questionId, newAnswer) => {
    const question = qaList.find((qa) => qa.id === questionId);
    if (!question) {
      console.error("Question not found");
      return;
    }

    const updatedQuestion = { ...question, answerText: newAnswer };

    fetch(`http://localhost:5136/api/Question/${questionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuestion),
    })
      .then((response) => {
        if (response.ok) {
          const updatedQAList = qaList.map((qa) =>
            qa.id === questionId ? updatedQuestion : qa
          );
          setQAList(updatedQAList);
        } else {
          console.error("Failed to add answer:", response.statusText);
        }
      })
      .catch((error) => console.error("Error adding answer:", error));
  };

  const handleDeleteQuestion = (questionId) => {
    fetch(`http://localhost:5136/api/Question/${questionId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedQAList = qaList.filter((qa) => qa.id !== questionId);
          setQAList(updatedQAList);
        } else {
          console.error("Failed to delete question:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Q&A</h2>

            <ul className="bg-white shadow sm:rounded-lg">
              {qaList.map((qa) => (
                <li key={qa.id} className="border-b border-gray-200 p-4">
                  <h2 className="text-lg font-semibold">{qa.questionText}</h2>
                  {/* <p className="text-gray-700">{qa.answerText}</p> */}
                  <input
                    type="text"
                    className="mt-2 w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Введите ответ"
                    value={qa.answerText}
                    onChange={(e) => handleAddAnswer(qa.id, e.target.value)}
                  />
                  <button
                    className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => handleAddAnswer(qa.id, qa.answerText)}
                  >
                    Сохранить ответ
                  </button>
                  <button
                    className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => handleDeleteQuestion(qa.id)}
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
