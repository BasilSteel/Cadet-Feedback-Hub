import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-center">
        <div className="flex items-center justify-between w-full">
          <div>
            <Link to="/Discussion" className="text-white font-bold text-xl">
              Cadet Feedback Hub - Admin
            </Link>
          </div>
          <div className="flex space-x-4 items-baseline">
            <Link
              to="/Discussion"
              className="text-white hover:text-gray-300 transition-transform duration-300 transform hover:scale-105"
            >
              Обсуждение
            </Link>
            <Link
              to="/Feedback"
              className="text-white hover:text-gray-300 transition-transform duration-300 transform hover:scale-105"
            >
              Обратная связь
            </Link>
            <Link
              to="/questions"
              className="text-white hover:text-gray-300 transition-transform duration-300 transform hover:scale-105"
            >
              Вопрос ответ
            </Link>
            <Link
              to="/Suggestions"
              className="text-white hover:text-gray-300 transition-transform duration-300 transform hover:scale-105"
            >
              Предложения
            </Link>
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
            >
              Выход
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
