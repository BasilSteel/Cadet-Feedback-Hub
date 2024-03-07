import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Discussion = () => {
  const { id } = useParams();
  const [discussion, setDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5136/api/Discussion/${id}`)
      .then((response) => response.json())
      .then((data) => setDiscussion(data))
      .catch((error) => console.error("Error fetching discussion:", error));

    fetch(`http://localhost:5136/api/Comment`)
      .then((response) => response.json())
      .then((data) =>
        setComments(data.filter((comment) => comment.discussionId === id))
      )
      .catch((error) => console.error("Error fetching comments:", error));
  }, [id]);

  const handleAddComment = () => {
    if (newCommentText.trim() === "") {
      return;
    }

    const newComment = {
      text: newCommentText,
      discussionId: id,
    };

    fetch("http://localhost:5136/api/Comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data]);
        setNewCommentText("");
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Link to="/Discussions" className="text-blue-500 hover:underline">
            Назад
          </Link>
          {discussion ? (
            <div className="bg-white shadow sm:rounded-lg p-4 mt-4">
              <h2 className="text-lg font-semibold">{discussion.title}</h2>
              <p className="text-gray-700">{discussion.content}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}

          <h2 className="text-lg font-semibold mt-6">Comments</h2>
          {/* Список комментариев к теме */}
          <ul className="mt-2">
            {comments.map((comment) => (
              <li key={comment.id} className="text-gray-700">
                {comment.text}
              </li>
            ))}
          </ul>

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
              className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
