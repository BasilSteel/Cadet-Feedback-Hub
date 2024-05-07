import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { AiFillCheckCircle } from "react-icons/ai";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [newSuggestion, setNewSuggestion] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5; // Количество элементов на странице

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/Suggestion");
      // Отображаем элементы в обратном порядке
      const reversedSuggestions = response.data.reverse();
      setSuggestions(reversedSuggestions);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleAddSuggestion = async () => {
    if (newSuggestion.trim() !== "") {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/Suggestion",
          {
            title: newSuggestion,
          }
        );
        const newSuggestionObj = {
          id: response.data.id,
          title: newSuggestion,
          status: "under consideration",
        };
        setSuggestions([newSuggestionObj, ...suggestions]);
        setNewSuggestion("");
      } catch (error) {
        console.error("Failed to add suggestion:", error);
      }
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * perPage;
  const pageCount = Math.ceil(suggestions.length / perPage);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Предложения</h1>
          <div className="mt-6">
            <div className="bg-white shadow sm:rounded-lg p-4">
              <textarea
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Введите ваше предложение"
                value={newSuggestion}
                onChange={(e) => setNewSuggestion(e.target.value)}
              />
              <button
                className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleAddSuggestion}
              >
                Добавить предложение
              </button>
            </div>
          </div>
          <div className="mt-6">
            <ul className="bg-white shadow sm:rounded-lg">
              {suggestions.slice(offset, offset + perPage).map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="border-b border-gray-200 p-4 flex justify-between items-center"
                >
                  <div>{suggestion.title}</div>
                  <div className="text-gray-500 flex items-center">
                    {suggestion.status === "under consideration" && (
                      <>
                        <span className="mr-1">Рассматривается</span>
                        <AiFillCheckCircle className="text-green-500" />
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
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
    </div>
  );
};

export default Suggestions;
