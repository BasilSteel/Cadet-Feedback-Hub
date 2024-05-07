import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { format } from "date-fns";
import { AiFillCheckCircle } from "react-icons/ai";

const QandA = () => {
  const [qaList, setQAList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5;

  useEffect(() => {
    fetch("http://localhost:4000/api/Question")
      .then((response) => response.json())
      .then((data) => {
        const filteredQAList = data.filter((qa) => qa.answerText !== null);
        setQAList(filteredQAList.reverse());
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Q&A</h1>
          <div className="mt-6">
            <div className="bg-white shadow sm:rounded-lg p-4">
              <input
                type="text"
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ваш вопрос"
                value={""}
                onChange={() => {}}
              />
              <button
                className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {}}
              >
                Добавить вопрос
              </button>
            </div>
          </div>
          <div className="mt-6">
            {qaList
              .slice(currentPage * perPage, (currentPage + 1) * perPage)
              .map((qa) => (
                <div
                  key={qa.id}
                  className="bg-white shadow sm:rounded-lg p-4 mt-4"
                >
                  <h2 className="text-lg font-semibold">{qa.questionText}</h2>
                  <p className="mt-2 text-gray-700">{qa.answerText}</p>
                  <p className="text-gray-500 text-sm">
                    {format(new Date(qa.questionDateTime), "dd.MM.yyyy HH:mm")}
                    <AiFillCheckCircle className="inline-block ml-1" />
                  </p>
                </div>
              ))}
          </div>
          <ReactPaginate
            previousLabel={"← Назад"}
            nextLabel={"Вперед →"}
            breakLabel={"..."}
            pageCount={Math.ceil(qaList.length / perPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={({ selected }) => setCurrentPage(selected)}
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
            pageClassName={
              "bg-white border border-gray-300 px-4 py-2 mx-1 rounded"
            }
            activeClassName={"bg-white text-blue-500 border border-blue-500"}
            previousLinkClassName={
              "bg-white border border-gray-300 px-4 py-2 mx-1 rounded-l"
            }
            nextLinkClassName={
              "bg-white border border-gray-300 px-4 py-2 mx-1 rounded-r"
            }
            breakLinkClassName={
              "bg-white border border-gray-300 px-4 py-2 mx-1 rounded"
            }
            pageLinkClassName={
              "bg-white border border-gray-300 px-4 py-2 mx-1 rounded"
            }
            disabledClassName={"text-gray-400"}
          />
        </div>
      </div>
    </div>
  );
};

export default QandA;
