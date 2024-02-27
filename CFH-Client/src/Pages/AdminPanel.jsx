import { useState } from "react";

const AdminPanel = () => {
  // Пример данных существующих вопросов и ответов
  const [qaList, setQAList] = useState([
    {
      id: 1,
      question: "Какие курсы важно пройти в первую очередь?",
      answer:
        "В первую очередь стоит пройти курсы по основам программирования и алгоритмам.",
    },
    {
      id: 2,
      question: "Какие языки программирования стоит изучить для начала?",
      answer:
        "Для начала стоит изучить языки программирования, такие как Python, Java или JavaScript.",
    },
  ]);

  // Состояние для текста нового ответа
  const [newAnswer, setNewAnswer] = useState("");

  // Обработчик добавления ответа на вопрос
  const handleAddAnswer = (questionId) => {
    const updatedQAList = qaList.map((qa) =>
      qa.id === questionId ? { ...qa, answer: newAnswer } : qa
    );
    setQAList(updatedQAList);
    setNewAnswer("");
  };

  // Пример данных списка обратной связи
  const [feedbackList, setFeedbackList] = useState([
    { id: 1, message: "Отличная платформа, спасибо!" },
    {
      id: 2,
      message: "Предложение: добавить больше материалов по алгоритмам.",
    },
  ]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Panel</h1>
          {/* Список вопросов и ответов */}
          <div className="mt-6">
            <ul className="bg-white shadow sm:rounded-lg">
              {qaList.map((qa) => (
                <li key={qa.id} className="border-b border-gray-200 p-4">
                  <h2 className="text-lg font-semibold">{qa.question}</h2>
                  <p className="text-gray-700">{qa.answer}</p>
                  <textarea
                    className="mt-2 w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Введите ваш ответ"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                  />
                  <button
                    className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => handleAddAnswer(qa.id)}
                  >
                    Ответить на вопрос
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Список обратной связи */}
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
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
