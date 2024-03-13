import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const QandA = () => {
  // Состояния для списка вопросов и ответов
  const [qaList, setQAList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5; // Количество элементов на странице

  useEffect(() => {
    fetch("http://localhost:4000/api/Question")
      .then((response) => response.json())
      .then((data) => {
        // Фильтрация списка вопросов и ответов, оставляя только те, у которых есть ответ
        const filteredQAList = data.filter((qa) => qa.answerText !== null);
        setQAList(filteredQAList.reverse()); // Отображаем вопросы и ответы в обратном порядке
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // Состояние для нового вопроса
  const [newQuestion, setNewQuestion] = useState("");

  // Обработчик добавления нового вопроса
  const handleAddQuestion = () => {
    if (newQuestion.trim() !== "") {
      fetch("http://localhost:4000/api/Question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionText: newQuestion, answerText: null }),
      })
        .then((response) => {
          if (response.ok) {
            setNewQuestion("");
            // После добавления нового вопроса снова загружаем список вопросов и ответов
            fetch("http://localhost:4000/api/Question")
              .then((response) => response.json())
              .then((data) => {
                const filteredQAList = data.filter(
                  (qa) => qa.answerText !== null
                );
                setQAList(filteredQAList.reverse()); // Отображаем вопросы и ответы в обратном порядке
              })
              .catch((error) =>
                console.error("Error fetching questions:", error)
              );
          } else {
            throw new Error("Failed to add question");
          }
        })
        .catch((error) => console.error("Error adding question:", error));
    }
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
          <h1 className="text-2xl font-semibold text-gray-900">Q&A</h1>
          {/* Форма для добавления нового вопроса */}
          <div className="mt-6">
            <div className="bg-white shadow sm:rounded-lg p-4">
              <input
                type="text"
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ваш вопрос"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <button
                className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleAddQuestion}
              >
                Добавить вопрос
              </button>
            </div>
          </div>
          {/* Список вопросов и ответов */}
          <div className="mt-6">
            {qaList.slice(offset, offset + perPage).map((qa) => (
              <div
                key={qa.id}
                className="bg-white shadow sm:rounded-lg p-4 mt-4"
              >
                <h2 className="text-lg font-semibold">{qa.questionText}</h2>
                <p className="mt-2 text-gray-700">{qa.answerText}</p>
              </div>
            ))}
          </div>
          {/* Пагинация */}
          <ReactPaginate
            previousLabel={"← Назад"}
            nextLabel={"Вперед →"}
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
  );
};

export default QandA;
