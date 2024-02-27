import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div>
            <Link to="/" className="text-white font-bold text-xl">
              Cadet Feedback Hub
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Dashboard
            </Link>
            <Link to="/suggestions" className="text-white hover:text-gray-300">
              Suggestions
            </Link>
            <Link to="/discussions" className="text-white hover:text-gray-300">
              Discussions
            </Link>
            <Link to="/qanda" className="text-white hover:text-gray-300">
              Q&A
            </Link>
            <Link to="/feedback" className="text-white hover:text-gray-300">
              Feedback
            </Link>
            <Link to="/admin" className="text-white hover:text-gray-300">
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
