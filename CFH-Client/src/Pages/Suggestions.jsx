import { useState, useEffect } from "react";
import axios from "axios";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [newSuggestion, setNewSuggestion] = useState("");

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get("http://localhost:5136/api/Suggestion");
      setSuggestions(response.data);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleAddSuggestion = async () => {
    if (newSuggestion.trim() !== "") {
      try {
        const response = await axios.post(
          "http://localhost:5136/api/Suggestion",
          {
            title: newSuggestion,
          }
        );
        setSuggestions([
          ...suggestions,
          { id: response.data.id, title: newSuggestion },
        ]);
        setNewSuggestion("");
      } catch (error) {
        console.error("Failed to add suggestion:", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Предложения</h1>
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
          <div className="mt-6">
            <ul className="bg-white shadow sm:rounded-lg">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="border-b border-gray-200 p-4"
                >
                  {suggestion.title}
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
