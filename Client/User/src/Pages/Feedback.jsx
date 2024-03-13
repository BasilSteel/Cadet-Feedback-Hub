import { useState } from "react";

const Feedback = () => {
  // Состояние для текста обратной связи
  const [feedback, setFeedback] = useState("");

  // Обработчик отправки обратной связи
  const handleSubmit = (e) => {
    e.preventDefault();
    // Отправка обратной связи на сервер
    fetch("http://localhost:4000/api/Feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: feedback }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Обратная связь успешно отправлена");
          setFeedback("");
        } else {
          throw new Error("Failed to send feedback");
        }
      })
      .catch((error) => {
        console.error("Error sending feedback:", error);
        alert("Ошибка отправки обратной связи");
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">
            Обратная связь
          </h1>
          {/* Форма для отправки обратной связи */}
          <div className="mt-6">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow sm:rounded-lg p-4"
            >
              <textarea
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Введите ваш отзыв"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Отправить обратную связь
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
