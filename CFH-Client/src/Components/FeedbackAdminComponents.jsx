import { useState, useEffect } from "react";

export default function FeedbackAdminComponents() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5136/api/Feedback")
      .then((response) => response.json())
      .then((data) => setFeedbackList(data))
      .catch((error) => console.error("Error fetching feedback:", error));
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">Feedback</h2>
      <ul className="bg-white shadow sm:rounded-lg">
        {feedbackList.map((feedback) => (
          <li key={feedback.id} className="border-b border-gray-200 p-4">
            <p className="text-gray-700">{feedback.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
