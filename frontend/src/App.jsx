import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Incidents from "./pages/Incidents";
import IncidentDetails from "./pages/IncidentDetails";
import IncidentForm from "./pages/IncidentForm";


function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/incidents" /> : <Login />}
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
        path="*"
        element={<Navigate to={token ? "/incidents" : "/login"} />}
      />
    </Routes>
  );
}

export default App;