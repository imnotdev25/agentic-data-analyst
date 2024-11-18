import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-6">Navigation</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Link
            to="/"
            className={`block p-2 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600 ${
              location.pathname === "/" ? "bg-blue-100 text-blue-600" : ""
            }`}
          >
            Agents Analysis
          </Link>
          <Link
            to="/dataset"
            className={`block p-2 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600 ${
              location.pathname === "/dataset" ? "bg-blue-100 text-blue-600" : ""
            }`}
          >
            Dataset
          </Link>
          <Link
            to="/visuals"
            className={`block p-2 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600 ${
              location.pathname === "/visuals" ? "bg-blue-100 text-blue-600" : ""
            }`}
          >
            Visuals
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;