import { useState, useEffect } from "react";

export default function DiscussionAdminComponents() {
  const [discussionList, setDiscussionList] = useState([]);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:5136/api/Discussion")
      .then((response) => response.json())
      .then((data) => setDiscussionList(data))
      .catch((error) => console.error("Error fetching discussions:", error));
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

  return (
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
        {discussionList.map((discussion) => (
          <li key={discussion.id} className="border-b border-gray-200 p-4">
            <h3 className="text-lg font-semibold">{discussion.title}</h3>
            <button
              className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => handleDeleteDiscussion(discussion.id)}
            >
              Удалить обсуждение
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
