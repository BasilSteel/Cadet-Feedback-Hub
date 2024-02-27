import { useState } from "react";

const Discussions = () => {
  // Пример данных существующих обсуждений
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "Как улучшить качество обучения?",
      comments: [
        { id: 1, text: "Добавить больше практических занятий." },
        { id: 2, text: "Проводить дополнительные семинары." },
      ],
    },
    {
      id: 2,
      title: "Какие курсы стоит добавить в программу обучения?",
      comments: [
        { id: 1, text: "Курсы по развитию soft skills." },
        { id: 2, text: "Курсы по новым технологиям." },
      ],
    },
  ]);

  // Состояние для текста нового комментария
  const [newComment, setNewComment] = useState("");
  // Состояние для выбранной темы для добавления комментария
  const [selectedDiscussionId, setSelectedDiscussionId] = useState(null);

  // Обработчик добавления нового комментария
  const handleAddComment = (discussionId) => {
    if (newComment.trim() !== "") {
      const updatedDiscussions = discussions.map((discussion) =>
        discussion.id === discussionId
          ? {
              ...discussion,
              comments: [
                ...discussion.comments,
                { id: discussion.comments.length + 1, text: newComment },
              ],
            }
          : discussion
      );
      setDiscussions(updatedDiscussions);
      setNewComment("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Discussions</h1>
          {/* Список тем для обсуждения */}
          <div className="mt-6">
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                className="bg-white shadow sm:rounded-lg p-4 mt-4"
              >
                <h2 className="text-lg font-semibold">{discussion.title}</h2>
                {/* Список комментариев к теме */}
                <ul className="mt-2">
                  {discussion.comments.map((comment) => (
                    <li key={comment.id} className="text-gray-700">
                      {comment.text}
                    </li>
                  ))}
                </ul>
                {/* Форма для добавления нового комментария */}
                {selectedDiscussionId === discussion.id ? (
                  <div className="mt-2">
                    <textarea
                      className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Введите ваш комментарий"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => handleAddComment(discussion.id)}
                    >
                      Добавить комментарий
                    </button>
                  </div>
                ) : (
                  <button
                    className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setSelectedDiscussionId(discussion.id)}
                  >
                    Добавить комментарий
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussions;
