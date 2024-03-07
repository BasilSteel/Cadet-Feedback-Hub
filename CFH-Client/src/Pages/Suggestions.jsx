import { useState } from "react";

const Suggestions = () => {
  // Пример данных существующих предложений
  const [suggestions, setSuggestions] = useState([
    { id: 1, text: "Добавить больше спортивных мероприятий" },
    { id: 2, text: "Улучшить качество оборудования в тренажерном зале" },
    { id: 3, text: "Провести дополнительные мероприятия по профориентации" },
  ]);
  // Состояние для текста нового предложения
  const [newSuggestion, setNewSuggestion] = useState("");

  // Обработчик добавления нового предложения
  const handleAddSuggestion = () => {
    if (newSuggestion.trim() !== "") {
      setSuggestions([
        ...suggestions,
        { id: suggestions.length + 1, text: newSuggestion },
      ]);
      setNewSuggestion("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Предложения</h1>
          {/* Форма для добавления нового предложения */}
          <div className="mt-6">
            <div className="bg-white shadow sm:rounded-lg p-4">
              <textarea
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Введите ваше предложение"
                value={newSuggestion}
                onChange={(e) => setNewSuggestion(e.target.value)}
              />
              <button
                className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleAddSuggestion}
              >
                Добавить предложение
              </button>
            </div>
          </div>
          {/* Список существующих предложений */}
          <div className="mt-6">
            <ul className="bg-white shadow sm:rounded-lg">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="border-b border-gray-200 p-4"
                >
                  {suggestion.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
