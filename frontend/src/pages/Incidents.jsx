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
    <div className="incidents-page">
      <button onClick={handleLogout} className='logout-btn'>Logout</button>
      <div className='container'>
        <h1>Incident Report System</h1>
        {incidents.length === 0 ? (
          <p>No incidents available.</p>
        ) : (
          incidents.map((incident) => (
            <div key={incident.incident_id} className='incident-container' onClick={() => navigate(`/incidents/${incident.incident_id}`)}>
              <h3>{incident.title}</h3>
              <p>{incident.description}</p>
              <p className={`status-${incident.status.toLowerCase().replace("_", "-")}`}>
                {incident.status.replace("_", " ")}
              </p>
              <p className="text-date">{new Date(incident.created_at).toLocaleString()}</p>
            </div>
          ))
        )}
        {isUser && (
          <button onClick={() => navigate("/incidents/new")} className="create-incident-btn">
            Create New Incident
          </button>
        )}
      </div>
    </div>
  )
}
