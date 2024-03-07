import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Discussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5136/api/Discussion")
      .then((response) => response.json())
      .then((data) => setDiscussions(data))
      .catch((error) => console.error("Error fetching discussions:", error));

    fetch("http://localhost:5136/api/Comment")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Обсуждения</h1>
          <div className="mt-6">
            {discussions.map((discussion) => (
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
        </div>
      </div>
    </div>
  );
};

export default Discussions;
