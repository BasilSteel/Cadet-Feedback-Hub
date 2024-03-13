import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Discussion = () => {
  const [discussionList, setDiscussionList] = useState([]);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5; // Количество элементов на странице

  const fetchDiscussions = async () => {
    try {
      const response = await fetch("http://localhost:5136/api/Discussion");
      const data = await response.json();
      // Отображаем элементы в обратном порядке
      setDiscussionList(data.reverse());
    } catch (error) {
      console.error("Error fetching discussions:", error);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const handleCreateDiscussion = () => {
    fetch("http://localhost:5136/api/Discussion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newDiscussionTitle }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create discussion");
        }
      })
      .then((data) => {
        setDiscussionList([...discussionList, data]);
        setNewDiscussionTitle("");
      })
      .catch((error) => console.error("Error creating discussion:", error));
  };

  const handleDeleteDiscussion = (discussionId) => {
    fetch(`http://localhost:5136/api/Discussion/${discussionId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedDiscussionList = discussionList.filter(
            (discussion) => discussion.id !== discussionId
          );
          setDiscussionList(updatedDiscussionList);
        } else {
          throw new Error("Failed to delete discussion");
        }
      })
      .catch((error) => console.error("Error deleting discussion:", error));
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * perPage;
  const pageCount = Math.ceil(discussionList.length / perPage);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Обсуждения</h2>
            <div className="mb-4">
              <input
                type="text"
                className="mt-2 w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Введите название обсуждения"
                value={newDiscussionTitle}
                onChange={(e) => setNewDiscussionTitle(e.target.value)}
              />
              <button
                className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleCreateDiscussion}
              >
                Создать обсуждение
              </button>
            </div>
            <ul className="bg-white shadow sm:rounded-lg">
              {discussionList
                .slice(offset, offset + perPage)
                .map((discussion) => (
                  <li
                    key={discussion.id}
                    className="border-b border-gray-200 p-4"
                  >
                    <h3 className="text-lg font-semibold">
                      {discussion.title}
                    </h3>
                    <button
                      className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() => handleDeleteDiscussion(discussion.id)}
                    >
                      Удалить обсуждение
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

export default Discussion;
