import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5; // Number of items per page
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:4001/api/Suggestion", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Отображаем элементы в обратном порядке
        const reversedData = data.reverse();
        setSuggestions(reversedData);
      })
      .catch((error) => console.error("Error fetching suggestions:", error));
  }, []);

  const handleDeleteSuggestion = (id) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:4001/api/Suggestion/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setSuggestions(
          suggestions.filter((suggestion) => suggestion.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting suggestion:", error));
  };

  const handleChangeStatus = (id, newStatus) => {
    setSuggestions(
      suggestions.map((suggestion) =>
        suggestion.id === id ? { ...suggestion, status: newStatus } : suggestion
      )
    );
  };

  const handleUpdateStatuses = () => {
    setIsUpdating(true);
    const token = localStorage.getItem("token");

    Promise.all(
      suggestions.map((suggestion) =>
        fetch(`http://localhost:4001/api/Suggestion/${suggestion.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: suggestion.id,
            title: suggestion.title,
            content: suggestion.content,
            status: suggestion.status,
          }),
        }).then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to update suggestion ${suggestion.id}`);
          }
        })
      )
    )
      .then(() => setIsUpdating(false))
      .catch((error) => {
        console.error("Error updating statuses:", error);
        setIsUpdating(false);
      });
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
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Предложения</h2>
            <button
              className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleUpdateStatuses}
              disabled={isUpdating}
            >
              {isUpdating ? "Обновление..." : "Обновить статусы"}
            </button>
            <ul className="bg-white shadow sm:rounded-lg">
              {suggestions.slice(offset, offset + perPage).map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="border-b border-gray-200 p-4"
                >
                  <h3 className="text-lg font-semibold">{suggestion.title}</h3>
                  <p className="text-gray-700">{suggestion.content}</p>
                  <div className="mt-2">
                    <select
                      className="border border-gray-300 rounded-md"
                      value={suggestion.status}
                      onChange={(e) =>
                        handleChangeStatus(suggestion.id, e.target.value)
                      }
                    >
                      <option value="на рассмотрении">на рассмотрении</option>
                      <option value="принято">принято</option>
                      <option value="отклонено">отклонено</option>
                    </select>
                  </div>
                  <button
                    className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => handleDeleteSuggestion(suggestion.id)}
                  >
                    Удалить предложение
                  </button>
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
