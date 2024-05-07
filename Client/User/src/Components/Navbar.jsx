import { Link } from "react-router-dom";
import { AiOutlineThunderbolt } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <Link
              to="/"
              className="text-white font-bold text-xl flex items-center space-x-2"
            >
              <AiOutlineThunderbolt className="animate-pulse" /> Cadet Feedback
              Hub
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/suggestions"
              className="text-white hover:text-gray-300 transition-colors duration-300 transform hover:scale-105"
            >
              Предложения
            </Link>
            <Link
              to="/discussions"
              className="text-white hover:text-gray-300 transition-colors duration-300 transform hover:scale-105"
            >
              Обсуждения
            </Link>
            <Link
              to="/qanda"
              className="text-white hover:text-gray-300 transition-colors duration-300 transform hover:scale-105"
            >
              Q&A
            </Link>
            <Link
              to="/feedback"
              className="text-white hover:text-gray-300 transition-colors duration-300 transform hover:scale-105"
            >
              Обратная связь
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
