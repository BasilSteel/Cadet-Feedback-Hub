import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Discussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5; // Количество элементов на странице

  useEffect(() => {
    fetch("http://localhost:4000/api/Discussion")
      .then((response) => response.json())
      .then((data) => setDiscussions(data.reverse())) // Отображаем обсуждения в обратном порядке
      .catch((error) => console.error("Error fetching discussions:", error));

    fetch("http://localhost:4000/api/Comment")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * perPage;
  const pageCount = Math.ceil(discussions.length / perPage);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Обсуждения</h1>
          <div className="mt-6">
            {discussions.slice(offset, offset + perPage).map((discussion) => (
              <div
                key={discussion.id}
                className="bg-white shadow sm:rounded-lg p-4 mt-4"
              >
                <h2 className="text-lg font-semibold">
                  <Link to={`/discussion/${discussion.id}`}>
                    {discussion.title}
                  </Link>
                </h2>

                <hr />
                {/* Последние три комментария */}
                <ul className="mt-2">
                  {comments
                    .filter((comment) => comment.discussionId === discussion.id)
                    .slice(-3)
                    .map((comment) => (
                      <li key={comment.id} className="text-gray-700">
                        {comment.text}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
          <ReactPaginate
            previousLabel={<AiOutlineArrowLeft />}
            nextLabel={<AiOutlineArrowRight />}
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

export default Discussions;
