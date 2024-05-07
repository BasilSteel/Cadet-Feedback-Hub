import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Discussion = () => {
  const { id } = useParams();
  const [discussion, setDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/Discussion/${id}`
        );
        const data = await response.json();
        setDiscussion(data);
      } catch (error) {
        console.error("Error fetching discussion:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/Discussion/${id}/comments`
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchDiscussion();
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (newCommentText.trim() === "") {
      return;
    }

    const newComment = {
      text: newCommentText,
    };

    try {
      const response = await fetch(
        `http://localhost:4000/api/Discussion/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );
      const data = await response.json();
      setComments([...comments, data]);
      setNewCommentText("");

      // Обновление страницы
      window.location.reload();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Link
            to="/Discussions"
            className="text-blue-500 hover:underline flex items-center mb-4"
          >
            <AiOutlineArrowLeft className="inline-block mr-2" /> Назад
          </Link>
          {discussion ? (
            <div className="bg-white shadow sm:rounded-lg p-4 mt-4">
              <h2 className="text-lg font-semibold">{discussion.title}</h2>
              <p className="text-gray-700">{discussion.content}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}

          <h2 className="text-lg font-semibold mt-6">Комментарии</h2>
          {/* Список комментариев к теме */}
          {comments.length > 0 ? (
            <ul className="mt-2">
              {comments.map((comment) => (
                <li key={comment.id} className="text-gray-700">
                  {comment.text}
                </li>
              ))}
            </ul>
          ) : (
            <p>Нет комментариев</p>
          )}

          {/* Форма для добавления нового комментария */}
          <div className="mt-4">
            <input
              type="text"
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Введите ваш комментарий"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
            />
            <button
              className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              onClick={handleAddComment}
            >
              Добавить комментарий
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
