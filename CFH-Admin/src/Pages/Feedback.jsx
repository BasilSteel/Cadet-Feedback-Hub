import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5; // Number of items per page

  useEffect(() => {
    fetch("http://localhost:5136/api/Feedback")
      .then((response) => response.json())
      .then((data) => {
        // Отображаем элементы в обратном порядке
        const reversedData = data.reverse();
        setFeedbackList(reversedData);
      })
      .catch((error) => console.error("Error fetching feedback:", error));
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * perPage;
  const pageCount = Math.ceil(feedbackList.length / perPage);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Feedback</h2>
            <ul className="bg-white shadow sm:rounded-lg">
              {feedbackList.slice(offset, offset + perPage).map((feedback) => (
                <li key={feedback.id} className="border-b border-gray-200 p-4">
                  <p className="text-gray-700">{feedback.message}</p>
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

export default Feedback;
