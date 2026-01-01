import { useEffect, useState } from 'react';
import { getIncidents } from '../services/api.js';
import { useNavigate } from "react-router-dom";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isUser = user?.role === "user";

  useEffect(() => {
    try {
      const fetchIncidents = async () => {
        const data = await getIncidents();
        setIncidents(data);
      };
      fetchIncidents();
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h1>Incident Report System</h1>
      {incidents.length === 0 ? (
        <p>No incidents available.</p>
      ) : (
        incidents.map((incident) => (
          <div key={incident.incident_id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{incident.title}</h3>
            <p>Description: {incident.description}</p>
            <p>Status: {incident.status}</p>
            <small>Created At: {new Date(incident.created_at).toLocaleString()}</small>
            <button onClick={() => navigate(`/incidents/${incident.incident_id}`)}>
              View incident
            </button>
          </div>
        ))
      )}
      {isUser && (
        <button onClick={() => navigate("/incidents/new")}>
          Create New Incident
        </button>
      )}
    </div >
  )
}
