import { useState, useEffect } from "react";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5136/api/Suggestion")
      .then((response) => response.json())
      .then((data) => setSuggestions(data))
      .catch((error) => console.error("Error fetching suggestions:", error));
  }, []);

  const handleDeleteSuggestion = (id) => {
    fetch(`http://localhost:5136/api/Suggestion/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setSuggestions(
          suggestions.filter((suggestion) => suggestion.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting suggestion:", error));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Предложения</h2>
            <ul className="bg-white shadow sm:rounded-lg">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="border-b border-gray-200 p-4"
                >
                  <h3 className="text-lg font-semibold">{suggestion.title}</h3>
                  <p className="text-gray-700">{suggestion.content}</p>
                  <button
                    className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => handleDeleteSuggestion(suggestion.id)}
                  >
                    Удалить предложение
                  </button>
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
