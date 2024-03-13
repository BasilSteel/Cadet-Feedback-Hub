import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const QuestionAndAnswer = () => {
  const [qaList, setQAList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5; // Number of items per page

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5136/api/Question", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Отображаем элементы в обратном порядке
        const reversedData = data.reverse();
        setQAList(reversedData);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleAddAnswer = (questionId, newAnswer) => {
    const updatedQAList = qaList.map((qa) =>
      qa.id === questionId ? { ...qa, answerText: newAnswer } : qa
    );

    const token = localStorage.getItem("token");

    fetch(`http://localhost:5136/api/Question/${questionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answerText: newAnswer }),
    })
      .then((response) => {
        if (response.ok) {
          setQAList(updatedQAList);
        } else {
          console.error("Failed to add answer:", response.statusText);
        }
      })
      .catch((error) => console.error("Error adding answer:", error));
  };

  const handleDeleteQuestion = (questionId) => {
    const updatedQAList = qaList.filter((qa) => qa.id !== questionId);

    const token = localStorage.getItem("token");

    fetch(`http://localhost:5136/api/Question/${questionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setQAList(updatedQAList);
        } else {
          console.error("Failed to delete question:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * perPage;
  const pageCount = Math.ceil(qaList.length / perPage);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Q&A</h2>
            <ul className="bg-white shadow sm:rounded-lg">
              {qaList.slice(offset, offset + perPage).map((qa) => (
                <li key={qa.id} className="border-b border-gray-200 p-4">
                  <h2 className="text-lg font-semibold">{qa.questionText}</h2>
                  <input
                    type="text"
                    className="mt-2 w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Введите ответ"
                    value={qa.answerText || ""}
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
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={"flex justify-center mt-6"}
              previousClassName={
                "bg-white text-gray-700 px-4 py-2 rounded-l border border-gray-300"
              }
              nextClassName={
                "bg-white text-gray-700 px-4 py-2 rounded-r border border-gray-300"
              }
              breakClassName={
                "bg-white text-gray-700 px-4 py-2 border border-gray-300"
              }
              pageLinkClassName={
                "bg-white border border-gray-300 px-4 py-2 mx-1 rounded"
              }
              disabledClassName={"text-gray-400"}
              activeClassName={"bg-white text-blue-500 border border-blue-500"}
              previousLinkClassName={
                "bg-white border border-gray-300 px-4 py-2 mx-1 rounded-l"
              }
              nextLinkClassName={
                "bg-white border border-gray-300 px-4 py-2 mx-1 rounded-r"
              }
              activeLinkClassName={
                "bg-white border border-gray-300 px-4 py-2 mx-1 rounded"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionAndAnswer;
