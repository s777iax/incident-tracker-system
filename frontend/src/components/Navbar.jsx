import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="navbar">
      <h2 className="logo" onClick={() => navigate("/incidents")}>
        Incident Report System
      </h2>

      <div className="nav-links">
        {isAdmin && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>
        )}

        <NavLink
          to="/incidents"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Incidents
        </NavLink>

        <button className="nav-link logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
