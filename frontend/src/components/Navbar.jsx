import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600";

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold">HRMS Lite</h1>
        <div className="space-x-6">
          <NavLink to="/" className={linkClass}>
            Employees
          </NavLink>
          <NavLink to="/attendance" className={linkClass}>
            Attendance
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
