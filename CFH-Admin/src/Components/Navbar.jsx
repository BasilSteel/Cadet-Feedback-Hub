import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div>
            <Link to="/Discussion" className="text-white font-bold text-xl">
              Cadet Feedback Hub - Admin
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="Discussion" className="text-white hover:text-gray-300">
              Обсуждение
            </Link>
            <Link to="/Feedback" className="text-white hover:text-gray-300">
              Обратная связь
            </Link>
            <Link to="/QA" className="text-white hover:text-gray-300">
              Вопрос ответ
            </Link>
            <Link to="/Suggestions" className="text-white hover:text-gray-300">
              Предложения
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
