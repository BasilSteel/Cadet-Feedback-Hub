import { useState } from "react";

const QandA = () => {
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

  // Состояния для текста нового вопроса и ответа
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // Обработчик добавления нового вопроса и ответа
  const handleAddQA = () => {
    if (newQuestion.trim() !== "" && newAnswer.trim() !== "") {
      setQAList([
        ...qaList,
        { id: qaList.length + 1, question: newQuestion, answer: newAnswer },
      ]);
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Q&A</h1>
          {/* Форма для добавления нового вопроса и ответа */}
          <div className="mt-6">
            <div className="bg-white shadow sm:rounded-lg p-4">
              <input
                type="text"
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Введите ваш вопрос"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <textarea
                className="mt-2 w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Введите ваш ответ"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <button
                className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleAddQA}
              >
                Добавить вопрос и ответ
              </button>
            </div>
          </div>
          {/* Список вопросов и ответов */}
          <div className="mt-6">
            {qaList.map((qa) => (
              <div
                key={qa.id}
                className="bg-white shadow sm:rounded-lg p-4 mt-4"
              >
                <h2 className="text-lg font-semibold">{qa.question}</h2>
                <p className="mt-2 text-gray-700">{qa.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QandA;
