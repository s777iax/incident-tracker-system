import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Incidents from "./pages/Incidents";
import IncidentDetails from "./pages/IncidentDetails";
import IncidentForm from "./pages/IncidentForm";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      {token && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
