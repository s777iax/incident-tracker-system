import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Incidents from "./pages/Incidents";
import IncidentDetails from "./pages/IncidentDetails";
import IncidentForm from "./pages/IncidentForm";
import Dashboard from "./pages/Dashboard.jsx";
import Navbar from './components/Navbar.jsx';

function App() {
  const admin = JSON.parse(localStorage.getItem("user"))?.role === "admin";
  const token = localStorage.getItem("token");

  return (
    <>
      {token && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate
                to={admin ? "/dashboard" : "/incidents"}
                replace
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/incidents" /> : <Register />}
        />
        <Route
          path="/incidents"
          element={token ? <Incidents /> : <Navigate to="/login" />}
        />
        <Route
          path="/incidents/:id"
          element={token ? <IncidentDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/incidents/new"
          element={token ? <IncidentForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/incidents" : "/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;